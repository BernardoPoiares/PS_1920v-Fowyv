/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Fowyv:FowyvPS1920v@fowyvcluster.4lr4a.azure.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/
import {Collections} from "../config/dbSettings.config";

import mongodb from 'mongodb';
console.log(process.env.CUSTOMCONNSTR_MONGODB_CONNECTION_STRING)
const url = process.env.CUSTOMCONNSTR_MONGODB_CONNECTION_STRING;//"mongodb+srv://Fowyv:FowyvPS1920v@fowyvcluster.4lr4a.azure.mongodb.net/db?retryWrites=true&w=majority";//"mongodb://localhost:27017/mydb";

const connectDb = async () => {
  return mongodb.connect(url, {useNewUrlParser: true});
  
};

const watchUsersMatches = async function () {
  let connection = await connectDb();
  const db = connection.db();
  const usersMatches = db.collection(Collections.UsersMatches);
  const changeStream = usersMatches.watch();
  changeStream.on('change', next => {
    if(next.operationType == "insert"){
      console.log(next);
    }
    else if(next.operationType == "delete"){
      console.log(next);
    }
    
    else if(next.operationType == "replace"){
      console.log(next);
    }
    
    else if(next.operationType == "update"){
      console.log(next);
    }
    
    else if(next.operationType == "drop"){
      console.log(next);
    }
    
    else if(next.operationType == "rename"){
      console.log(next);
    }
    
    else if(next.operationType == "dropDatabase"){
      console.log(next);
    }
    
    else if(next.operationType == "invalidate"){
      console.log(next);
    }
  });
};

watchUsersMatches();


export async function runQuery (query){
  let connection = await connectDb();
  const db = connection.db();

  const session = connection.startSession();
  try {
    
      let opts = {session, returnOriginal: false};
      const ret = await query(db,opts);
      
      // After the successfull transaction sesstion gets ended and connection must be closed
      session.endSession();
      connection.close();
      
      return ret;

  } catch (error) {
      session.endSession();
      connection.close();
      throw error; // Rethrow so calling function sees error
  }
}

export async function runTransaction (transaction){
  let connectionForTransaction = await connectDb();
  const db = connectionForTransaction.db();

  const session = connectionForTransaction.startSession();
  session.startTransaction();

  try {
    
      let opts = {session, returnOriginal: false};
      const ret = await transaction(db,opts);

      // If all queries are successfully executed then session commit the transactions and changes get refelected
      await session.commitTransaction();
      
      // After the successfull transaction sesstion gets ended and connection must be closed
      session.endSession();
      connectionForTransaction.close();
      
      return ret;

  } catch (error) {
      // If an error occurred, abort the whole transaction and undo any changes that might have happened
      await session.abortTransaction();
      session.endSession();
      connectionForTransaction.close();
      throw error; // Rethrow so calling function sees error
  }
}

export default {
  runQuery,
  runTransaction
}
/*
//create
const CreateCollection = () =>{
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("db");
    dbo.createCollection("customers", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
    db.close();
    });
}

//drop
const DropCollection = () =>{
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").drop(function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    });
    });
}

//insert
const InsertIntoCollection => (collection,data)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("customers").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
        });
    });
}

//search
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.name);
      db.close();
    });
  });

  //search all
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });

  //search given id
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection('orders').aggregate([
      { $lookup:
         {
           from: 'products',
           localField: 'product_id',
           foreignField: '_id',
           as: 'orderdetails'
         }
       }
      ]).toArray(function(err, res) {
      if (err) throw err;
      console.log(JSON.stringify(res));
      db.close();
    });
  });

  //filter
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = { address: "Park Lane 38" };
    dbo.collection("customers").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });


  //delete
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { address: 'Mountain 21' };
    dbo.collection("customers").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });


  //update
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = { address: "Valley 345" };
    var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
    dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
*/