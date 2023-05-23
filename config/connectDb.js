import mongoose from "mongoose";

const connectDB = async (USERNAME, PASSWORD) => {
  // const url = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.rbf7zih.mongodb.net/?retryWrites=true&w=majority`;
  const url = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.rbf7zih.mongodb.net/?retryWrites=true&w=majority`;
  // const url = "mongodb://localhost:27017";
  try {
    const DB_OPTIONS = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      DbName: "incandescent",
    };
    await mongoose.connect(url, DB_OPTIONS);
    console.log("Database connected successfully");
  } catch (e) {
    console.log(e.message);
  }
};

export default connectDB;
