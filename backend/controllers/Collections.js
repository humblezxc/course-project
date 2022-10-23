import Collections from "../models/CollectionModel.js";

export const getCollections = async (req, res) => {
    try {
        const collections = await Collections.findAll({
            attributes: ['id', 'collectionName', 'description', 'topic', 'digit_1_enable', 'digit_1_name', 'digit_2_enable', 'digit_2_name', 'digit_3_enable', 'digit_3_name',
                'string_1_enable', 'string_1_name', 'string_2_enable', 'string_2_name', 'string_3_enable', 'string_3_name',
                'text_1_enable', 'text_1_name', 'text_2_enable', 'text_2_name', 'text_3_enable', 'text_3_name',
                'boolean_1_enable', 'boolean_1_name', 'boolean_2_enable', 'boolean_2_name', 'boolean_3_enable', 'boolean_3_name',
                'date_1_enable', 'date_1_name', 'date_2_enable', 'date_2_name', 'date_3_enable', 'date_3_name']
        })
        res.json(collections)
    }catch (error){
        console.log(error);
    }
}
export const NewCollection = async(req, res) => {
    const { collectionName, description, topic } = req.body;
    try {
        await Collections.create({
            collectionName: collectionName,
            description: description,
            topic: topic,
        });
        res.json({msg: "Collection Creation Successful"});
    } catch (error) {
        console.log(error);
    }
}
