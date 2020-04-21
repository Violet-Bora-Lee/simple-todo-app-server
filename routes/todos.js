const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Todo = require('../models/Todo');

// @route			GET api/todos
// @desc			Get all todos
router.get('/', async (req, res) => {
	try {
		const todos = await Todo.find();
		res.json(todos);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error')
	}
})

module.exports = router;


