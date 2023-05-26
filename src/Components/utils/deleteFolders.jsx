import { database } from "../../firebase";

const deleteFolder = (e) => {
	e.preventDefault();
	const parentId = folder.parentId; // Get the parent folder's ID

	deleteChildFolders(folder.id); // Delete child folders recursively

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

export default deleteFolder;
