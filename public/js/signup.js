// ============================================
// STATE
// ============================================

let isLoading = false;
const errors = {};

// ============================================
// AUTH LOGIC
// ============================================

const signup = (userData) => {
	// Get stored users from localStorage
	const users = JSON.parse(localStorage.getItem("ticketapp_users") || "[]");

	// Check if email already exists
	const existingUser = users.find((u) => u.email === userData.email);
	if (existingUser) {
		return { success: false, error: "Email already registered" };
	}

	// Create new user
	const newUser = {
		id: Date.now().toString(),
		name: userData.name,
		email: userData.email,
		password: userData.password, // In production, hash this!
		createdAt: new Date().toISOString(),
	};

	// Save to localStorage
	users.push(newUser);
	localStorage.setItem("ticketapp_users", JSON.stringify(users));

	// Create session
	const session = {
		id: newUser.id,
		email: newUser.email,
		name: newUser.name,
		loggedInAt: new Date().toISOString(),
	};

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
		delete errors[name];
	}

	// If password changes, also revalidate confirmPassword
	if (name === "password") {
		const confirmPasswordInput = document.getElementById("confirmPassword");
		if (confirmPasswordInput && confirmPasswordInput.value && errors.confirmPassword) {
			clearError("confirmPassword");
			delete errors.confirmPassword;
		}
	}
};

const handleBlur = (e) => {
	const { name, value } = e.target;
	const form = document.getElementById("signupForm");
	const formData = new FormData(form);
	const data = Object.fromEntries(formData);

	validateField(name, value, data);
};

const handleSubmit = async (e) => {
	e.preventDefault();

	const form = document.getElementById("signupForm");
	const formData = new FormData(form);
	const data = {
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
		confirmPassword: formData.get("confirmPassword"),
	};

	// Clear all errors first
	clearAllErrors("name", "email", "password", "confirmPassword");

	// Validate all fields
	const isValid = validateFields(["name", "email", "password", "confirmPassword"], data);

	if (!isValid) {
		showToast("Please fix the errors in the form", "error");
		return;
	}

	setLoading(true, "submitBtn", "signupForm");

	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	const result = signup(data);
	setLoading(false, "submitBtn", "signupForm");

	if (result.success) {
		showToast("Account created successfully! Redirecting...", "success");
		form.reset();
		setTimeout(() => {
			window.location.href = url("dashboard");
		}, 1000);
	} else {
		showToast(result.error || "Signup failed", "error");
	}
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener("DOMContentLoaded", () => {
	// Check if already authenticated
	if (typeof isAuthenticated === "function" && isAuthenticated()) {
		window.location.href = url("dashboard");
		return;
	}

	const form = document.getElementById("signupForm");
	const nameInput = document.getElementById("name");
	const emailInput = document.getElementById("email");
	const passwordInput = document.getElementById("password");
	const confirmPasswordInput = document.getElementById("confirmPassword");

	if (form) {
		form.addEventListener("submit", handleSubmit);
	}

	if (nameInput) {
		nameInput.addEventListener("input", handleChange);
		nameInput.addEventListener("blur", handleBlur);
	}

	if (emailInput) {
		emailInput.addEventListener("input", handleChange);
		emailInput.addEventListener("blur", handleBlur);
	}

	if (passwordInput) {
		passwordInput.addEventListener("input", handleChange);
		passwordInput.addEventListener("blur", handleBlur);
	}

	if (confirmPasswordInput) {
		confirmPasswordInput.addEventListener("input", handleChange);
		confirmPasswordInput.addEventListener("blur", handleBlur);
	}
});
