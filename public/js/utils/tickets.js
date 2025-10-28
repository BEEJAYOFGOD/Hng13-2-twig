// ============================================
// TICKET MANAGEMENT UTILITIES
// ============================================

// Get current user from session
const getCurrentUser = () => {
    const session = localStorage.getItem("ticketapp_session");
    if (session) {
        try {
            return JSON.parse(session);
        } catch (e) {
            console.error("Error loading session:", e);
            return null;
        }
    }
    return null;
};

// Get user data from users array
const getUserData = (userId) => {
    const users = localStorage.getItem("ticketapp_users");
    if (users) {
        try {
            const usersArray = JSON.parse(users);
            return usersArray.find((u) => u.id === userId);
        } catch (e) {
            console.error("Error loading users:", e);
            return null;
        }
    }
    return null;
};

// Update user data in users array
const updateUserData = (userId, updatedUserData) => {
    const usersJson = localStorage.getItem("ticketapp_users");
    if (!usersJson) {
        return false;
    }

    try {
        const usersArray = JSON.parse(usersJson);
        const index = usersArray.findIndex((u) => u.id === userId);

        if (index !== -1) {
            // Create a new object with updated data to avoid reference issues
            usersArray[index] = {
                ...usersArray[index],
                ...updatedUserData,
            };
            localStorage.setItem("ticketapp_users", JSON.stringify(usersArray));
            return true;
        }
    } catch (e) {
        console.error("Error updating user:", e);
    }

    return false;
};

// Load tickets for current user
const loadTickets = () => {
    const session = getCurrentUser();
    if (!session || !session.id) {
        return [];
    }

    const userData = getUserData(session.id);
    if (userData && userData.tickets && Array.isArray(userData.tickets)) {
        // Return a copy to avoid mutation issues
        return [...userData.tickets];
    }

    // Initialize tickets array if it doesn't exist
    updateUserData(session.id, { tickets: [] });
    return [];
};

// Save tickets for current user
const saveTickets = (tickets) => {
    const session = getCurrentUser();
    if (!session || !session.id) {
        console.error("No active session");
        return false;
    }

    // Create a deep copy of tickets to avoid reference issues
    const ticketsCopy = JSON.parse(JSON.stringify(tickets));
    return updateUserData(session.id, { tickets: ticketsCopy });
};

// Add new ticket
const addTicket = (ticket) => {
    const tickets = loadTickets();
    const newTicket = {
        ...ticket,
        id: ticket.id || Date.now().toString(),
        createdAt: ticket.createdAt || new Date().toISOString(),
    };
    tickets.push(newTicket);
    saveTickets(tickets);
    return newTicket;
};

// Update existing ticket
const updateTicket = (id, updatedData) => {
    const tickets = loadTickets();
    const index = tickets.findIndex((t) => t.id === id);
    if (index !== -1) {
        tickets[index] = {
            ...tickets[index],
            ...updatedData,
            updatedAt: new Date().toISOString(),
        };
        saveTickets(tickets);
        return tickets[index];
    }
    return null;
};

// Delete ticket
const deleteTicket = (id) => {
    const tickets = loadTickets();
    const filteredTickets = tickets.filter((t) => t.id !== id);
    saveTickets(filteredTickets);
    return true;
};

// Get ticket by ID
const getTicketById = (id) => {
    const tickets = loadTickets();
    const ticket = tickets.find((t) => t.id === id);
    return ticket ? { ...ticket } : null; // Return a copy
};

// Get ticket statistics
const getTicketStats = () => {
    const tickets = loadTickets();
    return {
        total: tickets.length,
        open: tickets.filter((t) => t.status === "open").length,
        inProgress: tickets.filter((t) => t.status === "in_progress").length,
        closed: tickets.filter((t) => t.status === "closed").length,
    };
};
