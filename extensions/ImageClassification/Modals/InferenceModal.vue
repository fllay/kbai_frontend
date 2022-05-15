<template>
  <b-modal
      id="inference"
      centered
      size="md"
      title="TEST"
      modal-class="my-modal-class"
      :hide-footer="true"
      @close="onClose"
      @hide="onClose"
    >
      <div class="display-screen">
        <image-capture 
          :width="435"
          source="" 
          ref="camera" 
          @started="_=>(cameraReady=true)" 
          @stoped="_=>(cameraReady=false)"
        ></image-capture>  
      </div>
      <div class="infer-class">
        <img class="tag" src="~/assets/images/UI/svg/Group 177_green.svg" height="24" />
        <span>{{result}} [{{(this.prob * 100).toFixed(2)}}%]</span>
      </div>
      <div class="infer_control">
        <b-avatar button @click="onInfer" :disabled="!cameraReady" variant="primary" :icon="terminated? 'play-fill':'stop-fill'" class="align-baseline"></b-avatar>
      </div>
    </b-modal>
</template>
<script>
import axios from 'axios';
import { mapState, mapActions, mapMutations , mapGetters } from 'vuex';
import ImageCapture from '~/components/InputConnection/ImageCapture.vue';
export default {
  name : "InferenceModal",
  components:{
    ImageCapture
  },
  data(){
    return {
      terminated : true,
      cameraReady : false,
      result: "-",
      prob: 0
    }
  },
  computed: {
    ...mapState("server",["url","isConnected","isTraining","isTerminating","isTrained"]),
    ...mapState("project",["project"]),
  },
  methods:{
    doInference: async function(){
      if(this.terminated){
        return;
      }
      if(!this.cameraReady){
        await this.sleep(500);
        return await this.doInference();
      }
      let {image,thumbnail} = await this.$refs.camera.snap();
      const formData = new FormData();
      formData.append("image", image, "infer.jpg");
      let project_id = this.project.id;
      formData.append("project_id", project_id);
      formData.append("type", "classification");
      try{
        let res = await axios({
          method: "POST",
          url: this.url + "/inference_image",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
        if(res.data.result == "OK"){
          this.result = res.data.prediction;
          this.prob = res.data.prob;
        }
        await this.sleep(200);
        return await this.doInference();
      }catch(err){
        console.log(err);
        return;
      }
    },
    onInfer: async function(){
      this.terminated = !this.terminated;
      console.log("terminated : ", this.terminated);
      if(!this.terminated){
        await this.doInference();
      }
    },
    onClose: async function(){
      this.terminated = true;
      this.cameraReady = false;
    },
    sleep: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
}
</script>
<style lang="scss" scoped>
  .display-screen {
    background-color: #fff;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    margin-top: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .infer-class {
    padding: 10px;
    img {
      margin-right: 0.5em;
    }
    span {
      font-weight: 600;
    }
  }
  .infer_control{
    text-align: center;
  }
</style>