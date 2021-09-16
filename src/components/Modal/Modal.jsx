import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, StyledModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.modalImage;
    // console.log(this.props.modalImage);

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
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
}

export default Modal;

