<template>
  <div class="display-panel liveview">
    <div class="config-camera-float-button">
      <b-avatar icon="gear-fill" :size="32" button></b-avatar>
      <b-avatar v-if="captureDevices.length > 1" icon="arrow-repeat" :size="32" button @click="nextCamera"></b-avatar>
    </div>
    <vue-web-cam
      v-show="!source.startsWith('http')"
      :width="width"
      height="auto"
      ref="webcam"
      @cameras="onCameras"
      @started="onStarted"
      @stopped="onStoped"
      @camera-change="cameraChanged"
      :deviceId="captureDevices.length > 0 ? captureDevices[currentCaptureDeviceIndex].deviceId : null"
    />
  </div>
  <!-- <b-img
            ref="displayImage"
            crossorigin="anonymous"
            width="260"
            src=""
          >
          </b-img> -->
</template>
<script>

export default {
  props : {
    source: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 260
    }
  },
  data(){
    return {
      captureDevices : [],
      currentCaptureDeviceIndex : 0,
      canvas : null,
      canvas_thumbnail : null,
    }
  },
  methods : {
    onCameras(devices){
      this.captureDevices = devices;
      this.currentCaptureDeviceIndex = 0;
      console.log("capture devices : ", devices.length );
    },
    onStarted(){
      this.$emit("started");
    },
    onStoped(){
      this.$emit("stoped");
    },
    nextCamera(){
      this.currentCaptureDeviceIndex++;
      if(this.currentCaptureDeviceIndex >= this.captureDevices.length){
        this.currentCaptureDeviceIndex = 0;
      }
      console.log("change camera to : ",this.captureDevices[this.currentCaptureDeviceIndex].deviceId);
      this.$refs.webcam.changeCamera(this.captureDevices[this.currentCaptureDeviceIndex].deviceId);
    },
    cameraChanged(deviceId){
      this.ctx = null;
      this.ctx_thumbnail = null;
    },
    async snap(){
      let image = await this.captureWithTumbnail();
      return image;
    },
    canvasToBlob(canvas,format='image/jpeg',quality=0.80){
      return new Promise((resolve,reject)=>{
        canvas.toBlob(blob=>{
          if(blob){
            resolve(blob);
          }else{
            reject();
          }
        },format,quality);
      });
    },
    async captureWithTumbnail(thumbnail_height=120) {
      let video = this.$refs.webcam.$refs.video;
      if (!this.ctx) {
        let canvas = document.createElement("canvas");
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
      }
      if(!this.ctx_thumbnail || thumbnail_height != this.canvas_thumbnail.height){
        let canvas = document.createElement("canvas");
        let imageRatio = video.videoWidth/video.videoHeight;
        let newWidth = thumbnail_height * imageRatio;
        canvas.width = newWidth;
        canvas.height = thumbnail_height;
        this.canvas_thumbnail = canvas;
        this.ctx_thumbnail = canvas.getContext("2d");
      }
      const { ctx, ctx_thumbnail, canvas_thumbnail, canvas } = this;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx_thumbnail.drawImage(video,0,0,canvas_thumbnail.width,canvas_thumbnail.height);
      let image = await this.canvasToBlob(canvas);
      let thumbnail = await this.canvasToBlob(canvas_thumbnail);
      return {image: image, thumbnail: thumbnail, width : canvas.width, height: canvas.height};
    }
  }
}
</script>
<style lang="scss" scoped>
.config-camera-float-button{
  display: inline;
  position: absolute;
  margin-top: -38px;
  right: 20px;
}

.display-panel {
  border-radius: 8px;
  background-color: #333;
  overflow: hidden;
  margin-top: 15px;
  display: flex;
  .display-image {
    margin: 0;
    canvas {
      min-height: 180px;
      height: 180px;
      width: 100%;
      object-fit: cover;
    }
  }
}
.liveview {
  margin: 2em 1em;
}
</style>