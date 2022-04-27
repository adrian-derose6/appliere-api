import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

interface Job {
	title: string;
	employer: string;
	salary: string;
	boardId: any;
	listId: any;
	position: number;
}

export const JobSchema = new Schema<Job>(
	{
		title: {
			type: String,
			trim: true,
			required: true,
		},
		employer: {
			type: String,
			trim: true,
			required: true,
		},
		salary: {
			type: String,
		},
		boardId: {
			type: Types.ObjectId,
			required: true,
			ref: 'Board',
		},
		listId: {
			type: Types.ObjectId,
			required: true,
			ref: 'List',
		},
		position: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Jobs = mongoose.model<Job>('Job', JobSchema);

export default Job;
