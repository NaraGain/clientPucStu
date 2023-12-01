

const validateForm =(values)=>{
  const error = {}
  const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i
  if(!values.username){
    error.username = "Enter username is required"
  }else if (!regex.test(values.username)){
    error.username = "Please enter a a vaild username"
  }
  if(!values.password){
    error.password = 'Enter passowrd is required'
  }

  if(values.password > 8){
    error.password = 'Password not more than 8 character'
  }

  return error
};



module.exports = {validateForm}