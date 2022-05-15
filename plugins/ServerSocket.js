import Vue from "vue";
import VueSocketIO from "@/engine/SocketConnection";
import SocketIO from "socket.io-client";

export default ({ store }) => {
  Vue.use(
    new VueSocketIO({
      connection: null,
      debug: false,
      vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_",
      },
    })
  );
};
