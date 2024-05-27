<template>
  <yun-drawer
    v-model="visible2"
    title="操作记录"
    :show-confirm-button="false"
    :cancel-button-text="'取消'"
  >
    <div class="dialog_content">
      <div class="log-wrapper">
        <div v-if="logInfo.length > 0">
          <div
            v-for="item in logInfo"
            :key="item.id"
            class="log-item-box"
          >
            <div class="log-time">
              {{ item.operateTime }}
            </div>
            <div class="log-item active">
              <div class="item-meg">
                <p style="color: #a8a8a8">操作人：{{ item.operateName }}</p>
                <p style="color: #a8a8a8">操作类型：{{ showType(item) }}</p>
                <p style="color: #a8a8a8">操作内容：{{ showContent(item) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <b>暂无操作记录</b>
        </div>
      </div>
    </div>
  </yun-drawer>
</template>

<script setup lang="jsx">
import { ref, watch, computed } from 'vue';
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

const logInfo = ref([]);

const showType = (item) => {
  const { operateType, operateContent } = item;
  const Type = {
    INVOICING: '开票',
    PAYMENT: '回款',
  };
  const Content = {
    ADD_INVOICING: '新增',
    DEL_INVOICING: '删除',
    ADD_PAYMENT: '新增',
    DEL_PAYMENT: '删除',
  };
  return `${Type[operateType] || ''}${Content[operateContent] || ''}`;
};
const showContent = (item) => {
  const { operateType, invoiceNo, paymentTime, invoicedAmount, serialAmount } = item;
  if (operateType === 'INVOICING') {
    return `发票号码：${invoiceNo || ''}, 已关联发票金额(含税)：${invoicedAmount || ''}`;
  } else {
    return `回款时间：${paymentTime || ''}, 回款金额：${serialAmount || ''}`;
  }
};

const fetchData = async () => {
  logInfo.value = [];
  const { data } = props;
  const res = await getInvoicingDetail(data);
  logInfo.value = res?.logList;
};
watch(visible2, (v) => {
  if (v) {
    fetchData();
  }
});
</script>
<style lang="scss" scope>
.log-wrapper {
  font-size: 12px;
  margin: 11px 11px 11px 0;
  .log-item-box {
    margin-left: 10px;
    .log-time {
      float: left;
      line-height: 20px;
    }
    .log-item {
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: 0 10px 10px 40px;
      padding-bottom: 0;
      & > .item-meg {
        color: #333 !important;
        line-height: 20px;
        padding: 0 10px 20px 20px;
        border-left: 1px dotted #a8a8a8;
      }
      &::before {
        z-index: 1;
        content: '';
        left: 31px;
        position: absolute;
        width: 20px;
        height: 20px;
      }
      &.active {
        & > .item-meg {
          padding-left: 40px;
          & > .item-status {
            color: #666;
            margin-right: 10px;
          }
          & > .item-meg-cont {
            /*color:#00af66;*/
            color: #666;
          }
        }
      }
    }
    &:last-child .log-item .item-meg {
      border-left: none;
    }
    &:first-child .log-item::before {
      z-index: 1;
      content: '';
      left: 31px;
      position: absolute;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
