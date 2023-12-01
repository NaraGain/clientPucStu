const {default : axiosInstance} = require('.')


export const login = async (payload)=>{
    try {
        const respone = await axiosInstance.post('student/login', payload)
        return respone.data
    } catch (error) {
            return error.respone
    }
}

