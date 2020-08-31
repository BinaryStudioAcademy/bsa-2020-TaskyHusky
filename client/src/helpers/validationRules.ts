import validator from 'validator';

export const validProjectName = (name: string): boolean => validator.isLength(name, { min: 5, max: 40 });
export const validProjectKey = (key: string): boolean => validator.isLength(key, { min: 2, max: 10 });
export const validTeamName = (key: string): boolean => validator.isLength(key, { min: 4, max: 40 });
export const validateFilterName = (key: string): boolean => validator.isLength(key, { min: 4, max: 40 });
export const validGitHubUrl = (url: string): boolean => /(https:\/\/github\.com\/.+\/.+\.git)|/.test(url);
