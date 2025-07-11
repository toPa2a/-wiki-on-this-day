import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

import { getStatus } from '@/reducers/status';
import { getError } from '@/reducers/error';

import './ErrorModal.css';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderColor: 'var(--border-color)',
    borderRadius: 0,
    backgroundColor: 'var(--bg-color)',
  },
};

const ErrorModal = () => {
  const status = useSelector(getStatus);
  const error = useSelector(getError);
  const [isOpen, setIsOpen] = useState(status === 'error');

  useEffect(() => {
    setIsOpen(status === 'error');
  }, [status]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
    >
      <button onClick={() => setIsOpen(false)} aria-label="Close Modal">&#10005;</button>
      {error}
    </Modal>
  );
};

export default ErrorModal;