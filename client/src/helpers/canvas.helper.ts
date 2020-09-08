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
