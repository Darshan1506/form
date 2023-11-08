import { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Upload from "../Components/Upload";
import Range from "../Components/Range";
import { questions } from "../config/questions";
import { useValues } from "../context";
import noise from "../assets/mainbg.png";

function Multiform() {
  
  
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


  } = useValues();

  
const [clickedNext, setClickedNext] = useState(false)
 

 

  const handlePrev = (e) => {
    e.preventDefault();
    if (currentStep === 0) return currentStep;
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
 

 

  const handleNext = (e) => {
    e.preventDefault();

    if (Array.isArray(error)) {
      if (!error.includes(true) && currentStep < totalSteps - 1) {
        setClickedNext(false);
        setCurrentStep(currentStep + 1);
      }else{
        setClickedNext(true);
       
      }
    }
  };

console.log(allErrors)
  useEffect(() => {
    // Check the screen width and update isMobile state
    const checkScreenSize = () => {
      const isMobile = window.matchMedia("(max-width: 640px)").matches; // Adjust the breakpoint as needed
      if (isMobile) {
        setQuestionsPerStep([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
      } else {
        setQuestionsPerStep([3, 1, 3, 3]);
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

 

 
    console.log(formData);
    console.log(error)

    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-BG bg-cover bg-no-repeat" style={{ backgroundImage: `url(${noise})`,backgroundPosition:'center' }}>
      <div className="relative flex  justify-center flex-col border h-screen md:h-full bg-[#fff] rounded-[10px] w-[90%] mt-[10%] mb-4 md:w-[60%] md:mt-[5vh] border-[#E5E8F2] border-solid">
          <div className="mx-6 mt-6 flex justify-between mb-12">
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
          <div className="flex  justify-center flex-col h-screen md:h-full">
          {getCurrentQuestions().map((question, idx) => (
            <div key={question.id} className="ml-[15%] mr-[13%] mb-12 ">
              <div className="flex flex-col gap-1 ">
                <label
                  htmlFor="campaignName"
                  className="font-inter md:text-[1.4rem] text-[1.2rem] font-[400] leading-[1.6rem] text-[#507AD3] flex"
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
                  <>
                  <div className="flex flex-col gap-1 ">
                    <div className="flex flex-wrap">
                      {question.options.map((option, index) => (
                       
                        <button
                          key={index}
                          value={option}
                          type="button" // Use type="button" to prevent form submission
                          className={`m-[2px] md:p-1 p-[0.15rem] text-[0.82106rem] md:text-[1rem] ${((formData[question.id]?.includes("Sector Agnostic") && option !== "Sector Agnostic")  ) && "bg-gray-100"}   ${formData[question.id]?.includes(option)
                              ? "bg-[#c2d4f9] text-[#4A7BE5] border-[#4A7BE5] border-solid border-2 rounded-md"
                              : "text-[#5A81D5D9] bg-[#E1E7F53D] border-[#E1E7F53D] border-2 rounded-md"
                            }`}
                            disabled={
                              (option !== "Sector Agnostic" &&
                              formData[question.id]?.includes("Sector Agnostic"))
                              ||
                            (formData[question.id]?.length>0 && !formData[question.id]?.includes("Sector Agnostic") && option === "Sector Agnostic")
                            }
                          onClick={(e) =>
                            handleOptionClick(e, question, option)
                          }
                        >
                      
                         
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {allErrors[question.id] === true ?
                <div className="bg-[#E55C4A13] p-2">
                <h1 className="font-inter font-normal text-[1rem] text-[#E55C4A]">{question.err}</h1>
              </div>
                : null}
                  </>
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
                  <>
                  <Upload question={question}/>

                  {allErrors[question.id] === true ?
                    <div className="bg-[#E55C4A13] p-2">
                    <h1 className="font-inter font-normal text-[1rem] text-[#E55C4A]">{question.err}</h1>
                  </div>
                    : null}
                  </>
                ) : question.range ? (
                  <>
                  <Range question={question}/>
                  
                 
                    </>
                ) : (
                  <>
                  <input
                    id="campaignName"
                    placeholder={`${question.placeholder}`}
                    // value={formData[question.id] || ""}
                    onChange={(e) =>
                      handleInputChange(question, e.target.value)
                    }
                    className="placeholder-[#b1c2e8] h-11 text-[#507AD3] font-inter text-[1.5rem]  border-b border-gray-300  focus:border-blue-500  focus:outline-none"
                    required={true}
                  />
                  {allErrors[question.id] === true ?
                <div className="bg-[#E55C4A13] p-2">
                <h1 className="font-inter font-normal text-[1rem] text-[#E55C4A]">{question.err}</h1>
              </div>
                : null}

</>
                )}
                
               
              </div>
             
            </div>
          ))}

          <div className="flex  justify-between mx-6 mb-6 text-[#fff] p-2 text-[1rem]">
            {
              clickedNext ? <div className="font-inter ml-[10%] bg-[#E55C4A13] px-2  flex justify-center items-center font-normal text-[1rem] text-[#E55C4A]">
               Please fill all the required fields
            </div>

              : <div> </div>
            }
            
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
      </div>
    );
  }

  export default Multiform;
