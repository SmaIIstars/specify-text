export const getSizeBasedOnScreenWidth = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 1280) {
    return 1;
  } else if (screenWidth <= 1980) {
    return 2;
  } else {
    return 3;
  }
};
