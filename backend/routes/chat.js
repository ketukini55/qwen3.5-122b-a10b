const express = require('express');
const router = express.Router();
const { sendMessage, getConversations, getConversation, deleteConversation } = require('../controllers/chatController');

router.post('/message', sendMessage);
router.get('/conversations', getConversations);
router.get('/conversations/:id', getConversation);
router.delete('/conversations/:id', deleteConversation);

module.exports = router;
