import { rgb } from 'd3-color';

function getContrastingColor(color: string) {
	const colorRGB = rgb(color),
		luminance = colorRGB.r * 0.29 + colorRGB.g * 0.58 + colorRGB.b * 0.1;
	return luminance >= 123 ? '#000' : '#FFF';
}

export default getContrastingColor;
