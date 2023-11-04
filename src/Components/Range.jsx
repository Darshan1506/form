import React, { useState } from "react";

const Range = () => {
  const [inputValues, setInputValues] = useState({
    min: "",
    max: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //error handling validation
    if (name === "min" && parseFloat(value) > parseFloat(inputValues.max)) {
      return;
    }
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  console.log(inputValues);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center rounded-md  border-2 bg-[#E1E7F53D] focus-within:border-[#4A7BE5]">
        <div className="">
          <h1 className="p-2 text-[1rem]">$</h1>
        </div>
        <input
          type="number"
          name="min"
          placeholder="10,000"
          value={inputValues.min}
          onChange={handleInputChange}
          className="rounded-md p-2  text-[1.rem] text-[#4A7BE5] placeholder-[#b1c2e8] focus:outline-none"
        />
      </div>
      -
      <div>
        <div className="flex items-center rounded-md border-2 bg-[#E1E7F53D] focus-within:border-[#4A7BE5]">
          <div className="">
            <h1 className="p-2 text-[1rem]">$</h1>
          </div>
          <input
            type="number"
            name="max"
            placeholder="15,000"
            value={inputValues.max}
            onChange={handleInputChange}
            className="rounded-md p-2  text-[1.rem] text-[#4A7BE5] placeholder-[#b1c2e8] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Range;
