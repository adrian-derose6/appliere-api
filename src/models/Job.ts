import mongoose from 'mongoose';
import normalize from 'normalize-mongoose';

const { Schema, Types } = mongoose;

export enum JobType {
	FULL_TIME = 'FULL_TIME',
	PART_TIME = 'PART_TIME',
	CONTRACTOR = 'CONTRACTOR',
	INTERNSHIP = 'INTERNSHIP',
}

export enum Setting {
	OFFICE = 'OFFICE',
	REMOTE = 'REMOTE',
}

export interface Job {
	title: string;
	employer: string;
	htmlDescription?: string;
	salary?: number;
	jobType?: JobType;
	setting?: Setting;
	location?: string;
	postURL?: string;
	boardId: any;
	listId: any;
	pos: number;
	companyColor: string;
	color: string;
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
		htmlDescription: {
			type: String,
		},
		salary: {
			type: Number,
		},
		jobType: {
			type: String,
			default: JobType.FULL_TIME,
			trim: true,
		},
		setting: {
			type: String,
			default: Setting.OFFICE,
			trim: true,
		},
		location: {
			type: String,
		},
		postURL: {
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
		pos: {
			type: Number,
			required: [true, 'No list position provided'],
			default: 0,
		},
		companyColor: {
			type: String,
		},
		color: {
			type: String,
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
