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
                    required: true
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
            order: [
                ['createdAt', 'DESC'],
            ]
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
            }
        });
        res.json(item);
    } catch (error) {
        console.log(error);
    }
}

export const newItem = async (req, res) => {
    try {
        // const userId = req.user.userId;
        const userId = 1;

        let newItem = await Items.create({ ...req.body, userId });

        if(newItem){
            return res.json({
                message: 'Item created successfully',
                data: newItem
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
