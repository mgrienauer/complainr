import React from "react";
import PropTypes from "prop-types";

//create TextAreafieldgroup higher order component to declutter
//places where I need a text area
const TextAreaFieldGroup = ({
	name,
	placeholder,
	value,
	error,
	info,
	onChange,
}) => {
	return (
		<div className="form-group">
			<textarea
				className={
					error
						? "form-control form-control-lg is-invalid"
						: "form-control form-control-lg"
				}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

//define expected proptypes
TextAreaFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	info: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default TextAreaFieldGroup;
