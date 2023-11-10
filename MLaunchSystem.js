const { cerr, cinfo } = require("./../LogManagement/LogManagement");
const { SBMAServerBase } = require("./MServerBase");
const router = require("./INRouter");

const LSMALaunchSystem = new class LSMALaunchSystem {
    constructor() {
        cinfo("Iniciando LaunchSystem");
    }
};

module.exports = { LSMALaunchSystem };