
const connectionsOpened=[];
const messagesReceived=[{users : ["a@a.a","b@b.b"],messages : [{id:"12",user:'b@b.b',type:"TEXT", date:"15-08-2020", content:"Hello :)", state:"received"},{id:"12",user:'b@b.b',type:"AUDIO", date:"15-08-2020", content:"2644e2df-95d0-48f9-a8c1-02db6de8d92b.mp3", state:"received"}]}];

import {downloadFile, deleteTmpFile, uploadFile} from "../filesStorage/fileStorageClient";
const { v4: uuidv4 } = require('uuid');

const initializeSocketConnection = (socket)=>{
    socket.on('userMessage',onMessageReceived(socket))
    socket.on('getAudioMessage',onGetAudioMessageRequest(socket))    
    socket.on('disconnect', onDisconnected(socket))
    socket.on('userAudioMessage', onAudioMessageReceived(socket))
    connectionsOpened.push(socket);
    sendAllMessages(socket);
}
  
  
const onMessageReceived = (socket) => {
  return (data)=>{
    console.log(data);
    const obj=JSON.parse(data);
    obj.message.state="saved";
    const interaction = messagesReceived.find(interaction=>interaction.users.includes(socket.userMail) && interaction.users.includes(obj.message.user) )
    if(interaction){
      obj.message.user=socket.userMail;
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

const onGetAudioMessageRequest= (socket)=>{
  return (req)=>{

    try{

      console.log(req);
      const obj=JSON.parse(req);

      if(obj.fileID){
        const file = downloadFile(obj.fileID,function(err,data){
          if (!err) {
            
              socket.emit("audioMessageReceived",data, (error)=>{
                console.log(error)
                deleteTmpFile(obj.fileID);
              });
          } else {
              console.log(err);
          }
      });
      }

    }catch(error){
      console.log(error);
    }
  }
}

const onAudioMessageReceived= (socket)=>{
  return (req)=>{
    try{
      const obj=JSON.parse(req);        
        const interaction = messagesReceived.find(interaction=>interaction.users.includes(socket.userMail) && interaction.users.includes(obj.message.user) )
        if(interaction){          
          obj.message.state="saved";
          const filename = uuidv4()+'.'+obj.message.content.replace(/^.*[\\\/]/, '').split('.')[1];
          uploadFile(filename,obj.content,(err)=>{
            if (!err) {
                obj.message.user=socket.userMail;
                obj.message.content=filename;
                interaction.messages.push(obj.message);
                socket.emit("audioUploaded",{id:obj.message.id,content:filename});
                //deleteTmpFile(filename);
            } else {
                console.log(err);
            }
        });
      }
    }catch(error){
      console.log(error);
    }
  }
}

export {
  initializeSocketConnection
};