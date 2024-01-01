import axiosInstance from ".";



export const Groups = async (payload) => {
    try {
        const response = await axiosInstance.post(`group/student/query`,payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

export const getExam = async (payload)=>{
    try {
        const response = await axiosInstance.post(`student/question`,payload)
        return response.data
    } catch (error) {
       return error.response.data
    }
}


export const updateExamOnfinish = async (id ,payload)=>{
    try {
        const response = await axiosInstance.patch(`exam/update/${id}` ,payload)
        return response.data
    } catch (error) {
        return error.response.data
    }
}

