import { Schema, model, Types } from 'mongoose';

interface IUser {
	_id: Types.ObjectId;
	name: string;
	email: string;
	password: string;
	lastName: string;
	location: string;
}

const UserSchema = new Schema<IUser>({
	name: {
		type: String,
		required: [true, 'Please provide name'],
		maxlength: 20,
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Please provide email'],
		// validate: {
		//	validator: validator.isEmail,
		//	message: 'Please provide a valid email',
		//},
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide password'],
		minlength: 6,
		select: false,
	},
	lastName: {
		type: String,
		trim: true,
		maxlength: 20,
	},
	location: {
		type: String,
		trim: true,
		maxlength: 20,
		default: 'my city',
	},
});

const User = model<IUser>('User', UserSchema);

export default User;
