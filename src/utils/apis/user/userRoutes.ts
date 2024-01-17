import axios, { AxiosResponse } from 'axios';
import {
  ApiResponse,
  LoginBody,
  SignupBody,
  UpdateAccountBody,
  User,
} from './types';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const signup = async (
  body: SignupBody,
): Promise<ApiResponse<User>|string> => {
  try {
    const response:AxiosResponse<ApiResponse<User>> = await axios.post(
      `${baseUrl}/user/signup`,
      body,
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return error;
  }
};

export const login = async (
  body: LoginBody,
): Promise<ApiResponse<User> | string> => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await axios.post(
      `${baseUrl}/user/login`,
      body,
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    return error;
  }
};

export const deleteAccount = async (
  token: string,
): Promise<ApiResponse<string>> => {
  try {
    const { data } = await axios.delete(`${baseUrl}/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    return error;
  }
};

export const updateAccount = async (
  token: string,
  { firstName, lastName }: UpdateAccountBody,
): Promise<ApiResponse<string>> => {
  try {
    const { data } = await axios.put(
      `${baseUrl}/user`,
      { firstName, lastName },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    return error;
  }
};

export const verifyToken = async (
  token: string,
): Promise<ApiResponse<string>> => {
  try {
    const { data, status } = await axios.get(`${baseUrl}/user/verifyToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data, status };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    return error;
  }
};

export const verifyOtp = async (
  token: string,
  email: string,
  otp: string,
): Promise<ApiResponse<string>> => {
  try {
    const { data, status } = await axios.post(
      `${baseUrl}/user/otp/verify`,
      {
        otp,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { data, status };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    return error;
  }
};

export const resendOtp = async (
  token: string,
  email: string,
): Promise<ApiResponse<string>> => {
  try {
    const { data, status } = await axios.post(
      `${baseUrl}/user/otp/resend`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { data, status };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    return error;
  }
};
