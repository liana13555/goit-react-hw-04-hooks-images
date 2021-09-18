import { useState, useEffect } from 'react';
import Searchbar from './components/Searchbar/Searchbar.jsx';
import fetchImages from './services/pixabay-api';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import Button from './components/Button/Button.jsx';
import Modal from './components/Modal/Modal.jsx';
import Spinner from './components/Loader/Loader.jsx';
import toast, { Toaster } from 'react-hot-toast';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [reqStatus, setReqStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!imageName) {
      return;
    }

    async function getfetchImages() {
      setReqStatus(Status.PENDING);
      try {
        const images = await fetchImages(imageName, page);
        if (images.length === 0) {
          return toast.error(`Unfortunately, no results for your search`);
        }
        setImages(prevImages => [...prevImages, ...images]);
        setReqStatus(Status.RESOLVED);

        if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        setReqStatus(Status.REJECTED);
      }
    }

    getfetchImages();
  }, [imageName, page]);

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
  };

  const loadMoreBtn = () => {
    setPage(page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSelectedImage = largeImage => {
    setModalImage(largeImage);
    setShowModal(!showModal);
  };

  return (
    <div>
      <Toaster />
      <Searchbar onSearch={handleFormSubmit} />
      {reqStatus === Status.PENDING && <Spinner />}
      <ImageGallery images={images} toggleModal={toggleModal} largeImage={handleSelectedImage} />
      {reqStatus === Status.RESOLVED && <Button onClick={loadMoreBtn} />}
      {showModal && <Modal modalImage={modalImage} onClose={toggleModal} />}
    </div>
  );
}

// import { Component } from 'react';
// import Searchbar from './components/Searchbar/Searchbar.jsx';
// import fetchImages from './services/pixabay-api';
// import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
// import Button from './components/Button/Button.jsx';
// import Modal from './components/Modal/Modal.jsx';
// import Spinner from './components/Loader/Loader.jsx';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

// export default class App extends Component {
//   state = {
//     imageName: '',
//     images: [],
//     reqStatus: Status.IDLE,
//     page: 1,
//     showModal: false,
//     modalImage: null,
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const nextName = this.state.imageName;
//     const nextPage = this.state.page;

//     if (prevState.imageName !== nextName || prevState.page !== nextPage) {
//       try {
//         this.setState({ reqStatus: Status.PENDING });
//         const images = await fetchImages(nextName, nextPage);
//         this.setState(prevState => ({
//           images: [...prevState.images, ...images],
//           reqStatus: Status.RESOLVED,
//         }));
//         if (prevState.images !== this.state.images) {
//           window.scrollTo({
//             top: document.documentElement.scrollHeight,
//             behavior: 'smooth',
//           });
//         }
//       } catch (error) {
//         this.setState({ reqStatus: Status.REJECTED });
//       }
//     }
//   }

//   handleFormSubmit = imageName => {
//     this.setState({ imageName });
//   };

//   loadMoreBtn = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   handleSelectedImage = largeImage => {
//     this.setState(prevState => ({
//       showModal: !prevState.showModal,
//       modalImage: largeImage,
//     }));
//   };

//   render() {
//     const { images, showModal, modalImage, reqStatus } = this.state;

//     return (
//       <div>
//         <Searchbar onSearch={this.handleFormSubmit} />
//         {reqStatus === Status.PENDING && <Spinner />}
//         <ImageGallery
//           images={images}
//           toggleModal={this.toggleModal}
//           largeImage={this.handleSelectedImage}
//         />
//         {reqStatus === Status.RESOLVED && <Button onClick={this.loadMoreBtn} />}
//         {showModal && <Modal modalImage={modalImage} onClose={this.toggleModal} />}
//       </div>
//     );
//   }
// }
