import React, { useState } from 'react';
import COLORS from "../styles/colors";
import Logo from "../logo.png";
import {useNavigate} from "react-router-dom";
import axios from "axios";
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState([]);
    const [credentialsError, setCredentialsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [signupMessage, setSignupMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/auth/login",
                {
                    email,
                    password
                });
            const token = response.data.token;
            localStorage.setItem('token', token);

            //     go to page
            navigate("/");

        } catch(error) {
            if(error.response && error.response.status === 403) {
                setErrorMessage('Incorrect username or password');
                setCredentialsError(true);
            }
            else
                setErrorMessage('Login error, try later');
        }
    };

    const buttonStyle = {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: COLORS.PRIMARY,
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s, box-shadow 0.3s",
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)"
    };

    const buttonHoverStyle = {
        backgroundColor: "#0056b3",
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)"
    };

    const logoStyle = {
        width: "400px",
    };

    return (
        <div style={{
            width: "50%",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <div style={logoStyle}>
                <img src={Logo} alt="Logo" style={{ width: "100%" }} />
            </div>
            <form className="form_login" onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px"
            }}>
                <div className="text1" style={{ fontSize: "24px", fontWeight: "bold",color:COLORS.PRIMARY }}>Log in</div>
                <div className="messages" style={{ color: "red" }}>
                    {messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
                <div className="field_name">Your Email</div>
                <div className="input_field">
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                </div>
                <div className="field_name">Password</div>
                <div className="input_field">
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                </div>
                <button
                    className="log_in_button"
                    type="submit"
                    style={{
                        ...buttonStyle,
                        ...(buttonHoverStyle && { ":hover": buttonHoverStyle })
                    }}
                >
                    Log in
                </button>
                <div className="field_name">Don't have an account?</div>
                <a className="signup_link" href="/signup" style={{ color: COLORS.PRIMARY, textDecoration: "none" }}>
                    Sign up
                </a>
            </form>
        </div>
    );
}

export default LoginForm;
