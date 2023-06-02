// const MessageModel = require("../models/message.model");
// const ConversationModel = require("../models/conversation.model");
const Op = require("sequelize").Op;
// const UserModel = require("../models/user.model");
const baseurl = process.env.BASEURL

const getMessagesFromChat = async (conversationId) => {
  const messages = await MessageModel.findAll({
    attributes: { exclude: ["conversationId", "updatedAt"] },
    where: { conversationId: conversationId },
  });
  
  return messages;
};

const addMessage = async ({senderId, receiverId, conversationId, message}) => {
  if(!conversationId){
    const conversation = await ConversationModel.create({
      senderId: senderId,
      receiverId: parseInt(receiverId),
    });
    conversationId = conversation.id
  }

  const newMessage = await MessageModel.create({
    senderId: senderId,
    receiverId: receiverId,
    conversationId: conversationId,
    message: message,
  });
  return newMessage;
};

const getConversationList = async (id) => {
    let conversationList = await ConversationModel.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        [Op.or]: [{ senderId: id }, { receiverId: id }],
      },
    });

    conversationList = await Promise.all(
      conversationList.map(async (item) => {
        let userId = item.dataValues.receiverId;
        if(id == item.dataValues.receiverId)
        userId = item.dataValues.senderId
        const details = { ...item.dataValues };
        const userDetails = await UserModel.findOne({
          attributes: ["firstName", "lastName", "profileImages"],
          where: { id: userId },
        });

        const lastMessage = await MessageModel.findOne({
          attributes: ["message", "senderId", "isSeen", "createdAt"],
          where: { conversationId: item.dataValues.id },
          order: [["id", "DESC"]],
        });

        const fname = userDetails && userDetails.firstName ? userDetails.firstName : ""
        const lname = userDetails && userDetails.lastName ? userDetails.lastName : ""
        details.userName = fname + " " + lname;

        details.profilePic =
          userDetails && userDetails.profileImages
            ? `${baseurl}uploads/candidate/${userDetails.dataValues.profileImages}`
            : `${baseurl}noimage.png`;

        details.lastMessage =
          lastMessage && lastMessage.message ? lastMessage.message : "";
        details.lastMessageTime =
          lastMessage && lastMessage.createdAt ? lastMessage.createdAt : "";
        details.sendByMe =
          lastMessage && lastMessage.senderId == id ? true : false;
        details.seen =
          lastMessage && lastMessage.isSeen ? true : false;
        return details;
      })
    );
  
  return conversationList;
};

const getReceiverProfilePic = async(receiverId)=>{
  const userDetails = await UserModel.findOne({
    attributes: ["profileImages"],
    where: { id: receiverId },
  });
  return userDetails && userDetails.profileImages
  ? `${baseurl}uploads/candidate/${userDetails.dataValues.profileImages}`
  : `${baseurl}noimage.png`;
}

const seenMessage = async (data) => {
  const receiverId = data.receiverId
  const conversationId = data.conversationId
  await MessageModel.update({
    isSeen: true
  },{where:{receiverId: receiverId, conversationId: conversationId}})
}

module.exports = {
  getMessagesFromChat,
  addMessage,
  getConversationList,
  getReceiverProfilePic,
  seenMessage
};
