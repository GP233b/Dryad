import React from 'react';
import SignUpForm from '../components/SignUpForm';

function SignUpPage() {
    return (
        <div style={{display:"flex",flexDirection:"column", justifyContent:"center",
            alignItems:"center",minHeight:"100vh",
            background:"#D9D9D9"}}>

            <SignUpForm/>
        </div>
    );
}

export default SignUpPage;