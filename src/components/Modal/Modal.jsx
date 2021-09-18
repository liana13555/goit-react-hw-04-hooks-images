import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, StyledModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({onClose, modalImage}) {
  
   useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
   });
  
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const { largeImageURL, tags } = modalImage;

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <StyledModal>
        <img
          src={largeImageURL}
          alt={tags}
        />
      </StyledModal>
    </Overlay>,
    modalRoot
  );
};


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalImage: PropTypes.object,
};