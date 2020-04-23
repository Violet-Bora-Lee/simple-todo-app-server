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
// @route     PUT api/todos/:id
// @desc      Update todo
router.put('/:id', async (req, res) => {
	const { title, description, deadline, priority, done } = req.body;

	const todoFields = {};
	if(title) todoFields.title = title;
	if(description) todoFields.description = description;
	if(deadline) todoFields.deadline = deadline;
	if(priority) todoFields.priority = priority;
	if(done === true) {
      todoFields.done = true;
	} else {
	  todoFields.done = false;
	}

	try {
	  let todo = await Todo.findById(req.params.id);

	  if(!todo) {
	  	return res.status(404).json({ msg: '해당하는 할 일이 없습니다.'});
		}

	  todo = await Todo.findByIdAndUpdate(
	  	req.params.id,
			{ $set: todoFields },
			{ new: true }
		);

	  res.json(todo);

	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
})

// @route     DELETE api/contacts/:id
// @desc      Delete todo
router.delete('/:id', async (req, res) => {

	try {

		let contact = await Todo.findById(req.params.id);

		if(!contact) return res.status(404).json({ msg: '삭제할 항목을 찾을 수 없습니다.' });

		await Todo.findByIdAndRemove(req.params.id);

		res.json({ msg: `${req.user.id} 가 삭제되었습니다.` });

	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}

});

module.exports = router;


