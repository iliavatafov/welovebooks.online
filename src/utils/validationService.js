function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateName(name) {
  const re = /^[a-zA-Z ]+$/;
  return re.test(name);
}

function validatePassword(password) {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
}

function validatePostalCode(postalCode) {
  const re = /^[0-9]{4}$/;
  return re.test(postalCode);
}

function validateURL(link) {
  const re =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return re.test(link);
}

function validateText(text) {
  if (text.length >= 10) {
    return true;
  } else {
    return false;
  }
}

function validateCity(text) {
  if (text.length >= 2) {
    return true;
  } else {
    return false;
  }
}

function validatePhoneNumber(phoneNumber) {
  const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (regex.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
}

const constructObjectFromInputData = (inputData) => {
  let neObject = {};
  for (let key in inputData) {
    neObject[key] = {
      value: inputData[key],
      isValid: true,
    };
  }
  return neObject;
};

const inputValidator = (inputData) => {
  for (let key in inputData) {
    switch (key) {
      case "email":
        if (!validateEmail(inputData[key].value)) {
          inputData[key].isValid = false;
        }
        break;

      case "name":
        if (!validateName(inputData[key].value)) {
          inputData[key].isValid = false;
        }
        break;

      case "password":
        if (!validatePassword(inputData[key].value)) {
          inputData[key].isValid = false;
        }
        break;

      case "imageUrl":
        if (!validateURL(inputData[key].value)) {
          inputData[key].isValid = false;
        }
        break;

      case "postalCode":
        if (!validatePostalCode(inputData[key].value)) {
          inputData[key].isValid = false;
        }
        break;
      case "phoneNumber":
        if (!validatePhoneNumber(inputData[key].value)) {
          inputData[key].isValid = false;
        }
        break;
      case "message":
      case "address":
        if (!validateText(inputData[key].value)) {
          inputData[key].isValid = false;
        }
        break;
      case "city":
        if (!validateCity(inputData[key].value)) {
          inputData[key].isValid = false;
        }
        break;
      default:
        if (inputData[key].value === "") {
          inputData[key].isValid = false;
        }
        break;
    }
  }

  return inputData;
};

export const validateLogin = (inputValues) => {
  const validatedData = inputValidator(
    constructObjectFromInputData(inputValues)
  );

  const isInvalidElement = Object.values(validatedData).some(
    (el) => el.isValid === false
  );

  if (Object.values(validatedData).some((x) => x.value === "")) {
    return "All fileds are required!";
  } else if (isInvalidElement) {
    return "Email or password don't match";
  }
};

export const validateRegister = (inputValues) => {
  const validatedData = inputValidator(
    constructObjectFromInputData(inputValues)
  );

  if (Object.values(validatedData).some((x) => x.value === "")) {
    return "All fileds are required!";
  }

  if (!validatedData.email.isValid) {
    return "Invalid email address!";
  }

  if (!validatedData.password.isValid) {
    return "Password should include at least one lowercase letter, one uppercase letter, one digit, one special character and the minimum length of 8 characters";
  }

  if (inputValues.password !== inputValues.confirmPassword) {
    return "Password don`t match!";
  }
};

export const validateMessages = (inputValues) => {
  const validatedData = inputValidator(
    constructObjectFromInputData(inputValues)
  );

  if (Object.values(validatedData).some((x) => x.value === "")) {
    return "All fileds are required!";
  }

  if (!validatedData.name.isValid) {
    return "Name should inclide only letters and white space!";
  }

  if (!validatedData.email.isValid) {
    return "Invalid email address!";
  }

  if (!validatedData.message.isValid) {
    return "Message should inlude at least 10 characters!";
  }
};

export const validatePurchaseData = (inputValues) => {
  const validatedData = inputValidator(
    constructObjectFromInputData(inputValues)
  );

  const { city, postalCode, address, email, name, phoneNumber } = validatedData;

  !city.isValid
    ? (city.message =
        "City should include at least two letters, allowed characters are letters, numbers and space")
    : (city.message = null);

  !postalCode.isValid
    ? (postalCode.message = "Postal code should include exact 4 numbers")
    : (postalCode.message = null);

  !address.isValid
    ? (address.message = "Address should be at least 10 characters")
    : (address.message = null);

  !email.isValid
    ? (email.message = "Invalid format of email address")
    : (email.message = null);

  !name.isValid
    ? (name.message = "Name should include only letters and space")
    : (name.message = null);

  !phoneNumber.isValid
    ? (phoneNumber.message = "Number should include only numbers (0888777666)")
    : (phoneNumber.message = null);

  return validatedData;
};
