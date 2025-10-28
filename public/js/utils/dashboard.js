// ============================================
// DASHBOARD UTILITIES - Shared Functions
// ============================================

/**
 * Get status color classes for ticket status badges
 */
const getStatusColor = (status) => {
    switch (status) {
        case "open":
            return "bg-green-100 text-green-800 border-green-300";
        case "in_progress":
            return "bg-amber-100 text-amber-800 border-amber-300";
        case "closed":
            return "bg-gray-100 text-gray-800 border-gray-300";
        default:
            return "";
    }
};

/**
 * Get human-readable label for ticket status
 */
const getStatusLabel = (status) => {
    switch (status) {
        case "open":
            return "Open";
        case "in_progress":
            return "In Progress";
        case "closed":
            return "Closed";
        default:
            return status;
    }
};

/**
 * Format date string to readable format
 */
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

/**
 * Escape HTML to prevent XSS attacks
 */
const escapeHtml = (text) => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
};

/**
 * Navigate to edit ticket page
 */
const editTicket = (ticketId) => {
    window.location.href = `/tickets/edit/${ticketId}`;
};

/**
 * Render ticket card HTML
 * @param {Object} ticket - Ticket object
 * @param {boolean} showActions - Whether to show edit/delete buttons (default: true)
 * @returns {string} HTML string for ticket card
 */
const renderTicketCard = (ticket, showActions = true) => {
    return `
        <div class="bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200">
            <!-- Card Header -->
            <div class="border-b border-gray-100">
                <div class="flex justify-between items-start gap-3 mb-3 p-4">
                    <h3 class="text-lg font-semibold text-gray-900 flex-1 leading-tight">
                        ${escapeHtml(ticket.title)}
                    </h3>
                    <span class="${getStatusColor(
                        ticket.status
                    )} px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap">
                        ${getStatusLabel(ticket.status)}
                    </span>
                </div>
            </div>

            <!-- Card Content -->
            <div class="space-y-4 ">
                ${
                    ticket.description
                        ? `
                    <p class="text-sm text-gray-600 leading-relaxed line-clamp-3 p-4">
                        ${escapeHtml(ticket.description)}
                    </p>
                `
                        : ""
                }

                <!-- Card Footer -->
                <div class="flex items-center justify-between pt-3 border-t border-gray-100 p-4">
                    <span class="text-xs text-gray-500">
                        ${formatDate(ticket.createdAt)}
                    </span>

                    ${
                        showActions
                            ? `
                        <div class="flex gap-2">
                            <button
                                onclick="editTicket('${ticket.id}')"
                                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                aria-label="Edit ticket"
                            >
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                                </svg>
                            </button>
                            <button
                                onclick="handleDeleteClick('${
                                    ticket.id
                                }', '${escapeHtml(ticket.title).replace(
                                  /'/g,
                                  "\\'"
                              )}' )"
                                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                aria-label="Delete ticket"
                            >
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                            </button>
                        </div>
                    `
                            : ""
                    }
                </div>
            </div>
        </div>
    `;
};

/**
 * Create and manage delete dialog
 */
/**
 * Create and manage delete dialog
 */
