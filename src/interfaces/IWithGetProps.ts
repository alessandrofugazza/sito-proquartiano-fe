export interface IWithGetProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: {
    hasError: boolean;
    errorMessage: string;
  };
  setError: React.Dispatch<
    React.SetStateAction<{
      hasError: boolean;
      errorMessage: string;
    }>
  >;
}
