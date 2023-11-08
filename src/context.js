// context.js
import { Children, createContext, useContext, useState, useEffect } from 'react';
import { questions } from './config/questions';
const Context = createContext();

export const ContextProvider = ({children}) => {

    const [formData, setFormData] = useState(() => {
        const storedData = localStorage.getItem("formData");
        return storedData ? JSON.parse(storedData) : [];
      });

      const [error, setError] = useState([true]);
  const [allErrors, setAllErrors] = useState(Array(10).fill(false));
  const [currentStep, setCurrentStep] = useState(() => {
    // Try to retrieve the currentStep value from localStorage
    const storedCurrentStep = localStorage.getItem("currentStep");
    return storedCurrentStep ? parseInt(storedCurrentStep, 10) : 0;
  });

  
  const [questionsPerStep, setQuestionsPerStep] = useState([3, 2, 3, 3]);
const totalSteps = questionsPerStep.length;
  const getCurrentQuestions = () => {
    const startIdx = questionsPerStep
      .slice(0, currentStep)
      .reduce((acc, val) => acc + val, 0);
    const endIdx = startIdx + questionsPerStep[currentStep];
    return questions.slice(startIdx, endIdx);
  };
  let validationTimer;

const handleInputChange = (data, value) => {
  const updatedFormData = [...formData];
  const updatedErrorValues = [...allErrors];

  // Clear the previous validation timer


  // Set a new timer for validation after a delay (e.g., 1000 milliseconds)


    if (data.regex) {
      if(value){
        if (data.regex.test(value)) {


        console.log(value, data.id, "no error");
        updatedErrorValues[data.id] = false;
      } else {
        console.log(value, data.id, "regex error there");
        updatedErrorValues[data.id] = true;
      }
      }else{
        updatedErrorValues[data.id] = false;
      }
      
    } else {
      // Handle other input types or empty values
      if (value.length === 0) {
        updatedErrorValues[data.id] =false;
      } else {
        updatedErrorValues[data.id] = false;
      }
    }

    // Update formData and error values after validation
    updatedFormData[data.id] = value;
    setFormData(updatedFormData);
    setAllErrors(updatedErrorValues);
 // Adjust the delay as needed
};

    const handleOptionClick = (e, data, option) => {
        e.preventDefault();
        let updatedSelectedOptions = [option];
        console.log(data.options,"arayyyyyyyyyyyyyy");
        if (Array.isArray(formData[data.id])) {
          if (formData[data.id].includes(option)) {
            updatedSelectedOptions = formData[data.id].filter(
              (item) => item !== option
            );
          } else {
            updatedSelectedOptions = [...formData[data.id], option];
            if (formData[data.id].includes("Sector Agnostic")) {
              updatedSelectedOptions = [option];
            }
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
                
              
            }else{
                updateError[index] = false;
            }} else {
              
                
              updateError[index] = false;
            }
            console.log("upd", updateError);
            setError(updateError);
            console.log("neww", error);
          }
    
          );
        }
      }, [currentStep, formData, questionsPerStep.length]);

    return(
        <Context.Provider
        value={{
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



        }}
        >{children}</Context.Provider>
    )
}


export const useValues = () => useContext(Context)

