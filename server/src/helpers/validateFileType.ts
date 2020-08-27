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

    if (name && allow.regex && allow.regex.some(regex => regex.test(name))) {
        return true;
    }

    if (mime && allow.mime && allow.mime.includes(mime)) {
        return true;
    }

    return false;
};
