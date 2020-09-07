import React, { useState, RefObject } from 'react';
import 'react-image-crop/lib/ReactCrop.scss';
import { useDispatch, useSelector } from 'react-redux';
import { requestUpdateAvatar } from 'containers/ProfilePage/logiс/actions';
import { useTranslation } from 'react-i18next';
import { Header, Button, Icon } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { RootState } from 'typings/rootState';
import { getInitials } from 'helpers/getInitials.helper';
import CropModal from 'components/CropModal';
import { base64StringtoFile, extractImageFileExtensionFromBase64 } from 'helpers/canvas.helper';
import { ModeManager } from 'containers/ProfilePage';

interface Props {
	firstName: string;
	lastName: string;
	username: string;
	avatar: string;
	editMode: string;
	isCurrentUser: boolean;
	showManager: (modeToShow: ModeManager) => void;
}

const ProfilePicture: React.FC<Props> = (props: Props) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { avatar } = useSelector((state: RootState) => state.user);
	const { firstName, lastName, username, editMode, isCurrentUser, showManager } = props;
	const [uploadUrl, setUploadUrl] = useState<ArrayBuffer | string | null>('');
	const [imgSrcExt, setImgSrcExt] = useState<string | null>(null);

	const uploadPhoto = async (e: any) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
			reader.onloadend = () => {
				const { result } = reader;
				setUploadUrl(result);
				setImgSrcExt(extractImageFileExtensionFromBase64(result as string));
			};
		}
	};

	const onClose = () => {
		setUploadUrl(null);
	};

	const saveCrop = (imagePreviewCanvasRef: RefObject<HTMLCanvasElement>) => {
		if (uploadUrl) {
			const canvasRef = imagePreviewCanvasRef.current;
			if (canvasRef) {
				const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt);
				const myFilename = 'previewFile.' + imgSrcExt;
				const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
				dispatch(requestUpdateAvatar({ image: myNewCroppedFile }));
			}
		}
	};

	return (
		<>
			<div className={styles.container}>
				{uploadUrl && <CropModal uploadUrl={uploadUrl as string} onClose={onClose} saveCrop={saveCrop} />}
				<div className={styles.mainInfo}>
					<div className={styles.avatarContainer}>
						<div className={styles.borderHelper}>
							{avatar ? (
								<img src={avatar} className={styles.avatar} alt="Avatar" />
							) : (
								<h1 className={styles.initials}>
									{getInitials({ id: '', firstName, lastName, email: '' })}
								</h1>
							)}
							{isCurrentUser && (
								<>
									<Icon name="photo" size="big" className={styles.editBtn} />
									<input
										accept=".jpg, .jpeg, .png, .bmp"
										id="contained-button-file"
										type="file"
										onInput={uploadPhoto}
										className={styles.hidden}
									/>
								</>
							)}
						</div>
					</div>
					<Header as="h2" className={styles.fullName}>
						{firstName} {lastName}
					</Header>
					{username && <p className={styles.username}>{username}</p>}
				</div>
				{isCurrentUser &&
					showManager &&
					(editMode ? (
						<Button className={`cancelBtn ${styles.button}`} onClick={() => showManager(ModeManager.main)}>
							{t('back')}
						</Button>
					) : (
						<Button
							className={styles.managerBtn}
							onClick={() => showManager(ModeManager.profile)}
							disabled={!editMode ? false : true}
						>
							{t('manage_account')}
						</Button>
					))}
			</div>
		</>
	);
};

export default ProfilePicture;
