import Comments from "../models/CommentModel.js";
import Users from "../models/UserModel.js";

export const getComments = async (req, res) => {
    try {
        const comments = await Comments.findAll({
            where: {
                itemId: req.params.itemId
            },
            include: [
                {
                    model:  Users,
                    required: false
                },
            ],
            order: [
                ['createdAt', 'DESC'],
            ]
        });
        res.json(comments);

    }catch (e) {
        console.log(e)
    }

}

export const newComments = async (req, res) => {
    try {
        const userId = req.userId;
        const itemId = req.params.itemId;
        let newComments = await Comments.create({ ...req.body, userId, itemId });

        if(newComments){
            return res.json({
                message: 'Comment created successfully',
                data: newComments
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        })
    }
}
