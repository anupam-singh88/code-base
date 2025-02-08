function upload(req, res) {
    if (req.file.filename) {
        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: req.file.filename
        })
    } else {
        res.status(400).json({
            message: "Image upload failed"
        })
    }
}

module.exports = { upload }