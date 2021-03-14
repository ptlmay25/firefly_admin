import { useCallback, useState } from 'react'
import axios from 'axios'
import { apiContext } from './api-context'

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const sendRequest = useCallback( async (url, method='get', data=null, headers=null) => {
        setIsLoading(true)
        const uri = apiContext.baseURL + url

        try {
            const response = await axios({ method, url: uri, data, headers }) 
            setIsLoading(false)
            return response.data             
        } catch (error) {
            setIsLoading(false)
            setError(error.message || 'Something Went Wrong')
            throw error
        }
    }, [])

    const clearError = () => {
        setError(null)
    }
    return { isLoading, error, sendRequest, clearError }
}
