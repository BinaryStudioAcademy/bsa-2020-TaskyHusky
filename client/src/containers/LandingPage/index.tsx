import React, { useState } from 'react';
import MainPage from './MainPage';

const LandingPage = () => {
	const [isLoginForm, setLoginForm] = useState<boolean>(true);

	return <MainPage isLoginForm={isLoginForm} setLoginForm={setLoginForm} />;
};

export default LandingPage;
