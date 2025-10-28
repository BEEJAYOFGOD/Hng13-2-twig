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
        `,
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
    if (!requireAuth()) {
      return;
    }

    // Display user email
    displayUserEmail("user-email");
    renderTickets();

    // Initialize delete dialog with refresh callback
    const deleteDialog = createDeleteDialog();
    deleteDialog.initialize(() => {
      renderTickets();
      renderStats();
    });

    // Render dashboard
    renderStats();
    renderTickets();
  });
})();
