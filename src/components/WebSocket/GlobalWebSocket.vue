<template>
  <div />
</template>
<script>
import { reactive, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { ElNotification } from 'element-plus';

export default {
  props: {
    uri: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      webSocket: null, // webSocket实例
      lockReconnect: false, // 重连锁，避免多次重连
      maxReconnect: 6, // 最大重连次数， -1 标识无限重连
      reconnectTime: 0, // 重连尝试次数
      heartbeat: {
        interval: 30 * 1000, // 心跳间隔时间
        timeout: 10 * 1000, // 响应超时时间
        pingTimeoutObj: null, // 延时发送心跳的定时器
        pongTimeoutObj: null, // 接收心跳响应的定时器
        pingMessage: JSON.stringify({ type: 'ping' }), // 心跳请求信息
      },
    });
    const token = computed(() => store.getters.access_token);
    const tenant = computed(() => {
      return store.getters.userInfo.tenantId ? store.getters.userInfo.tenantId : 1;
    }); 
    function initWebSocket() {
      // ws地址
      const { host } = window.location;
      const wsUri = `ws://${host}${props.uri}?access_token=${token.value}&TENANT-ID=${tenant.value}`;
      // 建立连接
      state.webSocket = new WebSocket(wsUri);
      // 连接成功
      // eslint-disable-next-line no-use-before-define
      state.webSocket.onopen = onOpen;
      // 连接错误
      // eslint-disable-next-line no-use-before-define
      state.webSocket.onerror = onError;
      // 接收信息
      // eslint-disable-next-line no-use-before-define
      state.webSocket.onmessage = onMessage;
      // 连接关闭
      // eslint-disable-next-line no-use-before-define
      state.webSocket.onclose = onClose;
    }
    /**
     * 重新连接
     */
    function reconnect() {
      if (!token.value.vlaue) { 
        return;
      }
      if (
        state.lockReconnect ||
        (state.maxReconnect !== -1 && state.reconnectTime > state.maxReconnect)
      ) {
        return;
      }
      state.lockReconnect = true;
      setTimeout(() => {
        state.reconnectTime++;
        // 建立新连接
        initWebSocket();
        state.lockReconnect = false;
      }, 5000);
    }
    /**
     * 清空定时器
     */
    function clearTimeoutObj(heartbeat) {
      if (heartbeat.pingTimeoutObj) clearTimeout(heartbeat.pingTimeoutObj);
      if (heartbeat.pongTimeoutObj) clearTimeout(heartbeat.pongTimeoutObj);
    }
    /**
     * 开启心跳
     */
    function startHeartbeat() {
      const { webSocket } = this;
      const { heartbeat } = this;
      // 清空定时器
      clearTimeoutObj(heartbeat);
      // 延时发送下一次心跳
      heartbeat.pingTimeoutObj = setTimeout(() => {
        // 如果连接正常
        if (webSocket.readyState === 1) {
          // 这里发送一个心跳，后端收到后，返回一个心跳消息，
          webSocket.send(heartbeat.pingMessage);
          // 心跳发送后，如果服务器超时未响应则断开，如果响应了会被重置心跳定时器
          heartbeat.pongTimeoutObj = setTimeout(() => {
            webSocket.close();
          }, heartbeat.timeout);
        } else {
          // 否则重连
          reconnect();
        }
      }, heartbeat.interval);
    }
    /**
     * 连接成功事件
     */
    function onOpen() {
      // 开启心跳
      startHeartbeat();
      state.reconnectTime = 0;
    }
    /**
     * 连接失败事件
     * @param e
                                            */
    function onError() {
      // 错误
      // 重连
      reconnect();
    }
    /**
     * 连接关闭事件
     * @param e
     */
    function onClose() {
      // 关闭
      // 重连
      reconnect();
    }
    /**
     * 接收服务器推送的信息
     * @param msgEvent
     */
    function onMessage(msgEvent) {
      // 收到服务器信息，心跳重置并发送
      startHeartbeat();
      const text = msgEvent.data;

      if (text.indexOf('pong') > 0) {
        return;
      }

      ElNotification.warning({
        title: '消息提醒',
        dangerouslyUseHTMLString: true,
        message: `${text}请及时处理`,
        offset: 60,
      });
    }
    /**
     * 数据发送
     * @param msg
     */
    // function send(msg) {
    //   // 数据发送
    //   state.webSocket.send(msg);
    // }
    initWebSocket();
    onUnmounted(() => {
      state.webSocket.close();
      clearTimeoutObj(state.heartbeat);
    });
    return {};
  },
};
</script>
