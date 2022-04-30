import mongoose from 'mongoose';
import normalize from 'normalize-mongoose';

const { Schema, Types } = mongoose;

interface Job {
	title: string;
	employer: string;
	salary?: string;
	boardId: any;
	listId: any;
	createdBy: any;
}

export const JobSchema = new Schema<Job>(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'No job title provided'],
		},
		employer: {
			type: String,
			trim: true,
			required: [true, 'No employer provided'],
		},
		salary: {
			type: String,
		},
		boardId: {
			type: Types.ObjectId,
			required: [true, 'No Board ID provided'],
			ref: 'Board',
		},
		listId: {
			type: Types.ObjectId,
			required: [true, 'No list ID provided'],
			ref: 'List',
		},
		createdBy: {
			type: Types.ObjectId,
			required: [true, 'No user ID provided'],
			ref: 'User',
		},
	},
	{ timestamps: true }
);
JobSchema.plugin(normalize);

const Job = mongoose.model<Job>('Job', JobSchema);

export default Job;
