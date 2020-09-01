import { Crop } from 'react-image-crop';

export const base64StringtoFile = (base64String: string, filename: string) => {
	const arr = base64String.split(',');
	const mime = (arr[0] as any).match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
};

export function extractImageFileExtensionFromBase64(base64Data: string) {
	return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'));
}

export function image64toCanvasRef(canvasRef: any, image64: string, pixelCrop: Crop) {
	const canvas = canvasRef;
	console.log(canvas, pixelCrop);
	const ctx = canvas.getContext('2d');

	const image = new Image();
	image.src = image64;
	const scaleX = (pixelCrop.width ?? 0) / 144;
	const scaleY = (pixelCrop.height ?? 0) / 144;
	console.log(scaleX, scaleY);
	image.onload = function () {
		// ctx.setTransform(scaleX, 0, 0, scaleX, 0, 0);
		ctx.imageSmoothingEnabled = false;
		if (ctx !== null) {
			ctx.drawImage(
				image,
				(pixelCrop.x ?? 1) * scaleX,
				(pixelCrop.y ?? 1) * scaleY,
				(pixelCrop.width ?? 1) * scaleX,
				(pixelCrop.height ?? 1) * scaleY,
				0,
				0,
				(pixelCrop.width ?? 1) * scaleX,
				(pixelCrop.height ?? 1) * scaleY,
			);
		}
	};
}
