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

export function image64toCanvasRef(canvasRef: HTMLCanvasElement, image64: string, pixelCrop: Crop) {
	const canvas = canvasRef;
	console.log(canvas, pixelCrop);
	canvas.width = pixelCrop.width ?? 0;
	canvas.height = pixelCrop.height ?? 0;
	const ctx = canvas.getContext('2d');
	const image = new Image();

	const scaleX = (pixelCrop.width ?? 0) / 144;
	const scaleY = (pixelCrop.height ?? 0) / 144;

	image.onload = function () {
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
