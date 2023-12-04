import axios from "axios";
import Cookies from "universal-cookie";



const cookie = new Cookies()

const axiosInstance = axios.create({
    baseURL : process.env.REACT_APP_API_KEY,
    headers : {
        authorization : `Beare ${cookie.get('STUDENTTOKEN')}`
    }
})


export const axiosBaseQuery = ({baseURL} = 
    {baseURL : process.env.REACT_APP_API_KEY}) => 
async ({url , method , data , params})=>{
    try {
        const result = await axios({
            url : baseURL + url,
            method ,
            data,
            params ,
            headers : {
                Authorization : `Bearer ${cookie.get('STUDENTTOKEN')}`,
            }
        })
        return {data : result.data}

    }catch(axiosError){
        let err = axiosError
      return {error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          }

        }

    }
}


export default axiosInstance