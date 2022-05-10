import mongoose from 'mongoose';
import normalize from 'normalize-mongoose';
import { JobSchema, Job } from './Job.js';

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

ListSchema.plugin(normalize);

const List = mongoose.model<List>('List', ListSchema);

export default List;
