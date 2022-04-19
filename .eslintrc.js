export default {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest', // Allows the use of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	rules: {
		'@typescript-eslint/ban-ts-comment': 'off',
	},
	env: {
		node: true,
	},
};
