import { ElMessage } from "element-plus";
import { useStorage } from "@vueuse/core";
export default ({
  visible,
  visible1,
  item,
  formData,
  page,
  forme,
  tableList,
}) => {
  const handlecomfims = (val) => {
    console.log("val: ", val);
  };
  const handlecomfimss = (val) => {
    const { id } = val;
    let index = tableList.value.findIndex((item) => item.id === val.id);
    if (index < 0) {
      tableList.value.push({ ...val, id: `${Math.random()}` });
    } else {
      tableList.value.splice(index, 1, val);
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
    visible1.value = true;
    item.value = row;
  };
  const handleDelete = (row) => {
    let index = tableList.value.findIndex((item) => item.id === row.id);
    tableList.value.splice(index, 1);
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
  const handleSelect = (e) => {
    console.log("e: ", e);
    console.log("formData.card ", formData.card);
  };
  const querySearchAsync = (qurey, cb) => {
    console.log("qurey: ", qurey);
    let option = [
      { value: "vue", link: "https://github.com/vuejs/vue" },
      { value: "element", link: "https://github.com/ElemeFE/element" },
      { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
      { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
      { value: "vuex", link: "https://github.com/vuejs/vuex" },
      { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
      { value: "babel", link: "https://github.com/babel/babel" },
    ];
    let res = qurey
      ? option.filter((item) => {
          return item.value.toLowerCase().indexOf(qurey.toLowerCase()) === 0;
        })
      : option;
    setTimeout(() => {
      cb(res);
    }, 200);
  };
  return {
    handlecomfims,
    handlecomfimss,
    handleadd,
    handleDelete,
    handlefocus,
    handleDetail,
    handleSelect,
    querySearchAsync,
    handleEidt,
    handlesearch,
  };
};
