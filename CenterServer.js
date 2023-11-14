const { cerr, cinfo } = require("./../ArchLib/LogManagement");
const { MServerBase } = require("./ServerBase");
const settings = require("./config.js");


const MCenterServer = new class MCenterServer {
    constructor() {
        cinfo("Iniciando o CenterServer");
        this.m_strDomain = settings.Domain ?? "localhost";
        if (!MServerBase.SetDomain(this.m_strDomain)) return cerr("Falha ao definir o domínio");
        if (!this.LoadRouter()) return cerr("Falha ao carregar as rotas");

        this.Init();
        cinfo("CenterServer finalizado");
    }
    Init() {
        cinfo("Iniciando Servidor");
        MServerBase.Listen();
    }
    LoadRouter() {
        for (let i in settings.routes) {
            if (!MServerBase.Sub(i, settings.routes[i].router)) return cerr("Falha ao definir rota");
        }

        cinfo("Rotas carregadas com sucesso");
        return true;
    };
};

module.exports = { MCenterServer };