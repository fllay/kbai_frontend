import JSZip from "jszip";
export const state = () => ({
  initialDevice: "BROWSER",
  currentDevice: "BROWSER", //BROWSER, ROBOT , should auto detect
  serverUrl: "http://localhost:8989/",
  currentWifi: "",
  isRunning: false,
  selectedMenu: 0,
  //----- save project ------//
  saving: false,
  savingProgress: 0,
});
//---- modal id ----//
//new-project-modal
//open-project-modal
//delete-project-modal
export const mutations = {
  setDevice(state, device) {
    state.currentDevice = device;
  },
  setMenu(state, menu) {
    state.selectedMenu = menu;
  },
  setSaving(state, data) {
    state.saving = data;
  },
  setSavingProgress(state, progress) {
    state.savingProgress = progress;
  },
};

export const actions = {
  async changeDevice(context, deviceType) {
    //do something
    context.commit("setDevice", deviceType);
  },
  async listWifi(context) {
    // fetch all wifi
    let wifis = [];
    //context.commit("setAvailableWifi", wifis);
  },
  async connectWifi(context, name) {
    //context.commit("setWiFi", name);
    //context.commit("setConnectWifiModal", false);
  },
  async saveProject({ commit, dispatch, state, rootState }) {
    commit("setSaving", true);
    commit("setSavingProgress", 0);
    let that = this;
    if (state.currentDevice == "BROWSER") {
      let zip = new JSZip();
      zip.file("project.json", JSON.stringify(rootState));
      //---------- save dataset raw ------------//
      let rawDataset = zip.folder("raw_dataset");
      let datasets = rootState.dataset.dataset.data;
      for (let [i, data] of datasets.entries()) {
        let filename = data.id + "." + data.ext;
        let fileData = await dispatch("dataset/getDataAsFile", filename);
        let progress = ((i + 1) / datasets.length) * 100;
        commit("setSavingProgress", progress);
        rawDataset.file(filename, fileData);
      }
      //---------- save output (model) ---------//
      zip
        .generateAsync({
          type: "blob",
        })
        .then(function (content) {
          that.$helper.downloadBlob("project.zip", content);
        })
        .finally(() => {
          commit("setSaving", false);
        });
    } else if (state.currentDevice == "ROBOT") {
      //sync project instead
    }
  },
};
