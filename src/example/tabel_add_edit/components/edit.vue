<template>
  <yun-drawer
    v-model="visible2"
    size="X-large"
    title="编辑"
    :cancel-button-text="'取消'"
    :confirm-button-text="'确定'"
    @confirm="confirmHandler"
  >
    <yun-pro-detail
      :detail="state.detail"
      :columns="detailColumns"
    />
    <el-tabs
      v-model="tab"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="发票信息"
        name="invoice"
      >
        <yun-pro-detail
          :detail="state.detail"
          :columns="invoiceDetailColumns"
        />
        <yun-pro-table
          :table-columns="invoiceTableColumns"
          :table-data="state.detail.invoicingList"
        >
          <template #tableHeaderLeft>
            <el-button
              v-if="state.detail.invoicingList"
              type="primary"
              @click="handleAdd('invoice')"
            >
              新增
            </el-button>
          </template>
          <template #t_action="{ row, $index }">
            <el-button
              type="text"
              @click="handleDel(row, $index, 'invoice')"
            >
              删除
            </el-button>
          </template>
        </yun-pro-table>
      </el-tab-pane>
      <el-tab-pane
        label="回款信息"
        name="bill"
      >
        <yun-pro-detail
          :detail="state.detail"
          :columns="billDetailColumns"
        />
        <yun-pro-table
          :table-columns="billTableColumns"
          :table-data="state.detail.paymentList"
        >
          <template #tableHeaderLeft>
            <el-button
              v-if="state.detail.paymentList"
              type="primary"
              @click="handleAdd('bill')"
            >
              新增
            </el-button>
          </template>
          <template #t_action="{ row, $index }">
            <el-button
              type="text"
              @click="handleDel(row, $index, 'bill')"
            >
              删除
            </el-button>
          </template>
        </yun-pro-table>
      </el-tab-pane>
    </el-tabs>
  </yun-drawer>
