export default () => {
  const bodyWidth = document.body.clientWidth;
  if (bodyWidth < 1600) {
    return 1100;
  }
  return 0;
};
