import {runQuery,runTransaction} from '../db/dbClient.js'
import {Collections} from "../config/dbSettings.config";

const connectionsOpened=[];

import {downloadFile, uploadFile} from "../filesStorage/fileStorageClient";
const { v4: uuidv4 } = require('uuid');

const initializeSocketConnection = (socket)=>{
    socket.on('userMessage',onMessageReceived(socket))
    socket.on('getAudioMessage',onGetAudioMessageRequest(socket))    
    socket.on('disconnect', onDisconnected(socket))
    socket.on('userAudioMessage', onAudioMessageReceived(socket))
    connectionsOpened.push(socket);
    sendUsersMatches(socket);
}

const onMessageReceived= (socket)=>{
  return async (req)=>{
    try{
        console.log("onMessageReceived:request-"+ req);
        const request=JSON.parse(req); 
        validateMessageReq(request);

        const otherUser = request.message.user;
        request.message.state="saved";
        request.message.user=socket.userMail;

        const transactionResult = await runTransaction(async (db,opts) => {
            
            const match = await db.collection(Collections.UsersMatches).findOne({ emails: { $all:[socket.userMail,otherUser]}}, opts);

            if(!match)
              return {errorMessage:"Match not found."};

            match.messages.push(request.message);
            const newValues = { $set: {"messages":match.messages} };

            return {errorMessage:"result-"+await db.collection(Collections.UsersMatches).updateOne({"_id": match._id}, newValues, opts )};

        }); 
        
        if(transactionResult && transactionResult.errorMessage)
          console.log("onMessageReceived:error-" + transactionResult.errorMessage);
        else{
          socket.emit("messageReceived",{id:request.message.id});  
          console.log("onMessageReceived:received");
        }

    }catch(error){
      console.log(error);
    }
  }
}
  
const onDisconnected = (socket) => {
  return (reason)=>{
    connectionsOpened.slice(connectionsOpened.indexOf(socket), 1);
    console.log("onDisconnected:reason-"+reason);
  }
}
  
const sendUsersMatches= async (socket)=>{
    try{
      console.log("onSendUsersMatches:sending");

      const matches = await runQuery(async (db,opts) => {
                    
        const userMatches = await db.collection(Collections.UsersMatches).find({ emails: socket.userMail}, opts).toArray();;

        return userMatches;
      });

        socket.emit('userMatches',JSON.stringify(matches));
        console.log("onSendUsersMatches:sended");

    }catch(error){
      console.log("onSendUsersMatches:error-" + error);
    }

}

const onGetAudioMessageRequest= (socket)=>{
  return async (req) => {
    try{
      console.log("onGetAudioMessageRequest:request-" + req);  
      const request=JSON.parse(req);  
      validateDownloadAudioMessageReq(request);

      if(request.fileID){
        downloadFile(request.fileID,(error,fileData)=>{    
          if(error){ 
            console.log("onGetAudioMessageRequest:downloadFile_error-" + error);
          } else{
            socket.emit("audioMessageReceived",JSON.stringify({filename:request.fileID, content: fileData}));
            console.log("onGetAudioMessageRequest:downloadFile_send");            
          }
        });
      }else
        console.log("onGetAudioMessageRequest:downloadFile_error- FileID is missing"); 
    }catch(error){
      console.log("onGetAudioMessageRequest:error-" + error);
    }
  }
}

const onAudioMessageReceived= (socket)=>{
  return async (req)=>{
    try{
        const request=JSON.parse(req); 
        console.log("onAudioMessageReceived:request-"+JSON.stringify(request.message));
        validateUploadAudioMessageReq(request);
        const filename = uuidv4()+'.'+request.message.content.replace(/^.*[\\\/]/, '').split('.')[1];
        const content = Buffer.from(request.content, 'base64');

        uploadFile(filename,content, async (error)=>{
          if (error) {
            console.log("onAudioMessageReceived:error-"+error);
          }else{
            
              const otherUser = request.message.user;
              request.message.user=socket.userMail;
              request.message.content=filename;

              const transactionResult = await runTransaction(async (db,opts) => {
                  
                  const match = await db.collection(Collections.UsersMatches).findOne({ emails: { $all:[socket.userMail,otherUser]}}, opts);

                  if(!match)
                    return {errorMessage:"Match not found."};

                  match.messages.push(request.message);
                  const newValues = { $set: {"messages":match.messages} };

                  await db.collection(Collections.UsersMatches).updateOne({"_id": match._id}, newValues, opts );

              }); 
              
              if(transactionResult && transactionResult.errorMessage)
                console.log("onAudioMessageReceived:error-" + transactionResult.errorMessage);
              else
                socket.emit("audioUploaded",{id:request.message.id,content:filename});    
                console.log("onAudioMessageReceived:audioUploaded");
          } 
        });
    }catch(error){
      console.log("onAudioMessageReceived:error-" + error);
    }
  }
}

export {
  initializeSocketConnection
};

const validateMessageReq= (req) =>{
  if(!req.message.id)
    throw new Error("Missing message id");
  if(!req.message.user)
    throw new Error("Missing message user");
  if(!req.message.type)
    throw new Error("Missing message type");
  if(!req.message.content)
    throw new Error("Missing message content");
  if(!req.message.state)
    throw new Error("Missing message state");  
}

const validateUploadAudioMessageReq = (req)=>{
  validateMessageReq(req);  
  if(!req.content)
    throw new Error("Missing content");
}

const validateDownloadAudioMessageReq = (req)=>{
  if(!req.fileID)
    throw new Error("Missing fileID");
}
