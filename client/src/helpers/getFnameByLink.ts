export const getFnameByLink = (link: string) => {
	let lastSlash = link.lastIndexOf('/');

	if (link.length - 1 === lastSlash) {
		lastSlash = link.lastIndexOf('/', link.length - 1);
	}

	return link.slice(lastSlash + 1);
};
