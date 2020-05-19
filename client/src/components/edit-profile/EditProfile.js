import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

const initialState = {
	website: "",
	location: "",
	status: "",
	complaints: "",
	bio: "",
	handle: "",
	twitter: "",
	facebook: "",
	linkedin: "",
	youtube: "",
	instagram: "",
	errors: {},
};

//destructure props getting passed from redux
const ProfileForm = ({
	//double destructure profile, because it's nested
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
	history,
	errors,
}) => {
	const [formData, setFormData] = useState(initialState);
	//social input optional, create toggle function
	const [displaySocialInputs, toggleSocialInputs] = useState(false);
	//check if incoming error props different than curr state props
	if (formData.errors !== errors) {
		setFormData({
			...formData,
			errors,
		});
	}

	useEffect(() => {
		//if profile isnt passed in, fetch using getcurrentprofile
		if (!profile) getCurrentProfile();

		//if profile and not loading
		if (!loading && profile) {
			//make shallow copy of initState
			const profileData = { ...initialState };
			//loop over profile to make copy of key value pairs
			for (const key in profile) {
				if (key in profileData) profileData[key] = profile[key];
			}
			//do same for social object
			for (const key in profile.social) {
				if (key in profileData) profileData[key] = profile.social[key];
			}
			//check that complaints is an array
			if (Array.isArray(profileData.complaints))
				profileData.complaints = profileData.complaints.join(", ");
			//update state with updated profileData objct
			setFormData(profileData);
		}
	}, [loading, getCurrentProfile, profile]);

	//destructure formData to use easily in render
	const {
		location,
		status,
		complaints,
		bio,
		twitter,
		facebook,
		youtube,
		instagram,
		handle,
	} = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createProfile(formData, history, profile ? true : false);
	};

	//set socialInputs jsx based on if toggled
	let socialInputs;
	if (displaySocialInputs) {
		socialInputs = (
			<div>
				<InputGroup
					placeholder="Twitter Profile URL"
					name="twitter"
					icon="fab fa-twitter"
					value={twitter ? twitter : ""}
					onChange={onChange}
					error={errors.twitter}
				/>
				<InputGroup
					placeholder="facebook Profile URL"
					name="facebook"
					icon="fab fa-facebook"
					value={facebook ? facebook : ""}
					onChange={onChange}
					error={errors.facebook}
				/>
				<InputGroup
					placeholder="youtube Profile URL"
					name="youtube"
					icon="fab fa-youtube"
					value={youtube ? youtube : ""}
					onChange={onChange}
					error={errors.youtube}
				/>
				<InputGroup
					placeholder="instagram Profile URL"
					name="instagram"
					icon="fab fa-instagram"
					value={instagram ? instagram : ""}
					onChange={onChange}
					error={errors.instagram}
				/>
			</div>
		);
	}

	//selection of status options
	const options = [
		{ label: "Whiner", value: "Whiner" },
		{ label: "Weenie", value: "Weenie" },
		{ label: "Griper", value: "Griper" },
		{ label: "Wet Blaket", value: "Wet Blaket" },
		{ label: "Wambulance Driver", value: "Wambulance Driver" },
		{ label: "Boohooer", value: "Boohooer" },
	];
	console.log(errors);
	return (
		<div className="create-profile form-width m-auto">
			<div className="container bg-white rounded p-4">
				<div className="row">
					<div className="col-12 m-auto">
						<h1 className="display-4 text-center">Edit your profile</h1>
						<p className="lead text-center">Edit your sob story</p>
						<small className="d-block pb-3">* = required</small>
						<form onSubmit={onSubmit}>
							<TextFieldGroup
								placeholder="* Profile Handle"
								name="handle"
								onChange={onChange}
								error={errors.handle}
								value={handle ? handle : ""}
								info="This is a display name that other users will see you by"
							/>

							<SelectListGroup
								placeholder="Status"
								name="status"
								value={status ? status : options[0].value}
								error={errors.status}
								onChange={onChange}
								options={options}
								info="Select your current status you big baby"
							/>

							<TextFieldGroup
								placeholder="Location"
								name="location"
								onChange={onChange}
								error={errors.location}
								value={location ? location : ""}
								info="Where is your fortress of boo-hoo-itude?"
							/>

							<TextFieldGroup
								placeholder="* Main complaints"
								name="complaints"
								onChange={onChange}
								error={errors.complaints}
								value={complaints ? complaints : ""}
								info="Please enter your main complaints separated by commans (example: 'Work, boyfriend, bunyons'"
							/>

							<TextAreaFieldGroup
								placeholder="* Short bio"
								name="bio"
								onChange={onChange}
								error={errors.bio}
								value={bio ? bio : ""}
								info="Please give us your sob story. Keep it brief..."
							/>
						</form>

						<div className="mb-3">
							<button
								type="button"
								onClick={() => toggleSocialInputs(!displaySocialInputs)}
								className="btn btn-outline-secondary"
							>
								Add social network links (optional)
							</button>
						</div>
						{socialInputs}
						<input
							type="submit"
							value="Submit"
							className="btn btn-primary btn-block rounded-pill mt-4"
							onClick={onSubmit}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

ProfileForm.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	withRouter(ProfileForm),
);
