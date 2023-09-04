import { useState, useEffect } from "react";

const Header = () => {
  const [headerVal, setHeaderVal] = useState({ name: "loading", price: 18 });

  useEffect(() => {
    fetch("http://localhost:8300/ping/24")
      .then((response) => response.json())
      .then((data) => {
        setHeaderVal(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <>
      <p>The name of the day is: {headerVal.name}.</p>
      <p>The price of the day is {headerVal.price}.</p>
    </>
  );
};

export default Header;
