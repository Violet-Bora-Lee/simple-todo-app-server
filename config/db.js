const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
	try {
	  await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
	  console.log('MongoDB is connected');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
}

module.exports = connectDB;
