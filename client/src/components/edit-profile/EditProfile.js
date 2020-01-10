import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaFieldGroup from '../common/TextAreaFieldGroup'
import InputGroup from '../common/InputGroup'
import SelectListGroup from '../common/SelectListGroup'
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import isEmpty from '../../validation/is-empty'


class EditProfile extends Component {
    state = { 
      ...this.props.profile.profile,
      complaints: this.props.profile.profile.complaints.join(','),
      errors: {}
    }
    

    componentDidMount() {
        this.props.getCurrentProfile()    
    }

    componentDidUpdate(prevState) {
      if (prevState.errors !== this.props.errors) {
        this.setState({ errors: this.props.errors })
      }
    }

    onSubmit = (event) => {
      event.preventDefault()
      const profile = this.state
      // Bring complaints array back to CSV because backend expects csv
      const complaintsCSV = Array.isArray(profile.complaints) ? profile.complaints.join(',') : profile.complaints;
      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      
      const profileData = {
        handle: profile.handle,
        bio: profile.bio,
        location: profile.location,
        status: profile.status,
        complaints: complaintsCSV,
        youtube: profile.youtube,
        twitter: profile.twitter,
        instagram: profile.instagram,
        facebook: profile.facebook,
      }

      this.props.createProfile(profileData, this.props.history)
    }

    onChange = (event) => {
      const { value, name } = event.target;
      this.setState(prevState => ({
        errors: { ...prevState.errors, [name]: "" },
        [name]: value
      }));
    }

    render() {
        const { errors, displaySocialInputs } = this.state

        let socialInputs

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter ? this.state.twitter : ''}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />
                    <InputGroup
                        placeholder="facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook ? this.state.facebook : ''}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                    <InputGroup
                        placeholder="youtube Profile URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube ? this.state.youtube : ''}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />
                    <InputGroup
                        placeholder="instagram Profile URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram ? this.state.instagram : ''}
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
                  <h1 className="display-4 text-center">Edit your profile</h1>
                  <p className="lead text-center">Edit your sob story</p>
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
                value={this.state.handle ? this.state.handle : ''}
                info="This is a display name that other users will see you by"
              />

              <SelectListGroup
                placeholder="Status"
                name="status"
                value={this.state.status ? this.state.status : options[0].value}
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
                value={this.state.location ? this.state.location : ''}
                info="Where is your fortress of boo-hoo-itude?"
              />

              <TextFieldGroup
                placeholder="* Main complaints"
                name="complaints"
                onChange={this.onChange}
                error={errors.complaints}
                value={this.state.complaints ? this.state.complaints : ''}
                info="Please enter your main complaints separated by commans (example: 'Work, boyfriend, bunyons'"
              />

              <TextAreaFieldGroup
                placeholder="* Short bio"
                name="bio"
                onChange={this.onChange}
                error={errors.bio}
                value={this.state.bio ? this.state.bio : ''}
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
EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))