import React from 'react';
import Form from 'react-bootstrap/Form';

const FormControl = ({countries, onChangeCountry}) => {
    return (
        <Form>
            <Form.Group>
                <Form.Control as="select" size="lg" onChange={onChangeCountry}>
                    <option>WorldWide</option>
                    {countries.sort((a,b) => a.country.localeCompare(b.country)).map((countryData, key) => {
                        return(
                            <option key={key}>{countryData.country}</option>
                        )
                    })}
                </Form.Control>
            </Form.Group>
        </Form>
    )
}
export default FormControl;
