import { ComponentType, useState } from "react";
import { IWithGetProps } from "../../interfaces/IWithGetProps";

// learn what in the goddamn...?
const withGet = <P extends IWithGetProps>(Component: ComponentType<P>) => {
  return (props: Omit<P, keyof IWithGetProps>) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({
      hasError: false,
      errorMessage: "",
    });
    return (
      <Component
        {...(props as P)}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
        setError={setError}
      />
    );
  };
};

export default withGet;
