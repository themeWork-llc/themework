/* eslint-disable comma-dangle */
/* eslint-disable no-tabs */
/* eslint-disable indent */
const pg = require('pg');

const connectionString =
	'postgres://ipudzayh:QxX6Haw8-tMjKZ2_-FQjQAZXQhYw35Ag@lallah.db.elephantsql.com/ipudzayh';

const client = new pg.Client({ connectionString });

client.connect();

const pgController = {
	postListItem: async (req, res, next) => {
		const { listItem } = req.body;
		const response = await client.query(
			'INSERT INTO example_table (date, message)VALUES ($1, $2)',
			[Date.now(), listItem]
		);
		console.log(response);
		return next();
	},

	getList: async (req, res, next) => {
		const response = await client.query('SELECT * FROM list');
		res.locals.list = response;
		return next();
	},

	updateList: async (req, res, next) => {
		const id = req.params.id;
		const { message } = req.body;
		const response = await client.query(
			'UPDATE example_table SET message = "Hello, everyone!" WHERE id = 1;',
			[message, id]
		);
		console.log(response);
		return next();
	},

	deleteListItem: async (req, res, next) => {
		const id = req.params.id;
		const response = await client.query(
			'DELETE FROM example_table WHERE id = 1;',
			[id]
		);
		console.log(response);
		return next();
	},
};

module.exports = pgController;
