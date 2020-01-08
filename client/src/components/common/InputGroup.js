import React from 'react'
import PropTypes from 'prop-types'

//create TextAreafieldgroup higher order component to declutter
//places where I need a text area
const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    onChange,
    icon,
    type
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />
                </span>
            </div>
            <input
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
            {error && (<div className='invalid-feedback'>{error}</div>)}
        </div>
    )
}

//define expected proptypes
InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired
}

InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup