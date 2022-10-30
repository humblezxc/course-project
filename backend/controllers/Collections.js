import Collections from "../models/CollectionModel.js";
import Users from "../models/UserModel.js";
import Items from "../models/ItemModel.js";

export const getCollection = async (req, res) => {
    try {
        const collection = await Collections.findByPk(req.params.id,             { include: [
                {
                    model: Users,
                    require: true
                },
                {
                    model: Items,
                    require: true
                },
            ]
        });
        if (collection) {
            res.status(200).send(collection);
        } else {
            res.status(404).send("Collection not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const getCollections = async (req, res) => {
    try {
        const collections = await Collections.findAll({
            attributes: ['id', 'collectionName', 'description', 'topic', 'digit_1_enabled', 'digit_1_name', 'digit_2_enabled', 'digit_2_name', 'digit_3_enabled', 'digit_3_name',
                'string_1_enabled', 'string_1_name', 'string_2_enabled', 'string_2_name', 'string_3_enabled', 'string_3_name',
                'text_1_enabled', 'text_1_name', 'text_2_enabled', 'text_2_name', 'text_3_enabled', 'text_3_name',
                'boolean_1_enabled', 'boolean_1_name', 'boolean_2_enabled', 'boolean_2_name', 'boolean_3_enabled', 'boolean_3_name',
                'date_1_enabled', 'date_1_name', 'date_2_enabled', 'date_2_name', 'date_3_enabled', 'date_3_name'],
            include: [
                {
                    model: Users,
                    require: true
                },
                {
                    model: Items,
                    require: true
                },
            ]
        })
        res.json(collections)
    }catch (error){
        console.log(error);
    }
}
export const NewCollection = async(req, res) => {
    console.log(req.body)

    try {
        let newCollection = await Collections.create(req.body);
        if(newCollection){
            return res.json({
                message: 'Collection created successfully',
                data: newCollection
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        })
    }
}
