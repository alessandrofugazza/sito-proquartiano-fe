import React from "react";
import { Container } from "react-bootstrap";
import MyBreadcrumb from "./MyBreadcrumb";
import NavigationButtons from "./NavigationButtons";

interface RouteWrapperProps {
  title: string;
  description: string;
  content: React.ReactNode;
}

function RouteWrapper({ title, description, content }: RouteWrapperProps) {
  return (
    <main className="flex-grow-1">
      <Container className="py-4 my-5 border shadow" style={{ backgroundColor: "white" }}>
        {title && (
          <>
            {title !== "Pagina non trovata" && <MyBreadcrumb />}
            <header>
              <h1>{title}</h1>
              {description && <p>{description}</p>}
            </header>
            <hr className="my-4" />
          </>
        )}
        {content}
        {title && <NavigationButtons />}
      </Container>
    </main>
  );
}

export default RouteWrapper;
