import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = (props: any) => {
	const [container] = useState(document.createElement('div'));

	useEffect(() => {
		document.body.appendChild(container);
		return () => {
			document.body.removeChild(container);
		};
	}, [container]);

	return createPortal(props.children, container);
};

export default Portal;
