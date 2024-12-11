import mongoose from "mongoose";

const Url = "mongodb://localhost:27017/myMobileApp";

const connectionDB = async () => {
  try {
    await mongoose
      .connect(Url)
      .then(() => console.log('"MongoDB server is Connected!"'));
  } catch (error) {
    console.log(error);
  }
};
export default connectionDB;
