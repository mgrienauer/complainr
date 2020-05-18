import React from "react";
import PropTypes from "prop-types";

//create TextAreafieldgroup higher order component to declutter
//places where I need a text area
const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
	const selectOptions = options.map((option) => (
		<option key={option.label} value={option.value}>
			{option.label}
		</option>
	));

	return (
		<div className="form-group">
			<select
				className={
					error
						? "form-control form-control-lg rounded-pill is-invalid"
						: "form-control rounded-pill form-control-lg"
				}
				name={name}
				value={value}
				onChange={onChange}
				options={options}
			>
				{selectOptions}
			</select>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

//define expected proptypes
SelectListGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	info: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired,
};

export default SelectListGroup;
