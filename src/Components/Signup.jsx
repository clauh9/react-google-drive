import React, { useRef, useState } from "react";
import { Card, Button, Col, Row, Form, Alert } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuthContext();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState("");
	const history = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			history("/");
		} catch (error) {
			setError("Failed to create an account");
		}

		setLoading(false);
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-3">Sign Up</h2>
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

						<Form.Group
							className="mb-3"
							controlId="formPlaintextPasswordConfirm"
						>
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								required
								ref={passwordConfirmRef}
							/>
						</Form.Group>

						<Form.Group>
							<div className="col-md-12 text-center">
								<Button disabled={loading} type="submit" variant="primary">
									Sign Up
								</Button>
							</div>
						</Form.Group>
					</Form>
				</Card.Body>
			</Card>

			<div className="w-100 text-center mt-2">
				Already have an account? <Link to="/login">Log in</Link>
			</div>
		</div>
	);
};

export default Signup;
