import React from "react";
import PropTypes from "prop-types";

//create Textfieldgroup higher order component to declutter
//places where I need a form
const TextFieldGroup = ({
	name,
	placeholder,
	value,
	label,
	error,
	info,
	type,
	onChange,
	disabled,
}) => {
	return (
		<div className="form-group">
			<input
				type={type}
				className={
					error
						? "form-control form-control-lg is-invalid rounded-pill"
						: "form-control form-control-lg rounded-pill"
				}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				label={label}
				disabled={disabled}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

//define expected proptypes
TextFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	label: PropTypes.string,
	error: PropTypes.string,
	info: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string,
};

//define default proptypes
TextFieldGroup.defaultProps = {
	type: "text",
};

export default TextFieldGroup;
