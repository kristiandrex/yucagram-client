import request from "./request";

const REQUIRED = "Este campo es requerido.";

async function validateField(field, value) {
  try {
    const response = await request.get(`/validate/${field}?value=${value}`);
    const { available, message } = response.data;

    if (!available) {
      return message;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function validateSignup(values) {
  const errors = {};

  if (!values.username) {
    errors.username = REQUIRED;
  } else {
    const error = await validateField("username", values.username);
    if (error) {
      errors.username = error;
    }
  }

  if (!values.email) {
    errors.email = REQUIRED;
  } else {
    const error = await validateField("email", values.email);
    if (error) {
      errors.email = error;
    }
  }

  if (!values.password) {
    errors.password = REQUIRED;
  }

  return errors;
}

export function validateSignin(values) {
  const errors = {};

  if (!values.username) {
    errors.username = REQUIRED;
  }

  if (!values.password) {
    errors.password = REQUIRED;
  }

  return errors;
}
