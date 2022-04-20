import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomAPI.js';
import BadRequestError from './BadRequest.js';
import NotFoundError from './NotFound.js';
import UnauthenticatedError from './Unauthenticated.js';

type CustomErrorType = {
	statusCode: StatusCodes;
	message: string;
};

export {
	CustomAPIError,
	CustomErrorType,
	BadRequestError,
	NotFoundError,
	UnauthenticatedError,
};
