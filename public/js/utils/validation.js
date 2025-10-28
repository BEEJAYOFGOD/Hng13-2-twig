// ============================================
// VALIDATION RULES (Pure Functions)
// ============================================

const validateEmail = (email) => {
    const trimmed = email.trim();

    if (!trimmed) {
        return { isValid: false, message: "Email is required" };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) {
        return {
            isValid: false,
            message: "Please enter a valid email address",
        };
    }

    return { isValid: true, message: "" };
};

const validatePassword = (password) => {
    const trimmed = password.trim();

    if (!trimmed) {
        return { isValid: false, message: "Password cannot be empty" };
    }

    if (trimmed.length < 8) {
        return {
            isValid: false,
            message: "Password must be at least 8 characters long",
        };
    }

    return { isValid: true, message: "" };
};

const validateConfirmPassword = (password, confirmPassword) => {
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedConfirm) {
        return { isValid: false, message: "Please confirm your password" };
    }

    if (password !== confirmPassword) {
        return {
            isValid: false,
            message: "Passwords do not match",
        };
    }

    return { isValid: true, message: "" };
};

const validateName = (name) => {
    const trimmed = name.trim();

    if (!trimmed) {
        return { isValid: false, message: "Name is required" };
    }

    if (trimmed.length < 2) {
        return {
            isValid: false,
            message: "Name must be at least 2 characters long",
        };
    }

    return { isValid: true, message: "" };
};

// Helper function to get the right validator
const getValidator = (field, formData = {}) => {
    switch (field) {
        case "email":
            return (value) => validateEmail(value);
        case "password":
            return (value) => validatePassword(value);
        case "confirmPassword":
            return (value) => validateConfirmPassword(formData.password || "", value);
        case "name":
            return (value) => validateName(value);
        default:
            return () => ({ isValid: true, message: "" });
    }
};
