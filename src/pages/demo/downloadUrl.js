import { FILE_TYPE_ENUM } from "@/const/fileDownload";

// 保存到本地并自动点击
const saveAs = (data, name, url = "") => {
  const urlObject = window.URL || window.webkitURL || window;
  const arr = url.split(".");
  const type = arr[arr.length - 1] || "xlsx";
  const exportblob = new Blob([data], {
    type: FILE_TYPE_ENUM[type],
  });
  const link = document.createElement("a");
  link.href = urlObject.createObjectURL(exportblob);
  link.download = name;
  link.click();
};
// 下载url
export const getDownUrl = (url) => {
  let url2 = url || "";
  if (!url2.startsWith("http")) {
    if (url2[0] === "/") {
      url2 = url2.substring(1);
    }
    url2 = `${import.meta.env.VITE_PROXY_URL}${url2}`;
  }

  return url2;
};
// 下载含有url的文件
const downloadUrlFile = (url, fileName) => {
  const url2 = getDownUrl(url.replace(/\\/g, "/"));
  console.log("url2: ", url2);
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url2, true);
  xhr.responseType = "blob";
  xhr.onload = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      // 获取文件blob数据并保存
      saveAs(xhr.response, fileName, url2);
    }
  };
  xhr.send();
};
export default downloadUrlFile;
