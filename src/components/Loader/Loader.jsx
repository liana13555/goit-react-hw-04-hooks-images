import Loader from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { LoaderThumb } from './Loader.styled';

function Spinner() {
  return (
    <LoaderThumb >
      <Loader
        type="Oval"
        color="#00BFFF"
        height={100}
        width={100}
      />
    </LoaderThumb>
  );
}

export default Spinner;