const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Register = new Schema(
	{
		name: { type: String, required: true },
		age: { type: Number },
		dob: { type: Date },
		gender: { type: String, default: 'Male', enum: ['Female', 'Male'] },
	},
	{ timestamps: true },
);

module.exports = mongoose.model('register', Register);
