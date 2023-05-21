const express = require('express');
const messageRoute = express.Router();

const MessageRepository = require("../repositories/message.repository"); 

messageRoute.get('/getMessages', MessageRepository.findAllMessages);
messageRoute.get('/getUserMessages/:userEmail', MessageRepository.findUserMessages);
messageRoute.post('/saveMessage', MessageRepository.saveMessage);
messageRoute.put('/editMessage', MessageRepository.editMessage);
messageRoute.delete('/deleteMessage', MessageRepository.deleteMessage);

module.exports = messageRoute;