const createDeleteDialog = () => {
    // Store the ticket ID and card element for deletion
    let ticketToDelete = { id: null, cardElement: null };
    let deleteCallback = null; // Store the callback

    const showDialog = (ticketTitle) => {
        const dialog = document.getElementById("deleteDialog");
        const message = document.getElementById("delete-ticket-title");

        if (message) {
            message.textContent = ticketTitle;
        }

        if (dialog) {
            dialog.classList.remove("hidden");
        }
    };

    const hideDialog = () => {
        ticketToDelete = { id: null, cardElement: null };
        const dialog = document.getElementById("deleteDialog");
        if (dialog) {
            dialog.classList.add("hidden");
        }
    };

    const handleDeleteClick = (ticketId, ticketTitle) => {
        // Find and store the card element
        const cardElement = event.target.closest(".bg-white.border-2");
        ticketToDelete = { id: ticketId, cardElement };

        // Show dialog with the ticket title
        showDialog(ticketTitle);
    };

    const confirmDelete = async () => {
        if (!ticketToDelete.id) {
            console.warn("No ticket selected for deletion");
            return;
        }

        try {
            // Call your delete callback/API - this should be deleteTicket()
            await deleteCallback(ticketToDelete.id);

            // Remove the card from DOM with animation
            if (ticketToDelete.cardElement) {
                ticketToDelete.cardElement.style.transition =
                    "opacity 0.3s, transform 0.3s";
                ticketToDelete.cardElement.style.opacity = "0";
                ticketToDelete.cardElement.style.transform = "scale(0.95)";

                setTimeout(() => {
                    ticketToDelete.cardElement.remove();

                    // Check if container is empty and show empty state
                    const container =
                        document.getElementById("tickets-container");
                    if (container && container.children.length === 0) {
                        const noTickets = document.getElementById("no-tickets");
                        container.classList.add("hidden");
                        if (noTickets) {
                            noTickets.classList.remove("hidden");
                        }
                    }
                }, 300);
            }

            hideDialog();
            showToast("Ticket deleted successfully", "success");
        } catch (error) {
            console.error("Delete failed:", error);
            showToast("Failed to delete ticket", "error");
        }
    };

    const initializeDialog = (callback) => {
        deleteCallback = callback; // Store the callback
    };

    // Make functions globally accessible
    window.handleDeleteClick = handleDeleteClick;
    window.confirmDelete = confirmDelete;
    window.cancelDelete = hideDialog;

    return {
        show: showDialog,
        hide: hideDialog,
        confirmDelete,
        initialize: initializeDialog,
    };
};
/**
 * Check if user is authenticated and redirect if not
 */

/**
 * Display current user email in the UI
 */
const displayUserEmail = (elementId = "user-email") => {
    const session = JSON.parse(
        localStorage.getItem("ticketapp_session") || "{}"
    );
    const userEmailEl = document.getElementById(elementId);

    if (userEmailEl && session.email) {
        userEmailEl.textContent = session.email;
    }

    return session;
};

(function () {
    // ============================================
    // RENDER FUNCTIONS
    // ============================================

    const renderStats = () => {
        const stats = getTicketStats();
        const statsGrid = document.getElementById("stats-grid");

        const statsData = [
            {
                title: "Total Tickets",
                value: stats.total,
                icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                </svg>`,
                iconColor: "text-blue-600",
                description: "All tickets in system",
            },
            {
                title: "Open Tickets",
                value: stats.open,
                icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>`,
                iconColor: "text-green-600",
                description: "Awaiting action",
            },
            {
                title: "In Progress",
                value: stats.inProgress,
                icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>`,
                iconColor: "text-amber-600",
                description: "Currently being worked on",
            },
            {
                title: "Resolved",
                value: stats.closed,
                icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>`,
                iconColor: "text-gray-600",
                description: "Successfully completed",
            },
        ];

        statsGrid.innerHTML = statsData
            .map(
                (stat) => `
            <div class="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm font-medium text-gray-600">${stat.title}</p>
                        <p class="text-2xl font-bold text-gray-900 mt-2">${stat.value}</p>
                        <p class="text-xs text-gray-500 mt-1">${stat.description}</p>
                    </div>
                    <div class="${stat.iconColor} opacity-80">
                        ${stat.icon}
                    </div>
                </div>
            </div>
        `
            )
            .join("");
    };

    const renderTickets = () => {
        const tickets = loadTickets();
        const container = document.getElementById("tickets-container");
        const noTickets = document.getElementById("no-tickets");

        if (tickets.length === 0) {
            container.classList.add("hidden");
            noTickets.classList.remove("hidden");
            return;
        }

        container.classList.remove("hidden");
        noTickets.classList.add("hidden");

        // Show only the 5 most recent tickets
        const recentTickets = tickets.slice(0, 5);

        container.innerHTML = recentTickets
            .map((ticket) => renderTicketCard(ticket, true))
            .join("");
    };

    // ============================================
    // INITIALIZATION
    // ============================================

    document.addEventListener("DOMContentLoaded", () => {
        // Check authentication
        if (!isAuthenticated()) {
            return;
        }

        // Display user email
        displayUserEmail("user-email");

        // Initialize delete dialog with the actual delete function
        const deleteDialog = createDeleteDialog();
        deleteDialog.initialize((ticketId) => {
            deleteTicket(ticketId); // This actually deletes from storage
            renderTickets(); // Then refresh the UI
            renderStats(); // And update stats
        });

        // Render dashboard
        renderStats();
        renderTickets();
    });
})();
