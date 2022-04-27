import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

interface List {
	name: string;
	boardId: any;
}

const ListSchema = new Schema<List>({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	boardId: {
		type: Types.ObjectId,
		required: true,
		ref: 'Board',
	},
});

const List = mongoose.model<List>('Board', ListSchema);

export default List;
