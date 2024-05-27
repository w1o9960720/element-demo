<template>
  <yun-filter
    v-model="searchForm"
    :fields="SEARCH_FIELD"
    clearable
    @submit="handleSearch"
    @reset="handleSearch"
  >
    <template #taskType>
      <el-select
        v-model="searchForm.taskType"
        filterable
        clearable
      >
        <el-option
          v-for="(value, key) in TaskTypeTextOptions"
          :key="key"
          :label="value"
          :value="key"
        />
      </el-select>
    </template>
    <template #bizType>
      <el-select
        v-model="searchForm.bizType"
        filterable
        clearable
      >
      
        <el-option
          v-for="item in BIZ_TYPE"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
  </yun-filter>
  <div style="padding: 0 24px">
    <yun-table
      v-model:pagination="pagination"
      :loading="loading.getMyDoneList"
      :data="myDoneList"
      :columns="TABLECOLUMN"
      :default-sort="sort"
      size="default"
      show-table-setting
      :table-header-key="$route.path"
      :height="tableHeight"
      @sort-change="handleSortChange"
      @update:pagination="getMyDoneList"
    >
      <template #taskNo="{ row }">
        <nh-link
          to=""
          :text="row.taskNo"
          @click="handleShowDetailDialog(row)"
        />
      </template>
    </yun-table>
  </div>
  <TaskDetail ref="taskDetail" />
  <CustomDetail ref="customDetailEl" />
  <TaskDrawer ref="taskDrawerEl" />
  <ExWarehouseQa ref="exWarehouseQaEl" />
  <QualityInspection ref="qualityInspectionEl" />
  <PageDetail ref="pageDetailEl" />
  <Exception ref="exceptionEl" />
</template>
<script>
import TaskCenter from '@/const/pageNames/taskCenter';
import { TaskTypeTextOptions } from '@/const/task';
import useTableHeight from '@/hooks/useTableHeightResize';
import { ORDER_TYPE, ORDER_TYPE_MAP, NO_SPACE_FIELD } from '../constant';
import { BIZ_TYPE } from '../task-management/constant';
import { detailsTask } from '../task-management/config';
import { TABLECOLUMN, SEARCH_FIELD } from './fileds';
import { getDoneList } from './api';
import TaskDetail from '../task-management/detail/index.vue';
import TaskDrawer from '../task-management/components/TaskDrawer/index.vue';
import ExWarehouseQa from '../task-management/components/ExWarehouseQa/index.vue';
import CustomDetail from '../task-management/detail/customDetail.vue';
import QualityInspection from '../task-management/detail/QualityInspection/QualityInspection.vue';
import PageDetail from '../task-management/detail/pageDetail.vue';
import Exception from '../task-management/components/Details/Exception.vue';

export default {
  name: TaskCenter.DONE_LIST,
  components: {
    TaskDetail,
    TaskDrawer,
    ExWarehouseQa,
    CustomDetail,
    QualityInspection,
    PageDetail,
    Exception,
  },
  data() {
    return {
      TABLECOLUMN,
      SEARCH_FIELD,
      BIZ_TYPE,
      TaskTypeTextOptions,
      myDoneList: [],
      searchForm: {},
      loading: {
        getMyDoneList: false,
      },
      sort: {
        prop: 'endTime',
        order: 'descending',
      },
    };
  },
  watch: {
    searchForm: {
      handler(value) {
        this.delSpace(value);
      },
      deep: true,
    },
  },
  mounted() {
    this.getMyDoneList();
  },
  methods: {
    delSpace(formData) {
      NO_SPACE_FIELD.forEach((fieldName) => {
        if (formData[fieldName] && formData[fieldName].indexOf(' ') > -1) {
          this.searchForm[fieldName] = formData[fieldName].replace(/\s/g, '');
        }
      });
    },
    handleSearch() {
      this.pagination.page = 1;
      this.getMyDoneList();
    },
    handleSortChange({ prop, order }) {
      this.sort = {
        prop,
        order,
      };
      this.getMyDoneList();
    },
    async getMyDoneList() {
      const params = this.buildParams();
      const pagination = {
        page: this.pagination.page,
        size: this.pagination.size,
      };
      const resp = await getDoneList(
        {
          ...params,
          orderByColumn: ORDER_TYPE_MAP[this.sort.prop],
          orderBy: ORDER_TYPE[this.sort.order],
        },
        pagination,
      );
      this.myDoneList = resp.records;
      this.pagination.total = resp.total;
    },
    buildParams() {
      let useParams = this.searchForm;
      const endTimeRange = useParams.endTime;
      if (endTimeRange) {
        useParams = {
          ...useParams,
          startTime: endTimeRange[0],
          endTime: endTimeRange[1],
        };
      }
      return useParams;
    },
    handleShowDetailDialog(row) {
      if (detailsTask.has(row.taskType)) {
        detailsTask.get(row.taskType)(this, row);
      } else {
        detailsTask.get('default')(this, row);
      }
    },
  },
};
</script>
<script setup>
const { tableHeight } = useTableHeight();
</script>
<style scoped>
.action {
  padding: 15px 0;
}
</style>
