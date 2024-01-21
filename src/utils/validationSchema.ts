import * as yup from 'yup';
const nameRegex = /^[A-Za-z][A-Za-z0-9]*$/;
const emailRegex = /^[a-z0-9.]+@gmail\.com$/;
export const LoginSchema = yup
  .object({
    email: yup
      .string()
      .email('Invalid Email')
      .required('Required')
      .matches(emailRegex, 'Invalid Email')
      .trim(),
    password: yup.string().required('Required'),
  })
  .required();

export const SignupSchema = yup
  .object({
    firstName: yup
      .string()
      .required('Required')
      .matches(
        nameRegex,
        'Must start with a letter and contain only letters and numbers',
      )
      .min(3)
      .max(20),
    lastName: yup
      .string()
      .trim()
      .required('Required')
      .matches(
        nameRegex,
        'Must start with a letter and contain only letters and numbers',
      )
      .min(3)
      .max(20),
    email: yup
      .string()
      .email('Invalid Email')
      .required('Required')
      .matches(emailRegex, 'Invalid Email')
      .trim(),
    password: yup
      .string()
      .required('Required')
      .min(8, 'Password must be at least 8 characters'),
  })
  .required();
