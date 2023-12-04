import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { questionAction } from '../redux/questionSlice';
import axios from 'axios';
import { message } from 'antd';

export const File = ()=> {
  const [secondsLeft, setSecondsLeft] = useState(60);
  
  useEffect(() => {
    const timer = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft(prevSeconds => prevSeconds - 1); // Decrement seconds
      } else {
        clearInterval(timer); // Clear the timer when time is out
        handleSubmit(); // Call function to submit the form when time is out
      }
    }, 1000);

    return () => clearInterval(timer); // Clean up timer on unmount
  }, [secondsLeft]);

  const handleSubmit = () => {
    axios.post(`${process.env.REACT_APP_API_KEY}user/register`, {
      name : "panha",
      password: "123",
      email : "panhan@email.com",
      role : ["teacher"]

    }).then((res)=> message.success("submitted form successfully"))
    .catch((error)=> message.error(error.response.data.message))
    // Your form submission logic here
    // For example, you can submit the form data to an API or perform other actions.
    console.log('Form submitted!');
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Your form inputs */}
        <button type="submit">Submit</button>
      </form>
      <p>Time left: {secondsLeft} seconds</p>
    </div>
  );
};

