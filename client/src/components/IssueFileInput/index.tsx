import React from 'react';
import FileInput from 'components/common/FileInput';
import styles from './styles.module.scss';
import { attachFile } from 'services/issue.service';
import { Label, Icon, Button } from 'semantic-ui-react';

interface Props {
	onChangePending?: (pending: boolean) => void;
	onChange?: (newLinks: WebApi.Result.IssueAttachmentResult[]) => void;
	files?: WebApi.Result.IssueAttachmentResult[];
}

const IssueFileInput: React.FC<Props> = ({ onChange = () => {}, onChangePending = () => {}, files = [] }) => {
	const upload = async (newFileList: FileList): Promise<WebApi.Result.IssueAttachmentResult[]> => {
		return await Promise.all(Array.from(newFileList).map((file) => attachFile(file)));
	};

	const handleUpload = (newFileList: FileList | null) => {
		if (newFileList) {
			onChangePending(true);

			upload(newFileList).then((newFiles) => {
				onChangePending(false);
				onChange([...files, ...newFiles]);
			});
		}
	};

	return (
		<div className={styles.button}>
			<div className={styles.smallText}>
				.png, .jpg, .jpeg, .bmp, .docx, .pptx, .xlsx and .txt files are available
			</div>
			<FileInput
				attributes={{ accept: '.png, .jpg, .jpeg, .bmp, .docx, .pptx, .xlsx, .txt', multiple: true }}
				onChange={handleUpload}
			>
				<Button secondary compact style={{ marginTop: 5, marginBottom: 5 }} type="button">
					Click here to attach file(s)
				</Button>
			</FileInput>
			<div className={styles.smallText}>
				{files.map((file) => (
					<Label key={file.id}>
						<a href={file.link} target="_blank" rel="noopener noreferrer">
							{file.name}
						</a>
						<Icon
							name="delete"
							link
							onClick={() => {
								const index = files.findIndex((fileToCheck) => fileToCheck.id === file.id);
								const newFiles = [...files];
								newFiles.splice(index, 1);
								onChange(newFiles);
							}}
						/>
					</Label>
				))}
			</div>
		</div>
	);
};

export default IssueFileInput;
