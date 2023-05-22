import React, { useRef, useState } from "react";
import { Card, Button, Col, Row, Form, Alert } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuthContext();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState("");
	const history = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			history("/");
		} catch (error) {
			setError("Failed to sign in");
		}

		setLoading(false);
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-3">Log in</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formPlaintextEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="email@example.com"
								required
								ref={emailRef}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formPlaintextPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								required
								ref={passwordRef}
							/>
						</Form.Group>

						<Form.Group>
							<div className="col-md-12 text-center">
								<Button disabled={loading} type="submit" variant="primary">
									Login
								</Button>
							</div>
						</Form.Group>
					</Form>
					<div className="w-100 text-center mt-2">
						<Link to="/forgot-password">Forgot password?</Link>
					</div>
				</Card.Body>
			</Card>

			<div className="w-100 text-center mt-2">
				Don't have an account? <Link to="/signup">Sign up</Link>
			</div>
		</div>
	);
};

export default Login;
