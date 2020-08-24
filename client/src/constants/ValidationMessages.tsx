import React from 'react';

export const VM_PROJECT_NAME = 'Project name must be between 5 and 40 characters long';
export const VM_PROJECT_KEY = 'Key must be between 2 and 10 characters long and be unique';
export const VM_GITHUB_URL = (
	<>
		Github url should match this pattern:
		<br />
		https://github.com/{'{organization or username}'}/{'{repository name}'}.git
	</>
);
