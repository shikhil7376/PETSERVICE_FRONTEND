import api from "../Services/Axios";
import userRoutes from "../Services/Endpoint/userEndPoint";
import errorHandle from "./Error";
import { userData } from "../Interface/DatatypeInterface";

export const signup = async (userData: userData) => {
  try {
    const response = await api.post(userRoutes.signup, userData);
    console.log(response);
    
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const otpVerify = async (
  otp: { otp: number },
  email: { email: string }
) => {
  try {
    const response = await api.post(userRoutes.userOtpVerify, {
      ...otp,
      ...email,
    });
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const login = async (userData: userData) => {
  try {
    const response = await api.post(userRoutes.userLogin, userData);
    return response;
  } catch (error) {
    const err: Error = error as Error;
    return errorHandle(err);
  }
};

export const resendOtp = async (userData: userData) => {
  try {
    const response = await api.post(userRoutes.resendotp, userData);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post(userRoutes.forgotpassword, { email });
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const forgotPasswordOtp = async (
  otp: { otp: number },
  email: { email: string }
) => {
  try {
    const response = await api.post(userRoutes.verifyforgototp, {
      ...otp,
      ...email,
    });
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const resentforgototp = async (email: string) => {
  console.log(email);
  try {
    const response = await api.post(userRoutes.verifyforgotresendotp, email);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const resetpassword = async (data: userData) => {
  try {
    const response = await api.post(userRoutes.resetpassword, data);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const getProfile = async (Id: string) => {
  try {
    const response = await api.post(userRoutes.getProfile, { Id: Id });
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};

export const editProfile = async (data:FormData) => {
  try {
    const response = await api.post(userRoutes.editProfile, data);
    console.log(response);
    return response;
  } catch (error) {
    return errorHandle(error);
  }
};
