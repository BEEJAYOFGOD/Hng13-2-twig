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
};

const clearAllErrors = (...fields) => {
    fields.forEach((field) => clearError(field));
};

const setLoading = (loading, buttonId = "submitBtn", formId = null) => {
    const submitBtn = document.getElementById(buttonId);

    if (submitBtn) {
        // Capture original text on first load
        if (loading && !submitBtn.dataset.originalText) {
            submitBtn.dataset.originalText = submitBtn.textContent;
        }

        submitBtn.disabled = loading;
        submitBtn.textContent = loading
            ? submitBtn.getAttribute("data-loading-text") || "Loading..."
            : submitBtn.dataset.originalText || submitBtn.textContent;
    }

    if (formId) {
        const form = document.getElementById(formId);
        if (form) {
            const inputs = form.querySelectorAll("input");
            inputs.forEach((input) => {
                input.disabled = loading;
            });
        }
    }
};

// Helper to validate a single field with all form data available
const validateField = (field, value, formData = {}) => {
    const validator = getValidator(field, formData);
    const result = validator(value);

    if (result.isValid) {
        clearError(field);
    } else {
        showError(field, result.message);
    }

    return result.isValid;
};

// Helper to validate multiple fields at once
const validateFields = (fieldsToValidate, formData) => {
    let isValid = true;

    fieldsToValidate.forEach((field) => {
        const result = getValidator(field, formData)(formData[field] || "");

        if (!result.isValid) {
            showError(field, result.message);
            isValid = false;
        }
    });

    return isValid;
};
