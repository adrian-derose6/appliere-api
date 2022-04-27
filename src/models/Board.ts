import mongoose from 'mongoose';
import validator from 'validator';

const { Schema, Types } = mongoose;

interface Board {
	name: string;
	icon: {
		color: {
			name: String;
			hex: String;
		};
	};
	archived: boolean;
	createdBy: any;
}

export type BoardDocument = Board &
	mongoose.Document & {
		_doc: any;
	};

const BoardSchema = new Schema<BoardDocument>(
	{
		name: {
			type: String,
			default: 'New Board',
			maxlength: 30,
			trim: true,
		},
		icon: {
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

const Board = mongoose.model<BoardDocument>('Board', BoardSchema);

export default Board;
