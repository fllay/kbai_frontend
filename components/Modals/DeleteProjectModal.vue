<template>
  <b-modal
      id="delete-project-modal"
      title="ลบโปรเจค"
      @show="clearForm"
      @hidden="clearForm"
      @ok="deleteProject"
      :ok-disabled="!projectState"
  >
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
    <p class="p-notice-color small">* เลือกโปรเจคที่ต้องการลบ</p>
    
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
      projectToDelete : null,
    };
  },
  created(){
  },
  computed: {
    ...mapState('project', [
      'project',
      'listProjectModal',
      'isLoading',
      'isSaving',
    ]),
    projectState() {
      return this.projectToDelete ? true : false
    }
  },
  methods : {
    clearForm(){
      this.selectType = null;
      this.projectToDelete = null;
      this.projectList = [];
    },
    deleteProject(){

    },
    fetchProject(){

    }
  }
}
</script>