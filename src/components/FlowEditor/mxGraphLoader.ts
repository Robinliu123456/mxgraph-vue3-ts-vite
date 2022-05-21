import factory, { type mxGraphOptions } from "mxgraph";

const factoryOption: mxGraphOptions = {
    mxBasePath: "/mxgraph-base",
    mxDefaultLanguage: "en",
    mxImageBasePath: "/mxgraph-base/images",
    mxLanguage: "en",
    mxLoadResources: false,
    mxLoadStylesheets: true,
};

(window as any)["mxBasePath"] = factoryOption.mxBasePath;
(window as any)["mxDefaultLanguage"] = factoryOption.mxDefaultLanguage;
(window as any)["mxImageBasePath"] = factoryOption.mxImageBasePath;
(window as any)["mxLoadResources"] = factoryOption.mxLoadResources;
(window as any)["mxLoadStylesheets"] = factoryOption.mxLoadStylesheets;
(window as any)["mxForceIncludes"] = false; // 当通过commonjs加载时为false, 否则会向页面加载script
(window as any)["mxResourceExtension"] = ".txt";

const mx = factory({});

export default mx;
