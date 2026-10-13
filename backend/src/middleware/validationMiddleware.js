const isValidEmail = (email) => {
    if (typeof email !== "string") {
        return false;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
    );
};


const isValidPassword = (password) => {
    if (typeof password !== "string") {
        return false;
    }

    return password.length >= 8;
};


const isPositiveInteger = (value) => {
    const number = Number(value);

    return (
        Number.isInteger(number) &&
        number > 0
    );
};


const isValidRating = (rating) => {
    const number = Number(rating);

    return (
        Number.isInteger(number) &&
        number >= 1 &&
        number <= 5
    );
};


const validateEmail = (req, res, next) => {
    const { email } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "A valid email address is required",
        });
    }

    next();
};


const validatePassword = (req, res, next) => {
    const { password } = req.body;

    if (!isValidPassword(password)) {
        return res.status(400).json({
            success: false,
            message:
                "Password must be at least 8 characters long",
        });
    }

    next();
};


module.exports = {
    isValidEmail,
    isValidPassword,
    isPositiveInteger,
    isValidRating,
    validateEmail,
    validatePassword,
};
