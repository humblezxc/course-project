import Items from "../models/ItemModel.js";
import Collections from "../models/CollectionModel.js";
import Comments from "../models/CommentModel.js";
import Users from "../models/UserModel.js";

export const getItems = async (req, res) => {
    try {
        const items = await Items.findAll({
            where: {
                collectionId: req.params.collectionId
            },
            include: [
                {
                    model: Collections,
                    required: true
                },
                {
                    model: Users,
                    required: true
                },
                {
                    model: Comments,
                    required: false
                },
            ]
        });
        res.json(items);
    } catch (error) {
        console.log(error);
    }
}

export const lastItems = async (req, res) => {
    try {
        const lastItems = await Items.findAll( {
            include: [
                {
                    model: Collections,
                    required: false
                },
                {
                    model: Users,
                    required: false
                },
            ],
            order: [
                ['createdAt', 'DESC'],
            ],
            limit: 5
        });
        res.json(lastItems);
    } catch (error) {
        console.log(error);
    }
}

export const getItem = async (req, res) => {
    try {
        const item = await Items.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Collections,
                    required: true
                },
                {
                    model: Users,
                    required: true
                },
            ]
        });
        res.json(item);
    } catch (error) {
        console.log(error);
    }
}

export const newItem = async (req, res) => {
    try {
        const userId = req.userId;

        let newItem = await Items.create({ ...req.body, userId });

        if(newItem){
            return res.json({
                message: 'Item created successfully',
                data: newItem
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        })
    }
}

export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteRowCount = await Items.destroy({
            where: {
                id
            }
        });
        res.json({
            message: 'Item deleted successfully',
            count: deleteRowCount
        })
    } catch (error) {
        console.log(error);
    }
}
