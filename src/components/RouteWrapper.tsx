import React from 'react';
import { Container } from 'react-bootstrap';

interface RouteWrapperProps {
  elementTitle: string;
  elementContent: React.ReactNode;
}

function RouteWrapper({ elementTitle, elementContent }: RouteWrapperProps) {
  return (
    <Container className='py-5'>
      
      {elementTitle && (
        <>
          <header>
            <h1>{elementTitle}</h1>
          </header>
          <hr className="mt-5 mb-4"/>
        </>
      )}
      {elementContent}
    </Container>
  );
}

export default RouteWrapper;