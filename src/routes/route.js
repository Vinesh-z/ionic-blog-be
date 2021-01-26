const express = require('express');
const router = express.Router();
const blogRoutes = require('../routes/blog.routes');
const userRoutes = require('../routes/user.routes');
const categoryRoutes = require('../routes/category.routes');
const commentRoutes = require('../routes/comments.routes');
const followRoutes = require('../routes/follow.routes');
const modBlogRoutes = require('./moderatorBlog.routes');
const adminRoutes = require('./admin.routes');
const auth = require('../utility/auth');
router.use('/blog',auth.validateToken,  blogRoutes);
router.use('/category',auth.validateToken, categoryRoutes);
router.use('/user', userRoutes );
router.use('/comments',auth.validateToken, commentRoutes);
router.use('/follow',auth.validateToken, followRoutes);
router.use('/modBlog',auth.validateToken, modBlogRoutes);
router.use('/admin',auth.validateToken, adminRoutes);


module.exports = router;