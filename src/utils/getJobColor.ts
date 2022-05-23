const JOB_COLORS = [
	'#FF3300',
	'#FF8162',
	'#FEC405',
	'#FFCD60',
	'#80FFBB',
	'#45E878',
	'#25C47B',
	'#4ECDC4',
	'#1CA8E3',
	'#0070FB',
	'#1C3554',
	'#6A4FEB',
	'#ADA8C6',
	'#190445',
	'#D4D8DD',
];

const getJobColor = (): string => {
	return JOB_COLORS[Math.floor(Math.random() * JOB_COLORS.length)];
};

export default getJobColor;
