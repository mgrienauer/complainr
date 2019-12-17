import React, { Component } from 'react'
import axios from 'axios'

export default class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        event.preventDefault()
        
        //create new user object to send to backend
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        //use axios to make post request to '/api/users/register on our backend using the newUser object
        axios.post('/api/users/register', newUser)
            .then(res => console.log(res.data))
            .catch(err => this.setState({ errors: err.response.data }))
    }

    render() {
        //destructure errors from state for conditional classnames
        const { errors } = this.state

        return (
          <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">
                    Create your Complainr acconut
                  </p>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className={errors.name ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"}
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                      {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className={errors.email ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"}
                            placeholder="Email Address"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                        {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className={errors.password ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"}
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                        {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className={errors.password2 ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"}
                            placeholder="Confirm Password"
                            name="password2"
                            value={this.state.password2}
                            onChange={this.onChange}
                        />
                        {errors.password2 && (<div className='invalid-feedback'>{errors.password2}</div>)}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
    }
}
