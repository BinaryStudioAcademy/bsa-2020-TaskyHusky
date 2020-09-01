import React, { useState, useRef, useCallback } from 'react';
import 'react-image-crop/lib/ReactCrop.scss';
import { Crop } from 'react-image-crop';
import { useDispatch } from 'react-redux';
import { requestUpdateAvatar } from 'containers/ProfilePage/logiс/actions';
import { useTranslation } from 'react-i18next';
import { Header, Button, Icon } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { getInitials } from 'helpers/getInitials.helper';
import CropModal from 'components/CropModal';
import { base64StringtoFile, extractImageFileExtensionFromBase64, image64toCanvasRef } from 'helpers/canvas.helper';

interface Props {
	firstName: string;
	lastName: string;
	username: string;
	avatar: string;
	editMode: string;
	isCurrentUser: boolean;
	showManager: (modeToShow: string) => void;
}

const ProfilePicture: React.FC<Props> = (props: Props) => {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const [crop, setCrop] = useState<Crop>({ aspect: 1 / 1, height: 144, unit: 'px', width: 144, x: 0, y: 0 });
	const { firstName, lastName, username, avatar, editMode, isCurrentUser, showManager } = props;
	const [uploadUrl, setUploadUrl] = useState<ArrayBuffer | string | null>('');
	const [imgSrcExt, setImgSrcExt] = useState<any>(null);
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

	const imgRef = useRef<HTMLImageElement | null>(null);
	const imagePreviewCanvasRef = useRef<HTMLCanvasElement | null>(null);

	const onClose = () => {
		setUploadUrl(null);
	};

	const onChangeCrop = (c: Crop) => {
		setCrop(c);
	};

	const onLoad = useCallback((img) => {
		imgRef.current = img;
	}, []);

	const handleOnCropComplete = (crop: Crop) => {
		const canvasRef = imagePreviewCanvasRef.current;
		console.log(crop);
		console.log(canvasRef);
		image64toCanvasRef(canvasRef as HTMLCanvasElement, uploadUrl as string, crop);
	};

	const saveCrop = () => {
		if (uploadUrl) {
			const canvasRef = imagePreviewCanvasRef.current;

			if (canvasRef) {
				console.log(canvasRef);
				const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt);

				const myFilename = 'previewFile.' + imgSrcExt;

				const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
				console.log(myNewCroppedFile);
				dispatch(requestUpdateAvatar({ image: myNewCroppedFile }));
			}
		}
	};

	return (
		<>
			<div className={styles.container}>
				{uploadUrl && (
					<CropModal
						uploadUrl={uploadUrl as string}
						crop={crop}
						onClose={onClose}
						onLoad={onLoad}
						onChange={onChangeCrop}
						handleOnCropComplete={handleOnCropComplete}
						saveCrop={saveCrop}
					/>
				)}
				<div className={styles.mainInfo}>
					<div className={styles.avatarContainer}>
						<div className={styles.borderHelper}>
							{uploadUrl ? (
								<canvas ref={imagePreviewCanvasRef} className={styles.canvas}></canvas>
							) : avatar ? (
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
										multiple
										type="file"
										onChange={uploadPhoto}
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
				{isCurrentUser && showManager && (
					<Button
						className={styles.managerButton}
						onClick={() => showManager('profile')}
						disabled={!editMode ? false : true}
					>
						{t('manage_account')}
					</Button>
				)}
			</div>
		</>
	);
};

export default ProfilePicture;
