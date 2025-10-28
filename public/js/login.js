// ============================================
// STATE
// ============================================

let isLoading = false;
const errors = {};

// ============================================
// AUTH LOGIC
// ============================================

const login = (credentials) => {
    const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");
    const user = users.find((u) => u.email === credentials.email);

    if (!user) {
        return { success: false, error: "Invalid email or password" };
    }

    if (user.password !== credentials.password) {
        return { success: false, error: "Invalid email or password" };
    }

    const session = {
        id: user.id,
        email: user.email,
        name: user.name,
        loggedInAt: new Date().toISOString(),
    };

    localStorage.setItem("ticketapp_session", JSON.stringify(session));

    return { success: true, user: session };
};

// ============================================
// EVENT HANDLERS
// ============================================

const handleChange = (e) => {
	const { name, value } = e.target;

	// Clear error while typing
	if (errors[name]) {
		clearError(name);
		delete errors[name];
	}
};

const handleBlur = (e) => {
	const { name, value } = e.target;
	const form = document.getElementById("loginForm");
	const formData = new FormData(form);
	const data = Object.fromEntries(formData);

	validateField(name, value, data);
};

const handleSubmit = async (e) => {
	e.preventDefault();

	const form = document.getElementById("loginForm");
	const formData = new FormData(form);
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
	};

	// Clear all errors first
	clearAllErrors("email", "password");

	// Validate all fields
	const isValid = validateFields(["email", "password"], data);

	if (!isValid) {
		showToast("Please fix the errors in the form", "error");
		return;
	}

	setLoading(true, "submitBtn", "loginForm");

	await new Promise((resolve) => setTimeout(resolve, 500));

	const result = login(data);
	setLoading(false, "submitBtn", "loginForm");

	if (result.success) {
		showToast("Login successful! Redirecting...", "success");
		form.reset();
		setTimeout(() => {
			window.location.href = `${window.APP_CONFIG.basePath}/dashboard`;
		}, 1000);
	} else {
		showToast(result.error || "Login failed", "error");
	}
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
	if (typeof isAuthenticated === "function" && isAuthenticated()) {
		window.location.href = url("dashboard");
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
