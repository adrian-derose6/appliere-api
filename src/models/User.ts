import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const { Schema, Types } = mongoose;

const HASH_ROUNDS = 10;

interface User {
	fullName: string;
	email: string;
	password: string;
	location?: string;
	image?: string;
}

const UserSchema = new Schema<User>(
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

UserSchema.pre('save', async function (): Promise<void> {
	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(HASH_ROUNDS);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function (): string {
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET as jwt.Secret, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

UserSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

export default mongoose.model<User>('User', UserSchema);
