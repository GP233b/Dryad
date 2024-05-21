import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed and configured
import axios from 'axios'; // Ensure you have axios installed
import COLORS from "../styles/colors";
import Logo from "../logo.png";

function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [pesel, setPesel] = useState('');
    const [messages, setMessages] = useState([]);

    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorMessageRepeat, setErrorMessageRepeat] = useState('');
    const [errorRepeat, setErrorRepeat] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    function isValidEmail() {
        return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
    }

    function arePasswordTheSame() {
        return password === confirmPassword;
    }

    function isPasswordStrongEnough() {
        return password.length > 5;
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        let hasError = false;

        if (!isValidEmail(email)) {
            setErrorMessageEmail('Incorrect email');
            setErrorEmail(true);
            hasError = true;
        }
        if (!isPasswordStrongEnough()) {
            setErrorMessagePassword('Password must be longer than 5 characters');
            setErrorPassword(true);
            hasError = true;
        }
        if (!arePasswordTheSame()) {
            setErrorMessageRepeat('The passwords are not the same');
            setErrorRepeat(true);
            hasError = true;
        }
        if (hasError) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/auth/signup", {
                email,
                name: firstName,
                surname: lastName,
                pesel,
                password,
            });

            localStorage.setItem('register', "Registered successfully");
            navigate("/login");

        } catch (error) {
            setErrorMessage("registration failed, try later");
        }
    }

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
            height: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px"
        }}>
            <div style={logoStyle}>
                <img src={Logo} alt="Logo" style={{ width: "100%" }} />
            </div>
            <form className="form_register" onSubmit={submitHandler} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px"
            }}>
                <div className="text1" style={{ fontSize: "24px", fontWeight: "bold", color: COLORS.PRIMARY }}>Sign up</div>
                <div className="text2">Create your account</div>
                <div className="messages" style={{ color: "red" }}>
                    {messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))}
                </div>
                <div className="field_name">First Name</div>
                <div className="input_field">
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                </div>
                <div className="field_name">Last Name</div>
                <div className="input_field">
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                </div>
                <div className="field_name">PESEL</div>
                <div className="input_field">
                    <input
                        type="text"
                        name="pesel"
                        value={pesel}
                        onChange={(e) => setPesel(e.target.value)}
                        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
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
                <div className="field_name">Confirm Password</div>
                <div className="input_field">
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                    />
                </div>
                <button
                    className="register_button"
                    type="submit"
                    style={{
                        ...buttonStyle,
                        ...(buttonHoverStyle && { ":hover": buttonHoverStyle })
                    }}
                >
                    Sign up
                </button>
                <div className="field_name">Already have an account?</div>
                <a className="login_link" href="/login" style={{ color: COLORS.PRIMARY, textDecoration: "none" }}>
                    Log in
                </a>
            </form>
        </div>
    );
}

export default RegistrationForm;
