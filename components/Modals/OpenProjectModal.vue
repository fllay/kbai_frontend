<template>
  <b-modal
      id="open-project-modal"
      title="เปิดโปรเจค"
      @show="fetchProject"
      @hidden="clearForm"
      @ok="openProject"
      :ok-disabled="!projectState"
    >
      <div v-if="currentDevice == 'ROBOT'">
        <form @submit.stop.prevent="">
          <b-form-group label="Project type">
            <b-form-select
              id="project-type"
              v-model="selectType"
              :options="models"
              required
            ></b-form-select>
          </b-form-group>
        </form>
        <p class="p-notice-color small">* เลือกโปรเจคที่ต้องการเปิด</p>
      </div>
      <div v-else-if="currentDevice == 'BROWSER'">
        <b-row class="mb-4">
          <b-col>
            <b-form-file
              v-model="files"
              placeholder="เลือกโฟลเดอร์ของโปรเจค"
              drop-placeholder="ลากโฟลเดอร์ของโปรเจคมาวางที่นี่..."
              multiple
              directory
            >
            </b-form-file>
          </b-col>
        </b-row>
        <p class="p-notice-color small">* เลือกโฟลเดอร์ของโปรเจคที่ต้องการเปิด</p>
      </div>
    </b-modal>
</template>
<script>
import { mapState, mapActions, mapMutations  } from 'vuex';
export default {
  data(){
    return {
      models: [
        { text: 'เลือกประเภทการเรียนรู้ (Select training type)', value: null },
        ...this.$extensions.map((el) => ({text : el.title, value : el.id}))
      ],
      selectType : null,
      projectList : [],
      projectToOpen : null,
      files : null,
      step: 1, //1= select folder , 2 = importing, 3 = import success
      progress : 0,
      percentage : 0,
    };
  },
  created(){
  },
  computed: {
    ...mapState(["currentDevice"]),
    ...mapState('project', [
      'project',
      'listProjectModal',
      'isLoading',
      'isSaving',
    ]),
    projectState() {
      if(this.currentDevice == "BROWSER"){
        return this.step >= 3;
      }else if(this.currentDevice == "ROBOT"){
        return this.projectToOpen ? true : false
      }
    }
  },
  methods : {
    clearForm(){
      this.selectType = null;
      this.projectToOpen = null;
      this.projectList = [];

      this.files = [];
      this.step = 1;
      this.progress = 0;
    },
    fetchProject(){
      if(this.currentDevice == "ROBOT"){
        //call service to open project
      }
    },
    async openProject(e){
      if(this.step == 1){ //selecting file
        e.preventDefault();
        this.step = 2;
        this.progress = 0;
        for(let file of this.files){
          this.progress+=1;
          this.percentage= Math.round(this.progress/this.files.length*100);
          //await this.delay(100);
        }
        this.step = 3;
        console.log("import success");
      }else if(this.step == 3){
        //import success 
      }
    },
    async delay(time){
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve();
        },time);
      });
    },
  }
}
</script>