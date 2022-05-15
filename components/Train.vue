<template>
  <div style="height: 100vh; width: 100vw;">
    <b-input-group class="train-panel">
      <b-input-group-prepend>
        <b-button class="btn-create" variant="primary">Create</b-button>
      </b-input-group-prepend>
      <b-form-input
        class="input-url"
        v-model="url"
        placeholder="Put Google Colab URL here . . ."
      ></b-form-input>
      <b-input-group-append>
        <button class="btn base-btn" :disabled="trainable" @click="onTrain()">
          <b-spinner v-if="loading" small type="grow"></b-spinner
          >{{ isTraining ? "Train" : "Train" }}
        </button>
        <button class="btn base-btn" @click="onInference">
          Test
        </button>
        <button
          class="btn base-btn"
          :disabled="!downloadable"
          @click="downloadAndExtract"
        >
          <b-spinner v-if="isDownloading" small type="grow"></b-spinner>Download
        </button>
      </b-input-group-append>
    </b-input-group>
    <b-card no-body class="train-pgr">
      <div class="bg-secondary text-light px-3 py-2 scroll-box" ref="logsBox">
        training result:<br />
        <div v-html="result" />
        <div v-html="logs" />
      </div>
    </b-card>

    <b-modal
      id="inference"
      centered
      title="TEST"
      modal-class="my-modal-class"
      :hide-footer="true"
    >
      <div class="display-screen">test</div>
      <div class="infer-class">
        <img class="tag" src="~/assets/images/UI/svg/Group 177_green.svg" height="24" />
        <span>TOTORO</span>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Training",
  components: {},
  props: {},
  created() {},
  data() {
    return {
      url: "",
      file: null,
      result: "",
      logs: "",
      loading: false,
      polling: null,
      lastState: "",
      isDone: false,
      isTraining: false,
      isDownloading: false,
    };
  },
  methods: {
    onCreate: () => {
      window.open(
        "https://colab.research.google.com/drive/1aG7kNzByeqW2fvWWHT5fM4Nmpt48nt8J",
        "_blank"
      );
    },
    prepareData: function() {
      this.result += `Preparing data ... <br />`;
      
    },
    checkRunning: function() {
      
    },
    stopTraining: function() {
      
    },
    getLogs: function() {
      
    },
    downloadAndExtract: async function() {
      
    },
    onTrain: async function() {
      
    },
    onInference: function () {
      
    }
  },
  directives: {},
  mounted() {},
  updated() {
    
  },
  computed: {
    trainable: function() {
      return true;
    },
    variantType: function() {
      return this.isTraining ? "primary" : "outline-primary";
    },
    downloadable: function() {
      return this.isDone && !this.isDownloading;
    },
  },
};
</script>

<style lang="scss" scoped>
  $primary-color: #007e4e;
  .train-panel {
    padding: 20px;
    background: #222;
    height: 78px;
    display: flex;
    justify-content: flex-end;
  }
  .base-btn {
    color: white;
    background-color: $primary-color;
    margin-left: 10px !important;
    border-radius: 15px !important;
    width: 150px;
    &:disabled {
      opacity: 0.7;
    }
  }
  .train-pgr {
    border: none !important;
  }
  .scroll-box {
    height: calc(100vh - 78px);
    overflow-y: scroll;
    text-align: left;
    padding: 20px !important;
    background-color: #333 !important;
  }
  .display-screen {
    background-color: #333;
    margin: -31px -30px 0px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    height: 300px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .infer-class {
    margin: 0 -30px -30px -30px;
    padding: 20px;
    img {
      margin-right: 0.5em;
    }
    span {
      font-weight: 600;
    }
  }
</style>