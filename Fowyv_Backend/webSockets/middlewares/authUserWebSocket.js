const authUserWebSocket = function socketAuth(socket, next){
    var handshakeData = socket.request;
    var parsedCookie = cookie.parse(handshakeData.headers.cookie);
    var sid = connect.utils.parseSignedCookie(parsedCookie['connect.sid'], config.secret);
    
    if (parsedCookie['connect.sid'] === sid)
     return next(new Error('Not Authenticated'));
    
    redisSession.get(sid, function(err, session){
       if (session.isAuthenticated)
       {
         socket.user = session.user;
         socket.sid = sid;
         return next();
       }
       else
         return next(new Error('Not Authenticated'));
    });
};