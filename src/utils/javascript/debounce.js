let needToWait = false;

const debounce = (func, delay) => {
  let timer;

  return (...args) => {
    if (needToWait) return;

    needToWait = true;

    func(...args);

    clearTimeout(timer);

    timer = setTimeout(() => {
      needToWait = false;
    }, delay);
  };
};

export default debounce;
