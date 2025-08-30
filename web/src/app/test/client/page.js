"use client";

import { useState } from "react";
export default function CientPage(params) {
  const [value, setValue] = useState();
  const handleClick = () => {
    // do something
  };
  return (
    <>
      <button onClick={handleClick}>The Test Button</button>
      <p>Value: </p>
    </>
  );
}
