const { Blog } = require('../models/Blogs')

const publishController = async (req, res) => {
    const { title, desc } = (req.body);

    const blog = await Blog.create({
        title,
        body: desc,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`,
    })

    return res.redirect(`/blog/${blog._id}`);
}

const blogController = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate("createdBy");

    res.render('single_blog', {
        title: blog.title,
        content: blog.body,
        authorName: blog.createdBy.name,
        coverImageURL: blog.coverImageURL,
        blogId: req.params.id
    });
}

const editController = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    let userId = (req.user.id)
    const allBlog = await Blog.find({})
    if (blog.createdBy.toString() !== userId) {
        return res.status(401).render("index", {
            msg: 'Not Authorized To Edit Others Blog',
            blogs: allBlog
        });
    }
    res.render('edit_blog', {
        title: blog.title,
        desc: blog.body,
        blogId: req.params.id,
        name: req.user.name
    });
}

const updateBlogController = async (req, res) => {
    const { title, desc } = req.body;
    const newBlog = {};
    if (title) { newBlog.title = title }
    if (desc) { newBlog.body = desc }
    if (req.file) { newBlog.coverImageURL = `/uploads/${req.file.filename}` }

    let checkBlog = await Blog.findById(req.params.id);

    let userId = (req.user.id)

    if (checkBlog.createdBy.toString() !== userId) {
        return res.status(401).send("Not Allowed to Edit Others Blog");
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, { $set: newBlog }, { new: true })
    return res.redirect(`/blog/${blog._id}`);
}

const deleteBlogController = async (req, res) => {
    let userId = (req.user.id)
    let checkBlog = await Blog.findById(req.params.id);
    const allBlog = await Blog.find({})

    if (checkBlog.createdBy.toString() !== userId) {
        return res.status(401).render("index", {
            msg: 'Not Authorized To Delete Others Blog',
            blogs: allBlog
        });
    }
    let data = await Blog.findByIdAndDelete(req.params.id)
    const updateBlog = await Blog.find({})

    res.render('index', {
        blogs: updateBlog
    });
}
module.exports = {
    publishController,
    blogController,
    editController,
    updateBlogController,
    deleteBlogController
}