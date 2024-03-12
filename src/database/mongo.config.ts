import { connect, connections } from "mongoose";

const connectToDB = async () => {
  try {
    if (connections[0].readyState) {
      console.log(`Connected to Mongo: ${connections[0].host}`);
      return;
    }

    const connection = await connect(process.env.MONGO_URI!, {
      dbName: "iNotes"
    });
    console.log(`Connected to Mongo: ${connection.connections[0].host}`);
  } catch (error: any) {
    console.log(`Mongo Error: ${error.message}`);
  }
};

export default connectToDB;
