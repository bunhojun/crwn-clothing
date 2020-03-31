import React, { Component } from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({password: '', password: ''});
    }

    handleChange = e => {
        const { value, name } = e.target;
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" name="email" value={this.state.email} onChange={this.handleChange} label='email' required/>
                    <FormInput type="password" name="password" value={this.state.password} onChange={this.handleChange} label='password' required/>
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                    <CustomButton  onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignIn;
