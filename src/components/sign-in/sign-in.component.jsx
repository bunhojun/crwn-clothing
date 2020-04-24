import React, { useState } from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = () => {
    const [ userCredentials, setCredentials ] = useState({ email: '', password: '' });
    const { email, password } = userCredentials;

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            setCredentials({...userCredentials, email: '', password: ''});            
        } catch (e) {
            alert(e);
        }

    }

    const handleChange = e => {
        const { value, name } = e.target;
        setCredentials({...userCredentials, [name]: value })
    }

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput type="email" name="email" value={email} onChange={handleChange} label='Email' required/>
                <FormInput type="password" name="password" value={password} onChange={handleChange} label='Password' required/>
                <div className="buttons">
                    <CustomButton type='submit'>SIGN IN</CustomButton>
                    <CustomButton  onClick={signInWithGoogle} isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
