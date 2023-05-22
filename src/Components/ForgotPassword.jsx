import React, { useRef, useState } from "react";
import { Card, Button, Col, Row, Form, Alert } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
	const emailRef = useRef();
	const { resetPasswd } = useAuthContext();
	const [error, setError] = useState("");
	const [sent, setSent] = useState(false);
	const [loading, setLoading] = useState("");
	const history = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await resetPasswd(emailRef.current.value);
			setSent(true);
			// history("/login");
		} catch (error) {
			setError("If you have an account an email with be sent");
		}

		setLoading(false);
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-3">Log in</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{sent && (
						<Alert variant="warning">
							{"If you have an account an email with be sent"}
						</Alert>
					)}
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

						<Form.Group>
							<div className="col-md-12 text-center">
								<Button disabled={loading} type="submit" variant="primary">
									Reset Password
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

export default ForgotPassword;
