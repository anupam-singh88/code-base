const models = require('../models');
// const { postSchema } = require('../validations/post');
const Joi = require('joi')
// console.log("🚀 ~ models:", models.POST);


function save(req, res) {
    // const { error } = postSchema.validate(req.body)
    // if (error) {
    //     return res.status(400).json({ message: error.details[0].message });
    // }
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId,
        userId: req.body.categoryId
    };

    models.Category.findByPk(
        post.categoryId
    ).then(category => {
        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            })
        } else {
            models.POST.create(post).then(result => {
                res.status(201).json({
                    message: "Post created successfully",
                    post: result
                })
            }).catch(err => {
                // console.log(err)
                res.status(500).json({
                    message: "Something went wrong",
                    error: err
                })
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong",
            error: err
        })
    }
    )


}

function show(req, res) {
    const id = req.params.id;
    // console.log("🚀 ~ show ~ id:", id);
    models.POST.findByPk(id).then(post => {
        if (post) {
            res.status(200).json({
                post
            })
        } else {
            res.status(404).json({
                message: "Post not found"
            })
        }

    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong",
            error: err
        })
    })
}

function showAll(req, res) {
    models.POST.findAll().then(result => {
        res.status(200).json({
            posts: result
        })
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong",
            error: err
        })
    })
}

//function to update
function update(req, res) {
    const id = req.params.id;
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId
    }
    models.POST.update(updatedPost, { where: { id: id } }).then(result => {
        res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost
        })
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong",
            error: err
        })
    })
}

//function to delete data
function destroy(req, res) {
    const id = req.params.id;
    models.POST.destroy({ where: { id: id } }).then(result => {
        res.status(200).json({
            message: "Post deleted successfully"
        })
    }).catch(err => {
        res.status(500).json({
            message: "Something went wrong",
            error: err
        })
    })
}

module.exports = { save, showAll, show, update, destroy };