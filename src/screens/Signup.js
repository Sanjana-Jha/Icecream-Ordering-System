import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation
            })
        });
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials");
        } else {
            alert("Successfully signed up!");
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    return (
        <>
              <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card shadow p-4 rounded-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h3 className="text-center mb-4">Create Your Account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">User Name</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-person"></i></span>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                id="name"
                                value={credentials.name}
                                onChange={onChange}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                value={credentials.email}
                                onChange={onChange}
                                placeholder="example@email.com"
                                required
                            />
                        </div>
                        <div className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-lock"></i></span>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                value={credentials.password}
                                onChange={onChange}
                                placeholder="Enter a strong password"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <div className="input-group">
                            <span className="input-group-text"><i className="bi bi-geo-alt"></i></span>
                            <input
                                type="text"
                                className="form-control"
                                name="geolocation"
                                id="address"
                                value={credentials.geolocation}
                                onChange={onChange}
                                placeholder="1234 Main St, City, Country"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-2">Register</button>
                    <Link to="/login" className="btn btn-outline-danger w-100">Already a user? Login</Link>
                </form>
            </div>
        </div>
        </>
    );
}
