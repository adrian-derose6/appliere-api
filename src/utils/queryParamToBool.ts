function queryParamToBool(value: string | undefined): boolean {
	return !!value || (value + '').toLowerCase() === 'true';
}

export default queryParamToBool;
