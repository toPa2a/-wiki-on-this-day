import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getStatus, setStatus } from '@/slices/status';
import { getError, setError } from '@/slices/error';

import './ErrorModal.css';

const ErrorModal = () => {
	const status = useSelector(getStatus);
  const error = useSelector(getError);
  const [isOpen, setIsOpen] = useState(status === 'error');
	const dispatch = useDispatch();

	const closeModal = useCallback(() => {
		dispatch(setError(null));
		dispatch(setStatus('loaded'));
		setIsOpen(false);
	}, []);

  useEffect(() => {
		if (status === 'error') setIsOpen(true);

    const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [status, error]);

	return isOpen && (
		<div className="error-modal">
			<div className="error-modal__inner">
				<button onClick={closeModal} aria-label="Close Modal">&#10005;</button>
				{error}
			</div>
		</div>
	);
};

export default ErrorModal;