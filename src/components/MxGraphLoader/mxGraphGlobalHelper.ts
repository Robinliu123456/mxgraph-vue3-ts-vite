import { type mxGraphOptions } from "mxgraph";
import { App } from "vue";

let mxBasePath: string = ".";
let mxDefaultLanguage: string = "en";
let mxImageBasePath: string = "./images";
let mxLanguage: string = "en";
let mxLoadResources: boolean = false;
let mxLoadStylesheets: boolean = false;
let mxForceIncludes: boolean = false;
let mxResourceExtension: string = ".txt";

const configGlobalMxGraphProperties = (app: App) => {
    app.config.globalProperties.$mxBasePath = mxBasePath;
    app.config.globalProperties.$mxDefaultLanguage = mxDefaultLanguage;
    app.config.globalProperties.$mxImageBasePath = mxImageBasePath;
    app.config.globalProperties.$mxLanguage = mxLanguage;
    app.config.globalProperties.$mxLoadResources = mxLoadResources;
    app.config.globalProperties.$mxLoadStylesheets = mxLoadStylesheets;
    app.config.globalProperties.$mxForceIncludes = mxForceIncludes;
    app.config.globalProperties.$mxResourceExtension = mxResourceExtension;
};

const configWindow = () => {
    (window as any)["mxBasePath"] = mxBasePath;
    (window as any)["mxDefaultLanguage"] = mxDefaultLanguage;
    (window as any)["mxImageBasePath"] = mxImageBasePath;
    (window as any)["mxLoadResources"] = mxLoadResources;
    (window as any)["mxLoadStylesheets"] = mxLoadStylesheets;
    (window as any)["mxForceIncludes"] = false; // 当通过commonjs加载时为false, 否则会向页面加载script
    (window as any)["mxResourceExtension"] = ".txt";
};

const init = (factoryOption: mxGraphOptions) => {
    (window as any)["mxBasePath"] = factoryOption.mxBasePath;
    (window as any)["mxDefaultLanguage"] = factoryOption.mxDefaultLanguage;
    (window as any)["mxImageBasePath"] = factoryOption.mxImageBasePath;
    (window as any)["mxLoadResources"] = factoryOption.mxLoadResources;
    (window as any)["mxLoadStylesheets"] = factoryOption.mxLoadStylesheets;
    (window as any)["mxForceIncludes"] = false; // 当通过commonjs加载时为false, 否则会向页面加载script
    (window as any)["mxResourceExtension"] = ".txt";
};

const mxGraphGlobalHelper = {
    init,
};

export default mxGraphGlobalHelper;
