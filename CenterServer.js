/*****************************
Center Server
Gateway para Web Services
Author: Lilithering (lilithering@gmail.com)
Update: 23-11-20
[Output] A::CenterServer
******************************/

const { cerr, cinfo, clog } = require("./../ArchLib/LogManagement");
const { ABaseServer } = require("./ServerBase");
const settings = require("./config.js");

const ACenterServer = new class ACenterServer {
    constructor() {
        cinfo("Iniciando o Gateway");
        this.m_strDomain = settings.Domain ?? "localhost";
        if (!ABaseServer.SetDomain(this.m_strDomain)) return cerr("Falha ao definir o domínio");
        cinfo("Carregando rotas");
        for (var index in settings.routes) {
            var router = settings.routes[index].router;
            if (!ABaseServer.Sub(index, router)) return cerr("Falha ao definir rota", { index, router });
        }
        cinfo("Rotas carregadas com sucesso");
        cinfo("Iniciando o servidor");
        ABaseServer.Listen();
        cinfo("Gateway finalizado");
    }
};

module.exports = { ACenterServer };