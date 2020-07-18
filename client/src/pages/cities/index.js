import React from 'react';
import Container from '@material-ui/core/Container';
import DynamicTable from '../../components/organisms/dynamic-table';
import { deleteCity, getCities } from '../../utils/api';
import CityForm from '../../components/forms/city-form';

const tableConfig = {
  name: 'Countries',
  altName: 'Country',
  rows: 8,
  order: 'name,ASC',
  cache: 1,
  columns: [
    {
      key: 'code',
      name: 'CODE',
      value: 'code',
    },
    {
      key: 'name',
      name: 'NAME',
      value: 'name',
    },
    {
      key: 'nativeName',
      name: 'Native',
      value: 'nativeName',
    },
    {
      key: 'coords',
      name: 'COORDS',
      value: 'coords',
      align: 'right',
    },
  ],
};

const CitiesPage = () => {
  return (
    <Container>
      <DynamicTable
        config={tableConfig}
        formComponent={CityForm}
        fetchData={getCities}
        deleteData={deleteCity}
      />
    </Container>
  );
};

export default CitiesPage;
