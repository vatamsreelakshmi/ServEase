document.addEventListener("DOMContentLoaded", function () {
    loadMyBookings();
});

async function loadMyBookings() {
    const container = document.getElementById("booking-list");
    const userId = localStorage.getItem("userId");

    if (!userId) {
        container.innerHTML = "<p>Please log in to view your bookings.</p>";
        return;
    }

    try {
        const response = await fetch("/api/bookings/user/" + userId);

        if (!response.ok) {
            throw new Error("Unable to load bookings");
        }

        const bookings = await response.json();

        if (bookings.length === 0) {
            container.innerHTML = "<p>You have no bookings yet.</p>";
            return;
        }

        container.innerHTML = bookings.map(booking => `
            <div class="provider-card">
                <h3>${escapeHTML(booking.serviceType || "Home Service")}</h3>
                <p><strong>Booking ID:</strong> ${booking.id}</p>
                <p><strong>Booking Date:</strong> ${escapeHTML(booking.bookingDate || "")}</p>
                <p><strong>Address:</strong> ${escapeHTML(booking.address || "")}</p>
                <p><strong>Amount:</strong> ₹${booking.totalAmount}</p>
                <p><strong>Status:</strong> ${escapeHTML(booking.status || "PENDING")}</p>
            </div>
        `).join("");

    } catch (error) {
        container.innerHTML = "<p>Unable to load your bookings.</p>";
        console.error(error);
    }
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[char];
    });
}
