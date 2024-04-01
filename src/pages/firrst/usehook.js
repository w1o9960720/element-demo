export default ({ visible, visible1, item, formData, page, isEdit }) => {
  const handlecomfims = (val) => {
    console.log("val: ", val);
  };
  const handlecomfimss = (val) => {
    console.log("val: ", val);
  };
  const handleadd = () => {
    visible1.value = true;
    isEdit.value = false;
  };
  const handlefocus = () => {
    visible.value = true;
  };
  const handleEidt = (row) => {
    visible1.value = true;
    item.value = row;
    isEdit.value = true;
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
    handlefocus,
    handleEidt,
    handlesearch,
  };
};
