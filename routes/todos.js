const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Todo = require('../models/Todo');

// @route			GET api/todos
// @desc			Get all todos
router.get('/', async (req, res) => {
	try {
		const todos = await Todo.find().sort({ date: -1 });
		res.json(todos);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error')
	}
})

// @route			POST api/todos
// @desc			Add new todos
router.post('/', [
		check('title', '제목을 입력해주세요.').not().isEmpty(),
		check('title', '제목이 너무 깁니다. 20자 이내로 줄여주세요.').isLength({max: 20})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()})
		}

		const {title, description, deadline, priority, done} = req.body;

		try {
			const newTodo = new Todo({
				title,
				description,
				deadline,
				priority,
				done
			});

			const todo = await newTodo.save();

			res.json(todo);

		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;


