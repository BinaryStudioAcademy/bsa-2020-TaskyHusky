import validator from 'validator';

export const validProjectName = (name: string): boolean => validator.isLength(name, { min: 5, max: 40 });
export const validProjectKey = (key: string): boolean => validator.isLength(key, { min: 2, max: 10 });
