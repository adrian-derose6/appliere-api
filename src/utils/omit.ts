const omit = (key: string, obj: Record<string, any>): Record<string, any> => {
	const { [key]: omitted, ...rest } = obj;
	return rest;
};

export default omit;
