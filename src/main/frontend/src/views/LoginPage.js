import React from 'react';
import LoginForm from '../components/LoginForm';

function LoginPage() {
    return (
        <div style={{display:"flex",flexDirection:"column", justifyContent:"center",
            alignItems:"center",height:"100vh",
            background:"#D9D9D9"}}>

            <LoginForm />
        </div>
    );
}

export default LoginPage;