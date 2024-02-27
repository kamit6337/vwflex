const catchAsyncError = (func) => {
  return async (...args) => {
    try {
      return await func(...args);
    } catch (error) {
      throw error;
    }
  };
};

export default catchAsyncError;
