<template>
  <el-form
    ref="shipperForm"
    class="search-form"
    :inline="true"
    :model="form"
    label-width="100px"
  >
    <el-row>
      <el-col :span="6">
        <el-form-item label="用户姓名：">
          <el-input
            v-model="form.realName"
            placeholder="请输入用户姓名"
            @keyup.enter="fetchData"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="手机号码：">
          <el-input
            v-model="form.mobile"
            placeholder="请输入手机号码"
            @keyup.enter="fetchData"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <div class="search-btns">
      <div class="form-btns">
        <el-button
          class="form-btn"
          @click.prevent="resetData()"
        >
          重置
        </el-button>
        <el-button
          class="form-btn"
          type="primary"
          @click.prevent="fetchData"
        >
          查询
        </el-button>
        <el-button
          class="form-btn"
          type="primary"
          @click.prevent="disassociate"
        >
          取消关联
        </el-button>
        <el-button
          class="form-btn"
          type="primary"
          @click.prevent="associatedUsers"
        >
          关联用户
        </el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'ListFilter',
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    fetchData() {
      this.$emit('fetchData');
    },
    // 关联用户
    associatedUsers() {
      this.$emit('associatedUsers');
    },
    // 取消关联
    disassociate() {
      this.$emit('disassociate');
    },
    // 重置
    resetData() {
      this.$emit('resetData');
    },
  },
};
</script>

<style lang="scss" scoped>
.search-btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .moreData {
    font-size: 12px;
    color: #059e84;
    &:hover {
      cursor: pointer;
    }
  }
}
.search-form ::v-deep {
  .el-col {
    .el-form-item {
      width: 100%;
      .el-form-item__content {
        width: calc(100% - 100px);
        .el-select {
          width: 100%;
        }
      }
    }
  }
}
</style>
