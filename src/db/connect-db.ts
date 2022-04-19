import mongoose from 'mongoose';

const connectDB = (url: string): Promise<typeof mongoose> => {
	console.log(url);
	return mongoose.connect(url);
};

export default connectDB;
