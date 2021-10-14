const config = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "pgroot",
    DB: "FarmLet",
    dialect: "postgres",
    pool: {
        max: 6,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = config;
