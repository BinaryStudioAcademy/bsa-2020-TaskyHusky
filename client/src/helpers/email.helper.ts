export const normalizeEmail: (txt: string) => string = (text) => text.trim().toLowerCase();

export const areEmailsEqual = (email1: string, email2: string) => {
	return email1.toLowerCase().trim() === email2.toLowerCase().trim();
};
