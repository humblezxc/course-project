import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Collections from "./CollectionModel.js";
import Comments from "./CommentModel.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Items = db.define('items',{
    itemName:{
        type: DataTypes.STRING
    },
    collectionId: {
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER
    },
    digit_1_value:{
        type: DataTypes.INTEGER
    },
    digit_2_value:{
        type: DataTypes.INTEGER
    },
    digit_3_value:{
        type: DataTypes.INTEGER
    },
    string_1_value:{
        type: DataTypes.STRING
    },
    string_2_value:{
        type: DataTypes.STRING
    },
    string_3_value:{
        type: DataTypes.STRING
    },
    text_1_value:{
        type: DataTypes.TEXT
    },
    text_2_value:{
        type: DataTypes.TEXT
    },
    text_3_value:{
        type: DataTypes.TEXT
    },
    boolean_1_value:{
        type: DataTypes.BOOLEAN
    },
    boolean_2_value:{
        type: DataTypes.BOOLEAN
    },
    boolean_3_value:{
        type: DataTypes.BOOLEAN
    },
    date_1_value:{
        type: DataTypes.DATE
    },
    date_2_value:{
        type: DataTypes.DATE
    },
    date_3_value:{
        type: DataTypes.DATE
    }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
} )();

Items.belongsTo(Collections);
Items.belongsTo(Users);
Items.hasMany(Comments);

export default Items;
