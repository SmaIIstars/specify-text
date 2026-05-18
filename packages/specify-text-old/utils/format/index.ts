export const stringToBoolean = (value: string) => {
  return ["", "false", "null", "undefined", "0", "NaN"].includes(value)
    ? false
    : true;
};
