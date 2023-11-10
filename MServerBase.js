const { cerr, cinfo, clog } = require("../LogManagement/LogManagement");
const express = require("./../Lib/express");
const vhost = require("./../Lib/vhost");

const SBMAServerBase = new class SBMAServerBase {
    constructor() {
        cinfo("Iniciando ServerBase");
        if (!this.Create()) return cerr("Falha ao tentar criar o APP");

        cinfo("ServerBase iniciado com sucesso");
    }
    Define() {
        this.app.get("/", (req, res) => {
            res.send("online");
        });

        cinfo("Definição concluída");
        return true;
    }
    Listen() {
        cinfo("Inicializando o aplicativo");
        this.app.listen(80, (err) => { if (err) return cerr("Falha ao conectar o aplicativo"); cinfo("Servidor online", { domain: this.m_strDomain }); });
    }
    Test() {
        cinfo("Teste executado com sucesso");
        return true;
    }
    Create() {
        this.app = express();

        cinfo("O app foi criado");
        return true;
    }
    Sub(strSubDomain, Router) {
        if (!this.m_strDomain) return cerr("O domínio não foi definido");

        this.app.use(vhost(`${strSubDomain}.${this.m_strDomain}`, Router));

        cinfo(`Subdomínio (${strSubDomain}) adicionado com sucesso!`);
        return true;
    };
    SetDomain(strDomain) {
        this.m_strDomain = strDomain;

        cinfo("Domínio definido com sucesso");
        return true;
    };
};

module.exports = { SBMAServerBase };