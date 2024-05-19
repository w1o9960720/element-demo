<template>
  <div id="container">
    <div id="stencil"></div>
    <div id="graph-container"></div>
  </div>
  <el-button @click="save">导出</el-button>
</template>
 
<script setup>
import { reactive, onMounted, ref } from "vue";
import { Graph, Shape, Node } from "@antv/x6";
import { Stencil } from "@antv/x6-plugin-stencil";
import { Transform } from "@antv/x6-plugin-transform";
import { Selection } from "@antv/x6-plugin-selection";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { Clipboard } from "@antv/x6-plugin-clipboard";
import { History } from "@antv/x6-plugin-history";
import cell from "./components/node.vue";
import { register, getTeleport } from "@antv/x6-vue-shape";
const graph = ref();
const stencil = ref();
const r7 = ref();
const testList = ref({});
register({
  shape: "custom-vue-node",
  width: 100,
  height: 100,
  component: cell,
  groups: {
    top: {
      position: "top",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
    right: {
      position: "right",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
    bottom: {
      position: "bottom",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
    left: {
      position: "left",
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: "#5F95FF",
          strokeWidth: 1,
          fill: "#fff",
          style: {
            visibility: "hidden",
          },
        },
      },
    },
  },
  items: [
    {
      group: "top",
    },
    {
      group: "right",
    },
    {
      group: "bottom",
    },
    {
      group: "left",
    },
  ],
});
const commonAttrs = {
  body: {
    fill: "#fff",
    stroke: "#8f8f8f",
    strokeWidth: 1,
  },
  label: {
    refX: 0.5,
    refY: "100%",
    refY2: 4,
    textAnchor: "middle",
    textVerticalAnchor: "top",
  },
};
const save = () => {
  console.log(r7.value);
  console.log(graph.value.toJSON(), "graph");
  console.log("graph.value.toJSON(): ", JSON.stringify(graph.value.toJSON()));
  console.log(graph.value.getNodes(), "node");
};
const data = {
  nodes: [
    {
      id: "node1",
      shape: "rect",
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      label: "hello",
      attrs: {
        // body 是选择器名称，选中的是 rect 元素
        body: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
          fill: "#fff",
          rx: 6,
          ry: 6,
        },
      },
    },
    {
      id: "node2",
      shape: "rect",
      x: 160,
      y: 180,
      width: 100,
      height: 40,
      label: "world",
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
  ],
  edges: [
    {
      shape: "edge",
      source: "node1",
      target: "node2",
      label: "x6",
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: "#8f8f8f",
          strokeWidth: 1,
        },
      },
    },
  ],
};
const initGraph = () => {
  graph.value = new Graph({
    container: document.getElementById("graph-container"),
    width: 900,
    height: 700,
    grid: true,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: "ctrl",
      minScale: 0.5,
      maxScale: 3,
    },
    connecting: {
      router: "manhattan",
      connector: {
        name: "rounded",
        args: {
          radius: 8,
        },
      },
      anchor: "center",
      connectionPoint: "anchor",
      allowBlank: false,
      snap: {
        radius: 20,
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: "#A2B1C3",
              strokeWidth: 2,
              targetMarker: {
                name: "block",
                width: 12,
                height: 8,
              },
            },
          },
          zIndex: 0,
        });
      },
      validateConnection({ targetMagnet }) {
        return !!targetMagnet;
      },
    },
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
  });
  graph.value.centerContent(); // 将画布中元素居中展示
};
const initAddNode = () => {
  const ports = {
    groups: {
      top: {
        position: "top",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#5F95FF",
            strokeWidth: 1,
            fill: "#fff",
            style: {
              visibility: "hidden",
            },
          },
        },
      },
      right: {
        position: "right",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#5F95FF",
            strokeWidth: 1,
            fill: "#fff",
            style: {
              visibility: "hidden",
            },
          },
        },
      },
      bottom: {
        position: "bottom",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#5F95FF",
            strokeWidth: 1,
            fill: "#fff",
            style: {
              visibility: "hidden",
            },
          },
        },
      },
      left: {
        position: "left",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#5F95FF",
            strokeWidth: 1,
            fill: "#fff",
            style: {
              visibility: "hidden",
            },
          },
        },
      },
    },
    items: [
      {
        group: "top",
      },
      {
        group: "right",
      },
      {
        group: "bottom",
      },
      {
        group: "left",
      },
    ],
  };
  Graph.registerNode(
    "custom-rect",
    {
      inherit: "rect",
      width: 66,
      height: 36,
      tools: [
        {
          name: "node-editor",
          args: {
            attrs: {
              backgroundColor: "#EFF4FF",
            },
          },
        },
      ],
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: "#5F95FF",
          fill: "#EFF4FF",
        },
        text: {
          fontSize: 12,
          fill: "#262626",
        },
      },
      ports: { ...ports },
    },
    true
  );

  Graph.registerNode(
    "custom-polygon",
    {
      inherit: "polygon",
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: "#5F95FF",
          fill: "#EFF4FF",
        },
        text: {
          fontSize: 12,
          fill: "#262626",
        },
      },
      ports: {
        ...ports,
        items: [
          {
            group: "top",
          },
          {
            group: "bottom",
          },
        ],
      },
    },
    true
  );

  Graph.registerNode(
    "custom-circle",
    {
      inherit: "circle",
      width: 45,
      height: 45,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: "#5F95FF",
          fill: "#EFF4FF",
        },
        text: {
          fontSize: 12,
          fill: "#262626",
        },
      },
      ports: { ...ports },
    },
    true
  );

  Graph.registerNode(
    "custom-image",
    {
      inherit: "rect",
      width: 52,
      height: 52,
      markup: [
        {
          tagName: "rect",
          selector: "body",
        },
        {
          tagName: "image",
        },
        {
          tagName: "text",
          selector: "label",
        },
      ],
      attrs: {
        body: {
          stroke: "#5F95FF",
          fill: "#5F95FF",
        },
        image: {
          width: 26,
          height: 26,
          refX: 13,
          refY: 16,
        },
        label: {
          refX: 3,
          refY: 2,
          textAnchor: "left",
          textVerticalAnchor: "top",
          fontSize: 12,
          fill: "#fff",
        },
      },
      ports: { ...ports },
    },
    true
  );
};
const contral = () => {
  // #region 快捷键与事件
  graph.value.bindKey(["meta+c", "ctrl+c"], () => {
    const cells = graph.value.getSelectedCells();
    if (cells.length) {
      graph.value.copy(cells);
    }
    return false;
  });
  graph.value.bindKey(["meta+x", "ctrl+x"], () => {
    const cells = graph.value.getSelectedCells();
    if (cells.length) {
      graph.value.cut(cells);
    }
    return false;
  });
  graph.value.bindKey(["meta+v", "ctrl+v"], () => {
    if (!graph.value.isClipboardEmpty()) {
      const cells = graph.value.paste({ offset: 32 });
      graph.value.cleanSelection();
      graph.value.select(cells);
    }
    return false;
  });

  // undo redo
  graph.value.bindKey(["meta+z", "ctrl+z"], () => {
    if (graph.value.canUndo()) {
      graph.value.undo();
    }
    return false;
  });
  graph.value.bindKey(["meta+shift+z", "ctrl+shift+z"], () => {
    if (graph.value.canRedo()) {
      graph.value.redo();
    }
    return false;
  });

  // select all
  graph.value.bindKey(["meta+a", "ctrl+a"], () => {
    const nodes = graph.value.getNodes();
    if (nodes) {
      graph.value.select(nodes);
    }
  });

  // delete
  graph.value.bindKey("backspace", () => {
    const cells = graph.value.getSelectedCells();
    if (cells.length) {
      graph.value.removeCells(cells);
    }
  });

  // zoom
  graph.value.bindKey(["ctrl+1", "meta+1"], () => {
    const zoom = graph.value.zoom();
    if (zoom < 1.5) {
      graph.value.zoom(0.1);
    }
  });
  graph.value.bindKey(["ctrl+2", "meta+2"], () => {
    const zoom = graph.value.zoom();
    if (zoom > 0.5) {
      graph.value.zoom(-0.1);
    }
  });
  // 控制连接桩显示/隐藏
  const showPorts = (ports, show) => {
    for (let i = 0, len = ports.length; i < len; i += 1) {
      ports[i].style.visibility = show ? "visible" : "hidden";
    }
  };
  graph.value.on("node:mouseenter", () => {
    const container = document.getElementById("graph-container");
    const ports = container.querySelectorAll(".x6-port-body");
    showPorts(ports, true);
  });
  graph.value.on("node:mouseleave", () => {
    const container = document.getElementById("graph-container");
    const ports = container.querySelectorAll(".x6-port-body");
    showPorts(ports, false);
  });
};
const initUse = () => {
  graph.value
    .use(
      new Transform({
        resizing: true,
        rotating: true,
      })
    )
    .use(
      new Selection({
        rubberband: true,
        showNodeSelectionBox: true,
      })
    )
    .use(new Snapline())
    .use(new Keyboard())
    .use(new Clipboard())
    .use(new History())
    .use(
      new Snapline({
        enabled: true,
      })
    );
};
const initStencil = () => {
  stencil.value = new Stencil({
    title: "元件",
    target: graph.value,
    // stencilGraphWidth: 300,
    // stencilGraphHeight: 300,
    // collapsable: true,
    groups: [
      {
        name: "group1",
      },
    ],
    layoutOptions: {
      columns: 1,
      columnWidth: 100,
      rowHeight: 55,
    },
  });
  document.getElementById("stencil").appendChild(stencil.value.container);
};
const create = () => {
  const r1 = graph.value.createNode({
    shape: "custom-rect",
    label: "开始",
    attrs: {
      body: {
        rx: 20,
        ry: 26,
      },
    },
  });
  const r2 = graph.value.createNode({
    shape: "custom-rect",
    label: "过程",
  });
  const r3 = graph.value.createNode({
    shape: "custom-rect",
    attrs: {
      body: {
        rx: 6,
        ry: 6,
      },
    },
    label: "可选过程",
  });
  const r4 = graph.value.createNode({
    shape: "custom-polygon",
    attrs: {
      body: {
        refPoints: "0,10 10,0 20,10 10,20",
      },
    },
    label: "决策",
  });
  const r5 = graph.value.createNode({
    shape: "custom-polygon",
    attrs: {
      body: {
        refPoints: "10,0 40,0 30,20 0,20",
      },
    },
    label: "数据",
    tools: [
      {
        name: "node-editor",
        args: {
          attrs: {
            backgroundColor: "#EFF4FF",
          },
        },
      },
    ],
  });
  const r6 = graph.value.createNode({
    shape: "custom-circle",
    label: "连接",
  });
  r7.value = graph.value.addNode({
    shape: "custom-vue-node",
    x: 100,
    y: 60,
  });
  stencil.value.load([r1, r2, r3, r4, r5, r6], "group1");
  const imageShapes = [
    {
      label: "Client",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/687b6cb9-4b97-42a6-96d0-34b3099133ac.svg",
    },
    {
      label: "Http",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/dc1ced06-417d-466f-927b-b4a4d3265791.svg",
    },
    {
      label: "Api",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/c55d7ae1-8d20-4585-bd8f-ca23653a4489.svg",
    },
    {
      label: "Sql",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/6eb71764-18ed-4149-b868-53ad1542c405.svg",
    },
    {
      label: "Clound",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/c36fe7cb-dc24-4854-aeb5-88d8dc36d52e.svg",
    },
    {
      label: "Mq",
      image:
        "https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg",
    },
  ];
};
const handleData = (data) => {
  const { cells } = data;
  const shaprArry = cells.filter((item) => item.shape === "edge");
  const customCell = cells.filter((item) => item.shape !== "edge");
  const diff = (sourcecell, targetcell) => {
    const findSample = (id) => {
      return customCell.find((item) => item.id === id)?.shape;
    };
    return findSample(sourcecell) === findSample(targetcell);
  };
  shaprArry.forEach((item) => {
    const { shape, source, target } = item;
    if (shape === "edge") {
      const { cell: sourcecell } = source;
      const { cell: targetcell } = target;
      if (diff(sourcecell, targetcell)) {
        item.attrs.line.stroke = "green";
      }
    }
  });
  return {
    cells: [...shaprArry, ...customCell],
  };
};
onMounted(() => {
  initGraph();
  initStencil();
  initAddNode();
  initUse();
  contral();
  create();
  setTimeout(() => {
    let arrt = {
      cells: [
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "1aed78f9-d9a4-41be-a5a8-008bb47a5359",
          zIndex: 0,
          source: {
            cell: "a33470a0-4a61-493e-98b3-aaafc1e0c04b",
            port: "4433a1dc-3f6e-459c-af11-71750f9aa5a9",
          },
          target: {
            cell: "ca96aa54-cd22-45fc-bb3c-bcc2b6080110",
            port: "4683e364-bf59-4195-aab3-36988fafd582",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "dc6dee3e-dcd6-41bc-8172-133c614e3778",
          zIndex: 0,
          source: {
            cell: "ca96aa54-cd22-45fc-bb3c-bcc2b6080110",
            port: "13ef2386-0313-4880-a4cb-f709bf782920",
          },
          target: {
            cell: "82439bbe-01de-4c77-bcc8-0392c49ec17f",
            port: "365ec105-695f-426b-a9a7-b1a194f6296c",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "c91f05f9-3423-496b-8ca4-b435ac7809c0",
          zIndex: 0,
          source: {
            cell: "1dbbe02a-4f38-4515-ae99-c6c5b31cad98",
            port: "a1b05386-c9cb-4a66-a766-478ec51a7df0",
          },
          target: {
            cell: "640e5c87-4c35-4367-8268-3c99d8f5e54d",
            port: "a82f52ab-31c9-4d99-b30f-2491d771070d",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "d7b30988-663a-4d73-bc9e-6a75699e17cc",
          zIndex: 0,
          source: {
            cell: "640e5c87-4c35-4367-8268-3c99d8f5e54d",
            port: "ae3b1b45-bd41-42a5-84af-045bb93c990d",
          },
          target: {
            cell: "e2384c34-ca17-4298-8fe9-8c0def78677f",
            port: "a1b05386-c9cb-4a66-a766-478ec51a7df0",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "9f7eb747-a5e2-448f-9873-ff56bd32f0ee",
          zIndex: 0,
          source: {
            cell: "e2384c34-ca17-4298-8fe9-8c0def78677f",
            port: "142fb9ab-05ef-450a-a1d1-a641900043e0",
          },
          target: {
            cell: "42626ee4-5ea6-44d1-818f-4b1f417c2a2a",
            port: "a1b05386-c9cb-4a66-a766-478ec51a7df0",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "a9a7e4e9-5ec0-462f-876c-6db806567ead",
          zIndex: 0,
          source: {
            cell: "42626ee4-5ea6-44d1-818f-4b1f417c2a2a",
            port: "142fb9ab-05ef-450a-a1d1-a641900043e0",
          },
          target: {
            cell: "697c4844-e6ac-460a-b947-edde8ef97756",
            port: "84728de8-f6c6-4f66-b347-9576ad98be4c",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "aaf47604-5298-4829-a54d-e0dd6ca657df",
          zIndex: 0,
          source: {
            cell: "697c4844-e6ac-460a-b947-edde8ef97756",
            port: "f857e013-17be-4ada-bfb8-bd49aff36909",
          },
          target: {
            cell: "1dbbe02a-4f38-4515-ae99-c6c5b31cad98",
            port: "142fb9ab-05ef-450a-a1d1-a641900043e0",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "4a6e1da5-85c2-4c44-8b0b-cc2149065821",
          zIndex: 0,
          source: {
            cell: "1486d39e-4aa5-490d-98f4-d7ea18a29d27",
            port: "a1b05386-c9cb-4a66-a766-478ec51a7df0",
          },
          target: {
            cell: "436f1b7f-d47b-4542-b326-2293fb0b1d6a",
            port: "a1b05386-c9cb-4a66-a766-478ec51a7df0",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "135c7656-1758-4048-b32a-e3d03eb0fdb2",
          zIndex: 0,
          source: {
            cell: "436f1b7f-d47b-4542-b326-2293fb0b1d6a",
            port: "142fb9ab-05ef-450a-a1d1-a641900043e0",
          },
          target: {
            cell: "e16c24f3-27b8-41c9-babb-dca0a0edf795",
            port: "9797199f-7b54-4972-8c55-c9fb4679f35f",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "fbb1a6a6-ae1d-486c-b65c-b7deb37c1503",
          zIndex: 0,
          source: {
            cell: "e16c24f3-27b8-41c9-babb-dca0a0edf795",
            port: "b547978d-5d59-4a7a-b574-ecd84c24007a",
          },
          target: {
            cell: "a4240ee1-9ca6-40de-83ec-0ed32760e14a",
            port: "d2d52473-4951-4c2d-9372-34d5ea4815ff",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "90684513-bc96-4fa6-8adb-e4e5ff3bbf09",
          zIndex: 0,
          source: {
            cell: "a4240ee1-9ca6-40de-83ec-0ed32760e14a",
            port: "84610427-5a89-403a-afe2-26cb44f581c4",
          },
          target: {
            cell: "02d00eee-00e8-4266-83dd-58e351102d28",
            port: "142fb9ab-05ef-450a-a1d1-a641900043e0",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "05b81798-d76f-4a1c-b47d-867c063103d8",
          zIndex: 0,
          source: {
            cell: "02d00eee-00e8-4266-83dd-58e351102d28",
            port: "a1b05386-c9cb-4a66-a766-478ec51a7df0",
          },
          target: {
            cell: "e30f3975-1cea-4c45-a3c4-1a48130b6790",
            port: "142fb9ab-05ef-450a-a1d1-a641900043e0",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "d78d7c9c-c99e-4171-a532-44a097c0b0f4",
          zIndex: 0,
          source: {
            cell: "e30f3975-1cea-4c45-a3c4-1a48130b6790",
            port: "a1b05386-c9cb-4a66-a766-478ec51a7df0",
          },
          target: {
            cell: "8b031c80-5fc3-4457-a526-0df38c64f638",
            port: "84728de8-f6c6-4f66-b347-9576ad98be4c",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "9a45c1df-fa20-4a51-ac5c-3bfabba86e22",
          zIndex: 0,
          source: {
            cell: "8b031c80-5fc3-4457-a526-0df38c64f638",
            port: "f857e013-17be-4ada-bfb8-bd49aff36909",
          },
          target: {
            cell: "1486d39e-4aa5-490d-98f4-d7ea18a29d27",
            port: "142fb9ab-05ef-450a-a1d1-a641900043e0",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "4ce6493f-7c82-4e17-a5f8-6f0d76f6ca0b",
          zIndex: 0,
          source: {
            cell: "189262d9-e41d-403a-99c0-c829afaf80af",
            port: "f857e013-17be-4ada-bfb8-bd49aff36909",
          },
          target: {
            cell: "1486d39e-4aa5-490d-98f4-d7ea18a29d27",
            port: "0665f179-f05d-435f-8e65-a7c80e7d91e4",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "bb84641d-b0aa-4e86-8cb7-673e45f52935",
          zIndex: 0,
          source: {
            cell: "189262d9-e41d-403a-99c0-c829afaf80af",
            port: "84728de8-f6c6-4f66-b347-9576ad98be4c",
          },
          target: {
            cell: "f40f03d5-a0dc-4534-aba8-fbc470567336",
            port: "b240e0bc-e3e9-493e-9a58-e485e2aee4c4",
          },
        },
        {
          shape: "edge",
          attrs: {
            line: {
              stroke: "#A2B1C3",
              targetMarker: { name: "block", width: 12, height: 8 },
            },
          },
          id: "e2227b4f-a4fa-4ce5-a8f9-f7124b6bf6c9",
          zIndex: 0,
          source: {
            cell: "f40f03d5-a0dc-4534-aba8-fbc470567336",
            port: "54049229-476f-4c44-ad7c-3b77d7fa0a77",
          },
          target: {
            cell: "697c4844-e6ac-460a-b947-edde8ef97756",
            port: "84728de8-f6c6-4f66-b347-9576ad98be4c",
          },
        },
        {
          position: { x: -360, y: -150 },
          size: { width: 66, height: 36 },
          attrs: { text: { text: "可选过程" }, body: { rx: 6, ry: 6 } },
          visible: true,
          shape: "custom-rect",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "4683e364-bf59-4195-aab3-36988fafd582" },
              { group: "right", id: "33fc3e10-ba5f-4bcb-88bb-e8835be07a60" },
              { group: "bottom", id: "13ef2386-0313-4880-a4cb-f709bf782920" },
              { group: "left", id: "894946b5-6076-49de-b5da-e4c98c6b4b87" },
            ],
          },
          id: "ca96aa54-cd22-45fc-bb3c-bcc2b6080110",
          zIndex: 1,
        },
        {
          position: { x: -360, y: -234.99999999999994 },
          size: { width: 70, height: 40 },
          attrs: { text: { text: "过程" } },
          visible: true,
          shape: "custom-rect",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "3a25becd-90ba-47c0-a78e-6f8382602b2d" },
              { group: "right", id: "b074e45e-5712-42d3-9786-577c70844a7d" },
              { group: "bottom", id: "4433a1dc-3f6e-459c-af11-71750f9aa5a9" },
              { group: "left", id: "ae3fb161-4bc2-4770-88d7-ab953fa30dba" },
            ],
          },
          id: "a33470a0-4a61-493e-98b3-aaafc1e0c04b",
          zIndex: 2,
        },
        {
          position: { x: -360, y: -61 },
          size: { width: 66, height: 36 },
          attrs: {
            text: { text: "数据" },
            body: { refPoints: "10,0 40,0 30,20 0,20" },
          },
          visible: true,
          shape: "custom-polygon",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "365ec105-695f-426b-a9a7-b1a194f6296c" },
              { group: "bottom", id: "5b20610d-b527-4266-9c26-0fd8f85f0a76" },
            ],
          },
          id: "82439bbe-01de-4c77-bcc8-0392c49ec17f",
          zIndex: 3,
        },
        {
          position: { x: -178, y: -114 },
          size: { width: 66, height: 36 },
          attrs: { text: { text: "可选过程" }, body: { rx: 6, ry: 6 } },
          visible: true,
          shape: "custom-rect",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "84728de8-f6c6-4f66-b347-9576ad98be4c" },
              { group: "right", id: "084ca3c1-5688-4bfb-8a22-72bd4c2f81ab" },
              { group: "bottom", id: "f857e013-17be-4ada-bfb8-bd49aff36909" },
              { group: "left", id: "23647135-5659-4030-8a7c-acebe6cd7890" },
            ],
          },
          id: "697c4844-e6ac-460a-b947-edde8ef97756",
          zIndex: 4,
        },
        {
          position: { x: -17, y: -25 },
          size: { width: 66, height: 36 },
          attrs: { text: { text: "过程" } },
          visible: true,
          shape: "custom-rect",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "142fb9ab-05ef-450a-a1d1-a641900043e0" },
              { group: "right", id: "d4efc02f-031b-4f9b-955b-fb68683a5891" },
              { group: "bottom", id: "a1b05386-c9cb-4a66-a766-478ec51a7df0" },
              { group: "left", id: "0665f179-f05d-435f-8e65-a7c80e7d91e4" },
            ],
          },
          id: "42626ee4-5ea6-44d1-818f-4b1f417c2a2a",
          zIndex: 5,
        },
        {
          position: { x: -190, y: 190 },
          size: { width: 66, height: 36 },
          attrs: {
            text: { text: "数据" },
            body: { refPoints: "10,0 40,0 30,20 0,20" },
          },
          visible: true,
          shape: "custom-polygon",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "a82f52ab-31c9-4d99-b30f-2491d771070d" },
              { group: "bottom", id: "ae3b1b45-bd41-42a5-84af-045bb93c990d" },
            ],
          },
          id: "640e5c87-4c35-4367-8268-3c99d8f5e54d",
          tools: {
            items: [
              {
                name: "node-editor",
                args: { attrs: { backgroundColor: "#EFF4FF" } },
              },
            ],
          },
          zIndex: 6,
        },
        {
          position: { x: -178, y: 22 },
          size: { width: 66, height: 36 },
          attrs: { text: { text: "过程" } },
          visible: true,
          shape: "custom-rect",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "142fb9ab-05ef-450a-a1d1-a641900043e0" },
              { group: "right", id: "d4efc02f-031b-4f9b-955b-fb68683a5891" },
              { group: "bottom", id: "a1b05386-c9cb-4a66-a766-478ec51a7df0" },
              { group: "left", id: "0665f179-f05d-435f-8e65-a7c80e7d91e4" },
            ],
          },
          id: "1dbbe02a-4f38-4515-ae99-c6c5b31cad98",
          zIndex: 7,
        },
        {
          position: { x: -17, y: 89 },
          size: { width: 66, height: 36 },
          attrs: { text: { text: "过程" } },
          visible: true,
          shape: "custom-rect",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "142fb9ab-05ef-450a-a1d1-a641900043e0" },
              { group: "right", id: "d4efc02f-031b-4f9b-955b-fb68683a5891" },
              { group: "bottom", id: "a1b05386-c9cb-4a66-a766-478ec51a7df0" },
              { group: "left", id: "0665f179-f05d-435f-8e65-a7c80e7d91e4" },
            ],
          },
          id: "e2384c34-ca17-4298-8fe9-8c0def78677f",
          zIndex: 8,
        },
        {
          position: { x: 282, y: -61 },
          size: { width: 66, height: 36 },
          attrs: { text: { text: "过程" } },
          visible: true,
          shape: "custom-rect",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "142fb9ab-05ef-450a-a1d1-a641900043e0" },
              { group: "right", id: "d4efc02f-031b-4f9b-955b-fb68683a5891" },
              { group: "bottom", id: "a1b05386-c9cb-4a66-a766-478ec51a7df0" },
              { group: "left", id: "0665f179-f05d-435f-8e65-a7c80e7d91e4" },
            ],
          },
          id: "e30f3975-1cea-4c45-a3c4-1a48130b6790",
          zIndex: 9,
        },
        {
          position: { x: 323, y: 89 },
          size: { width: 66, height: 36 },
          attrs: { text: { text: "可选过程" }, body: { rx: 6, ry: 6 } },
          visible: true,
          shape: "custom-rect",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "84728de8-f6c6-4f66-b347-9576ad98be4c" },
              { group: "right", id: "084ca3c1-5688-4bfb-8a22-72bd4c2f81ab" },
              { group: "bottom", id: "f857e013-17be-4ada-bfb8-bd49aff36909" },
              { group: "left", id: "23647135-5659-4030-8a7c-acebe6cd7890" },
            ],
          },
          id: "8b031c80-5fc3-4457-a526-0df38c64f638",
          zIndex: 10,
        },
        {
          position: { x: 216, y: 226 },
          size: { width: 66, height: 36 },
          attrs: { text: { text: "过程" } },
          visible: true,
          shape: "custom-rect",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "142fb9ab-05ef-450a-a1d1-a641900043e0" },
              { group: "right", id: "d4efc02f-031b-4f9b-955b-fb68683a5891" },
              { group: "bottom", id: "a1b05386-c9cb-4a66-a766-478ec51a7df0" },
              { group: "left", id: "0665f179-f05d-435f-8e65-a7c80e7d91e4" },
            ],
          },
          id: "1486d39e-4aa5-490d-98f4-d7ea18a29d27",
          zIndex: 11,
        },
        {
          position: { x: 268, y: -150 },
          size: { width: 66, height: 36 },
          attrs: { text: { text: "过程" } },
          visible: true,
          shape: "custom-rect",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "142fb9ab-05ef-450a-a1d1-a641900043e0" },
              { group: "right", id: "d4efc02f-031b-4f9b-955b-fb68683a5891" },
              { group: "bottom", id: "a1b05386-c9cb-4a66-a766-478ec51a7df0" },
              { group: "left", id: "0665f179-f05d-435f-8e65-a7c80e7d91e4" },
            ],
          },
          id: "02d00eee-00e8-4266-83dd-58e351102d28",
          zIndex: 12,
        },
        {
          position: { x: 23, y: -233 },
          size: { width: 66, height: 36 },
          attrs: { text: { text: "开始" }, body: { rx: 20, ry: 26 } },
          visible: true,
          shape: "custom-rect",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "caa6eabc-3807-4c24-bcaa-1dfe75cac30d" },
              { group: "right", id: "b240e0bc-e3e9-493e-9a58-e485e2aee4c4" },
              { group: "bottom", id: "75860785-82af-4984-a30a-95a2a796a611" },
              { group: "left", id: "54049229-476f-4c44-ad7c-3b77d7fa0a77" },
            ],
          },
          id: "f40f03d5-a0dc-4534-aba8-fbc470567336",
          zIndex: 13,
        },
        {
          position: { x: 89, y: 58 },
          size: { width: 66, height: 36 },
          attrs: { text: { text: "可选过程" }, body: { rx: 6, ry: 6 } },
          visible: true,
          shape: "custom-rect",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "84728de8-f6c6-4f66-b347-9576ad98be4c" },
              { group: "right", id: "084ca3c1-5688-4bfb-8a22-72bd4c2f81ab" },
              { group: "bottom", id: "f857e013-17be-4ada-bfb8-bd49aff36909" },
              { group: "left", id: "23647135-5659-4030-8a7c-acebe6cd7890" },
            ],
          },
          id: "189262d9-e41d-403a-99c0-c829afaf80af",
          zIndex: 14,
        },
        {
          position: { x: 449, y: -70 },
          size: { width: 45, height: 45 },
          attrs: { text: { text: "连接" } },
          visible: true,
          shape: "custom-circle",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "b547978d-5d59-4a7a-b574-ecd84c24007a" },
              { group: "right", id: "71a000dc-bc41-42bd-8f42-a6803def68b3" },
              { group: "bottom", id: "9797199f-7b54-4972-8c55-c9fb4679f35f" },
              { group: "left", id: "76641e42-ef98-48e3-b570-3c0052128aec" },
            ],
          },
          id: "e16c24f3-27b8-41c9-babb-dca0a0edf795",
          zIndex: 15,
        },
        {
          position: { x: 449, y: -186 },
          size: { width: 66, height: 36 },
          attrs: {
            text: { text: "决策" },
            body: { refPoints: "0,10 10,0 20,10 10,20" },
          },
          visible: true,
          shape: "custom-polygon",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "84610427-5a89-403a-afe2-26cb44f581c4" },
              { group: "bottom", id: "d2d52473-4951-4c2d-9372-34d5ea4815ff" },
            ],
          },
          id: "a4240ee1-9ca6-40de-83ec-0ed32760e14a",
          zIndex: 16,
        },
        {
          position: { x: 515, y: 89 },
          size: { width: 66, height: 36 },
          attrs: { text: { text: "过程" } },
          visible: true,
          shape: "custom-rect",
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: "#5F95FF",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: { visibility: "hidden" },
                  },
                },
              },
            },
            items: [
              { group: "top", id: "142fb9ab-05ef-450a-a1d1-a641900043e0" },
              { group: "right", id: "d4efc02f-031b-4f9b-955b-fb68683a5891" },
              { group: "bottom", id: "a1b05386-c9cb-4a66-a766-478ec51a7df0" },
              { group: "left", id: "0665f179-f05d-435f-8e65-a7c80e7d91e4" },
            ],
          },
          id: "436f1b7f-d47b-4542-b326-2293fb0b1d6a",
          zIndex: 17,
        },
      ],
    };
    graph.value.fromJSON(handleData(arrt)); // 居中显示
  }, 200);
  let arr =
    '{"cells":[{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"1aed78f9-d9a4-41be-a5a8-008bb47a5359","zIndex":0,"source":{"cell":"a33470a0-4a61-493e-98b3-aaafc1e0c04b","port":"4433a1dc-3f6e-459c-af11-71750f9aa5a9"},"target":{"cell":"ca96aa54-cd22-45fc-bb3c-bcc2b6080110","port":"4683e364-bf59-4195-aab3-36988fafd582"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"dc6dee3e-dcd6-41bc-8172-133c614e3778","zIndex":0,"source":{"cell":"ca96aa54-cd22-45fc-bb3c-bcc2b6080110","port":"13ef2386-0313-4880-a4cb-f709bf782920"},"target":{"cell":"82439bbe-01de-4c77-bcc8-0392c49ec17f","port":"365ec105-695f-426b-a9a7-b1a194f6296c"}},{"position":{"x":-360,"y":-150},"size":{"width":66,"height":36},"attrs":{"text":{"text":"可选过程"},"body":{"rx":6,"ry":6}},"visible":true,"shape":"custom-rect","ports":{"groups":{"top":{"position":"top","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"right":{"position":"right","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"bottom":{"position":"bottom","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"left":{"position":"left","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}}},"items":[{"group":"top","id":"4683e364-bf59-4195-aab3-36988fafd582"},{"group":"right","id":"33fc3e10-ba5f-4bcb-88bb-e8835be07a60"},{"group":"bottom","id":"13ef2386-0313-4880-a4cb-f709bf782920"},{"group":"left","id":"894946b5-6076-49de-b5da-e4c98c6b4b87"}]},"id":"ca96aa54-cd22-45fc-bb3c-bcc2b6080110","zIndex":1},{"position":{"x":-360,"y":-234.99999999999994},"size":{"width":70,"height":40},"attrs":{"text":{"text":"过程"}},"visible":true,"shape":"custom-rect","ports":{"groups":{"top":{"position":"top","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"right":{"position":"right","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"bottom":{"position":"bottom","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"left":{"position":"left","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}}},"items":[{"group":"top","id":"3a25becd-90ba-47c0-a78e-6f8382602b2d"},{"group":"right","id":"b074e45e-5712-42d3-9786-577c70844a7d"},{"group":"bottom","id":"4433a1dc-3f6e-459c-af11-71750f9aa5a9"},{"group":"left","id":"ae3fb161-4bc2-4770-88d7-ab953fa30dba"}]},"id":"a33470a0-4a61-493e-98b3-aaafc1e0c04b","zIndex":2},{"position":{"x":-360,"y":-61},"size":{"width":66,"height":36},"attrs":{"text":{"text":"数据"},"body":{"refPoints":"10,0 40,0 30,20 0,20"}},"visible":true,"shape":"custom-polygon","ports":{"groups":{"top":{"position":"top","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"right":{"position":"right","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"bottom":{"position":"bottom","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"left":{"position":"left","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}}},"items":[{"group":"top","id":"365ec105-695f-426b-a9a7-b1a194f6296c"},{"group":"bottom","id":"5b20610d-b527-4266-9c26-0fd8f85f0a76"}]},"id":"82439bbe-01de-4c77-bcc8-0392c49ec17f","zIndex":3}]}';
  const datada = JSON.parse(arr);
});
</script>
<style lang="scss" scoped>
#container {
  display: flex;
  border: 1px solid #dfe3e8;
  height: 100%;
  #stencil {
    width: 250px;
    height: 100%;
    position: relative;
    border-right: 1px solid #dfe3e8;
  }
  #graph-container {
    width: calc(100% - 250px);
    height: 100%;
  }
  .x6-widget-stencil {
    background-color: #fff;
  }
  .x6-widget-stencil-title {
    background-color: #fff;
  }
  .x6-widget-stencil-group-title {
    background-color: #fff !important;
  }
  .x6-widget-transform {
    margin: -1px 0 0 -1px;
    padding: 0px;
    border: 1px solid #239edd;
  }
  .x6-widget-transform > div {
    border: 1px solid #239edd;
  }
  .x6-widget-transform > div:hover {
    background-color: #3dafe4;
  }
  .x6-widget-transform-active-handle {
    background-color: #3dafe4;
  }
  .x6-widget-transform-resize {
    border-radius: 0;
  }
  .x6-widget-selection-inner {
    border: 1px solid #239edd;
  }
  .x6-widget-selection-box {
    opacity: 0;
  }
}
</style>