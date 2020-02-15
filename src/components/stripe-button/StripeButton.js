import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Logo from '../../assets/logo.png'

export default function StripeButton(props) {
    const { price } = props
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_3ONWb8ovMpxVvaWdcTKu9YZp00qOTGl0OO'

    const onToken = token => {
        console.log(token)
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name="King's Store"
            billingAddress
            shippingAddress
            image={Logo}
            description={`Your total is $${price} `}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}
