// Form Validators
// See currying functions with the arrow operator =>
// http://codekirei.com/posts/currying-with-arrow-functions/

// useage: required('message') or required() will return a function that redux-form will call with the value to test
// could also be called required('message')(value) or required()(value) without redux-form
const required = message => value =>
  value
    ? undefined
    : message ? message : 'Required';

// useage: maxLength(15, 'message') or maxLength(15) will return a function that redux-form will call with the value to test
// could also be called maxLength(15, 'message')(value) or maxLength(15)(value) without redux-form
// you can pass a message useing tick marks and a variable. example: `Must be ${max} characters or less`
const maxLength = ( max, message ) => value =>
  value && value.length > max
    ? message ? message : `Must be ${max} characters or less`
    : undefined;

// useage: minLength(8, 'message') or minLength(8) will return a function that redux-form will call with the value to test
// could also be called minLength(8, 'message')(value) or minLength(8)(value) without redux-form
// you can pass a message useing tick marks and a variable. example: `Must be ${min} characters or more`
const minLength = ( min, message ) => value =>
  value && value.length < min
    ? message ? message : `Must be ${min} characters or more`
    : undefined;

// useage: email('message') or email() will return a function that redux-form will call with the value to test
// could also be called email('message')(value) or email()(value) without redux-form
const email = message => value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? message ? message : 'Invalid email address'
    : undefined;

// useage: alphaNumeric('message') or alphaNumeric() will return a function that redux-form will call with the value to test
// could also be called alphaNumeric('message')(value) or alphaNumeric()(value) without redux-form
const alphaNumeric = message => value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? message ? message : 'Only alphanumeric characters'
    : undefined;

// useage: alphaNumericNoSpaces('message') will return a function that redux-form will call with the value to test
// could also be called alphaNumericNoSpaces('message')(value) or alphaNumericNoSpaces()(value) without redux-form
const alphaNumericNoSpaces = message => value =>
  value && /[^a-zA-Z0-9]/i.test(value)
    ? message ? message : 'Only alphanumeric characters, No spaces'
    : undefined;

// useage: alphaNumericNoSpaces('message') will return a function that redux-form will call with the value to test
// could also be called alphaNumericNoSpaces('message')(value) or alphaNumericNoSpaces()(value) without redux-form
const numericDecimal = message => value =>
  value && /^[0-9]*[.]{0,1}[0-9]*$/i.test(value)
    ? undefined
    : message ? message : 'Only numeric characters and decimals';


export default { required, maxLength, minLength, email, alphaNumeric, alphaNumericNoSpaces, numericDecimal };
