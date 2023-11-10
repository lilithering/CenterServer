const { cerr, cinfo } = require("./../LogManagement/LogManagement");
const { SBMAServerBase } = require("./MServerBase");
const { LSMALaunchSystem } = require("./MLaunchSystem");
const instance = require("./INRouter");
const settings = require("./INCenterServer");


const CSMACenterServer = new class CSMACenterServer {
    constructor() {
        cinfo("Iniciando o CenterServer");
        this.m_strDomain = settings.Domain ?? "localhost";
        if (!SBMAServerBase.SetDomain(this.m_strDomain)) return cerr("Falha ao definir o domínio");
        if (!this.LoadRouter()) return cerr("Falha ao carregar as rotas");
        
        this.Init();
        cinfo("CenterServer finalizado");
    }
    Init() {
        cinfo("Iniciando Servidor");
        SBMAServerBase.Listen();
    }
    LoadRouter() {
        for (let i in instance) {
            if (!SBMAServerBase.Sub(i, instance[i].router)) return cerr("Falha ao definir rota");
        }

        cinfo("Rotas carregadas com sucesso");
        return true;
    };
};

module.exports = { CSMACenterServer };