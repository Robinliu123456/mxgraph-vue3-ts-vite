// TS封装📦mxgraph，引入工具类函数，进行流程图开发，有区别于vue2+js的写法
import factory, { mxGraphOptions } from "mxgraph";

const factoryOption: mxGraphOptions = {
    mxBasePath: "assets/mxgraph",
    mxDefaultLanguage: "en",
    mxImageBasePath: "assets/mxgraph/images",
    mxLanguage: "en",
    mxLoadResources: false,
    mxLoadStylesheets: true,
};

(window as any)["mxBasePath"] = factoryOption.mxBasePath;
(window as any)["mxDefaultLanguage"] = factoryOption.mxDefaultLanguage;
(window as any)["mxImageBasePath"] = factoryOption.mxImageBasePath;
(window as any)["mxLoadResources"] = factoryOption.mxLoadResources;
(window as any)["mxLoadStylesheets"] = factoryOption.mxLoadStylesheets;
(window as any)["mxForceIncludes"] = false;
(window as any)["mxResourceExtension"] = ".txt";

const mx = factory({});

export default mx;
