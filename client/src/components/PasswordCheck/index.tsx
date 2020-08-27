import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import CustomValidator from 'helpers/validation.helper';

interface Props {
	pass: string;
	acceptLength: number;
	checkPassSecurity?: (isSecure: boolean) => void;
}

const PasswordCheck: React.FC<Props> = (props: Props) => {
	const { pass, acceptLength, checkPassSecurity } = props;
	const customValidator = new CustomValidator(pass);

	const isPassAcceptable = !Boolean(customValidator.checkMinLength(acceptLength).checkPasswordField().validate());
	const isSuperPass = !Boolean(customValidator.checkMinLength(12).checkSuperPasswordField().validate());

	const firstIndicator = () => (isSuperPass ? styles.green : isPassAcceptable ? styles.yellow : styles.red);
	const secondIndicator = () => (isSuperPass ? styles.green : isPassAcceptable ? styles.yellow : styles.grey);
	const thirdIndicator = () => (isSuperPass ? styles.green : styles.grey);

	useEffect(() => {
		if (checkPassSecurity) {
			checkPassSecurity(isSuperPass);
		}
	}, [isSuperPass, checkPassSecurity]);

	return (
		<div className={pass ? styles.progress : styles.hidden}>
			<div className={`${firstIndicator()} ${styles.line}`}></div>
			<div className={`${secondIndicator()} ${styles.line}`}></div>
			<div className={`${thirdIndicator()} ${styles.line}`}></div>
		</div>
	);
};

export default PasswordCheck;
