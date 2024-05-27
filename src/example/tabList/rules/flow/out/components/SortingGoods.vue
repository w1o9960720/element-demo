<template>
  <div>
    <div class="setcontainer">
      <span class="setBox">是否扫描分拣容器</span>
      <el-radio-group
        v-model="finalResult.needScanContainer"
        :disabled="pageType === PAGE_TYPE.VIEW"
        @change="changeRadio"
      >
        <el-radio :label="true"> 是 </el-radio>
        <el-radio :label="false"> 否 </el-radio>
      </el-radio-group>
    </div>
    <div>说明：针对与一个拣货容器中的货品的配置</div>
    <div class="table-box">
      <div class="table-box-header">
        <div>是否区分越库</div>
        <div>是否区分温层</div>
        <div>是否包含多订单</div>
        <div>是否启用分拣</div>
        <div>是否上分拣线</div>
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
                  <el-radio-group
                    v-show="re2.checked === chooseAll"
                    v-model="re2.sorting"
                    class="sorting-box"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                    @change="(val) => sortingChange(re2)"
                  >
                    <el-radio
                      v-for="item in sorting"
                      :key="item.value"
                      :label="item.value"
                    >
                      {{ item.label }}
                    </el-radio>
                  </el-radio-group>
                  <el-checkbox
                    v-show="re2.checked === chooseAll"
                    v-model="re2.autoSorting"
                    class="sorting-box"
                    :disabled="pageType === PAGE_TYPE.VIEW || !re2.sorting"
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
                  <el-radio-group
                    v-show="re2.checked !== chooseAll && re2.checked !== ''"
                    v-model="re2.sorting"
                    class="sorting-box"
                    :disabled="pageType === PAGE_TYPE.VIEW"
                    @change="(val) => sortingChange(re2)"
                  >
                    <el-radio
                      v-for="item in sorting"
                      :key="item.value"
                      :label="item.value"
                    >
                      {{ item.label }}
                    </el-radio>
                  </el-radio-group>
                  <el-checkbox
                    v-show="re2.checked !== chooseAll && re2.checked !== ''"
                    v-model="re2.autoSorting"
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
  </div>
</template>

<script>
import {
  configSortingKeys,
  crossDocking,
  temperatureLayer,
  multiOrderType,
  sorting,
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
      configSortingKeys,
      crossDocking,
      temperatureLayer,
      multiOrderType,
      sorting,
      chooseAll,
      cascader: [],
      formData: [],
      buildTemperatureLayerAndMultiOrderTypeList: [],
      checkedList: [],
      finalResult: {
        configSorting: [],
        needScanContainer: true,
      },
      rules: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    onOpen(data, needScanContainer) {
      this.formData = data;
      if (this.formData && this.formData.length > 0) {
        this.initPage(needScanContainer);
      }
    },
    init() {
      const multiOrderData = this.buildMultiOrderType(this.multiOrderType);
      const newBuildData = this.buildTemperatureLayerAndMultiOrderType(
        this.temperatureLayer,
        multiOrderData,
      );
      const endBuildData = this.buildCrossDockingAndTemperatureLay(this.crossDocking, newBuildData);
      this.cascader = endBuildData;
      this.resetData(this.cascader);
    },
    initPage(needScanContainer) {
      this.clearAll(this.cascader);
      this.formData.forEach((res) => {
        this.resultCrossDocking({ ...res }, this.cascader);
      });
      this.finalResult.configSorting = this.formData;
      this.finalResult.needScanContainer = needScanContainer;
      this.$emit('changeConfigSorting', this.finalResult);
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
          newItem.sorting = data.sorting;
          newItem.autoSorting = data.autoSorting;
        }
      });
    },
    buildMultiOrderType(multiOrder) {
      const buildData = multiOrder.map((item) => ({
        ...item,
        checked: '',
        sorting: false,
        autoSorting: false,
      }));
      return buildData;
    },
    buildTemperatureLayerAndMultiOrderType(temperatureLayerList, multiOrderTypeList) {
      const buildData = temperatureLayerList.map((item) => ({
        ...item,
        checked: '',
        children: [...multiOrderTypeList],
      }));
      this.buildTemperatureLayerAndMultiOrderTypeList = buildData;
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
    // 是否启用分拣变化
    sortingChange(res) {
      const NewItem = res;
      NewItem.autoSorting = false;
      this.currentValue();
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
            resultData.sorting = item.sorting;
            resultData.autoSorting = item.autoSorting;
          }
          list.push(resultData);
        }
      });
    },
    ArraySplicing() {
      this.finalResult.configSorting = [];
      this.treeDataToCompressed(this.checkedList);
      this.$emit('changeConfigSorting', this.finalResult);
    },
    treeDataToCompressed(source) {
      source.forEach((cross) => {
        cross.children.forEach((temperature) => {
          temperature.children.forEach((multiOrder) => {
            const data = {
              crossDocking: cross.checked,
              temperatureLayer: temperature.checked,
              multiOrderType: multiOrder.checked,
              sorting: multiOrder.sorting,
              autoSorting: multiOrder.autoSorting,
            };
            this.finalResult.configSorting.push(data);
          });
        });
      });
    },
    changeRadio(val) {
      this.finalResult.needScanContainer = val;
      this.$emit('changeConfigSorting', this.finalResult);
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
  margin-right: 40px;
}
.setcontainer {
  margin: 10px 0;
}
.setBox {
  margin-right: 20px;
}
</style>
