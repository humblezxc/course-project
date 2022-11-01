import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Collections from "./CollectionModel.js";
import Comments from "./CommentModel.js";
import Items from "./ItemModel.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    firstName:{
        type: DataTypes.STRING
    },
    lastName:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
    isAdmin:{
        type: DataTypes.BOOLEAN
    },
    isBlocked:{
        type: DataTypes.BOOLEAN
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
    Users.hasMany(Collections)
    Users.hasMany(Comments);
    Users.hasMany(Items);
})();

export default Users;
