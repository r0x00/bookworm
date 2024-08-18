const mysql = require('mysql2/promise');

console.log("init mysql");

const pool = mysql.createPool({
    host: '0.0.0.0',
    port: 3306,
    user:'root',
    password:"bJ0MELC&&@wIW@F#GX&HkDTGm#n&fK3n7#4",
    // user: 'bookworm',
    // password: '?pmDP#Wi@7JtXEhn@GT#_7mrOG#ItFk_#o',
    // database: '$i@!UP6dS8axcYtSTa$$Z@1R@VUPXExsJhv',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});



exports.query = async ({sql, params}) => {
    try {
        const conn = await pool.getConnection();

        conn.execute(sql, params);

    } catch (e) {
        console.log("error occured when trying connect to mysql:" + e);
    };
};