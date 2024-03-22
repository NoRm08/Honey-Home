
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

type LoaderProps = {
  children: JSX.Element;
  isLoading: boolean;
};

export default function Loader({ children, isLoading }: LoaderProps): JSX.Element {
  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  return children;
}
