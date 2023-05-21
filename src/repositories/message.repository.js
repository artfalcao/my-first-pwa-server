const Message = require("../models/Message");
var { nanoid } = require("nanoid");

class MessageRepository {
    
    async findAllMessages(req, res) {
        try {
            const allMessages = await Message.findAll({
                attributes: { exclude: ['id'] }
            });
            res
            .status(200)
            .send(allMessages);
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    async findUserMessages(req, res) {
        try {
            const { userEmail } = req.params;
    
            const userMessages = await Message.findAll({
                where: {
                  email: userEmail
                },
                attributes: { exclude: ['id'] }
              });

            res
            .status(200)
            .send({
                message: "User's message found with success!",
                data: userMessages
            })    
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    async saveMessage(req, res) {

        try {
            const { name, email, message } = req.body;
            const id = nanoid();
    
            //Check Inputs
            if (name === '' || email === '' || message === '') res.send({message: "Invalid Inputs"});
    
            await Message.create({
                id: id,
                name: name,
                email: email,
                message: message
            });

            const newMessage = await Message.findOne({
                where: {
                  id: id
                },
                attributes: { exclude: ['id'] }
              });
    
            res
            .status(200)
            .send({
                message: 'Message saved with success!',
                data: newMessage
            });
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    async editMessage (req, res) {
        try {
            const { id, newMessage } = req.body;
    
            const messageUpdated = await Message.update({ message: newMessage }, {
                where: {
                    id: id
                }
            })

            res
            .status(200)
            .send({
                message: "Message edited with success!",
                modificatedRow: messageUpdated
            });
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }


    }

    async deleteMessage (req, res) {

        try {
            const { id } = req.body;
    
            await Message.destroy({ where: { id: id } });
    
            res
            .status(200)
            .send({
                message: "Message deleted with success!"
            });
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }
}

module.exports = new MessageRepository();