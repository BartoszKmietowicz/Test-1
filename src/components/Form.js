import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './Form.scss';
export default function Form() {
  const [values, setValues] = useState({
    maxNameLength: 32,
    maxSurnameLength: 48,
    maxMessageLength: 250,
    phoneMinLength: 6,
    phoneMaxLength: 15,
    defaultValue: '',
    regex: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/u,
    required: true,
    form: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      message: '',
      isChecked: false,
    },
  });
  const [errors, setError] = useState({
    nameError: '',
    surnameError: '',
    emailError: '',
    phoneError: '',
    messageError: '',
  });
  const [checked, setChecked] = useState(false);
  const [success, setSuccess] = useState(false);
  const nameInputElement = useRef();
  const surnameInputElement = useRef();
  const emailInputElement = useRef();
  const phoneInputElement = useRef();
  const messageInputElement = useRef();

  useEffect(() => {
    setChecked(false);
  }, []);
  // const validation = () => {
  //
  //   const phoneValidation =
  //     values.form.phone.length < 6 ||
  //     values.form.phone.length > 15 ||
  //     values.form.phone.length === 0;
  //
  //   const surnameValidation =
  //     values.form.surname.length > values.maxSurnameLength ||
  //     values.form.surname.length === 0;
  //   const messageValidation =
  //     values.form.message.length > values.maxMessageLength ||
  //     values.form.message.length === 0;

  //   if (emailValidation) {
  //     setError({ ...errors, emailError: 'email invalid' });
  //   } else if (!emailValidation && values.form.email.length !== 0) {
  //     setError({ ...errors, emailError: '' });
  //   }
  //   if (phoneValidation) {
  //     setError({ ...errors, phoneError: 'phone length invalid' });
  //   } else if (!phoneValidation && values.form.phone.length !== 0) {
  //     setError({ ...errors, phoneError: '' });
  //   }
  //   console.log(`
  //     ${nameValidation} : nameValidation ${errors.nameError},
  //    ${surnameValidation}  surnameValidation ${errors.surnameError},
  //     ${emailValidation} emailValidation ${errors.emailError},
  //    ${phoneValidation}  phoneValidation ${errors.phoneError},
  //    ${messageValidation}  messageValidation ${errors.messageError} ${
  //     values.form.message.length
  //   }
  //    ${!checked}`);
  // };
  const phoneValidation = () => {
    const validatePhone =
      values.phoneMinLength - 1 < values.form.phone.length + 1;
    if (
      !validatePhone ||
      values.form.phone.length + 1 > values.phoneMaxLength
    ) {
      setError({
        ...errors,
        phoneError: `phone length should be between ${values.phoneMinLength} and ${values.phoneMaxLength}`,
      });
    } else if (validatePhone && values.form.phone.length !== 0) {
      setError({ ...errors, phoneError: '' });
    }
    console.log(values.form.phone.length, validatePhone);
  };
  const mailValidation = () => {
    const regex = new RegExp(values.regex);
    const emailValidation = regex.test(values.form.email);
    if (!emailValidation) {
      setError({ ...errors, emailError: 'email invalid' });
    } else if (emailValidation) {
      setError({ ...errors, emailError: '' });
    }
    console.log(values.form.email, emailValidation);
  };
  const nameValidation = () => {
    const nameValidation =
      values.form.name.length + 1 > values.maxNameLength ||
      values.form.name.length === 0;
    if (nameValidation) {
      setError({
        ...errors,
        nameError: `name length should be less than ${values.maxNameLength}`,
      });
    } else if (!nameValidation && values.form.name.length !== 0) {
      setError({ ...errors, nameError: '' });
    }
    console.log(nameValidation);
  };
  const surnameValidation = () => {
    const surnameValidation =
      values.form.surname.length > values.maxSurnameLength ||
      values.form.surname.length === 0;
    if (surnameValidation) {
      setError({
        ...errors,
        surnameError: `surname length should be less than ${values.maxSurnameLength}`,
      });
    } else if (!surnameValidation && values.form.surname.length !== 0) {
      setError({ ...errors, surnameError: '' });
    }
    console.log(surnameValidation);
  };
  const messageValidation = () => {
    const messageValidation =
      values.form.message.length > values.maxMessageLength;
    if (messageValidation) {
      setError({
        ...errors,
        messageError: `message length should be less than ${values.maxMessageLength}`,
      });
    } else if (!messageValidation && values.form.message.length !== 0) {
      setError({ ...errors, messageError: '' });
    }
    console.log(messageValidation);
  };
  const handleChange = () => {
    setValues({
      ...values,
      form: {
        name: nameInputElement.current?.value,
        surname: surnameInputElement.current?.value,
        email: emailInputElement.current?.value,
        phone: phoneInputElement.current?.value,
        message: messageInputElement.current?.value,
      },
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      errors.emailError.length === 0 &&
      errors.nameError.length === 0 &&
      errors.messageError.length === 0 &&
      errors.phoneError.length === 0 &&
      errors.surnameError.length === 0
    ) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
    // validation();
    return success;
  };

  const handleCheck = () => {
    setChecked((prev) => !prev);
  };
  return (
    <>
      <form className='form' onChange={handleChange} onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            maxLength={values.maxNameLength}
            ref={nameInputElement}
            onChange={nameValidation}
            pattern='^([a-zA-Z]|\s)*$'
          ></input>
          {errors.nameError && <p>{errors.nameError}</p>}
        </div>

        <div>
          <label htmlFor='surname'>Surname</label>
          <input
            type='text'
            name='surname'
            maxLength={values.maxSurnameLength}
            ref={surnameInputElement}
            onChange={surnameValidation}
            pattern='^([a-zA-Z]|\s)*$'
          ></input>
          {errors.surnameError && <p>{errors.surnameError}</p>}
        </div>
        <div>
          <label htmlFor='email'>email</label>
          <input
            required={values.required}
            type='email'
            name='email'
            ref={emailInputElement}
            onChange={mailValidation}
          />
          {errors.emailError && <p>{errors.emailError}</p>}
        </div>
        <div>
          <label htmlFor='phone'>phone</label>
          <input
            required
            type='number'
            name='phone'
            maxLength={15}
            minLength={6}
            ref={phoneInputElement}
            onChange={phoneValidation}
            pattern='[1-9]'
          />
          {errors.phoneError && <p>{errors.phoneError}</p>}
        </div>
        <div>
          <label htmlFor='message'>Message</label>
          <textarea
            name='message'
            ref={messageInputElement}
            maxLength={values.maxMessageLength}
            onChange={messageValidation}
          ></textarea>
          {errors.messageError && <p>{errors.messageError}</p>}
        </div>

        <label htmlFor='checkbox' className='checkboxContainer'>
          <input
            type='checkbox'
            name='checkbox'
            required
            defaultChecked={checked}
            key={Math.random()}
            onClick={() => {
              handleCheck();
              console.log(success);
            }}
          ></input>
          <span className='check'>I agree to the terms</span>
        </label>

        <button type='submit' disabled={!checked}>
          Submit
        </button>
      </form>
      <div>{success && <div>Everything was fine , have a nice day</div>}</div>
    </>
  );
}
