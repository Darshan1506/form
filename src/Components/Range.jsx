import React, { useEffect, useState } from "react";
import { useValues } from "../context";
const Range = ({question}) => {

  console.log(question)
  const [inputValues, setInputValues] = useState(() => {
    // Initialize the state with values from local storage, or an empty array if not found
    const storedValues = JSON.parse(localStorage.getItem("inputValues"));
    return Array.isArray(storedValues) ? storedValues : [];
  });

  const {
    formData,
            setFormData,
            error,
            setError,
            allErrors,
            setAllErrors,
            handleInputChange,
            handleOptionClick,
            getCurrentQuestions ,
            currentStep, setCurrentStep,
            questionsPerStep, setQuestionsPerStep,
            totalSteps,
            onBlurChange


  } = useValues();
  const handleIChange = (e) => {
    const { name, value } = e.target;
  
    const updatedInputValues = [...inputValues];
    const min = updatedInputValues[0];
    const max = updatedInputValues[1];
  
    if (name === "min") {
      updatedInputValues[0] = value === "" ? null : parseInt(value);
    } else if (name === "max") {
      updatedInputValues[1] = value === "" ? null : parseInt(value);
    }
  
    setInputValues(updatedInputValues);
  
    const isMinInvalid = updatedInputValues[0] < 1000;
    const isMaxInvalid = updatedInputValues[1] === null || updatedInputValues[1] <= updatedInputValues[0];
    // if(updatedInputValues[0] === null || updatedInputValues[1]){
    //   allErrors[question.id] = true;
    //   error[1] = true;
    // }
    if (isMinInvalid || isMaxInvalid) {
      // allErrors[question.id] = true;
      // error[1] = true;
    } else {
      allErrors[question.id] = false;
      error[1] = false;
      formData[question.id] = updatedInputValues;
    }
  };
  
const onBlurHandler = (e)=>{
  const { name, value } = e.target;
  
    const updatedInputValues = [...inputValues];
    const min = updatedInputValues[0];
    const max = updatedInputValues[1];
  
    if (name === "min") {
      updatedInputValues[0] = value === "" ? null : parseInt(value);
    } else if (name === "max") {
      updatedInputValues[1] = value === "" ? null : parseInt(value);
    }
  
    setInputValues(updatedInputValues);
  
    const isMinInvalid = updatedInputValues[0] < 1000;
    const isMaxInvalid = updatedInputValues[1] === null || updatedInputValues[1] <= updatedInputValues[0];
    if(updatedInputValues[0] === null || updatedInputValues[1]){
      allErrors[question.id] = true;
      error[1] = true;
    }
    if (isMinInvalid || isMaxInvalid) {
      allErrors[question.id] = true;
      error[1] = true;
    } else {
      allErrors[question.id] = false;
      error[1] = false;
      formData[question.id] = updatedInputValues;
    }
}

  useEffect(() => {
    
    formData[question.id] = inputValues;

    
    localStorage.setItem("inputValues", JSON.stringify(inputValues));
  }, [inputValues])

  console.log(error)
  console.log(allErrors)

  console.log(formData)
  console.log(inputValues);
  return (
    <>
    <div className="flex flex-col gap-5">
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center rounded-md  border-2 bg-[#E1E7F53D] focus-within:border-[#4A7BE5]">
        <div className="">
          <h1 className="p-2 text-[1rem]">$</h1>
        </div>
        <input
          type="number"
          name="min"
          placeholder="10,000"
          value={inputValues[0]}
          onChange={handleIChange}
          onBlur={onBlurHandler}
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
            value={inputValues[1]}
            onChange={handleIChange}
            onBlur={onBlurHandler}
            className="rounded-md p-2  text-[1.rem] text-[#4A7BE5] placeholder-[#b1c2e8] focus:outline-none"
          />
        </div>
        
      </div>
    </div>    {allErrors[question.id] === true ?
                    <div className="bg-[#E55C4A13] p-2">
                    <h1 className="font-inter font-normal text-[1rem] text-[#E55C4A]">{question.err}</h1>
                  </div>
                    : null}
    </div>
    </>
  );
};

export default Range;