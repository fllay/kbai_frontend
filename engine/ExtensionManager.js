import Vue from "vue";
export default async (context, inject) => {
  const exts = require.context("@/extensions", true, /config\.js$/);
  const extComponents = require.context("@/extensions", true, /\.vue$/).keys();
  let configs = [];
  for (let key of exts.keys()) {
    let extFolder = key.split("/")[1];
    let config = (await import(`@/extensions/${extFolder}/config.js`)).default;
    //let trainConfig = (await import(`@/extensions/${extFolder}/train.js`)).default;
    let model = (await import(`@/extensions/${extFolder}/model.json`)).default;
    // initialize extension , ... but it no need with Vue, it computed in runtime.
    // parse extension's components
    let currentExtComponents = extComponents.filter((el) =>
      el.startsWith(`./${extFolder}/Components`)
    );
    config.model = model;
    config.components = Object.fromEntries(
      currentExtComponents.map((el) => [
        el.split("/").pop().split(".").shift(),
        el.substring(2),
      ])
    );
    configs.push(config);
    console.log("loading extension : ", extFolder);
  }
  inject("extensions", configs);
};
