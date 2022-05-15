<template>
  <div style="height: 100vh; width: 100vw;">
    <b-input-group class="train-panel">
      <b-input-group-prepend>
        <b-button class="btn-create" variant="primary" @click="openColab">Create</b-button>
      </b-input-group-prepend>
      <b-form-input
        v-model="url"
        @change="connectServer"
        placeholder="Put Google Colab URL here . . ."
      ></b-form-input>
      <b-input-group-append>
        <b-button class="btn train-btn" :variant="isTraining?'danger':'primary'" :disabled="!isConnected || isTerminating" @click="handleTrain()">
          <b-spinner v-if="isTerminating" small></b-spinner>
          <b-spinner v-else-if="isTraining" small type="grow"></b-spinner>
          {{ isTraining ? "Terminate" : "Train" }}
        </b-button>
        <b-button class="btn base-btn" v-b-modal.inference :disabled="!isTrained">
          Test
        </b-button>
        <b-button class="btn base-btn" :disabled="!isTrained || isConverting" @click="downloadModel">
          <b-spinner v-if="isConverting" small></b-spinner>
          {{isConverting? "Converting...":"Download"}}
        </b-button>
      </b-input-group-append>
    </b-input-group>
    <multipane layout="horizontal" class="horizontal-panes multplane">
      <div class="test" :style="{ height: '70%', maxHeight: '90%', minHeight: '10%' }" @mousedown.stop>
        <MLModelDesigner></MLModelDesigner>
      </div>
      <multipane-resizer></multipane-resizer>
      <div :style="{ display: 'flex', flexGrow: 1, width: '100%' }">
        <server-report></server-report>
      </div>
    </multipane>
    <sync-project-modal></sync-project-modal>
    <inference-modal></inference-modal>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations , mapGetters } from "vuex";
import { Multipane, MultipaneResizer } from "vue-multipane";
import MLModelDesigner from "~/components/MLModelDesign.vue";
import SyncProjectModal from "~/components/Modals/SyncProjectModal.vue";
import ServerReport from "~/components/ServerReport.vue";
import InferenceModal from "../Modals/InferenceModal.vue";

export default {
  name: "Train",
  components: {
    Multipane,
    MultipaneResizer,
    SyncProjectModal,
    MLModelDesigner,
    ServerReport,
    InferenceModal,
  },
  props: {},
  data() {
    return {
      url: "",//http://localhost:500
      file: null,
      isDownloading : false,
    };
  },
  methods: {
    ...mapMutations("server",["setURL","setTrained"]),
    ...mapActions("server",["connect","convert_model"]),
      openColab: () => {
      window.open(
        "https://colab.research.google.com/drive/1hXm39yBfaTuRC4j-gJK1AyZaOqUv7Bvr?usp=sharing",
        "_blank"
      );
    },
    downloadModel: async function(){
      let res = await this.convert_model();
      if(res){
        window.open(
          this.url+ "/download_model?project_id=" + this.$store.state.project.project.id,
          "_blank"
        );
      }
    },
    connectServer: function(){
      console.log("connect server");
      const regex = new RegExp(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
      );
      if(this.url != "" || regex.test(this.url)){
        this.setURL(this.url);
        this.connect();
        this.setTrained(false);
      }
    },
    handleTrain: async function() {
      if(this.isTraining){
        await this.$store.dispatch("server/terminate");
      }else{
        await this.$store.dispatch("server/train");
      }
    },
    handleInference: function () {
      
    },
  },
  directives: {},
  mounted() {},
  updated() {
    
  },
  computed: {
    ...mapState("server",["isConnected","isTraining","isTerminating","isTrained","isConverting","isConverted"]),
    downloadable: function() {
      return this.isDone && !this.isDownloading;
    },
  },
};
</script>

<style lang="scss" scoped>
  $primary-color: #007e4e;  
  .horizontal-panes {
    width: 100%;
    height: calc(100vh - 80px);
    border: 1px solid #ccc;
    overflow: hidden;
  }
  .multipane.horizontal-panes.layout-h .multipane-resizer {
    margin: 0; top: 0; /* reset default styling */
    height: 5px;
    background: #aaa;
  }
  .train-panel {
    padding: 20px;
    background: #222;
    height: 78px;
    display: flex;
    justify-content: flex-end;
  }
  .train-btn {
    color: white;
    margin-left: 10px !important;
    border-radius: 15px !important;
    width: 150px;
    &:disabled {
      opacity: 0.7;
    }
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
</style>