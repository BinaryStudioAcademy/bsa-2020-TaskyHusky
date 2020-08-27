import { generateExtnameRegex } from "../src/helpers/extnameRegex";

export const allowedImageUploadMimeTypes = {
    mime: [
        'image/png',
        'image/jpg',
        'image/jpeg', 'image/bmp'
    ]
};

export const allowedIssueAttchmentUploadFileTypes = {
    mime: [
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/png',
        'image/jpeg',
        'image/bmp',
        'image/jpg'
    ],
    regex: [
        generateExtnameRegex('txt'),
        generateExtnameRegex('csv')
    ]
};
