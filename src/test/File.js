import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { questionAction } from '../redux/questionSlice';

export const File = ()=> {
  const formRef = useRef(null);
  const [values ,setValue] = useState()
  const dispatch = useDispatch()
  const queryQuestion = useSelector(state => state.question.questions)
  useEffect(() => {
    dispatch(questionAction.QueryQuestion({type : "reading"}))
  //   // Function to submit the form automatically after 3 seconds (for example)
  //   const submitForm = setTimeout(() => {
  //     if (formRef.current) {
  //       formRef.current.submit();
  //     }
  //   }, 10000); // Change the time delay as needed

  //   // Clear the timeout if the component unmounts before the timeout completes
  //   return () => clearTimeout(submitForm);
   }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(values)
    // Handle form submission logic here if needed
  };


  console.log(queryQuestion)
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {/* Your form fields */}
      <input onChange={(e)=> setValue(e.target.value)} type="text" name="example" />
      <button type="submit">Submit</button>
    </form>
  );
};

