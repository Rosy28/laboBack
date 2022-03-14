const { Pool } = require('pg');

const pool = new Pool({
    host: 'ec2-3-228-86-183.compute-1.amazonaws.com',
    user: 'znzpcqasvuoqui',
    password: '9de7b3b4932ec60112e193ac9f9724157d972b6047d24d5860d73eb8d92f2249',
    database: 'd4g85cicvo64oa',
    port: '5432',
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;