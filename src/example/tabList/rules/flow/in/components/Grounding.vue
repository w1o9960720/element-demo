<template>
  <div>
    <list-block>
      <el-form
        ref="formData"
        :rules="rules"
        :inline="true"
        :model="formData"
      >
        <h4>上架配置：</h4>
        <el-row>
          <el-form-item
            label="是否需要确认上架数量:"
            prop="isConfirmPutawayAmount"
          >
            <el-radio-group
              v-model="formData.isConfirmPutawayAmount"
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
        <el-row>
          <el-form-item
            label="是否扫描上架库位的容器:"
            prop="isScanPutawayContainer"
          >
            <el-radio-group
              v-model="formData.isScanPutawayContainer"
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
        <!-- <el-row>
          <el-form-item
            label="是否整单回传:"
            prop="isEntireOrderNotify"
          >
            <el-radio-group
              v-model="formData.isEntireOrderNotify"
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
        </el-row> -->
        <div>
          <h4>任务配置：</h4>
          <TaskAllocation :table-data="formData.taskFlows" />
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
        isConfirmPutawayAmount: [{ required: true, message: '请选择', trigger: 'change' }],
        isScanPutawayContainer: [{ required: true, message: '请选择', trigger: 'change' }],
        isEntireOrderNotify: [{ required: true, message: '请选择', trigger: 'change' }],
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
