import VuexPersistence from "vuex-persist";
import localforage from "localforage";
export default ({ store }) => {
  new VuexPersistence({
    storage: localforage,
    key: "kbai",
    asyncStorage: true,
    reducer: (state) => {
      let cloned = Object.assign({}, state);
      delete cloned.server;
      return cloned;
    },
    //reducer: (state) => ({ dataset: state.dataset, project: state.project }),
  }).plugin(store);
};
