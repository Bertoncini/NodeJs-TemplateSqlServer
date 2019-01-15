var sql = require('mssql');

const config = {
    user: 'userReadyOnly',
    password: 'yourPassword',
    server: '127.0.0.1',
    database: 'dataBase',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustedConnection: true
    }
}

exports.get = (req, res, next) => {
    execSQLQuery("select * from Tabela", res);
};

exports.getParam = (req, res, next) => {
    execSQLQuery(`select * from Tabela where filtro = ${req.params.Param1}`, res);
};

exports.getRoute = (req, res, next) => {
    execSQLQuery(`select * from Tabela2`, res);
};

function execSQLQuery(sqlQry, res) {

    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.query(sqlQry)
    }).then(result => {
        //Em caso de sucesso ira retornar o resultado da consulta
        res.send(result.recordset)
    }).catch(err => {
        //Em caso de erro ira retornar 400 e seu respectivo erro
        res.status(400).send(err)
    })
};