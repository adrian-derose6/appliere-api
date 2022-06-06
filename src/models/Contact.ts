import mongoose from 'mongoose';
import normalize from 'normalize-mongoose';

const { Schema, Types } = mongoose;

interface ContactMethod {
	value: string;
	category: 'Personal' | 'Work';
}

const ContactMethodSchema = new Schema<ContactMethod>({
	value: {
		type: String,
		trim: true,
	},
	category: {
		type: String,
		enum: ['Personal', 'Work'],
		trim: true,
	},
});

export interface Contact {
	firstName: string;
	lastName: string;
	jobTitle: string;
	companies: string[];
	location: string;
	emails: ContactMethod[];
	phones: ContactMethod[];
	jobs: any[];
	boardId: any;
	createdBy: any;
}

export const ContactSchema = new Schema<Contact>(
	{
		firstName: {
			type: String,
			required: [true, 'First name required'],
			trim: true,
		},
		lastName: {
			type: String,
			required: [true, 'Last name required'],
		},
		companies: [
			{
				type: String,
			},
		],
		location: String,
		emails: [ContactMethodSchema],
		phones: [ContactMethodSchema],
		jobs: [
			{
				type: Types.ObjectId,
				ref: 'Job',
			},
		],
		boardId: {
			type: Types.ObjectId,
			required: [true, 'Board ID required'],
			ref: 'Board',
		},
		createdBy: {
			type: Types.ObjectId,
			required: [true, 'User ID required'],
			ref: 'User',
		},
	},
	{ timestamps: true }
);

ContactSchema.plugin(normalize);

const Contact = mongoose.model<Contact>('Contact', ContactSchema);

export default Contact;
