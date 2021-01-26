const express = require('express');
const router = express.Router();
const CommentsController = require('../controller/comments.controller');
 

router.post('/', CommentsController.createComment);
router.post('/nested/:id', CommentsController.nestedComment);
router.get('/:id', CommentsController.findByPost);
router.delete('/:id', CommentsController.deleteComment);
router.put('/:id', CommentsController.updateComment);

module.exports = router;