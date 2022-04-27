import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

interface List {
	name: string;
}

export const ListSchema = new Schema<List>({
	name: {
		type: String,
		trim: true,
		required: true,
	},
});

const List = mongoose.model<List>('List', ListSchema);

export default List;
