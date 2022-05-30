import mongoose from 'mongoose';
import normalize from 'normalize-mongoose';

const { Schema, Types } = mongoose;

export enum ActivityCategory {
	APPLY = 'APPLY',
	FOLLOW_UP = 'FOLLOW_UP',
	PREP_COVER_LETTER = 'PREP_COVER_LETTER',
	PREP_RESUME = 'PREP_RESUME',
	REACH_OUT = 'REACH_OUT',
	PREP_FOR_INTERVIEW = 'PREP_FOR_INTERVIEW',
	PHONE_SCREEN = 'PHONE_SCREEN',
	PHONE_INTERVIEW = 'PHONE_INTERVIEW',
	ON_SITE_INTERVIEW = 'ON_SITE_INTERVIEW',
	OFFER_RECEIVED = 'OFFER_RECEIVED',
	ACCEPT_OFFER = 'ACCEPT_OFFER',
	DECLINE_OFFER = 'DECLINE_OFFER',
	REJECTED = 'REJECTED',
	SEND_THANK_YOU = 'SEND_THANK_YOU',
	EMAIL = 'EMAIL',
	MEETING = 'MEETING',
	PHONE_CALL = 'PHONE_CALL',
	GET_REFERENCE = 'GET_REFERENCE',
	SEND_AVAILABILITY = 'SEND_AVAILABILITY',
	ASSIGNMENT = 'ASSIGNMENT',
	NETWORKING_EVENT = 'NETWORKING_EVENT',
	OTHER = 'OTHER',
	APPLICATION_WITHDRAWN = 'APPLICATION_WITHDRAWN',
}

type CategoryType = {
	label: string;
	value: ActivityCategory;
};

export interface Activity {
	title: string;
	note: string;
	completed: boolean;
	completedAt: string;
	startAt: string;
	endAt: string;
	activityCategory: ActivityCategory;
	job: any;
	boardId: any;
	createdBy: any;
}

const ActivityCategorySchema = new Schema<CategoryType>({
	label: String,
	value: String,
});

export const ActivitySchema = new Schema<Activity>(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'No activity title provided'],
		},
		note: String,
		completed: {
			type: Boolean,
			default: false,
		},
		completedAt: Date,
		startAt: Date,
		endAt: Date,
		activityCategory: ActivityCategorySchema,
		job: {
			type: Types.ObjectId,
			required: [true, 'No job ID provided'],
			ref: 'Job',
		},
		boardId: {
			type: Types.ObjectId,
			required: [true, 'No board ID provided'],
			ref: 'Board',
		},
		createdBy: {
			type: Types.ObjectId,
			required: [true, 'No user ID provided'],
			ref: 'User',
		},
	},
	{ timestamps: true }
);

ActivitySchema.plugin(normalize);

const Activity = mongoose.model<Activity>('Activity', ActivitySchema);

export default Activity;
