import React from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import { Button, Modal } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

interface Props {
	onClose: () => void;
	onLoad: (img: any) => void;
	onChange: (c: Crop) => void;
	crop: Crop;
	uploadUrl: string;
	handleOnCropComplete: (crop: Crop, pixelCrop: Crop) => void;
	saveCrop: () => void;
}

const CropModal: React.FC<Props> = (props: Props) => {
	const { onClose, onLoad, crop, uploadUrl, onChange, handleOnCropComplete, saveCrop } = props;

	const { t } = useTranslation();

	const submitForm = () => {
		saveCrop();
		onClose();
	};
	return (
		<Modal onClose={() => onClose()} open={true} size="tiny" dimmer="inverted">
			<Modal.Header>{t('save_not_secure')}</Modal.Header>
			<Modal.Content>
				<ReactCrop
					src={uploadUrl as string}
					onImageLoaded={onLoad}
					crop={crop as Crop}
					onChange={onChange}
					onComplete={handleOnCropComplete}
				/>
			</Modal.Content>
			<Modal.Actions>
				<Button primary onClick={submitForm}>
					{t('save_changes')}
				</Button>
				<Button color="blue" basic onClick={onClose}>
					{t('cancel')}
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default CropModal;
