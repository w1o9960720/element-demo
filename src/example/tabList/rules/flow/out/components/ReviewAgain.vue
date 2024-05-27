<template>
  <div class="table-box">
    <div class="table-box-header">
      <div>是否区分越库</div>
      <div>是否区分温层</div>
      <div>是否包含多订单</div>
      <div>是否需要复核</div>
    </div>
    <div>
      <div
        v-for="(re, index) in cascader"
        :key="index"
        class="crossDocking-box"
      >
        <el-select
          v-show="re.checked === chooseAll"
          v-model="re.checked"
          placeholder="请选择"
          :disabled="pageType === PAGE_TYPE.VIEW"
          @change="
            (val) => {
              chooseChange(val, cascader, crossDocking);
            }
          "
        >
          <el-option
            v-for="item in crossDocking"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-show="re.checked !== chooseAll && re.checked !== ''"
          v-model="re.checked"
          placeholder="请选择"
          :disabled="pageType === PAGE_TYPE.VIEW"
          @change="
            (val) => {
              chooseChange(val, cascader, crossDocking);
            }
          "
        >
          <el-option
            v-for="item in crossDocking"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div>
          <div
            v-for="(re1, index1) in re.children"
            :key="index1"
            class="temperatureLayer-box"
          >
            <el-select
              v-show="re1.checked === chooseAll"
              v-model="re1.checked"
              placeholder="请选择"
              :disabled="pageType === PAGE_TYPE.VIEW"
              @change="
                (val) => {
                  chooseChange(val, re.children, temperatureLayer);
                }
              "
            >
              <el-option
                v-for="item in temperatureLayer"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-show="re1.checked !== chooseAll && re1.checked !== ''"
              v-model="re1.checked"
              placeholder="请选择"
              :disabled="pageType === PAGE_TYPE.VIEW"
              @change="
                (val) => {
                  chooseChange(val, re.children, temperatureLayer);
                }
              "
            >
              <el-option
                v-for="item in temperatureLayer"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <div>
              <div
                v-for="(re2, index2) in re1.children"
                :key="index2"
                class="multiOrderType-box"
              >
                <el-select
                  v-show="re2.checked === chooseAll"
                  v-model="re2.checked"
                  placeholder="请选择"
                  :disabled="pageType === PAGE_TYPE.VIEW"
                  @change="
                    (val) => {
                      chooseChange(val, re1.children, multiOrderType);
                    }
                  "
                >
                  <el-option
                    v-for="item in multiOrderType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-checkbox
                  v-show="re2.checked === chooseAll"
                  v-model="re2.checking"
                  class="sorting-box"
                  :disabled="pageType === PAGE_TYPE.VIEW"
                  @change="currentValue"
                >
                  启用
                </el-checkbox>
                <el-select
                  v-show="re2.checked !== chooseAll && re2.checked !== ''"
                  v-model="re2.checked"
                  placeholder="请选择"
                  :disabled="pageType === PAGE_TYPE.VIEW"
                  @change="
                    (val) => {
                      chooseChange(val, re1.children, multiOrderType);
                    }
                  "
                >
                  <el-option
                    v-for="item in multiOrderType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-checkbox
                  v-show="re2.checked !== chooseAll && re2.checked !== ''"
                  v-model="re2.checking"
                  class="sorting-box"
                  :disabled="pageType === PAGE_TYPE.VIEW"
                  @change="currentValue"
                >
                  启用
                </el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  crossDocking,
  temperatureLayer,
  multiOrderType,
  enableShutdownState,
  chooseAll,
} from './constant';
import { PAGE_TYPE } from '../../constant';

