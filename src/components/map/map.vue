<template>
  <div class="home_div">
    <div>
      <!-- <div class="item">
        <span class="label">统一站点名称: </span>
        <span class="value">{{ state.form.name }}</span>
      </div> -->
      <div class="item">
        <span class="label">站点详细地址: </span>
        <span class="value">{{ state.form.keywords }}</span>
      </div>
      <div class="item">
        <span class="label">站点经纬度: </span>
        <span class="value">{{ state.form.lng }},{{ state.form.lat }}</span>
      </div>
    </div>
    <div id="container" />
  </div>
</template>
<script lang="jsx">
import { reactive, onMounted, shallowRef, watchEffect } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { ElMessage } from 'element-plus';
import { MAP_KEY } from '@/const/index';
import { getAddressPoi } from '@/api/base';

export default {
  name: 'SiteMap',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
    },
  },
  emits: ['select'],
  setup(props, context) {
    const AMapRef = shallowRef(null);
    const map = shallowRef(null);
    const marker = shallowRef(null);
    const state = reactive({
      cityinfo: '', // IP定位城市
      resultList: [], // 搜索结果列表
      form: {
        name: '',
        lng: null,
        lat: null,
        keywords: '', // 搜索关键字
      },
      auto: null,
      placearch: null,
    });
    const clearMarker = () => {
      if (marker?.value) {
        marker.value.setMap(null);//清除标记点
        marker.value = null;
      }
    };
    const addMarker = ([lng, lat]) => {
      if (map.value && lng && lat) {
        clearMarker();
        marker.value = new AMapRef.value.Marker({
          position: [lng, lat],
        });
        marker.value.setMap(map.value);//设置标记点
        map.value.setCenter([lng, lat]);
      }
    };
    watchEffect(() => {
      state.form = props.data;
      const { lng, lat } = state.form; 
      addMarker([lng, lat]);
    });
    const remoteAddressMethod = async (query) => {
      const res = await getAddressPoi({ keywords: query });
      const { pois = [] } = res;
      const list = pois.map((item) => ({ ...item, cityCodeNew: `${item.adcode.slice(0, 4)}00` }));
      state.form.name = list && list.length ? list[0].name : '';
      context.emit('select', list[0], list);
    };
    // 根据经纬度查询地址
    const regeoCode = () => {
      let geocoder;
      const lnglat = [state.form.lng, state.form.lat];
      map.value.plugin(['AMap.Geocoder'], () => {
        geocoder = new AMapRef.value.Geocoder({
          radius: 1000,
          city: '010',
        });
        // 逆地理编码
        geocoder.getAddress(lnglat, (status, result) => {
          if (status === 'complete' && result.regeocode) {
            const address = result.regeocode.formattedAddress;
            state.form.keywords = address;
            remoteAddressMethod(address);
          } else {
            ElMessage('根据经纬度查询地址失败');
          }
        });
      });
    };
    const initAMap = () => {
      AMapLoader.load({
        key: MAP_KEY, // 设置您的key，在高德地图申请，不要用我的
        version: '2.0',
        plugins: ['AMap.ToolBar', 'AMap.Driving'],
      })
        .then((AMap) => {
      AMapRef.value = AMap;
      map.value = new AMap.Map('container');
      // 添加地图点击事件
      const clickHandler = function (e) {
        if (props.disabled) return;
        if (marker?.value) {
          map.value.remove(marker.value);
        }
        marker.value = new AMap.Marker({
          position: [e.lnglat.getLng(), e.lnglat.getLat()], // 位置
        });
        map.value.add(marker.value); // 添加到地图
        state.form.lng = e.lnglat.getLng();
        state.form.lat = e.lnglat.getLat();
        // 根据经纬度查询地址
        regeoCode();
      };
      // 初始化添加标记
      const { lng, lat } = state.form;
      if (lng && lat) {
        marker.value = new AMap.Marker({
          position: [lng, lat], // 位置
        });
        map.value.setCenter([state.form.lng, state.form.lat]);
      }
      // 绑定事件
      map.value.on('click', clickHandler);
      })
      .catch((e) => {
        console.log(e);
      });
    };
    onMounted(() => {
      initAMap();
    });
    return {
      state,
    };
  },
};
</script>
<style scoped>
.home_div {
  margin: 0px;
  width: calc(100% - 40px);
  height: 400px;
  position: relative;
  /* margin-left: 200px; */
  border: 1px solid #ccc;
  padding: 0 20px;
  overflow: hidden;
}
.item {
  line-height: 1.5em;
}

#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
}

.map_title {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 50px;
  background-color: rgba(27, 25, 27, 0.884);
}

h3 {
  position: absolute;
  left: 10px;
  z-index: 2;
  color: white;
}
</style>
