import mongoose from 'mongoose';
import validator from 'validator';
import normalize from 'normalize-mongoose';

import { ListSchema } from './List.js';

const { Schema, Types } = mongoose;

interface Board {
	name: string;
	icon: {
		color: {
			name: String;
			hex: String;
		};
	};
	lists: any;
	archived: boolean;
	createdBy: any;
}

const BoardSchema = new Schema<Board>(
	{
		name: {
			type: String,
			default: 'New Board',
			maxlength: 30,
			trim: true,
		},
		icon: {
			_id: false,
			type: {
				color: {
					name: String,
					hex: String,
				},
			},
			default: {
				color: {
					name: 'none',
					hex: '#c7c4c4',
				},
			},
		},
		lists: {
			type: [ListSchema],
			default: [
				{ name: 'Wishlist' },
				{ name: 'Applied' },
				{ name: 'Interview' },
				{ name: 'Offer' },
				{ name: 'Follow Up' },
			],
		},
		archived: {
			type: Boolean,
			default: false,
		},
		createdBy: {
			type: Types.ObjectId,
			ref: 'User',
			required: [true, 'User ID is required'],
		},
	},
	{ timestamps: true }
);

BoardSchema.plugin(normalize);

const Board = mongoose.model<Board>('Board', BoardSchema);

export default Board;
