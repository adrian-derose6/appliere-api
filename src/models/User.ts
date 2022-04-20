import { Schema, Model, model, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const HASH_ROUNDS = 10;

interface User {
	fullName: string;
	email: string;
	password: string;
	location: string;
	image: string;
}

const UserSchema = new Schema<User, Model<User>>(
	{
		fullName: {
			type: String,
			required: [true, 'Please provide name'],
			maxlength: 30,
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Please provide email'],
			validate: {
				validator: validator.isEmail,
				message: 'Please provide a valid email',
			},
			unique: true,
			index: true,
		},
		password: {
			type: String,
			required: [true, 'Please provide password'],
			minlength: 6,
			select: false,
		},
		location: {
			type: String,
			trim: true,
			maxlength: 20,
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true }
);

const User = model<User, Model<User>>('User', UserSchema);

export default User;
