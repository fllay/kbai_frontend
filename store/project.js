export const state = () => ({
  project: {
    name: "",
    description: "",
    id: null,
    projectType: null, //id of extension
    lastUpdate: null,
    dataset: [],
    labels: [],
    model: null,
    options: {}, // ค่าจาก config options ของโปรเจค
  },
  projects: [],
  isLoading: false,
  isSaving: false,
});
export const filter = (mutation) => {
  return mutation.type == "project";
};
export const mutations = {
  setProject(state, project) {
    state.project = project;
  },
  setProjects(state, projects) {
    state.projects = projects;
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setSaving(state, isSaving) {
    state.isSaving = isSaving;
  },
  addLabel(state, label) {
    if (!state.project.labels.find((el) => el.label == label.label)) {
      state.project.labels.push(label);
    }
  },
  setLabel(state, labels) {
    state.project.labels = labels;
  },
  removeLabel(state, label) {
    state.project.labels = state.project.labels.filter(
      (el) => el.label != label
    );
  },
  changeLabel(state, { oldLabel, newLabel }) {
    let ind = state.project.labels.findIndex((el) => el.label == oldLabel);
    state.project.labels[ind].label = newLabel;
  },
  saveModel(state, model) {
    state.project.model = model;
  },
};
export const getters = {
  getLabels: (state) => {
    return state.project.labels;
  },
  getModel: (state) => {
    return state.project.model || state.project.extension.model;
  },
};
export const actions = {
  async createProject({ commit, dispatch }, project) {
    commit("setSaving", true);
    commit("setProject", project);
    // init dataset for this project
    let dataset = {
      project: project.id, //project id
      datasetType: project.extension.id, //id of extension
      data: [],
    };
    console.log("call create dataset with", dataset);
    dispatch("dataset/createDataset", dataset, { root: true });
    // ----
    commit("setSaving", false);
  },
  async saveProject(context, project) {
    //save to server
    context.commit("setProject", project);
  },
  async fetchProjects(context) {
    // fetch project
    let projects = [];
    context.commit("setProjects", projects);
  },
  async saveProject(context) {},
  async deleteProject(context, project) {},
};
