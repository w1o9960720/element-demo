import { ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { InvoicingStatusMap, PaymentStatusMap, transOptionsByMap } from '@/const/configEnum';
import { BusinessTypeEnum, AccountTypeEnum } from '@/views/bms/settle/constant';
import { getInvoicingPage } from '../api';

export default () => {
  const route = useRoute();

  const page = ref({
    page: 1,
    total: 0,
    size: 10,
  });
  const proTableRef = ref(null);

  // 模态框
  const visible = ref(false);

  const state = reactive({
    info: {},
  });

  const visibleDetail = ref(false);
  const showDetail = (row) => {
    visibleDetail.value = true;
    state.info = row;
  };

  const tableColumns = computed(() => [
    {
      type: 'index',
      prop: 'index',
      width: '60px',
      fixed: 'left',
    },
    {
      label: '操作',
      prop: 'action',
      'show-overflow-tooltip': false,
      width: '160px',
      fixed: 'left',
    },
    {
      label: '账单名称',
      prop: 'billName',
    },
    {
      label: '账单编号',
      prop: 'billNo',
      render: ({ row }) => {
        return (
          <el-link
            type="primary"
            onClick={() => showDetail(row)}
          >
            {row.billNo}
          </el-link>
        );
      },
    },
    {
      label: '收款方',
      prop: 'recvName',
    },
    {
      label: '付款方',
      prop: 'payName',
    },
    {
      label: '应收金额(含税)',
      prop: 'billAmount',
      width: '120px',
    },
    {
      label: '开票状态',
      prop: 'invoicingStatus',
      formatter: (row) => {
        const { invoicingStatus } = row;
        return InvoicingStatusMap[invoicingStatus] || '-';
      },
    },
    {
      label: '已开票金额(含税)',
      prop: 'invoicedAmount',
      width: '140px',
    },
    {
      label: '待开票金额(含税)',
      prop: 'notInvoicedAmount',
      width: '140px',
    },
    {
      label: '回款状态',
      prop: 'paymentStatus',
      formatter: (row) => {
        const { paymentStatus } = row;
        return PaymentStatusMap[paymentStatus] || '-';
      },
    },
    {
      label: '回款金额',
      prop: 'paymentAmount',
    },
    {
      label: '账单月份',
      prop: 'billDate',
    },
    {
      label: '账单生成时间',
      prop: 'createTime',
      width: '160px',
      formatter: (row) => {
        const { createTime } = row;
        return createTime ? dayjs(createTime).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
    },
    {
      label: '创建人',
      prop: 'createUserName',
    },
  ]);

  const searchFieldsCreate = (accountType) => [
    {
      label: '账单名称',
      prop: 'billName',
      component: 'el-input',
      componentAttrs: {
        placeholder: '请输入',
      },
      colAttrs: {
        span: 8,
      },
    },
    {
      label: '账单编号',
      prop: 'billNo',
      component: 'el-input',
      componentAttrs: {
        placeholder: '请输入',
      },
      colAttrs: {
        span: 8,
      },
    },
    {
      isShow: () => {
        return accountType === 'out';
      },
      label: '付款方',
      prop: 'payName',
      component: 'el-input',
      componentAttrs: {
        placeholder: '请输入',
      },
      colAttrs: {
        span: 8,
      },
    },
    {
      isShow: () => {
        return accountType === 'in';
      },
      label: '收款方',
      prop: 'recvName',
      component: 'el-input',
      componentAttrs: {
        placeholder: '请输入',
      },
      colAttrs: {
        span: 8,
      },
    },
    {
      label: '开票状态',
      prop: 'invoicingStatus',
      component: 'el-select',
      componentAttrs: {
        placeholder: '请选择',
        clearable: true,
        style: {
          width: '100%',
        },
      },
      subComponent: 'el-option',
      options: transOptionsByMap(InvoicingStatusMap, 'string'),
      colAttrs: {
        span: 8,
      },
    },
    {
      label: '回款状态',
      prop: 'paymentStatus',
      component: 'el-select',
      componentAttrs: {
        placeholder: '请选择',
        clearable: true,
        style: {
          width: '100%',
        },
      },
      subComponent: 'el-option',
      options: transOptionsByMap(PaymentStatusMap, 'string'),
      colAttrs: {
        span: 8,
      },
    },
    {
      label: '账单生成时间',
      prop: 'time',
      component: 'el-date-picker',
      colAttrs: {
        lg: 12,
        md: 12,
        sm: 12,
        xl: 12,
        xs: 12,
      },
      componentAttrs: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'datetimerange',
        format: 'YYYY-MM-DD HH:mm:ss',
        valueFormat: 'x',
        clearable: true,
      },
    },
  ];

  function setReqData(searchData) {
    const {
      params: { accountType, businessType },
    } = route;
    const { time, ...restParasm } = searchData;
    const data = {
      ...restParasm,
    };
    if (time && time.length) {
      const [startTime, endTime] = time || [];
      data.startTime = dayjs(startTime).format('YYYY-MM-DD HH:mm:ss');
      data.endTime = dayjs(endTime).format('YYYY-MM-DD HH:mm:ss');
    }
    return {
      ...data,
      businessType: BusinessTypeEnum[businessType],
      accountType: AccountTypeEnum[accountType],
    };
  }

  // 模拟请求
  const remoteMethod = async ({ searchData, pagination }) => {
    // eslint-disable-next-line no-shadow
    const { size, page } = pagination;
    const data = setReqData(searchData);
    const res = await getInvoicingPage({ ...data, page, size });
    return res || {};
  };

  return {
    proTableRef,
    page,
    searchFieldsCreate,
    tableColumns,
    remoteMethod,
    visible,
    state,
    visibleDetail,
  };
};
