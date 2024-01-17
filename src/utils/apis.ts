import axios, { AxiosResponse } from 'axios';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
/**
 * User Routes
 * 1-signup
 * 2-Login
 * 3-Update
 * 4-Delete account
 *
 */
type User = {
  token: any;
  firstName: string;
  lastName: string;
  email: string;
  googleId?: string | null;
  subscription: 'free' | 'gold' | 'premium';
  stripeCustomerId?: string;
  isVerified: boolean;
  uploadRequest: number;
  maxUploadRequest: number;
  queryRequest: number;
  queryMax: number;
};

type ApiResponse<T> = {
  data: T;
  status: number;
};
type Signup = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export const signup = async ({
  firstName,
  lastName,
  email,
  password,
}: Signup): Promise<ApiResponse<User>> => {
  try {
    const response: AxiosResponse<ApiResponse<User>> = await axios.post(
      `${baseUrl}/user/signup`,
      {
        firstName,
        lastName,
        email,
        password,
      },
    );
    return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return error;
  }
};
// export const login = async ({ email, password }) => {
//   try {
//     const { data } = await axios.post(`${baseUrl}/user/login`, {
//       email,
//       password,
//     })
//     return data
//   } catch (error) {
//     return error.response.data
//   }
// }
export type verifyTokenResponse = {
  message: string;
}
export const verifyToken = async (token: string): Promise<ApiResponse<verifyTokenResponse>|string> => {
  try {
    const response: AxiosResponse<ApiResponse<verifyTokenResponse>> = await axios.get(
      `${baseUrl}/user/verifyToken`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.status === 200 ? "ok": 'failed';
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    return 'Unexpected error';
  }
}

// export const deleteAccount = async ({ token }) => {
//   try {
//     const { data } = await axios.delete(`${baseUrl}/user`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     return data
//   } catch (error) {
//     return error.response.data
//   }
// }

// export const updateAccount = async ({ token, firstName, lastName }) => {
//   try {
//     const { data } = await axios.put(
//       `${baseUrl}/user`,
//       { firstName, lastName },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     )
//     return data
//   } catch (error) {
//     return error.response.data
//   }
// }

// /**
//  * Chat Routes
//  * 1-Get all chats
//  * 2-Get chat by id
//  * 3-delete chat by ud
//  */

// export const getAllChats = async ({ token }) => {
//   try {
//     const { data } = await axios.get(`${baseUrl}/chat`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     return data
//   } catch (error) {
//     return error.response.data
//   }
// }

// export const getChatById = async ({ token, chatId }) => {
//   try {
//     const { data } = await axios.get(`${baseUrl}/chat/${chatId}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     return data
//   } catch (error) {
//     return error.response.data
//   }
// }

// export const deleteChatById = async ({ token, chatId }) => {
//   try {
//     const { data } = await axios.delete(`${baseUrl}/chat/${chatId}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     return data
//   } catch (error) {
//     return error.response.data
//   }
// }

// export const updateChatById = async ({ token, chatId, newName }) => {
//   try {
//     const { data } = await axios.put(
//       `${baseUrl}/chat/${chatId}`,
//       { newName },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     )
//     return data
//   } catch (error) {
//     return error.response.data
//   }
// }

// /**
//  * File Routes
//  * 1-Upload pdf
//  * 2-process
//  */

// export const uploadPdf = async ({ token, file }) => {
//     try {
//         const formData = new FormData()
//         formData.append("file", file)
//         const { data } = await axios.post(`${baseUrl}/upload/upload`, formData, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         })
//         return data
//     } catch (error) {
//         return error.response.data
//     }
// }

// export const processPdf = async ({ token, chatId }) => {
//     try {
//         const { data } = await axios.post(`${baseUrl}/upload/process`, { id:chatId }, {
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//         })
//         return data
//     } catch (error) {
//         return error.response.data
//     }
// }

// //Query

// export const query = async ({ token, chatId, query }) => {
//     try {
//         const { data } = await axios.post(`${baseUrl}/query/query-process`, { id:chatId, query }, {
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         },
//         })
//         return data
//     } catch (error) {
//         return error.response.data
//     }
// }
