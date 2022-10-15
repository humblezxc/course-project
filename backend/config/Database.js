import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME, process.env.PASSWORD, {
    host: process.env.DBHOST,
    dialect: "mysql"
});

export default db;
