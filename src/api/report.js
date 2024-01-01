import axiosInstance from ".";


export const addToReport = async (payload)=>{
        try {
            const response = await axiosInstance.post('report/add', payload)
            return response.data
        } catch (error) {
            return error.response.data
        }
}