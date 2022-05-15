<template>
  <LoadingScreen/>
</template>

<script>
import LoadingScreen from "../components/LoadingScreen.vue";
export default {
  name: 'IndexPage',
  components : {
    LoadingScreen
  }
}
</script>
<style lang="scss">
#app {
  /*font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;*/
  color: #333;
}

* {
  // margin: 0;
  // padding: 0;
  // outline: none;
  // box-sizing: border-box;
}
a {
  text-decoration: none;
  color: unset;
}
ul {
  list-style: none;
  padding: 0;
}

.my-modal-class > .modal-dialog > .modal-content {
  .modal-header {
    background: #007e4e !important;
    color: #ffffff !important;
    button {
      position: relative;
      opacity: 0.9;
      &::before {
        content: "";
        display: block;
        background-color: #ffffff;
        position: absolute;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        z-index: -1;
        top: 15px;
        right: 12px;
      }
    }
    h5 {
      font-weight: bold;
    }
    .close {
      font-weight: normal;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .modal-body {
    padding: 30px;
    .modal-ttl {
      font-weight: bold;
      text-align: center;
      color: #0090ff;
      margin-bottom: 15px;
    }
    .modal-desc {
      text-align: center;
      margin-bottom: 15px;
    }
  }
}

.my-modal-class-no-pad > .modal-dialog > .modal-content > .modal-body {
  padding: 0px !important;
}
</style>
