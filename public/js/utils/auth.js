// Authentication utilities
function isAuthenticated() {
    return !!localStorage.getItem("ticketapp_session");
}

function requireAuth() {
	if (!isAuthenticated()) {
		window.location.href = url("/auth/login");
	}
}

function logout() {
	localStorage.removeItem("ticketapp_session");
	localStorage.removeItem("tickets");
	showToast("Log out successful", "success");
	window.location.href = url("/");
}

function getUser() {
	const session = localStorage.getItem("ticketapp_session");
	return session ? JSON.parse(session) : null;
}

// Redirect if already logged in (for login/signup pages)
function redirectIfAuthenticated() {
	if (isAuthenticated()) {
		window.location.href = url("dashboard");
	}
}
