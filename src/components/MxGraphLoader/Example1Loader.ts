import myfactory from "./myGraphLoader";

const mx = myfactory({
    mxBasePath: "/mxgraph-base",
    mxImageBasePath: "mxgraph-base/images",
});

export const myEvent = mx.mxEvent;
export const myGraph = mx.mxGraph;
