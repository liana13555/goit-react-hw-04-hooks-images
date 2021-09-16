import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ webformatURL, tags, onClick }) {
    return (
        <Item >
            <Image src={webformatURL}
                alt={tags}
                onClick={onClick}
            />
        </Item>
    );
};

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}
