import { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Upload from "../Components/Upload";
import Range from "../Components/Range";
import { questions } from "../config/questions";

function Multiform() {
  const [error, setError] = useState([true]);
  const [allErrors, setAllErrors] = useState(Array(10).fill(false));
  const [currentStep, setCurrentStep] = useState(() => {
    // Try to retrieve the currentStep value from localStorage
    const storedCurrentStep = localStorage.getItem("currentStep");
    return storedCurrentStep ? parseInt(storedCurrentStep, 10) : 0;
  });
  const [questionsPerStep, setQuestionsPerStep] = useState([3, 2, 3, 3]);
  const [formData, setFormData] = useState(() => {
    const storedData = localStorage.getItem("formData");
    return storedData ? JSON.parse(storedData) : [];
  });

  const handleOptionClick = (e, data, option) => {
    e.preventDefault();
    let updatedSelectedOptions;
    console.log(Array.isArray(formData[data.id]));
    if (Array.isArray(formData[data.id])) {
      if (formData[data.id].includes(option)) {
        updatedSelectedOptions = formData[data.id].filter(
          (item) => item !== option
        );
      } else {
        updatedSelectedOptions = [...formData[data.id], option];
      }
    } else {
      updatedSelectedOptions = [option];
    }

    handleInputChange(data, updatedSelectedOptions);
  };

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("currentStep", currentStep.toString());
  }, [formData, currentStep]);

  const totalSteps = questionsPerStep.length;

  const handlePrev = (e) => {
    e.preventDefault();
    if (currentStep === 0) return currentStep;
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const getCurrentQuestions = () => {
    const startIdx = questionsPerStep
      .slice(0, currentStep)
      .reduce((acc, val) => acc + val, 0);
    const endIdx = startIdx + questionsPerStep[currentStep];
    return questions.slice(startIdx, endIdx);
  };

  useEffect(() => {
    const ques = getCurrentQuestions();
    let updateError = [Array(questionsPerStep.length - 1).fill(true)];
    if (Array.isArray(error)) {
      console.log(updateError);


      ques.forEach((ques, index) => {

        if (!ques.isOptional){
          if(formData[ques.id] === undefined ||formData[ques.id]?.length === 0 ){
          console.log(formData[ques.id]);
          updateError[index] = true;

          if(ques.id === 6){
            updateError[index] = false;
          }
        }} else {
          console.log(formData[ques.id]);

          updateError[index] = false;
        }
        console.log("upd", updateError);
        setError(updateError);
        console.log("neww", error);
      }

      );
    }
  }, [currentStep, formData, questionsPerStep.length]);

  const handleNext = (e) => {
    e.preventDefault();



    if (Array.isArray(error)) {
      if (!error.includes(true) && currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };


  useEffect(() => {
    // Check the screen width and update isMobile state
    const checkScreenSize = () => {
      const isMobile = window.matchMedia("(max-width: 640px)").matches; // Adjust the breakpoint as needed
      if (isMobile) {
        setQuestionsPerStep([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      } else {
        setQuestionsPerStep([3, 2, 3, 3]);
      }
    };

    // Add an event listener to check screen size when the component mounts
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleInputChange = (data, value) => {
    const updatedFormData = [...formData];
    const updatedErrorValues = [...allErrors]

    if (data.regex) {
      if ((data.regex.test(value))) {
        console.log(value, data.id, "no error")
        updatedErrorValues[data.id] = false;

      } else {
        console.log(value, data.id, "regex error there")
        updatedErrorValues[data.id] = true;
      }
    }
      else {
        updatedErrorValues[data.id] = false;
      }
      updatedFormData[data.id] = value;
      setFormData(updatedFormData);
      setAllErrors(updatedErrorValues)
    }

 
    console.log(formData);

    return (
      <div className="w-full h-[100%] flex justify-center items-center">
        <div className="relative border rounded-[10px] w-[70%] my-[10vh] border-[#E5E8F2] border-solid bottom-2">
          <div className="mx-6 mt-6 flex justify-between">
            <div className="flex gap-3">
              <button
                onClick={(e) => handlePrev(e)}
                className="bg-[#F8F9FD] text-[#9DB4E6] px-2 text-[1rem]"
              >{`<`}</button>
              <button
                onClick={(e) => handleNext(e)}
                className="bg-[#F8F9FD] text-[#9DB4E6] px-2 text-[1rem]"
              >{`>`}</button>
            </div>
            <button className="bg-[#F8F9FD] text-[#9DB4E6] px-2 text-[1rem]">
              <RxCross1 />
            </button>
          </div>
          {getCurrentQuestions().map((question, idx) => (
            <div key={question.id} className="ml-[15%] mr-[13%] mt-[6%]">
              <div className="flex flex-col gap-1 mb-12">
                <label
                  htmlFor="campaignName"
                  className="font-inter text-[1.4rem] font-[400] leading-[1.6rem] text-[#507AD3] flex"
                >
                  <div className="flex items-center gap-2 ml-[-2.4rem] justify-center mr-2">
                    <h1 className="text-[1.1rem] font-inter font-[200]">
                      {question.id + 1}
                    </h1>
                    <AiOutlineArrowRight size={15} />
                  </div>
                  {question.ques}
                </label>
                <p className="font-inter mb-2 text-[1.125rem] font-[200] text-[#5A81D9] opacity-[0.7]">
                  {question.description}
                </p>
                {question.options ? (
                  <div className="mb-12 flex flex-col gap-1">
                    <div className="flex flex-wrap">
                      {question.options.map((option, index) => (
                       
                        <button
                          key={index}
                          value={option}
                          type="button" // Use type="button" to prevent form submission
                          className={`m-[2px] p-1 text-[1rem]  ${formData[question.id]?.includes(option)
                              ? "bg-[#c2d4f9] text-[#4A7BE5] border-[#4A7BE5] border-solid border-2 rounded-md"
                              : "text-[#5A81D5D9] bg-[#E1E7F53D] border-[#E1E7F53D] border-2 rounded-md"
                            }`}
                          onClick={(e) =>
                            handleOptionClick(e, question, option)
                          }
                        >
                      
                         
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : question.selectYesOrNo ? (
                  <div className="flex flex-col gap-2">
                    <button
                      type="radio"
                      onClick={() => handleInputChange(question, "Yes")}
                      className={`${formData[question.id] === "Yes"
                          ? "bg-gradient-to-r from-blue-300 via-blue-300 to-blue-300 bg-opacity-12 border-[#4A7BE5] border-2 rounded-md"
                          : "bg-[#E1E7F53D] border-2 border-[#E1E7F53D]"
                        } text-start p-2`}
                    >
                      Yes
                    </button>
                    <button
                      type="radio"
                      onClick={() => handleInputChange(question, "No")}
                      className={`${formData[question.id] === "No"
                          ? "bg-gradient-to-r from-blue-300 via-blue-300 to-blue-300 bg-opacity-12 border-[#4A7BE5] border-2 rounded-md"
                          : "border-2 border-[#E1E7F53D]"
                        } text-start p-2`}
                    >
                      No
                    </button>
                  </div>
                ) : question.upload ? (
                  <Upload />
                ) : question.range ? (
                  <Range />
                ) : (
                  <input
                    id="campaignName"
                    placeholder={`${question.placeholder}`}
                    value={formData[question.id] || ""}
                    onChange={(e) =>
                      handleInputChange(question, e.target.value)
                    }
                    className="placeholder-[#b1c2e8] h-11 text-[#507AD3] font-inter text-[1.5rem]  border-b border-gray-300  focus:border-blue-500  focus:outline-none"
                    required={true}
                  />


                )}
                {allErrors[question.id] === true ? question.err : null}
              </div>

            </div>
          ))}

          <div className="flex justify-between mx-6 mb-6 text-[#fff] p-2 text-[1rem]">
            <div className="text-red-500">
              {/* {error?.includes(true) ? "All fileds are required" : ""} */}
            </div>
            <div>
              {currentStep === totalSteps - 1 ? (
                <button className="bg-[#4A7BE5] px-[18px] py-[12px] text-[18px] rounded-[5.926px] border border-solid ">
                  Submit Response
                </button>
              ) : (
                <button
                  onClick={(e) => handleNext(e)}
                  className="bg-[#4A7BE5] px-[18px] py-[12px] text-[18px] rounded-[5.926px] border border-solid "
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Multiform;
