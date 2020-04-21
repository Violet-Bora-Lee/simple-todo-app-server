const mongoose = require('mongoose');

const sevenDaysInMilliseconds =7*24*60*60*1000;

const TodoScheme = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String
	},
	deadline : {
		type: Date,
		default: Date.now() + sevenDaysInMilliseconds
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
