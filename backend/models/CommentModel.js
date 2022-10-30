import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Items from "./Item.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Comments = db.define('comments',{
    body:{
        type: DataTypes.TEXT
    },
    userId:{
        type: DataTypes.INTEGER
    },
    itemId:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

Comments.belongsTo(Users);
Comments.belongsTo(Items);

export default Comments;
