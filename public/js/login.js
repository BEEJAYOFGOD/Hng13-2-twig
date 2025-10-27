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

// ============================================
// STATE
// ============================================

let isLoading = false;
const errors = {};

// ============================================
// UI HELPERS
// ============================================

const showError = (field, message) => {
    const input = document.getElementById(field);
    const errorEl = document.getElementById(`${field}-error`);

    if (input && errorEl) {
        input.classList.add("border-red-500");
        input.setAttribute("aria-invalid", "true");
        errorEl.textContent = message;
        errorEl.classList.remove("hidden");
    }
    errors[field] = message;
};

const clearError = (field) => {
    const input = document.getElementById(field);
    const errorEl = document.getElementById(`${field}-error`);

    if (input && errorEl) {
        input.classList.remove("border-red-500");
        input.setAttribute("aria-invalid", "false");
        errorEl.textContent = "";
        errorEl.classList.add("hidden");
    }
    delete errors[field];
};

const clearAllErrors = () => {
    clearError("email");
    clearError("password");
};

const setLoading = (loading) => {
    isLoading = loading;
    const submitBtn = document.getElementById("submitBtn");
    const form = document.getElementById("loginForm");

    if (submitBtn) {
        submitBtn.disabled = loading;
        submitBtn.textContent = loading ? "Signing in..." : "Sign In";
    }

    if (form) {
        const inputs = form.querySelectorAll("input");
        inputs.forEach((input) => {
            input.disabled = loading;
        });
    }
};

const showToast = (message, type = "success") => {
    // Check if a toast already exists and remove it
    const existingToast = document.querySelector(".toast-msg");
    const existingToasth1 = document.querySelector(".toast-h1");

    if (existingToast) {
        existingToast.remove();
    }
    if (existingToasth1) {
        existingToasth1.remove();
    }

    // Simple toast implementation
    const toast = document.createElement("div");
    const toasth1 = document.createElement("h1");

    // Add class names for identification
    toast.className = "toast-msg";
    toasth1.className = "toast-h1";

    // Inline styles for toast
    toast.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        color: white;
        z-index: 50;
        transition: opacity 300ms;
        background-color: "white";
        color:  ${type === "success" ? "#10b981" : "#ef4444"};

        border: 2px solid ${type === "success" ? "#10b981" : "#ef4444"};
    `;

    // Inline styles for toasth1

    toast.textContent = message;

    document.body.appendChild(toast);

    // alert("hey");
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 2700);
};

// ============================================
// VALIDATION HANDLERS
// ============================================

const validateField = (field, value) => {
    const validator = field === "email" ? validateEmail : validatePassword;
    const result = validator(value);

    if (result.isValid) {
        clearError(field);
    } else {
        showError(field, result.message);
    }

    return result.isValid;
};

const validateForm = (formData) => {
    const emailResult = validateEmail(formData.email);
    const passwordResult = validatePassword(formData.password);

    clearAllErrors();

    if (!emailResult.isValid) {
        showError("email", emailResult.message);
    }
    if (!passwordResult.isValid) {
        showError("password", passwordResult.message);
    }

    return emailResult.isValid && passwordResult.isValid;
};

// ============================================
// AUTH LOGIC (Using your structure)
// ============================================

const login = (credentials) => {
    // Get stored users from localStorage
    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");

    // Find user by email
    const user = users.find((u) => u.email === credentials.email);

    if (!user) {
        return { success: false, error: "Invalid email or password" };
    }

    // Check password (in production, this would be hashed)
    if (user.password !== credentials.password) {
        return { success: false, error: "Invalid email or password" };
    }

    // Create session using your structure
    const session = {
        id: user.id,
        email: user.email,
        name: user.name,
        loggedInAt: new Date().toISOString(),
    };

    // Store session using your key
    localStorage.setItem("ticketapp_session", JSON.stringify(session));

    return { success: true, user: session };
};

// ============================================
// EVENT HANDLERS
// ============================================

const handleChange = (e) => {
    const { name } = e.target;
    if (errors[name]) {
        clearError(name);
    }
};

const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    if (!validateForm(formData)) {
        showToast("Please fix the errors in the form", "error");
        return;
    }

    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = login(formData);
    setLoading(false);

    if (result.success) {
        showToast("Login successful! Redirecting...", "success");

        // Clear form
        document.getElementById("loginForm").reset();

        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = "/twig-ticket-app/dashboard";
        }, 1000);
    } else {
        showToast(result.error || "Login failed", "error");
    }
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    // Check if already authenticated (using your auth.js function)
    if (isAuthenticated()) {
        window.location.href = "/twig-ticket-app/dashboard";
        return;
    }

    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (form) {
        form.addEventListener("submit", handleSubmit);
    }

    if (emailInput) {
        emailInput.addEventListener("input", handleChange);
        emailInput.addEventListener("blur", handleBlur);
    }

    if (passwordInput) {
        passwordInput.addEventListener("input", handleChange);
        passwordInput.addEventListener("blur", handleBlur);
    }
});
