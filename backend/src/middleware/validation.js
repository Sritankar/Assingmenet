const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({
      error: {
        code: 'INVALID_NAME',
        message: 'Name must be at least 2 characters long'
      }
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      error: {
        code: 'INVALID_EMAIL',
        message: 'Invalid email format'
      }
    });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      error: {
        code: 'INVALID_PASSWORD',
        message: 'Password must be at least 6 characters long'
      }
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({
      error: {
        code: 'INVALID_EMAIL',
        message: 'Invalid email format'
      }
    });
  }

  if (!password) {
    return res.status(400).json({
      error: {
        code: 'INVALID_PASSWORD',
        message: 'Password is required'
      }
    });
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateRegistration,
  validateLogin
};
