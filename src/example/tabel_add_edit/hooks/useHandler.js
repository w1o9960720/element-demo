import { ElMessage } from 'element-plus';

export default ({ visible, initTable, state, visibleDetail }) => {
  // 新增
  const handleEdit = (row) => {
    visible.value = true;
    state.info = row;
  };

  const confirmHandler = (data, message) => {
    console.log('data', data);
    ElMessage({
      type: 'success',
      message: message || '操作成功',
    });
    initTable();
  };

  return {
    handleEdit,
    confirmHandler,
  };
};
