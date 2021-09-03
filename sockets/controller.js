const { checkJWT } = require("../helpers/generateJWT");
const { ChatMessages } = require("../models");
const chatMessages = new ChatMessages();

const socketController = async(socket, io)=>{

    const token = socket.handshake.headers.authorization;
    const user = await checkJWT(token);

    if(!user){
        return socket.disconnect();
    }

    //Add new user connected
    chatMessages.connectUser(user);
    io.emit('active-users', chatMessages.usersArr);
    socket.emit('get-messages', chatMessages.last10);

    //Connect to special room
    socket.join(user.id);

    socket.on('disconnect', ()=>{
        chatMessages.disconnectUser(user.id);
        io.emit('active-users', chatMessages.usersArr);
    });
    
    socket.on('send-message', ({uid, message})=>{

        if(uid){
            //private message
            socket.to(uid).emit('private-message', {
                from: user.name,
                message
            });
        }else{
            chatMessages.sendMessage(user.uid, user.name, message);
            io.emit('get-messages', chatMessages.last10);
        }

    });
};

module.exports = {
    socketController
};
