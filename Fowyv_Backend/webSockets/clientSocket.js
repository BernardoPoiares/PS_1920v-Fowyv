const subscribeEvents = (socket)=>{
    socket.on('userMessage',onMessageReceived)
    socket.on('disconnect', onDisconnected)
}
  
  
const onMessageReceived = (message) => {
  console.log(message);
}
  
const onDisconnected = () => {
  
}
  
const sendAllMessages= (socket)=>{
    socket.emit('receiveAllMessages',JSON.stringify([{user:'e@e.e',messages:[]}]));
}


export {
  subscribeEvents,
  sendAllMessages
};