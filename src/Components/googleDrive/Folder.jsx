import React from "react";
import { Link } from "react-router-dom";
import { database, projectStorage } from "../../firebase";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Folder as F, ThreeDotsVertical } from "react-bootstrap-icons";

const Folder = ({ folder }) => {
	const deleteFolder = (e) => {
		e.preventDefault();

		deleteChildFolders(folder.id, folder.userId); // Delete child folders recursively

		deleteChildFiles(folder.id, folder.userId); //delete  current folder files
		database.folders.doc(folder.id).delete(); // Delete the current folder
	};

	//to delete nested folders
	const deleteChildFolders = (parentId, userId) => {
		database.folders
			.where("parentId", "==", parentId)
			.where("userId", "==", userId) // Check userId in the query
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const folderId = doc.id;
					deleteChildFiles(folderId, userId);
					deleteChildFolders(folderId, userId);
					database.folders.doc(folderId).delete(); // Delete the child folder
				});
			})
			.catch((error) => {
				console.error("Error deleting child folders:", error);
			});
	};

	//to deleted files inside nested folders
	const deleteChildFiles = async (folderId, userId) => {
		await database.files
			.where("folderId", "==", folderId)
			.where("userId", "==", userId)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach(async (doc) => {
					const fileDoc = await database.files.doc(doc.id).get();

					await database.files.doc(doc.id).delete(); // Delete the current file from Firestore
					await projectStorage.refFromURL(fileDoc.data().url).delete(); // Delete the current file from storage
				});
			});
	};

	// The popup that shows up when we click the 3 dots
	const popover = (
		<Popover>
			<Popover.Body onClick={deleteFolder}>Delete Folder</Popover.Body>
		</Popover>
	);

	return (
		<>
			<Button
				to={{
					pathname: `/folder/${folder.id}`,
					state: { folder: folder },
				}}
				variant="outline-dark"
				className="text-truncate w-100"
				as={Link}
			>
				<F /> {folder.name}{" "}
				<OverlayTrigger
					trigger="click"
					placement="bottom"
					overlay={popover}
					rootClose //so it closes when you click somewhere else
				>
					<ThreeDotsVertical onClick={(e) => e.preventDefault()} />
				</OverlayTrigger>
			</Button>
		</>
	);
};

export default Folder;
