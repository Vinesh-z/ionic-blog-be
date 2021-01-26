const express = require('express');
const router = express.Router();
const BlogController = require('../controller/blog.controller');


router.get('/', BlogController.findAllBlogs);
router.get('/count/:userId', BlogController.findBlogCount);
router.post('/', BlogController.createBlog);
router.get('/fetch/:first/:second',BlogController.findBlogs);
router.post('/image/:id', BlogController.postImage);
router.get('/search/:id', BlogController.searchBlog);
router.put('/:id', BlogController.updateBlog);
router.get('/byCat/:first/:second/:id', BlogController.getBlogsByCategory);
router.delete('/:id', BlogController.deleteBlogById);
router.get('/find/:id', BlogController.findBlogBykeyword);
router.get('/userId/:first/:second/:id', BlogController.findbyUserId);
router.post('/like', BlogController.like);
router.get('/dislike/:id', BlogController.removeLike);
router.post('/findLike', BlogController.findLike);
router.get('/likedBlogs/:first/:second/:id', BlogController.likedBlogs);

module.exports = router;