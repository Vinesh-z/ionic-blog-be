const express = require('express');
const router = express.Router();
const ModBlogController = require('../controller/moderatorBlog.controller');


router.post('/', ModBlogController.createBlog);
router.post('/image/:id', ModBlogController.postImage);
router.put('/:id', ModBlogController.updateBlog);
router.delete('/:id', ModBlogController.deleteBlogById);
router.get('/findModBlogs',ModBlogController.findAllBlogs);
router.get('/findBlog/:id',ModBlogController.findBlog);
router.post('/approve', ModBlogController.approveBlog);
router.post('/reject/:id',ModBlogController.rejectBlog);
router.get('/userId/:id', ModBlogController.findbyUserId);

module.exports = router;