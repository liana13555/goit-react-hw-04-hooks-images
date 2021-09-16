import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import { StyledGallery } from './ImageGallery.styled';

const ImageGallery = ({ images, largeImage  }) => {
  return (
    <StyledGallery >
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          tags={image.tags}
          onClick={() => largeImage(image)}               
        />
      ))}
    </StyledGallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      tags: PropTypes.string,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
    }),
  ),
  largeImage: PropTypes.func.isRequired, 
};

export default ImageGallery;
