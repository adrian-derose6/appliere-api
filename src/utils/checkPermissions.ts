import { UnauthenticatedError } from '../errors/index.js';

type RequestUser = {
	userId: string;
};

const checkPermissions = (requestUser: RequestUser, resourceUserId: string) => {
	if (requestUser.userId === resourceUserId.toString()) return;

	throw new UnauthenticatedError('Not authorized to access this route');
};

export default checkPermissions;
