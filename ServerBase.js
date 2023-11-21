/*****************************
Base Server
Aplicativo Base para Gateway
Author: Lilithering (lilithering@gmail.com)
Update: 23-11-20
[Output] A::BaseServer
******************************/

const { cerr, cinfo, clog } = require("./../ArchLib/LogManagement");
const express = require("./../ArchLib/Common/express");
const vhost = require("./../ArchLib/Common/vhost");

let m_strDomain;
let m_cbOnline = (err) => { if (err) return cerr("Falha ao conectar o aplicativo"); return cinfo("Servidor online", { domain: m_strDomain }); }

const ABaseServer = new class ABaseServer {
    constructor() {
        cinfo("Iniciando servidor base");
        cinfo("Criando aplicativo")
        this.App = express();
        cinfo("Servidor base iniciado com sucesso");
    }
    Define() {
        this.App.get("/", (req, res) => {
            res.send("online");
        });

        cinfo("Rota definida com sucesso");
        return true;
    }
    Listen() {
        this.App.listen(80, m_cbOnline);
    }
    Sub(strSubDomain, Router) {
        if (!m_strDomain) return cerr("O domínio não foi definido");
        if (!Router) return cerr("Rota inválida", { strSubDomain, Router });

        this.App.use(vhost(`${strSubDomain}.${m_strDomain}`, Router));

        cinfo(`Subdomínio (${strSubDomain}) adicionado com sucesso!`);
        return true;
    };
    SetDomain(strDomain) {
        m_strDomain = strDomain;

        cinfo("Domínio definido com sucesso");
        return true;
    };
};

module.exports = { ABaseServer };