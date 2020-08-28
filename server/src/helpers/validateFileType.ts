interface Options {
	name?: string;
	mime?: string;
	allow: {
		mime?: string[];
		regex?: RegExp[];
	};
}

export const validateFileType = (options: Options) => {
	const { name, mime, allow } = options;
	const matchesRegex = name && allow.regex && allow.regex.some((regex) => regex.test(name));
	const oneOfAllowedMime = mime && allow.mime && allow.mime.includes(mime);

	if (matchesRegex) {
		return true;
	}

	if (oneOfAllowedMime) {
		return true;
	}

	return false;
};
