import React from 'react';
import { Container } from 'react-bootstrap';

interface RouteWrapperProps {
  title: string;
  description: string;
  content: React.ReactNode;
}

function RouteWrapper({ title, description, content }: RouteWrapperProps) {
  return (
    <Container className='py-5'>
      {title && (
        <>
          <header>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
          </header>
          <hr className="mt-5 mb-4"/>
        </>
      )}
      {content}
    </Container>
  );
}

export default RouteWrapper;