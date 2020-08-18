import React from 'react';
import NotFound from 'pages/404';

class ErrorBoundary extends React.Component {
	state = { isError: false };

	static getDerivedStateFromError() {
		return { isError: true };
	}
	componentDidCatch(isError: any) {
		this.setState({ isError });
	}
	render() {
		if (this.state.isError) {
			return <NotFound />;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
