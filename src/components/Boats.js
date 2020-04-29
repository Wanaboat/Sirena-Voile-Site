import React from 'react';
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Boats = (props) => {
  const { title } = useSiteMetadata();
  return (
    <>
      <div> {title} test</div>
    </>
  );
};

export default Boats;