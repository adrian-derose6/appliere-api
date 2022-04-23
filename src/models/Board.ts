import { AnyNsRecord } from 'dns';
import mongoose from 'mongoose';
import validator from 'validator';

const { Schema, Types } = mongoose;

interface Board {
	boardName: string;
	lists: any;
}

export type BoardDocument = Board &
	mongoose.Document & {
		_doc: any;
	};

const listSchema = new Schema({
	title: {
		type: String,
		trim: true,
	},
	jobs: [{ name: String, position: String }],
});

const BoardSchema = new Schema<BoardDocument>(
	{
		boardName: {
			type: String,
			required: [true, 'Please provide board name'],
			maxlength: 30,
			trim: true,
		},
		lists: {
			type: [
				{
					title: { type: String },
				},
			],
			default: [
				{ title: 'Wishlist' },
				{ title: 'Applied' },
				{ title: 'Interview' },
				{ title: 'Offer' },
				{ title: 'Follow Up' },
			],
		},
	},
	{ timestamps: true }
);

const Board = mongoose.model<BoardDocument>('Board', BoardSchema);

export default Board;
