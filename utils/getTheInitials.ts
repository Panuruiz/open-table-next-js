const getTheInitials = (firstName: string, lastName: string) => {
  const firstNameToArray = firstName.split("");
  const lastNameToArray = lastName.split("");

  return `${firstNameToArray[0]}${lastNameToArray[0]}`;
};

export default getTheInitials;
