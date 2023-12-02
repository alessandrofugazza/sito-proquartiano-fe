import React from "react";
import { Container } from "react-bootstrap";
import MyBreadcrumb from "./MyBreadcrumb";
import NavigationButtons from "./NavigationButtons";

interface RouteWrapperProps {
  title: string;
  description?: string;
  content: React.ReactNode;
  breadcrumb?: boolean;
}

function RouteWrapper({ title, description = "", content, breadcrumb = true }: RouteWrapperProps) {
  return (
    <main className="flex-grow-1 d-flex">
      <Container className="d-flex flex-column py-4 my-5 border shadow" style={{ backgroundColor: "white" }}>
        {title && (
          <>
            {breadcrumb && <MyBreadcrumb />}
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