export default {
  props: {
    pageType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      PAGE_TYPE,
      crossDocking,
      temperatureLayer,
      multiOrderType,
      enableShutdownState,
      chooseAll,
      formData: [],
      cascader: [],
      checkedList: [],
      finalResult: [],
      rules: {},
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    onOpen(data) {
      this.formData = data;
      if (this.formData && this.formData.length > 0) {
        this.initPage();
      }
    },
    init() {
      const multiOrderData = this.buildMultiOrderType(this.multiOrderType);
      const newBuildData = this.buildTempAndOrder(this.temperatureLayer, multiOrderData);
      const endBuildData = this.buildCrossDockingAndTemperatureLay(this.crossDocking, newBuildData);
      this.cascader = endBuildData;
      this.resetData(this.cascader);
    },
    initPage() {
      this.clearAll(this.cascader);
      this.formData.forEach((res) => {
        this.resultCrossDocking({ ...res }, this.cascader);
      });
      this.finalResult = this.formData;
      this.$emit('changeConfigRecheck', this.finalResult);
    },
    resultCrossDocking(data, list) {
      list.forEach((item) => {
        if (data.crossDocking === item.value) {
          const newItem = item;
          newItem.checked = item.value;
          this.resultTemperatureLayer({ ...data }, item.children);
        }
      });
    },
    resultTemperatureLayer(data, list) {
      list.forEach((item) => {
        if (data.temperatureLayer === item.value) {
          const newItem = item;
          newItem.checked = item.value;
          this.resuleMultiOrderType({ ...data }, item.children);
        }
      });
    },
    resuleMultiOrderType(data, list) {
      list.forEach((item) => {
        if (data.multiOrderType === item.value) {
          const newItem = item;
          newItem.checked = item.value;
          newItem.checking = data.checking || false;
        }
      });
    },
    buildMultiOrderType(multiOrder) {
      const buildData = multiOrder.map((item) => ({
        ...item,
        checked: '',
        checking: false,
      }));
      return buildData;
    },
    buildTempAndOrder(temperatureLayerList, multiOrderTypeList) {
      const buildData = temperatureLayerList.map((item) => ({
        ...item,
        checked: '',
        children: [...multiOrderTypeList],
      }));
      return buildData;
    },
    buildCrossDockingAndTemperatureLay(crossDockingList, newBuildData) {
      const buildData = crossDockingList.map((item) => ({
        ...item,
        checked: '',
        children: JSON.parse(JSON.stringify(newBuildData)),
      }));
      return buildData;
    },
    // 选择改变
    chooseChange(val, cascader, contrast) {
      if (val === this.chooseAll) {
        this.clearAll(cascader);
        const onClearData = cascader;
        this.resetData(onClearData);
      } else {
        this.ChooseElse(cascader, contrast);
      }
      this.currentValue();
    },
    resetData(options) {
      const newOptions = options;
      newOptions[0].checked = this.chooseAll;
      if (options[0].children) {
        this.resetData(options[0].children);
      }
    },
    // 清除当前列表下所有选择逻辑
    clearAll(options) {
      options.forEach((item) => {
        const NewItem = item;
        NewItem.checked = '';
        if (item.children) {
          this.clearAll(NewItem.children);
        }
      });
    },
    // 选择其他逻辑
    ChooseElse(options, contrast) {
      options.forEach((item, index) => {
        const NewItem = item;
        if (index === 0) {
          NewItem.checked = '';
          if (NewItem.children) {
            this.clearAll(NewItem.children);
          }
        } else {
          NewItem.checked = contrast[index].value;
          if (NewItem.children) {
            this.resetData(NewItem.children);
          }
        }
      });
    },
    // 计算当前数组值
    currentValue() {
      this.checkedList = [];
      this.changeCheckedList(this.cascader, this.checkedList);
      this.ArraySplicing();
    },
    changeCheckedList(options, list) {
      options.forEach((item) => {
        if (item.checked) {
          const resultData = {
            checked: item.checked,
            children: [],
          };
          if (item.children) {
            this.changeCheckedList(item.children, resultData.children);
          } else {
            resultData.checking = item.checking;
          }
          list.push(resultData);
        }
      });
    },
    ArraySplicing() {
      this.finalResult = [];
      this.treeDataToCompressed(this.checkedList);
      this.$emit('changeConfigRecheck', this.finalResult);
    },
    treeDataToCompressed(source) {
      source.forEach((cross) => {
        cross.children.forEach((temperature) => {
          temperature.children.forEach((multiOrder) => {
            const data = {
              crossDocking: cross.checked,
              temperatureLayer: temperature.checked,
              multiOrderType: multiOrder.checked,
              checking: multiOrder.checking,
            };
            this.finalResult.push(data);
          });
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.table-box-header {
  display: flex;
  align-items: center;
  div {
    width: 220px;
    padding: 5px 0;
    text-align: center;
  }
}
.crossDocking-box {
  display: flex;
  align-items: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  ::v-deep .el-select {
    width: 230px;
  }
}
.temperatureLayer-box {
  display: flex;
  align-items: center;
}
.multiOrderType-box {
  display: flex;
  align-items: center;
}
.sorting-box {
  margin-left: 30px;
}
</style>
