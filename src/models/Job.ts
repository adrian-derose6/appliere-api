import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

interface Job {
	title: string;
	listId: any;
}

export const JobSchema = new Schema<Job>({
	title: {
		type: String,
		trim: true,
		required: true,
	},
	listId: {
		type: Types.ObjectId,
		required: true,
		ref: 'List',
	},
});

const Jobs = mongoose.model<Job>('Job', JobSchema);

export default Job;
