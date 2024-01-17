import axios from 'axios';
import { useState } from 'react';
type Props = {
  url: string;
  body?: any;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
};
const useFetch = ({ url, method = 'GET' }: Props) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const callApi = async (body) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      const { data,status } = await axios.request({
        method,
        url: `${baseUrl}${url}`,
        data: body,
      });
      if (status !== 200) {
        throw new Error('Something went wrong');
      }
      setData(data);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return { data, isLoading, error, callApi,isSuccess };
};

export default useFetch;
