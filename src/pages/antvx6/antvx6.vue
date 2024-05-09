<template>
  <div class="dashboard-container">
    <p>选择节点</p>
    <div class="antvBox">
      <div class="menu-list">
        <div v-for="item in moduleList" :key="item.id">
          <img :src="item.image" alt="" />
          <p>{{ item.name }}</p>
        </div>
      </div>
      <div class="canvas-card">
        <div id="container" />
      </div>
    </div>
  </div>
</template>
 
<script setup>
import { reactive, onMounted, ref } from "vue";
import { Graph } from "@antv/x6";
const moduleList = reactive([
  {
    id: 1,
    name: "节点1",
  },
  {
    id: 8,
    name: "节点2",
  },
  {
    id: 2,
    name: "节点3",
  },
  {
    id: "node1",
    shape: "rect",
    x: 40,
    y: 40,
    width: 100,
    height: 40,
    label: "hello",
    attrs: {
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
  },
]);
const nodeAddEvent = () => {
  const container = document.getElementById("container");
  const changePortsVisible = (visible) => {
    const ports = container.querySelectorAll(".x6-port-body");
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = visible ? "visible" : "hidden";
    }
  };
  graph.value.on("node:mouseenter", () => {
    console.log(1);
    changePortsVisible(true);
  });
  graph.value.on("node:mouseleave", () => {
    changePortsVisible(false);
  });
};
const graph = ref();
const initGraph = () => {
  const container = document.getElementById("container");
  graph.value = new Graph({
    container: container, // 画布容器
    width: container.offsetWidth, // 画布宽
    height: container.offsetHeight, // 画布高
    background: false, // 背景（透明）
    snapline: true, // 对齐线
    // 配置连线规则
    connecting: {
      snap: true, // 自动吸附
      allowBlank: false, // 是否允许连接到画布空白位置的点
      allowMulti: true, // 是否允许在相同的起始节点和终止之间创建多条边
      allowLoop: true, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
      highlight: true, // 拖动边时，是否高亮显示所有可用的节点
      highlighting: {
        magnetAdsorbed: {
          name: "stroke",
          args: {
            attrs: {
              fill: "#5F95FF",
              stroke: "#5F95FF",
            },
          },
        },
      },
      router: {
        // 对路径添加额外的点
        name: "orth",
      },
      connector: {
        // 边渲染到画布后的样式
        name: "rounded",
        args: {
          radius: 8,
        },
      },
    },
    panning: {
      enabled: false,
    },
    mousewheel: {
      enabled: true, // 支持滚动放大缩小
      zoomAtMousePosition: true,
      modifiers: "ctrl",
      minScale: 0.5,
      maxScale: 3,
    },
    grid: {
      type: "dot",
      size: 20, // 网格大小 10px
      visible: true, // 渲染网格背景
      args: {
        color: "#a0a0a0", // 网格线/点颜色
        thickness: 2, // 网格线宽度/网格点大小
      },
    },
  });
  nodeAddEvent();
};
//添加节点到画布
const addHandleNode = (x, y, id, image, name) => {
  graph.value.addNode({
    id: id,
    shape: "image", // 指定使用何种图形，默认值为 'rect'
    x: x,
    y: y,
    width: 60,
    height: 60,
    imageUrl: image,
    attrs: {
      body: {
        stroke: "#ffa940",
        fill: "#ffd591",
      },
      label: {
        textWrap: {
          width: 90,
          text: name,
        },
        fill: "black",
        fontSize: 12,
        refX: 0.5,
        refY: "100%",
        refY2: 4,
        textAnchor: "middle",
        textVerticalAnchor: "top",
      },
    },
    ports: {
      groups: {
        group1: {
          position: [30, 30],
        },
      },
      items: [
        {
          group: "group1",
          id: "port1",
          attrs: {
            circle: {
              r: 6,
              magnet: true,
              stroke: "#ffffff",
              strokeWidth: 2,
              fill: "#5F95FF",
            },
          },
        },
      ],
    },
    zIndex: 10,
  });
};
// 拖动后松开鼠标触发事件
const handleDragEnd = (e, item) => {
  console.log(e, item); // 可以获取到最后拖动后松开鼠标时的坐标和拖动的节点相关信息
  this.addHandleNode(
    e.pageX - 500,
    e.pageY - 200,
    new Date().getTime(),
    item.image,
    item.name
  );
};

const save = () => {
  console.log(graph.value.toJSON(), "graph");
  console.log(graph.value.getNodes(), "node");
};
onMounted(() => {
  initGraph();
  // 节点绑定点击事件
  graph.value.on("node:click", ({ e, x, y, node, view }) => {
    console.log("点击！！！", node);
    // 判断是否有选中过节点
    if (this.curSelectNode) {
      // 移除选中状态
      this.curSelectNode.removeTools();
      // 判断两次选中节点是否相同
      if (this.curSelectNode !== node) {
        node.addTools([
          {
            name: "boundary",
            args: {
              attrs: {
                fill: "#16B8AA",
                stroke: "#2F80EB",
                strokeWidth: 1,
                fillOpacity: 0.1,
              },
            },
          },
          {
            name: "button-remove",
            args: {
              x: "100%",
              y: 0,
              offset: {
                x: 0,
                y: 0,
              },
            },
          },
        ]);
        this.curSelectNode = node;
      } else {
        this.curSelectNode = null;
      }
    } else {
      this.curSelectNode = node;
      node.addTools([
        {
          name: "boundary",
          args: {
            attrs: {
              fill: "#16B8AA",
              stroke: "#2F80EB",
              strokeWidth: 1,
              fillOpacity: 0.1,
            },
          },
        },
        {
          name: "button-remove",
          args: {
            x: "100%",
            y: 0,
            offset: {
              x: 0,
              y: 0,
            },
          },
        },
      ]);
    }
  });
  // 连线绑定悬浮事件
  graph.value.on("cell:mouseenter", ({ cell }) => {
    if (cell.shape == "edge") {
      cell.addTools([
        {
          name: "button-remove",
          args: {
            x: "100%",
            y: 0,
            offset: {
              x: 0,
              y: 0,
            },
          },
        },
      ]);
      cell.setAttrs({
        line: {
          stroke: "#409EFF",
        },
      });
      cell.zIndex = 99; // 保证当前悬停的线在最上层，不会被遮挡
    }
  });
  graph.value.on("cell:mouseleave", ({ cell }) => {
    if (cell.shape === "edge") {
      cell.removeTools();
      cell.setAttrs({
        line: {
          stroke: "black",
        },
      });
      cell.zIndex = 1; // 保证未悬停的线在下层，不会遮挡悬停的线
    }
  });
});
</script>
<style lang="scss" scoped>
.dashboard-container {
  .antvBox {
    display: flex;
    width: 100%;
    height: 100%;
    color: black;
    padding-top: 20px;
    .menu-list {
      height: 100%;
      width: 300px;
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-content: flex-start;
      flex-wrap: wrap;
      > div {
        margin-bottom: 10px;
        border-radius: 5px;
        padding: 0 10px;
        box-sizing: border-box;
        cursor: pointer;
        color: black;
        width: 105px;
        display: flex;
        flex-wrap: wrap;

        justify-content: center;
        img {
          height: 50px;
          width: 50px;
        }
        P {
          width: 90px;
          text-align: center;
        }
      }
    }
    .canvas-card {
      width: 1700px;
      height: 750px;
      box-sizing: border-box;
      > div {
        width: 1400px;
        height: 750px;
        border: 2px dashed #2149ce;
      }
    }
  }
}
</style>