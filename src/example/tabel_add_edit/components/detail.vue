<template>
  <yun-drawer
    v-model="visible2"
    size="X-large"
    title="详情"
    :show-confirm-button="false"
    :cancel-button-text="'取消'"
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
        </yun-pro-table>
      </el-tab-pane>
    </el-tabs>
  </yun-drawer>
</template>
<script lang="jsx" setup>
import { ref, computed, reactive, watch, h } from 'vue';
import { InvoicingStatusMap, PaymentStatusMap } from '@/const/configEnum';
import { getInvoicingDetail } from '../api';

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

const emit = defineEmits(['update:visible']);

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
  console.log('res', res);
  state.detail = {
    ...rest,
    invoicingList: reserializeList(invoicingList || []),
    paymentList: reserializeList(paymentList || []),
  };
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
  },
  {
    label: '发票类型',
    prop: 'invoiceType',
    formatter: (row) => {
      const { invoiceType } = row;
      const item = invoiceTypeOpitons.find((v) => v.value === invoiceType);
      return item?.label;
    },
  },
  {
    label: '发票金额(含税)',
    prop: 'invoiceAmount',
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
  },
  {
    label: '发票图片',
    prop: 'file',
    'show-overflow-tooltip': false,
    render: ({ row }) => {
      return (
        <NhUploadAttachmentNew
          is-classify
          limit={1}
          tips={''}
          upload-file={row.file}
          disabled
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
  },
  {
    label: '关联流水号',
    prop: 'serialNumber',
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
  },
  {
    label: '单据图片',
    prop: 'file',
    'show-overflow-tooltip': false,
    render: ({ row }) => {
      return (
        <NhUploadAttachmentNew
          is-classify
          limit={1}
          tips={''}
          upload-file={row.file}
          disabled
        />
      );
    },
  },
];

watch(visible2, (v) => {
  if (v) {
    fetchDetail(props.data);
  }
});
</script>
<style lang="scss" scoped></style>
