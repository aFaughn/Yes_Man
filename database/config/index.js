module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    db: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.DB_HOST
    }
}