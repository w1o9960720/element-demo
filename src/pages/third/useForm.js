import { reactive, ref } from "vue";

export default () => {
  const form = ref(null);
  const forme = ref(null);
  const visible = ref(null);
  const visible1 = ref(null);

  const total = ref(100);
  const item = ref({});
  const formData = reactive({
    name: "",
    address: "",
    time: "",
    level: "",
    // file: [],
  });
  const page = reactive({
    page: "",
    size: "",
  });
  const rules = reactive({
    name: [{ required: true, message: "请填写货主名", trigger: "blur" }],
    address: [{ required: true, message: "请填写地址", trigger: "blur" }],
    time: [{ required: true, message: "请填写时间", trigger: "blur" }],
  });

  return {
    form,
    visible,
    visible1,
    total,
    item,
    rules,
    page,
    formData,
    forme,
  };
};
