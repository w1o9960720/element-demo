/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */

const bottomScroll = async (el, isContents = false) => {
  setTimeout(() => {
    if (isContents) {
      el.parentNode.scrollTop = el.scrollHeight;
    } else {
      el.scrollTop = el.scrollHeight;
    }
  }, 0);
};

export {
  bottomScroll,
};
