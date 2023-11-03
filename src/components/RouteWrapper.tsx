import React from 'react';
import { Button, Container } from 'react-bootstrap';
import MyBreadcrumb from './MyBreadcrumb';
import { Link } from 'react-router-dom';
import NavigationButtons from './NavigationButtons';

interface RouteWrapperProps {
  title: string;
  description: string;
  content: React.ReactNode;
}

function RouteWrapper({ title, description, content }: RouteWrapperProps) {
  return (
    <main className='flex-grow-1'>
      <Container className='py-5' style={{backgroundColor: 'white'}}>
        {title && (
          <>
            <MyBreadcrumb />
            <header>
              <h1>{title}</h1>
              {description && <p>{description}</p>}
            </header>
            <hr className="my-4"/>
          </>
        )}
        {content}
        {title && <NavigationButtons />}
      </Container>
    </main>
  );
}

export default RouteWrapper;