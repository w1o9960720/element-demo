import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import topLevelAwait from "vite-plugin-top-level-await";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const proxyUrl = loadEnv(mode, process.cwd()).VITE_PROXY_URL;
  return {
    plugins: [
      vue(),
      topLevelAwait({
        promiseExportName: "__tla", // TLA Promise 变量名
        promiseImportName: (i) => `__tla_${i}`, // TLA Promise 导入名
      }),
      viteCompression({
        deleteOriginFile: false, // 压缩后删除原来的文件vite.config.js
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },

    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    server: {
      port: 3000,
      proxy: {
        "^/api": {
          target: proxyUrl, // 后端服务实际地址
          changeOrigin: true, // 开启代理
          rewrite: (path) => path.replace(/^\/api/, "/"),
        },
      },
    },
  };
});
