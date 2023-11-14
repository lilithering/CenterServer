const { cerr, cinfo, clog } = require("./../ArchLib/LogManagement");
const express = require("./../ArchLib/Common/express");
const vhost = require("./../ArchLib/Common/vhost");

let m_strDomain;
let m_cbOnline = (err) => { if (err) return cerr("Falha ao conectar o aplicativo"); return cinfo("Servidor online", { domain: m_strDomain }); }

const MServerBase = new class MServerBase {
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
        this.app.listen(80, m_cbOnline);
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
        if (!m_strDomain) return cerr("O domínio não foi definido");

        this.app.use(vhost(`${strSubDomain}.${m_strDomain}`, Router));

        cinfo(`Subdomínio (${strSubDomain}) adicionado com sucesso!`);
        return true;
    };
    SetDomain(strDomain) {
        m_strDomain = strDomain;

        cinfo("Domínio definido com sucesso");
        return true;
    };
};

module.exports = { MServerBase };