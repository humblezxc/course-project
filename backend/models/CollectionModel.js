import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Items from "./Item.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Collections = db.define('collections',{
    collectionName:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.TEXT
    },
    topic:{
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER
    },
    digit_1_enabled:{
        type: DataTypes.BOOLEAN
    },
    digit_1_name:{
        type: DataTypes.STRING
    },
    digit_2_enabled:{
        type: DataTypes.BOOLEAN
    },
    digit_2_name:{
        type: DataTypes.STRING
    },
    digit_3_enabled:{
        type: DataTypes.BOOLEAN
    },
    digit_3_name:{
        type: DataTypes.STRING
    },
    string_1_enabled:{
        type: DataTypes.BOOLEAN
    },
    string_1_name:{
        type: DataTypes.STRING
    },
    string_2_enabled:{
        type: DataTypes.BOOLEAN
    },
    string_2_name:{
        type: DataTypes.STRING
    },
    string_3_enabled:{
        type: DataTypes.BOOLEAN
    },
    string_3_name:{
        type: DataTypes.STRING
    },
    text_1_enabled:{
        type: DataTypes.BOOLEAN
    },
    text_1_name:{
        type: DataTypes.STRING
    },
    text_2_enabled:{
        type: DataTypes.BOOLEAN
    },
    text_2_name:{
        type: DataTypes.STRING
    },
    text_3_enabled:{
        type: DataTypes.BOOLEAN
    },
    text_3_name:{
        type: DataTypes.STRING
    },
    boolean_1_enabled:{
        type: DataTypes.BOOLEAN
    },
    boolean_1_name:{
        type: DataTypes.STRING
    },
    boolean_2_enabled:{
        type: DataTypes.BOOLEAN
    },
    boolean_2_name:{
        type: DataTypes.STRING
    },
    boolean_3_enabled:{
        type: DataTypes.BOOLEAN
    },
    boolean_3_name:{
        type: DataTypes.STRING
    },
    date_1_enabled:{
        type: DataTypes.BOOLEAN
    },
    date_1_name:{
        type: DataTypes.STRING
    },
    date_2_enabled:{
        type: DataTypes.BOOLEAN
    },
    date_2_name:{
        type: DataTypes.STRING
    },
    date_3_enabled:{
        type: DataTypes.BOOLEAN
    },
    date_3_name:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

Collections.belongsTo(Users);
Collections.hasMany(Items);

export default Collections;
