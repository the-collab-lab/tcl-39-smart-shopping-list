//this arrow function has the role to normalize inputs
const normalizeInputs = (inputToNormalize) => {
  const inputToLowerCase = inputToNormalize.toLowerCase();
  const inputNormalized = inputToLowerCase
    .normalize('NFD')
    .replace(/[\u0300-\u036f\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g, '')
    .replace(/\s+/g, '');
  console.log(inputNormalized, 'inputNormalized');
  return inputNormalized;
};

export default normalizeInputs;
