<template>
  <div class="o">

    <div class="swipe">
      <el-carousel :interval="3500"  height="450px">
        <el-carousel-item  v-for="item in imageList" :key="item">
          <img :style="{ width: '100% ', height: '100%' }" :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="echarts" style="margin-bottom: 8px">
      <lineCharts
        :option="option"
        :style="{ width: '100% ', height: '60vh' }"
      ></lineCharts>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { levelList as typeList } from "../firrst/constant";
import lineCharts from "./components/echarts.vue";
import img1 from "../../image/images/22c1c23f281e66b7036822d077e57bb338b1eead.jpg";
import img2 from "../../image/images/6112ea859d71c8cad5e51120f16eccdfaed1d450.jpg";
import img3 from "../../image/images/e4977430d619fd6a956d47541e5c80fb41b0fcd9.jpg";
let imageList = [img1, img2, img3];
let datainfo = reactive([]);
const formDom = ref(null);
let form = reactive({
  startTime: "",
  endTime: "",
  type: "",
});
let option = ref({});

const getDataApi = () => {
  return new Promise((reslove, reject) => {
    const { startTime, endTime, type } = form;
    let datainfo = [
      {
        level: "A",
        children: [
          {
            barnd: "桑塔纳",
            num: 250,
          },
          {
            barnd: "捷达",
            num: 300,
          },
        ],
      },
      {
        level: "B",
        children: [
          {
            barnd: "迈腾380",
            num: 900,
          },
          {
            barnd: "丰田凯美瑞",
            num: 700,
          },
          {
            barnd: "帕萨特330",
            num: 1100,
          },
        ],
      },
      {
        level: "C",
        children: [
          {
            barnd: "奥迪A6L",
            num: 300,
          },
          {
            barnd: "宝马530",
            num: 120,
          },
          {
            barnd: "奔驰E300L",
            num: 90,
          },
        ],
      },
      {
        level: "D",
        children: [
          {
            barnd: "奔驰S400L",
            num: 109,
          },
          {
            barnd: "奥迪A8L",
            num: 205,
          },
          {
            barnd: "宝马730i",
            num: 90,
          },
        ],
      },
    ];
    if (type) {
      if (type === "A") {
        datainfo = datainfo.filter((item) => item.level === type);
      } else if (type === "B") {
        datainfo = datainfo.filter((item) => item.level === type);
      } else if (type === "C") {
        datainfo = datainfo.filter((item) => item.level === type);
      } else if (type === "D") {
        datainfo = datainfo.filter((item) => item.level === type);
      }
    }
    setTimeout(() => {
      reslove(datainfo.map((item) => item.children).flat());
    }, 600);
  });
};
const handlereset = () => {
  form.startTime = "";
  form.endTime = "";
  form.type = "";
  getDataInfo();
};
const handlefilter = () => {
  getDataInfo();
};
const getDataInfo = async () => {
  datainfo = await getDataApi();
  // let params = {
  //   xAxis: {
  //     type: "category",
  //     boundaryGap: false,
  //     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //   },
  //   yAxis: {
  //     type: "value",
  //   },
  //   series: [
  //     {
  //       data: [820, 932, 901, 934, 1290, 1330, 1320],
  //       type: "line",
  //       areaStyle: {},
  //     },
  //   ],
  // };
  let params = {
    title: {
      text: "车辆销量",
    },
    tooltip: {},
    legend: {
      data: ["销量"],
    },
    xAxis: {
      data: datainfo.map(({ barnd }) => barnd),
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: datainfo.map(({ num }) => num),
      },
    ],
  };
  option.value = params;
};

onMounted(() => {
  getDataInfo();
});

onUnmounted(() => {});
</script>

<style lang="scss" scoped>
.o {
  height: 80vh;
  .echarts {
    // display: grid;
    // grid-template-columns: repeat(2, 1fr);
    // gap: 8px;
  }
}
</style>