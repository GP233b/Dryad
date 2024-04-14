import React, { useState } from 'react';
import COLORS from "../styles/colors";
import Logo from "../logo.png";

function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Email:', email);
            console.log('Password:', password);
            console.log('Confirm Password:', confirmPassword);
        } catch (error) {
            console.error('Registration error:', error);
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
        width: "400px", // Dostosuj szerokość logo według potrzeb
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
            <form className="form_register" onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px"
            }}>
                <div className="text1" style={{ fontSize: "24px", fontWeight: "bold",color:COLORS.PRIMARY }}>Sign up</div>
                <div className="text2">Create your account</div>
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
