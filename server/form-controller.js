const Form = require('./form-model');

exports.saveForm = (req, res) => {
	const body = req.body;
	if (!body.name) {
		return res.status(400).json({
			success: false,
			error: 'Name is required',
		});
	}
	console.log('ss');
	const form = new Form(body);

	if (!form) {
		return res.status(400).json({ success: false, error: err });
	}

	form
		.save()
		.then(() => {
			return res.status(200).json({
				success: true,
				id: form._id,
				message: 'todo item created',
			});
		})
		.catch((error) => {
			return res.status(400).json({
				error,
				message: 'todo item not created',
			});
		});
};
