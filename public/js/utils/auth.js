// Authentication utilities
function isAuthenticated() {
    return !!localStorage.getItem("ticketapp_session");
}

function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = "/twig-ticket-app/auth/login";
    }
}

function logout() {
    localStorage.removeItem("ticketapp_session");
    localStorage.removeItem("tickets");
    window.location.href = "/twig-ticket-app/";
}

function getUser() {
    const session = localStorage.getItem("ticketapp_session");
    return session ? JSON.parse(session) : null;
}

// Redirect if already logged in (for login/signup pages)
function redirectIfAuthenticated() {
    if (isAuthenticated()) {
        window.location.href = "/twig-ticket-app/dashboard";
    }
}
