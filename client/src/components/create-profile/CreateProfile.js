import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'

class CreateProfile extends Component {
    state = {
        display: false,
        handle: '',
        bio: '',
        location: '',
        status: '',
        skills: '',
        youtube: '',
        twitter: '',
        instagram: '',
        facebook: '',
        errors: {}
    }

    onSubmit = (event) => {
        event.preventDefault()
        console.log('submit')
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        const { errors } = this.props

        //selection of status options
        const options = [
           { label: 'Set Current Status', value: 0 },
           { label: 'Whiner', value: 'Whiner' },
           { label: 'Weenie', value: 'Weenie' },
           { label: 'Griper', value: 'Griper' },
           { label: 'Wet Blaket', value: 'Wet Blaket' },
           { label: 'Wambulance Driver', value: 'Wambulance Driver' },
           { label: 'Boohooer', value: 'Boohooer' },
        ]

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create your profile</h1>
                            <p className="lead text-center">
                                Give us your infos plz
                            </p>
                            <small className="d-block pb-3">* = required</small>
                        </div>
                    </div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                        placeholder="* Profile Handle"
                        name="handle"
                        onChange={this.onChange}
                        error={errors.handle}
                        info="This is a display name that other users will see you by"
                    />
                </form>
            </div>
        )
    }
}

//define proptypes
CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps)(CreateProfile)