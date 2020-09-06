import React, { useState, useEffect, useRef, useCallback, RefObject } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import { Button } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import Portal from 'components/common/Portal';

interface Props {
	onClose: () => void;
	uploadUrl: string;
	saveCrop: (img: RefObject<HTMLCanvasElement>) => void;
}

const CropModal: React.FC<Props> = (props: Props) => {
	const { onClose, uploadUrl, saveCrop } = props;
	const { t } = useTranslation();
	const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
	const [crop, setCrop] = useState<Crop>({ aspect: 1 / 1, height: 144, unit: 'px', width: 144, x: 0, y: 0 });
	const pixelRatio = 4;
	const onChange = (c: Crop) => {
		setCrop(c);
	};

	const onLoad = useCallback((img) => {
		imgRef.current = img;
	}, []);

	const imgRef = useRef<HTMLImageElement | null>(null);
	const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

	const submitForm = () => {
		saveCrop(previewCanvasRef);
		onClose();
	};

	useEffect(() => {
		if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
			return;
		}

		const image = imgRef.current;
		const canvas = previewCanvasRef.current;
		const crop = completedCrop;

		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		const ctx = canvas.getContext('2d');

		canvas.width = (crop.width ?? 0) * pixelRatio;
		canvas.height = (crop.height ?? 0) * pixelRatio;

		if (ctx !== null) {
			ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
			ctx.imageSmoothingEnabled = false;

			ctx.drawImage(
				image,
				(crop.x ?? 0) * scaleX,
				(crop.y ?? 0) * scaleY,
				(crop.width ?? 0) * scaleX,
				(crop.height ?? 0) * scaleY,
				0,
				0,
				crop.width ?? 0,
				crop.height ?? 0,
			);
		}
	}, [completedCrop]);

	return (
		<Portal onClose={() => onClose()} open={true} size="tiny" dimmer="inverted" className={styles.modal}>
			<div className={styles.modalOverlay}>
				<div className={styles.modalContainer}>
					<div className={styles.modal}>
						<h2 className={styles.header}>{t('save_not_secure')}</h2>
						<ReactCrop
							src={uploadUrl as string}
							onImageLoaded={onLoad}
							crop={crop as Crop}
							onChange={onChange}
							onComplete={(c: Crop, pxc: Crop) => {
								setCompletedCrop(c);
							}}
						/>
						<div className={styles.footer}>
							<Button className="cancelBtn" onClick={onClose}>
								{t('cancel')}
							</Button>
							<Button className={`primaryBtn ${styles.button}`} onClick={submitForm}>
								{t('save_changes')}
							</Button>
						</div>
					</div>
				</div>
				<div className={styles.canvasWrap}>
					<canvas
						ref={previewCanvasRef}
						className={styles.canvas}
						style={{
							width: completedCrop?.width ?? 0,
							height: completedCrop?.height ?? 0,
						}}
					></canvas>
				</div>
			</div>
		</Portal>
	);
};

export default CropModal;
