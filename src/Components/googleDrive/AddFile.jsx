import React from "react";
import { projectStorage, database } from "../../firebase";
import { FileEarmarkPlus } from "react-bootstrap-icons";
import { useAuthContext } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";

const AddFile = ({ currentFolder }) => {
	const { currentUser } = useAuthContext();

	const handleUpload = (e) => {
		const file = e.target.files[0];
		if (currentFolder == null || file == null) {
			return;
		}
		const filePath =
			currentFolder === ROOT_FOLDER
				? `${currentFolder.path.join("/")}/${file.name}`
				: `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

		const uploadTask = projectStorage
			.ref(`/files/${currentUser.uid}/${file.name}`)
			.put(file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {},
			() => {},
			() => {
				uploadTask.snapshot.ref.getDownloadURL().then((url) => {
					// console.log(url);
					database.files
						.where("name", "==", file.name)
						.where("userId", "==", currentUser.uid)
						.where("folderId", "==", currentFolder.id)
						.get()
						.then((getFiles) => {
							const getFile = getFiles.docs[0];
							if (getFile) {
								getFile.ref.update({ url: url });
							} else {
								//everything before this handles duplicates
								database.files.add({
									userId: currentUser.uid,
									folderId: currentFolder.id,
									url: url,
									name: file.name,
									createdAt: database.timestamp(),
								});
							}
						});
				});
			}
		);
	};

	return (
		<>
			{/* <Button onClick={handleShow} variant="outline-success" size="sm"> */}
			<label className="btn btn-outline-success btn-sm">
				<FileEarmarkPlus size={18} />
				<label htmlFor="upload-file" hidden>
					Upload File
				</label>
				<input
					id="upload-file"
					type="file"
					onChange={handleUpload}
					style={{
						opacity: 0,
						position: "absolute",
						left: "-9999px",
					}}
				/>
			</label>
			{/* </Button> */}
		</>
	);
};

export default AddFile;
