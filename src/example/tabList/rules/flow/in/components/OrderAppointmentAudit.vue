<template>
  <div>
    <list-block>
      <el-form
        ref="formData"
        :rules="rules"
        :inline="true"
        :model="formData"
      >
        <h4>客户单审核：</h4>
        <el-row>
          <el-form-item
            label="接收订单审核:"
            prop="isAudit"
          >
            <el-radio-group v-model="formData.isAudit" :disabled="pageType ===PAGE_TYPE.VIEW">
              <el-radio
                v-for="item in useBooleanState"
                :key="item.value"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
    </list-block>
  </div>
</template>

<script>
import ListBlock from '@/components/ListBlock/index.vue';
import { useBooleanState } from './constant';
import { PAGE_TYPE } from '../../constant';

export default {
  components: {
    ListBlock,
  },
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
    pageType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      PAGE_TYPE,
      useBooleanState,
      rules: {
        isAudit: [
          { required: true, message: '请选择', trigger: 'change' },
        ],
      },
    };
  },
  methods: {
    validateForm() {
      return this.$refs.formData.validate();
    },
  },
};
</script>
