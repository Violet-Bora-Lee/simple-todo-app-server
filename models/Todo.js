const mongoose = require('mongoose');

const TodoScheme = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String
	},
	deadline : {
		type: String
	},
	priority: {
		type: String,
		required: true,
		default: '1'
	},
	done: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('todo', TodoScheme);
