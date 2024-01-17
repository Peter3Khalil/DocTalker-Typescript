export type SignupBody = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export type LoginBody = {
    email: string;
    password: string;
}
export type UpdateAccountBody = {
    firstName?: string;
    lastName?: string;
}
export type User = {
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
    token: string;
    queryMax: number;
}
export type ApiResponse<T> = {
    data: T;
    status: number;
}
export type ApiError = {
    message: string;
    status: number;
}