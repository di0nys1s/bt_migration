const Pool = require( 'pg' ).Pool;

pool = new Pool( {
    user: 'di0nys1s',
    password: '7946',
    host: 'localhost',
    port: 5432,
    database: 'btmigration'
} )

module.exports = pool;