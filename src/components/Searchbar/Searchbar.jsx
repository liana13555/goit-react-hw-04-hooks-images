import PropTypes from 'prop-types';
import { Header, Form, Button, BtnLabel, Input } from './Searchbar.module';

const Searchbar = ({ onSearch }) => {
    const handleSearch = e => {
        e.preventDefault();

        onSearch(e.target.elements.imageName.value);
    };     

    return (
        <Header>
            <Form onSubmit={handleSearch} >
                <Button type="submit">
                    <BtnLabel>Search</BtnLabel>
                </Button>

                <Input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name="imageName"
                />
            </Form>
        </Header>
    );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;