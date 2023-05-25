import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FolderPlus } from "react-bootstrap-icons";
import { database } from "../../firebase";
import { useAuthContext } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";

const AddFolder = ({ currentFolder }) => {
	const [show, setShow] = useState(false);
	const [name, setName] = useState("");
	const { currentUser } = useAuthContext();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	function handleSubmit(e) {
		e.preventDefault();

		if (currentFolder == null) return;

		const path = [...currentFolder.path];
		if (currentFolder !== ROOT_FOLDER) {
			path.push({ name: currentFolder.name, id: currentFolder.id });
		}

		database.folders.add({
			name: name,
			parentId: currentFolder.id,
			userId: currentUser.uid,
			path: path,
			createdAt: database.timestamp(),
		});

		setName("");
		handleClose();
	}

	return (
		<>
			<Button onClick={handleShow} variant="outline-success" size="sm">
				<FolderPlus size={18} />
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Form onSubmit={handleSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>Create a new folder</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Control
							type="text"
							placeholder="Folder name"
							onChange={(e) => setName(e.target.value)}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="success" type="submit">
							Create folder
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default AddFolder;
