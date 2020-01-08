import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import { Link } from 'react-router-dom'
import ProfileActions from './ProfileActions'


class Dashboard extends Component {
    //once component mounts, fetch profile data from backend
    componentDidMount() {
        this.props.getCurrentProfile()
    }

    onDeleteClick = (event) => {
        this.props.deleteAccount()
    }

    render() {
        const { user } = this.props.auth
        const { profile, loading } = this.props.profile
        
        let dashboardContent
        if (profile === null || loading) {
            dashboardContent = 
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
        } else {
            //check if user already has profile
            if(Object.keys(profile).length > 0){
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                        </p>
                        <ProfileActions />
                        <div className="mb-0">
                            <button onClick={this.onDeleteClick} className="btn btn-danger">Delete Account</button>
                        </div>
                    </div>
                )
            } else {
                //user is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You have not yet set up a profile. Please boss up and set one up.</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                    </div>
                )
            }

        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//define proptype that Dashboard expects to receive
Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)