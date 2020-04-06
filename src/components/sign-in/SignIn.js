import React, { useState } from 'react'
import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'
import { googleSignInStart, emailSignInStart } from '../../redux/user/userAction'
import { connect } from 'react-redux'

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
} from './SignInStyles';

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [credentails, setCredentails] = useState({ email: '', password: '' })

    const { email, password } = credentails;
    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
    };

    const handleChange = (event) => {
        const { value, name } = event.target
        setCredentails({ ...credentails, [name]: value })
    }

    return (
        <SignInContainer>
            <SignInTitle>I already have an account</SignInTitle>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    name='email'
                    type='email'
                    handleChange={handleChange}
                    value={email}
                    label='email'
                    required
                />
                <FormInput
                    name='password'
                    type='password'
                    value={password}
                    handleChange={handleChange}
                    label='password'
                    required
                />
                <ButtonsBarContainer>
                    <CustomButton type='submit'> Sign in </CustomButton>
                    <CustomButton
                        type='button'
                        onClick={googleSignInStart}
                        isGoogleSignIn
                    >
                        Sign in with Google
        </CustomButton>
                </ButtonsBarContainer>
            </form>
        </SignInContainer>
    )

}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})
export default connect(null, mapDispatchToProps)(SignIn);
