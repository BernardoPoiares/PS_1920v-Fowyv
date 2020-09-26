import mongodb from 'mongodb';


const url = "mongodb+srv://Fowyv:FowyvPS1920v@fowyvcluster.4lr4a.azure.mongodb.net/db?retryWrites=true&w=majority";//"mongodb://localhost:27017/mydb";//process.env.CUSTOMCONNSTR_MONGODB_CONNECTION_STRING;

const connectDb = async () => {
  return mongodb.connect(url, {useNewUrlParser: true, useUnifiedTopology: true });
  
};

export const createCollectionWatch = async function (collectionName) {
  let connection = await connectDb();
  const db = connection.db();
  const collection = db.collection(collectionName);
  const changeStream = collection.watch({ fullDocument: 'updateLookup' });
  return changeStream;
};

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