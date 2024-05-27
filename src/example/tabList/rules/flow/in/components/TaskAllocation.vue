<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%; margin-top: 10px"
    >
      <el-table-column
        prop="isEnabled"
        label="是否启用"
        align="center"
      >
        <template v-slot:default="scope">
          <el-checkbox
            v-model="scope.row.isEnabled"
            :disabled="
              scope.row.taskType === 'ACCEPTANCE' ||
              scope.row.taskType === 'UPPER_SHELF' ||
              pageType === 'VIEW'
            "
            @change="changeCheckbox($event, scope.row)"
          >
            启用
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="taskType"
        label="任务"
        align="center"
      >
        <template v-slot:default="scope">
          <span>{{ taskFields[scope.row.taskType] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="roles"
        label="角色"
        align="center"
      />
      <el-table-column
        prop="isBlockNextTask"
        label="是否阻塞任务生成"
        width="150"
        align="center"
      >
        <template v-slot:default="scope">
          <el-checkbox
            v-model="scope.row.isBlockNextTask"
            :disabled="!scope.row.isEnabled || pageType === 'VIEW'"
          >
            是
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="isBlockNextFlow"
        label="是否阻塞节点流转"
        width="150"
        align="center"
      >
        <template v-slot:default="scope">
          <el-checkbox
            v-model="scope.row.isBlockNextFlow"
            :disabled="
              !scope.row.isEnabled ||
              scope.row.taskType === 'ACCEPTANCE' ||
              scope.row.taskType === 'UPPER_SHELF' ||
              pageType === 'VIEW'
            "
          >
            是
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        prop="timeoutThreshold"
        label="超时提醒(H)"
        align="center"
      />
      <el-table-column
        prop="taskFields"
        label="任务属性"
        align="center"
      >
        <template v-slot:default="scope">
          <div
            v-if="scope.row.taskFields.length > 0"
            class="cellBox"
          >
            <td
              v-for="(item, index) in scope.row.taskFields"
              :key="index"
              style="text-align: center; flex: 1"
              :style="{
                border: scope.row.taskFields.length > 1 ? '' : 0,
                borderRight: 0,
                borderBottom: index === scope.row.taskFields.length - 1 ? 0 : '',
              }"
            >
              {{ item.label }}
            </td>
          </div>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="taskFields"
        label="是否必填"
        align="center"
      >
        <template v-slot:default="scope">
          <div
            v-if="scope.row.taskFields.length > 0"
            class="cellBox"
          >
            <td
              v-for="(item, i) in scope.row.taskFields"
              :key="item.prop"
              style="display: block; text-align: center"
              :style="{
                border: scope.row.taskFields.length > 1 ? '' : 0,
                borderRight: 0,
                borderBottom: i === scope.row.taskFields.length - 1 ? 0 : '',
              }"
            >
              <el-checkbox
                v-model="item.required"
                :disabled="!scope.row.isEnabled || pageType === 'VIEW'"
              >
                是
              </el-checkbox>
            </td>
          </div>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="taskDesc"
        label="任务描述"
        align="center"
        width="200"
      >
        <template v-slot:default="scope">
          <div
            v-if="scope.row.taskFields.length > 0"
            class="cellBox"
          >
            <td
              v-for="(item, i) in scope.row.taskFields"
              :key="item.prop"
              style="display: block; text-align: center"
              :style="{
                border: scope.row.taskFields.length > 1 ? '' : 0,
                borderRight: 0,
                borderBottom: i === scope.row.taskFields.length - 1 ? 0 : '',
              }"
            >
              {{ item.desc }}
            </td>
          </div>
          <span v-else-if="scope.row.taskDesc">{{ scope.row.taskDesc }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    colRows: {
      type: Boolean,
      default: true,
    },
    pageType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      taskFields: {
        ARRIVAL_REGISTRATION: '到货登记任务',
        QUALITY_INSPECTION: '质检任务',
        ACCEPTANCE: '到货验收任务',
        ACCEPT_UNLOADING_GOODS: '卸货任务',
        UPPER_SHELF: '上架任务',
      },
    };
  },
  methods: {
    changeCheckbox(e, Row) {
      const row = Row;
      if (!e) {
        row.isBlockNextFlow = false;
        row.isBlockNextTask = false;
        if (row.taskFields.length > 0) {
          row.taskFields.forEach((item) => {
            const i = item;
            i.required = false;
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cellBox {
  display: flex;
  flex-direction: column;
}
</style>
