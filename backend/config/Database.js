import { Sequelize } from "sequelize";

const db = new Sequelize('course_db', 'root', 'password', {
    host: "localhost",
    dialect: "mysql"
});

export default db;
