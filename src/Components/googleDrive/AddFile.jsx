import React from "react";
import { projectStorage, database } from "../../firebase";
import { FileEarmarkPlus, ThreeDotsVertical } from "react-bootstrap-icons";
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
					database.files.add({
						userId: currentUser.uid,
						folderId: currentFolder.id,
						url: url,
						name: file.name,
						createdAt: database.timestamp(),
					});
				});
			}
		);
	};
	const now = 60;
	return (
		<>
			{/* <Button onClick={handleShow} variant="outline-success" size="sm"> */}
			<label className="btn btn-outline-success btn-sm">
				<FileEarmarkPlus size={18} />
				<input
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
