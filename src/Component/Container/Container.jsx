import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`${className} max-w-screen-2xl mx-auto px-3 md:px-7`}>{children}</div>
  );
};

export default Container;