import React from 'react';

import notFound from '../../assets/notfound.svg';

import { Container } from './style';

const NotFound: React.FC = () => {
  return (
    <Container>
      <img src={notFound} alt="logo" />
      <h1>404</h1>
      <p>Page not Found</p>
    </Container>
  );
};

export default NotFound;
