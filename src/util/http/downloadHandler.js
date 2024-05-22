/*eslint-disable */
import { getToken } from '@/util/auth';
import { ElMessage } from 'element-plus';
import { FILE_TYPE_ENUM } from '@/const/fileDownload';
/**
 * 文件下载方法
 * @url 文件下载的 下载路径
 * @form 文件下载接口的附带参数
 * @config.fileName 下载文件后，文件存储到本地的文件名 默认为 export
 * @config.extension 待下载文件的文件后缀名 默认为excel表格
 */
export default (url, form, config = { fileName: 'export', extension: 'xlsx' }) => {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.open(
      'POST',
      import.meta.env.MODE === 'dev' ? `/api${url}` : `${import.meta.env.VITE_PROXY_URL}${url}`,
    );
    http.responseType = 'blob';
    http.setRequestHeader('Authorization', getToken());
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = () => {
      if (http.status === 200 && http.readyState === 4) {
        const reader = new FileReader();
        reader.readAsText(http.response, 'utf8');
        reader.onload = function () {
          try {
            // 如果不是文件流，则走正常提示分支
            const content = JSON.parse(this.result);
            if (content.code && ![0, 2000000000].includes(Number(content.code))) {
              ElMessage({
                type: 'error',
                message: content.msg,
              });
            }
            reject();
          } catch (error) {
            const downloadFile = `${config.fileName}.${config.extension}`;
            const blob = new Blob([http.response], {
              type: FILE_TYPE_ENUM[config.extension],
            });
            const csvUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = csvUrl;
            link.download = downloadFile;
            link.click();
            resolve();
          }
        };
      }
    };
    http.send(JSON.stringify(form));
  });
};
