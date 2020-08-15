

const connectionsOpened=[];
const messagesReceived=[{user : "b@b.b",messages : [{id:"12",user:'e@e.e',type:"text", date:"15-08-2020", content:"Hello :)", state:"received"}]}];

const addClientConnection = (socket) => {
  return {userConnection:1,connection};
}


const initializeSocketConnection = (socket)=>{
    socket.on('userMessage',onMessageReceived(socket))
    socket.on('disconnect', onDisconnected(socket))
    connectionsOpened.push(socket);
    sendAllMessages(socket);
}
  
  
const onMessageReceived = (socket) => {
  return (data)=>{
    console.log(data);
    const obj=JSON.parse(data);
    obj.message.state="saved";
    const interaction = messagesReceived.find(u=>u.user== obj.message.user)
    if(interaction){
      interaction.messages.push(obj.message);
      socket.emit("messageReceived",obj.message);
    }
  }
}
  
const onDisconnected = (socket) => {
  return ()=>{
  connectionsOpened.slice(connectionsOpened.indexOf(socket), 1);
  console.log("client disconnected");
  }
}
  
const sendAllMessages= (socket)=>{
  console.log("send messages");

    socket.emit('receiveAllMessages',JSON.stringify(messagesReceived));
}

export {
  initializeSocketConnection,
  sendAllMessages
};