</template>
<script lang="jsx" setup>
import { ref, computed, reactive, watch, h, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import { pick, cloneDeep } from 'lodash';
import dayjs from 'dayjs';
import { InvoicingStatusMap, PaymentStatusMap } from '@/const/configEnum';
import { getInvoicingDetail, saveInvoicing, delInvoicing, delBill } from '../api';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:visible', 'confirm']);

const visible2 = computed({
  get: () => {
    return props.visible;
  },
  set: (value) => {
    emit('update:visible', value);
  },
});

const tab = ref('invoice');

const handleClick = (pane) => {
  tab.value = pane.paneName;
};

const state = reactive({
  detail: {},
});

const serializeList = (list) => {
  return list.map((v) => {
    let { file } = v;
    if (!file) {
      file = '[]';
    } else {
      try {
        file = JSON.stringify(file);
      } catch {
        file = '[]';
      }
    }
    return {
      ...v,
      file,
    };
  });
};
const reserializeList = (list) => {
  return list.map((v) => {
    let { file } = v;
    if (!file) {
      file = [];
    } else {
      try {
        file = JSON.parse(file);
      } catch {
        file = [];
      }
    }
    return {
      ...v,
      file,
    };
  });
};

const fetchDetail = async (detail) => {
  state.detail = detail;
  const { id } = detail;
  const res = await getInvoicingDetail({ id });
  const { invoicingList, paymentList, ...rest } = res;
  state.detail = {
    ...rest,
    invoicingList: reserializeList(invoicingList || []),
    paymentList: reserializeList(paymentList || []),
  };
};

const beforeUpload = (file) => {
  const fileExtension = file.name.split('.').pop().toLowerCase();
  const flag = ['png', 'jpg', 'jpeg', 'pdf'].includes(fileExtension);
  if (!flag) {
    ElMessage({
      type: 'info',
      message: `文件请上传格式为png,jpg,jpeg,pdf中的任意一种`,
    });
  }
  return flag;
};

const detailColumns = [
  {
    label: '账单编号',
    prop: 'billNo',
    group: '基础信息',
    span: 1.5,
  },
  {
    label: '账单名称',
    prop: 'billName',
    group: '基础信息',
    span: 1.5,
  },
  {
    label: '收款方',
    prop: 'recvName',
    group: '基础信息',
    span: 1.5,
  },
  {
    label: '付款方',
    prop: 'payName',
    group: '基础信息',
    span: 1.5,
  },
  {
    label: '账单金额(含税)',
    prop: 'billAmount',
    group: '基础信息',
  },
];
const invoiceDetailColumns = [
  {
    label: '开票状态',
    prop: 'invoicingStatus',
    render: (row) => {
      const { invoicingStatus } = row;
      return <span>{InvoicingStatusMap[invoicingStatus] || '--'}</span>;
    },
  },
  {
    label: '已开票金额(含税)',
    prop: 'invoicedAmount',
  },
  {
    label: '待开票金额(含税)',
    prop: 'notInvoicedAmount',
  },
];
const billDetailColumns = [
  {
    label: '回款状态',
    prop: 'paymentStatus',
    render: (row) => {
      const { paymentStatus } = row;
      return <span>{PaymentStatusMap[paymentStatus] || '--'}</span>;
    },
  },
  {
    label: '已回款金额',
    prop: 'paymentAmount',
  },
  {
    label: '待回款金额',
    prop: 'notPaymentAmount',
  },
];
const invoiceTypeOpitons = [
  {
    label: '普票',
    value: 'COMMON_INVOICE',
  },
  {
    label: '专票',
    value: 'SPECIAL_INVOICE',
  },
  {
    label: '全电',
    value: 'ALL',
  },
];
const invoiceTableColumns = [
  {
    label: '序号',
    prop: 'index',
    type: 'index',
    width: '60px',
    fixed: 'left',
  },
  {
    label: '操作',
    prop: 'action',
    'show-overflow-tooltip': false,
    width: '60px',
    fixed: 'left',
  },
  {
    // label: '发票号码',
    prop: 'invoiceNo',
    renderHeader: () =>
      h(
        'span',
        {
          class: 'wk-required',
        },
        '发票号码',
      ),
    'show-overflow-tooltip': false,
    width: '120px',
    render: ({ row }) => {
      return <el-input v-model={row.invoiceNo}></el-input>;
    },
  },
  {
    label: '发票类型',
    prop: 'invoiceType',
    'show-overflow-tooltip': false,
    width: '120px',
    render: ({ row }) => {
      return (
        <el-select v-model={row.invoiceType}>
          {invoiceTypeOpitons.map((v) => {
            return (
              <el-option
                label={v.label}
                value={v.value}
              ></el-option>
            );
          })}
        </el-select>
      );
    },
  },
  {
    label: '发票金额(含税)',
    prop: 'invoiceAmount',
    'show-overflow-tooltip': false,
    width: '176px',
    render: ({ row }) => {
      return (
        <el-input-number
          v-model={row.invoiceAmount}
          precision={2}
        ></el-input-number>
      );
    },
  },
  {
    // label: '已关联发票金额(含税)',
    prop: 'invoicedAmount',
    renderHeader: () =>
      h(
        'span',
        {
          class: 'wk-required',
        },
        '已关联发票金额(含税)',
      ),
    'show-overflow-tooltip': false,
    width: '176px',
    render: ({ row }) => {
      return (
        <el-input-number
          v-model={row.invoicedAmount}
          min={0.01}
          precision={2}
        ></el-input-number>
      );
    },
  },
  {
    label: '发票图片',
    prop: 'file',
    'show-overflow-tooltip': false,
    render: ({ row }) => {
      const uploadFileFn = (files) => {
        row.file = files;
      };
      return (
        <NhUploadAttachmentNew
          is-classify
          limit={1}
          tips={''}
          upload-file={row.file}
          beforeUpload={beforeUpload}
          onUpdate:uploadFile={uploadFileFn}
        />
      );
    },
  },
];
const billTableColumns = [
  {
    label: '序号',
    prop: 'index',
    type: 'index',
    width: '60px',
    fixed: 'left',
  },
  {
    label: '操作',
    prop: 'action',
    'show-overflow-tooltip': false,
    width: '60px',
    fixed: 'left',
  },
  {
    // label: '回款时间',
    prop: 'paymentTime',
    renderHeader: () =>
      h(
        'span',
        {
          class: 'wk-required',
        },
        '回款时间',
      ),
    'show-overflow-tooltip': false,
    width: '200px',
    render: ({ row }) => {
      return (
        <el-date-picker
          v-model={row.paymentTime}
          style={{ width: '100%' }}
          type="datetime"
          placeholder="请选择"
        />
      );
    },
  },
  {
    label: '关联流水号',
    prop: 'serialNumber',
    'show-overflow-tooltip': false,
    width: '160px',
    render: ({ row }) => {
      return <el-input v-model={row.serialNumber}></el-input>;
    },
  },
  {
    // label: '关联金额',
    prop: 'serialAmount',
    renderHeader: () =>
      h(
        'span',
        {
          class: 'wk-required',
        },
        '回款金额',
      ),
    'show-overflow-tooltip': false,
    width: '176px',
    render: ({ row }) => {
      return (
        <el-input-number
          v-model={row.serialAmount}
          min={0.01}
          precision={2}
        ></el-input-number>
      );
    },
  },
  {
    label: '单据图片',
    prop: 'file',
    'show-overflow-tooltip': false,
    render: ({ row }) => {
      const uploadFileFn = (files) => {
        row.file = files;
      };
      return (
        <NhUploadAttachmentNew
          is-classify
          limit={1}
          tips={''}
          upload-file={row.file}
          beforeUpload={beforeUpload}
          onUpdate:uploadFile={uploadFileFn}
        />
      );
    },
  },
];

const handleAdd = (type) => {
  if (type === 'invoice') {
    state.detail.invoicingList.push({
      invoiceNo: null,
      invoiceType: null,
      invoiceAmount: null,
      invoicedAmount: null,
      file: [],
    });
  } else {
    state.detail.paymentList.push({
      paymentTime: null,
      serialNumber: null,
      serialAmount: null,
      file: [],
    });
  }
};
const handleDel = async (row, index, type) => {
  const key = type === 'invoice' ? 'invoicingList' : 'paymentList';
  const { id } = row;
  if (!id) {
    state.detail[key].splice(index, 1);
    return;
  } else {
    state.detail[key].splice(index, 1);
    if (type === 'invoice') {
      delInvoicing({ id });
    } else {
      delBill({ id });
    }
  }
};

const validFn = (type) => {
  const key = type === 'invoice' ? 'invoicingList' : 'paymentList';
  const obj = {
    invoicingList: ['invoiceNo', 'invoicedAmount'],
    paymentList: ['paymentTime', 'serialAmount'],
  };
  let flag = false;
  let index = 0;
  flag = state.detail[key].every((outer, i) => {
    const list = obj[key];
    const temp = list.every((inner) => {
      return outer[inner];
    });
    if (!temp) {
      index = i;
    }
    return temp;
  });
  if (!flag) {
    ElMessage({
      type: 'info',
      message: `${type === 'invoice' ? '发票信息' : '回款信息'}第${index + 1}行数据未填写完整`,
    });
  }
  return flag;
};

let loading = false;
const confirmHandler = async () => {
  if (loading) {
    return;
  }
  const { invoicingList, paymentList } = state.detail;
  if (!(invoicingList || []).length && !(paymentList || []).length) {
    ElMessage({
      type: 'info',
      message: '发票信息/回款信息数据未填写',
    });
    return;
  }
  if (!validFn('invoice') || !validFn('bill')) {
    return;
  }
  loading = true;
  const keys = ['id', ...detailColumns.map((v) => v.prop)];
  const data = {
    ...pick(state.detail, keys),
    invoicingList: serializeList(cloneDeep(invoicingList)),
    paymentList: serializeList(cloneDeep(paymentList)).map((v) => {
      const { paymentTime } = v;
      return {
        ...v,
        paymentTime: dayjs(paymentTime).format('YYYY-MM-DD HH:mm:ss'),
      };
    }),
  };
  try {
    await saveInvoicing(data);
    visible2.value = false;
    emit('confirm');
  } finally {
    loading = false;
  }
};

watch(visible2, (v) => {
  if (v) {
    fetchDetail(props.data);
  }
});
</script>
<style lang="scss" scoped></style>
