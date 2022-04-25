import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
import validator from 'validator';

const { Schema, Types } = mongoose;

interface Board {
	name: string;
	lists: any;
	createdBy: any;
}

export type BoardDocument = Board &
	mongoose.Document & {
		_doc: any;
	};

const ListSchema = new Schema({
	title: {
		type: String,
		trim: true,
	},
	jobs: [{ name: String, position: String }],
});

const BoardSchema = new Schema<BoardDocument>(
	{
		name: {
			type: String,
			default: 'New Board',
			maxlength: 30,
			trim: true,
		},
		lists: {
			type: [
				{
					title: { type: String },
					jobs: {
						type: [{ company: String, position: String }],
						default: [],
					},
				},
			],
			default: [
				{
					title: 'Wishlist',
					jobs: [
						{ company: 'Facebook', position: 'Software Engineer' },
						{ company: 'Google', position: 'Front-End Developer' },
					],
				},
				{ title: 'Applied' },
				{ title: 'Interview' },
				{ title: 'Offer' },
				{ title: 'Follow Up' },
			],
		},
		createdBy: {
			type: Types.ObjectId,
			ref: 'User',
			required: [true, 'User ID is required'],
		},
	},
	{ timestamps: true }
);

const Board = mongoose.model<BoardDocument>('Board', BoardSchema);

export default Board;
