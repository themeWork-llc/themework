/* eslint-disable indent */
/* eslint-disable no-tabs */
const express = require('express');
const pgController = require('./controller/pgController');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/', express.static(path.join(__dirname, '../public')));

// app.get('/', pgController.getList, (req, res) => {
// 	return res.status(200).json({ message: 'hello' });
// });

app.get('/list', pgController.getList, (req, res) => {
	return res.status(200).json({ message: res.locals.message });
});

app.post('/list', pgController.postListItem, (req, res) => {
	return res.status(200).json({ recieved: true });
});

app.delete('/list/:id', pgController.deleteListItem, (req, res) => {
	return res.status(200).json({ recieved: true });
});

app.patch('/list', pgController.updateList, (req, res) => {
	return res.status(200).json({ recieved: true });
});

app.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`);
});
