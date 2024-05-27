<template>
  <div>
    <list-block>
      <el-form
        ref="formData"
        :rules="rules"
        :inline="true"
        :model="formData"
      >
        <h4>到货登记配置：</h4>
        <el-row>
          <el-form-item
            label="是否启用到货登记:"
            prop="isCheckIn"
          >
            <el-radio-group
              v-model="formData.isCheckIn"
              :disabled="pageType === PAGE_TYPE.VIEW"
            >
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
        <div v-if="formData.isCheckIn">
          <h4>任务配置：</h4>
          <TaskAllocation
            :table-data="formData.taskFlows"
            :page-type="pageType"
          />
        </div>
      </el-form>
    </list-block>
  </div>
</template>

<script>
import ListBlock from '@/components/ListBlock/index.vue';
import { useBooleanState } from './constant';
import { PAGE_TYPE } from '../../constant';
import TaskAllocation from './TaskAllocation.vue';

export default {
  components: {
    ListBlock,
    TaskAllocation,
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
        isCheckIn: [{ required: true, message: '请选择', trigger: 'change' }],
        isAssignDock: [{ required: true, message: '请选择', trigger: 'change' }],
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
