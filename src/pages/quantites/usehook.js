import { ElMessage } from "element-plus";

export default ({
  visible,
  visible1,
  item,
  formData,
  page,
  forme,
  tableList,
  router
}) => {
  const handlecomfims = (val) => {
    console.log("val: ", val);
  };
  const handlecomfimss = (val) => {
    const { id } = val;
    let index = tableList.findIndex((item) => item.id === val.id);
    if (index < 0) {
      tableList.push({ ...val, id: `${Math.random()}` });
    } else {
      tableList.splice(index, 1, val);
    }
  };
  const handleadd = () => {
    forme.value.show();
  };
  const handlefocus = () => {
    visible.value = true;
  };
  const handleEidt = (row) => {
    forme.value.show(row);
  };
  const handleDetail = (row) => {
    // visible1.value = true;
    // item.value = row;
    console.log("router: ", router);
    router.push({
      path: "/home/quantites/detail",
      id: row.id,
    });
  };
  const handleDelete = (row) => {
    let index = tableList.findIndex((item) => item.id === row.id);
    tableList.splice(index, 1);
    ElMessage({
      message: "删除成功",
      type: "success",
    });
  };
  const handlesearch = (page, size) => {
    console.log("page: ", page, size);
    // page.page = page;
    // page.size = size;
  };
  return {
    handlecomfims,
    handlecomfimss,
    handleadd,
    handleDelete,
    handlefocus,
    handleDetail,
    handleEidt,
    handlesearch,
  };
};
