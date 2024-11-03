const mysql = require('mysql2/promise');

console.log("init mysql");

class Mysql {
    pool;

    constructor() {
        this.pool = mysql.createPool({
            host: '0.0.0.0',
            port: 3306,
            user: 'bookworm',
            password: '#pmDP#Wi@7JtXEhn@GT#_7mrOG#ItFk_#o',
            database: '#i@UP6dS8axcYtSTa##Z@1R@VUPXExsJhv_',
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });
    };
};


new Mysql();