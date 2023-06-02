const { getMessagesFromChat, addMessage, getConversationList, getReceiverProfilePic, seenMessage } = require("./message");

module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("new-user", async () => {
      io.emit("new-user", members);
    });

    socket.on("join-chat", async ({ newChatId, previousChatId }) => {
      socket.join(newChatId);
      socket.leave(previousChatId);
      let roomMessages = await getMessagesFromChat(newChatId);
      socket.emit("chat-messages", roomMessages);
    });

    socket.on("message", async(data) => {
      const messageDetails = await addMessage(data);
      if(!data.conversationId){
        socket.broadcast.emit("conversation");
        let conversationList = await getConversationList(data.senderId);
        await conversationList.sort((obj1,obj2)=>{
          let dateA = new Date(obj1.lastMessageTime).getTime();
          let dateB = new Date(obj2.lastMessageTime).getTime();
          return dateA < dateB ? 1 : -1;  
        });
        socket.emit("new-conversation", conversationList);
        socket.emit("new-conversation-id", messageDetails.conversationId);
      }

      let roomMessages = await getMessagesFromChat(data.conversationId ? data.conversationId : messageDetails.dataValues.conversationId);
      io.to(data.conversationId ? data.conversationId : messageDetails.dataValues.conversationId).emit("chat-messages", roomMessages);
      socket.broadcast.emit("notifications", data.conversationId ? data.conversationId : messageDetails.dataValues.conversationId);
    });

    socket.on("get-conversation", async(data) => {
      let conversationList = await getConversationList(data.id);
      await conversationList.sort((obj1,obj2)=>{
        let dateA = new Date(obj1.lastMessageTime).getTime();
        let dateB = new Date(obj2.lastMessageTime).getTime();
        return dateA < dateB ? 1 : -1;  
      });
      socket.emit("conversation-list", conversationList);
    });

    socket.on("get-receiver-profile-pic", async(data)=>{
      const profilePic = await getReceiverProfilePic(data.receiverId)
      socket.emit("receiver-profile-pic", profilePic);
    })

    socket.on("seen-message", async(data)=>{
      await seenMessage(data)
      let conversationList = await getConversationList(data.receiverId);
      await conversationList.sort((obj1,obj2)=>{
        let dateA = new Date(obj1.lastMessageTime).getTime();
        let dateB = new Date(obj2.lastMessageTime).getTime();
        return dateA < dateB ? 1 : -1;  
      });
      socket.emit("conversation-list", conversationList);
    })

  });
};
