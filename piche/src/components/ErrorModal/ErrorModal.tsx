import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

import { getStatus } from '@/reducers/status';
import { getError } from '@/reducers/error';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
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
      <button onClick={() => setIsOpen(false)}>close</button>
      {error}
    </Modal>
  );
};

export default ErrorModal;