import React from 'react'
import './CustomButtonStyles.scss'

export default function CustomButton(props) {
    const { children, isGoogleSignIn, inverted, ...otherProps } = props

    return (
        <button className={` ${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps} >
            {children}
        </button>
    )
}