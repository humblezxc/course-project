import Comments from "../models/CommentModel.js";

export const getComments = async (req, res) => {
    try {
        const comments = await Comments.findAll({
            where: {
                itemId: req.params.itemId
            }
        });
        res.json(comments);

    }catch (e) {
        console.log(e)
    }

}

export const newComments = async (req, res) => {
    try {
        // const userId = req.user.userId;
        const userId = 1;
        const itemId = req.params.itemId;
        let newComments = await Comments.create({ ...req.body, userId, itemId });

        if(newComments){
            return res.json({
                message: 'Comment created successfully',
                data: newComments
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