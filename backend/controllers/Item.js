import Items from "../models/Item.js";

export const getItems = async (req, res) => {
    try {
        const items = await Items.findAll({
            where: {
                collectionId: req.params.collectionId

            }
        });
        res.json(items);
    } catch (error) {
        console.log(error);
    }
}

export const getItem = async (req, res) => {
    try {
        const items = await Items.findOne({
            where: {
                id: req.params.id

            }
        });
        res.json(items);
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
