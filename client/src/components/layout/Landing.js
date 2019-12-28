import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Landing extends Component {
    componentDidMount() {
        //on component mount, check if user is authernticated,
        //if so, user react-router history.push method to redirect to
        //the dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push('/dashboard')
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className="display-3 mb-4">Complainr
                        </h1>
                        <p className="lead">
                            Let your trials and tribulations be known... and judged.
                        </p>
                        <hr />
                        <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                        <Link to="/login" className="btn btn-lg btn-light">Login</Link>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

//define prop types this component should receive
Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

//get deired state from redux
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Landing)