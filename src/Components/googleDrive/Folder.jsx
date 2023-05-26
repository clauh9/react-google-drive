import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { database } from "../../firebase";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { Folder as F, ThreeDotsVertical } from "react-bootstrap-icons";
import deleteFolders from "../utils/deleteFolders";

const Folder = ({ folder }) => {
	// Deletes the folder from Firebase

	const deleteFolder = (e) => {
		e.preventDefault();
		const parentId = folder.parentId; // Get the parent folder's ID

		// deleteChildFolders(folder.id); // Delete child folders recursively

		database.folders.doc(folder.id).delete(); // Delete the current folder
	};

	const deleteChildFolders = (parentId) => {
		database.folders
			.where("parentId", "==", parentId)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					const folderId = doc.id;
					deleteChildFolders(folderId); // Recursively delete child folders
					database.folders.doc(folderId).delete(); // Delete the child folder
				});
			})
			.catch((error) => {
				console.error("Error deleting child folders:", error);
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
