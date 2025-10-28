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

    // Add class names for identification
    toast.className = "toast-msg";

    // Inline styles for toast
    toast.style.cssText = `
        position: fixed;
        top: 12rem !important;
        right: 8rem;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        color: white;
        z-index: 50;
        transition: opacity 300ms;
        color: ${type === "success" ? "#10b981" : "#ef4444"};
        border: 2px solid ${type === "success" ? "#10b981" : "#ef4444"};
    `;

    // Inline styles for toasth1

    toast.textContent = message;

    document.body.appendChild(toast);

    // alert("hey");
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 270000);
};
