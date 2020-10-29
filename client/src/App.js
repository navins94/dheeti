import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const App = () => {
	const [values, setValues] = useState({
		name: '',
		age: '',
		gender: 'Male',
		buttonText: 'Submit',
	});

	const options = ['Male', 'Female'];

	const [startDate, setStartDate] = useState(new Date());

	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { name, age, gender, buttonText } = values;

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			register();
		}
	}, [errors]);

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const validate = (values) => {
		let errors = {};
		if (!values.name) {
			errors.name = 'Name is required';
		}
		if (!values.age) {
			errors.age = 'Age is required';
		}
		if (!values.gender) {
			errors.gender = 'Gender is required';
		}
		return errors;
	};

	const register = () => {
		setValues({ ...values, buttonText: 'Submitting' });
		axios({
			method: 'POST',
			url: `http://localhost:8081/save`,
			data: { name, age, startDate, gender },
		})
			.then((response) => {
				console.log('SIGNUP SUCCESS', response);
				setValues({
					...values,
					name: '',
					age: '',
					gender: '',
					buttonText: 'Submitted',
				});
				toast.success(response.data.message);
			})
			.catch((error) => {
				console.log('SIGNUP ERROR', error.response.data);
				setValues({ ...values, buttonText: 'Submit' });
				toast.error(error.response.data.error);
			});
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		setErrors(validate(values));
		setIsSubmitting(true);
	};

	const signupForm = () => (
		<form noValidate>
			<div className="form-group">
				<label htmlFor="name" className="text-muted">
					Name
				</label>
				<input
					onChange={handleChange('name')}
					value={name}
					type="text"
					className={`form-control input ${errors.name && 'is-invalid'}`}
					required
				/>
				{errors.name && <p className="text-danger">{errors.name}</p>}
			</div>

			<div className="form-group">
				<label htmlFor="age" className="text-muted">
					Age
				</label>
				<input
					onChange={handleChange('age')}
					value={age}
					type="number"
					className={`form-control input ${errors.age && 'is-invalid'}`}
				/>
				{errors.age && <p className="text-danger">{errors.age}</p>}
			</div>

			<div className="form-group">
				<label htmlFor="dob" className="text-muted">
					DOB
				</label>
				<DatePicker
					selected={startDate}
					showMonthDropdown
					showYearDropdown
					onChange={(date) => setStartDate(date)}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="dob" className="text-muted">
					Gender
				</label>
				<select
					value={gender}
					onChange={handleChange('gender')}
					className={`form-control input ${errors.gender && 'is-invalid'}`}
				>
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
				{errors.gender && <p className="text-danger">{errors.gender}</p>}
			</div>

			<div>
				<button onClick={clickSubmit} className="btn btn-primary">
					{buttonText}
				</button>
			</div>
		</form>
	);
	return (
		<div className="col-md-6 offset-md-3">
			<ToastContainer />
			<h1 className="p-5 text-center">Form</h1>
			{signupForm()}
		</div>
	);
};

export default App;
