import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'
import { createProfile } from '../../actions/profileActions'


class CreateProfile extends Component {
    state = {
        display: false,
        handle: '',
        bio: '',
        location: '',
        status: '',
        complaints: '',
        youtube: '',
        twitter: '',
        instagram: '',
        facebook: '',
        errors: {}
    }

    onSubmit = (event) => {
      event.preventDefault()
      const profileData = {
        handle: this.state.handle,
        bio: this.state.bio,
        location: this.state.location,
        status: this.state.status,
        complaints: this.state.complaints,
        youtube: this.state.youtube,
        twitter: this.state.twitter,
        instagram: this.state.instagram,
        facebook: this.state.facebook,
      }

      this.props.createProfile(profileData, this.props.history)
    }

    onChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        const { errors } = this.props
        const { displaySocialInputs } = this.state

        let socialInputs

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup
                        placeholder="facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="youtube Profile URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                    <InputGroup
                        placeholder="instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            )
        }
         
        //selection of status options
        const options = [
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
                  <p className="lead text-center">Give us your sob story</p>
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

              <SelectListGroup
                placeholder="Status"
                name="status"
                value={this.state.status}
                error={errors.status}
                onChange={this.onChange}
                options={options}
                info="Select your current status you big baby"
              />

              <TextFieldGroup
                placeholder="Location"
                name="location"
                onChange={this.onChange}
                error={errors.location}
                info="Where is your fortress of boo-hoo-itude?"
              />

              <TextFieldGroup
                placeholder="* Main complaints"
                name="complaints"
                onChange={this.onChange}
                error={errors.complaints}
                info="Please enter your main complaints separated by commans (example: 'Work, boyfriend, bunyons'"
              />

              <TextAreaFieldGroup
                placeholder="* Short bio"
                name="bio"
                onChange={this.onChange}
                error={errors.bio}
                info="Please give us your sob story. Keep it brief..."
              />

            </form>

            
            <div className="mb-3">
                <button 
                  type="button"
                  onClick={() => {
                      this.setState(prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                      }))
                  }}
                  className="btn btn-light"
                  >
                  Add social network links (optional)
                </button>
            </div>
            {socialInputs}
            <input 
              type="submit" 
              value="Submit" 
              className="btn btn-info btn-block mt-4" 
              onClick={this.onSubmit}
            />
            
          </div>
        );
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

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))