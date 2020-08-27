export default class CustomValidator {
	value: string;
	errors: Array<string>;

	constructor(valueToCheck: string) {
		this.value = valueToCheck;
		this.errors = [];
	}

	checkMinLength(minLength: number) {
		if (this.value.length >= minLength) {
			return this;
		} else {
			this.errors.push(`Field mast be longer than ${minLength} symbols.`);
			return this;
		}
	}

	checkMaxLength(maxLength: number) {
		if (this.value.length <= maxLength) {
			return this;
		} else {
			this.errors.push(`Field mast be shorter than ${maxLength} symbols.`);
			return this;
		}
	}

	checkSimpleField() {
		if (this.value.match(/^[a-zа-яёї][a-zа-яёї0-9- _]+$/i)) {
			return this;
		} else {
			this.errors.push(
				`Field should started with alphabetic character. Field can contain digits, hyphen and underscore.`,
			);
			return this;
		}
	}

	checkEmailField() {
		if (this.value.match(/^[a-z0-9][a-z0-9-_.]{1,64}@[a-z0-9-]{1,253}.[a-z]{2,6}$/i)) {
			return this;
		} else {
			this.errors.push(`Invalid Email`);
			return this;
		}
	}

	checkPasswordField() {
		if (
			this.value.match(/^(?=.*[0-9]+.*)(?=.*[A-Z]+.*)(?=.*[@$!%*#?&]+.*)(?=.*[a-z]+.*)[0-9a-zA-Z\d@$!%*#?&]*$/g)
		) {
			return this;
		} else {
			this.errors.push(
				`Password should contain at least 1 digit, 1 capital letter, 1 small letter, 1 special character.`,
			);
			return this;
		}
	}

	checkSuperPasswordField() {
		if (
			this.value.match(
				/^(?=(.*[0-9]){3,})(?=(.*[A-Z]){3,})(?=(.*[@$!%*#?&]){3,})(?=(.*[a-z]){3,})[0-9a-zA-Z\d@$!%*#?&]*$/g,
			)
		) {
			return this;
		} else {
			this.errors.push(
				`Password should contain at least 1 digit, 1 capital letter, 1 small letter, 1 special character.`,
			);
			return this;
		}
	}

	validate() {
		return this.errors.join(' ');
	}
}
