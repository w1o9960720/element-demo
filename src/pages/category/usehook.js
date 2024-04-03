import { ElMessage } from "element-plus";
import { list } from "postcss";

export default ({
  visible,
  visible1,
  item,
  formData,
  page,
  forme,
  activeName,
  List,
  tableData,
}) => {
  const handlecomfims = (val) => {
    console.log("val: ", val);
  };
  const handlecomfimss = (val) => {
    const { id } = val;
    let index = List.value.findIndex((item) => item.id === val.id);
    if (index < 0) {
      List.value.push({ ...val, id: `${Math.random()}` });
    } else {
      List.value.splice(index, 1, val);
    }
  };
  const handleadd = () => {
    const data = {
      id: null,
      level: activeName.value,
    };
    forme.value.show(data);
  };
  const queryData = (List) => {
    return new Promise((resolve, reject) => {
      let data = [];
      data = (List.value || []).filter(
        (item) => item.level === activeName.value
      );
      setTimeout(() => {
        resolve(data);
      }, 400);
    }).catch(() => {});
  };

  const handlefocus = () => {
    visible.value = true;
  };
  const handleEidt = (row) => {
    forme.value.show(row);
  };
  const handleDetail = (row) => {
    visible1.value = true;
    item.value = row;
  };
  const handleDelete = (row) => {
    let index = List.value.findIndex((item) => item.id === row.id);
    Liste.value.splice(index, 1);
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
  const handleEdit = (type) => {
    if (type === "query") {
      tableData.value = List.value.filter(
        (item) => item.brand === formData.brand && item.level === activeName.value
      );
      console.log("tableData.value: ", tableData.value);
    } else {
      formData.brand = "";
      formData.time = "";
    }
  };
  return {
    handleEdit,
    handlecomfims,
    handlecomfimss,
    handleadd,
    handleDelete,
    handlefocus,
    handleDetail,
    handleEidt,
    handlesearch,
    queryData,
  };
};
