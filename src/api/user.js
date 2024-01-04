const {default : axiosInstance} = require('.')


export const login = async (payload)=>{
    try {
        const response = await axiosInstance.post('student/login', payload)
        return response.data
    } catch (error) {
            return error.response.data
    }
}

