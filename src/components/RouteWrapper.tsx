import React from 'react';
import { Container } from 'react-bootstrap';

interface RouteWrapperProps {
  element: React.ReactNode;
}

function RouteWrapper({ element }: RouteWrapperProps) {
  return (
    <Container className='py-5'>
      {element}
    </Container>
  );
}

export default RouteWrapper;