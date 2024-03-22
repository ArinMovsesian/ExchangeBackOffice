import React from 'react';

function inputComponent({ inputRef, ...props }) {
   
    return <div ref={inputRef} {...props} />;
  }
  export default inputComponent;
