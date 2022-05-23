export interface ColorObj {
	name: string;
	hex: string;
}

export const BOARD_ICON_COLORS: ColorObj[] = [
	{
		name: 'none',
		hex: '#c7c4c4',
	},
	{
		name: 'red',
		hex: '#f06a6a',
	},
	{
		name: 'orange',
		hex: '#e3886d',
	},
	{
		name: 'yellow-orange',
		hex: '#f1bd6c',
	},
	{
		name: 'yellow',
		hex: '#f8df72',
	},
	{
		name: 'yellow-green',
		hex: '#aecf55',
	},
	{
		name: 'green',
		hex: '#5da283',
	},
	{
		name: 'blue-green',
		hex: '#4ecbc4',
	},
	{
		name: 'aqua',
		hex: '#9ee7e3',
	},
	{
		name: 'blue',
		hex: '#4573d2',
	},
	{
		name: 'indigo',
		hex: '#8d84e8',
	},
	{
		name: 'purple',
		hex: '#b36bd4',
	},
	{
		name: 'magenta',
		hex: '#f9aaef',
	},
	{
		name: 'hot-pink',
		hex: '#f26fb2',
	},
	{
		name: 'pink',
		hex: '#fc979a',
	},
	{
		name: 'gray',
		hex: '#6d6e6f',
	},
];

const getBoardIconColor = (): ColorObj => {
	return BOARD_ICON_COLORS[
		Math.floor(Math.random() * BOARD_ICON_COLORS.length)
	];
};

export default getBoardIconColor;
