import mongoose from "mongoose";

const ConnnectDb = async () => {
  try {
    const uri = `${process.env.URI}`;
    await mongoose.connect(uri);
  } catch (error: any) {
    console.error(error.message);

    process.exit(1);
  }
};

export default ConnnectDb;
