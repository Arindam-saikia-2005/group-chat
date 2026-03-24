import mongoose from "mongoose"

type ConnectionObject = {
  isConnected: number;
}

const connection: ConnectionObject = {
  isConnected : 0,
}

export async function dbConnect(): Promise<void> {

  const mongoDb_url = process.env.MONGODB_URI!

  if (!mongoDb_url) {
    throw new Error("MongoDb url is not valid");
  }

  if (connection.isConnected) {
    console.log("Mongodb already connected");
    return;
  }

  try {
    const db = await mongoose.connect(mongoDb_url);
    const firstConn = db.connections[0]!;

    connection.isConnected = firstConn.readyState;
    console.log("MongoDb connected!");
  } catch (err: any) {
    console.log("Database connection failed", err);
    process.exit(1);
  }
}