
const verifyDetails = (req, res, next) => {
  next();
};

export const userDetailsMiddleware = {
    verifyDetails,
};