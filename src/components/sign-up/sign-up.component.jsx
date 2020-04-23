import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';
import { useState } from 'react';

const SignUp = () => {
    const [ userCredential, setCredential ] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { displayName, email, password, confirmPassword } = userCredential;

    const handleSubmit = async e => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert("password don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, { displayName });

            setCredential({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        }catch (e) {
            alert(e);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;

        setCredential({...userCredential, [name]: value });
    };

    return (
        <div className="sign-up">
            <h2 className="title">I do not have an account</h2>
            <span>Sign up with your email address and password</span>
            <form className="sign-up-form">
                <FormInput
                  type='text'
                  name='displayName'
                  value={displayName}
                  onChange={handleChange}
                  label='Name'
                  required>
                </FormInput>
                <FormInput
                  type='email'
                  name='email'
                  value={email}
                  onChange={handleChange}
                  label='Email'
                  required>
                </FormInput>
                <FormInput
                  type='password'
                  name='password'
                  value={password}
                  onChange={handleChange}
                  label='Password'
                  required>
                </FormInput>
                <FormInput
                  type='password'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={handleChange}
                  label='Confirm Password'
                  required>
                </FormInput>
                <CustomButton
                  type='submit'
                  onClick={handleSubmit}
                >SIGN UP</CustomButton>
            </form>
        </div>
    );
}

export default SignUp;