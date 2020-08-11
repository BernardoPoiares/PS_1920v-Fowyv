const subscribeEvents = (socket)=>{
    socket.on('message',onMessageReceived)
    socket.on('disconnect', onDisconnected)
}
  
  
const onMessageReceived = (message) => {
  console.log(message);
}
  
const onDisconnected = () => {
  
}
  
const sendAllMessages= (socket)=>{
    socket.emit('receiveAllMessages',JSON.stringify([]));
}