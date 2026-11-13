// Load professionals when homepage opens
document.addEventListener("DOMContentLoaded", function () {
    loadProviders();
});

// Display professionals
async function loadProviders(service = "") {
    const container = document.getElementById("provider-list");

    try {
        let url = "/api/providers";

        if (service.trim() !== "") {
            url += "/search?serviceType=" + encodeURIComponent(service.trim());
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to load professionals");
        }

        const providers = await response.json();
        displayProviders(providers);

    } catch (error) {
        container.innerHTML =
            "<p>Unable to load professionals. Please try again.</p>";
        console.error(error);
    }
}

// Display professional cards
function displayProviders(providers) {
    const container = document.getElementById("provider-list");

    if (!providers.length) {
        container.innerHTML =
            "<p>No matching professionals found. Try another service.</p>";
        return;
    }

    container.innerHTML = providers.map(provider => `
        <div class="provider-card">
            <h3>${escapeHTML(provider.name || "Professional")}</h3>
            <p>Service: ${escapeHTML(provider.serviceType || "Home Service")}</p>
            <p>Location: ${escapeHTML(provider.location || "Not specified")}</p>
            <p>Price: ₹${provider.pricePerHour || 0} / hour</p>
            <button onclick="bookProvider('${provider.id}')">
                Book Now
            </button>
        </div>
    `).join("");
}

// Search by service
function searchServices() {
    const input = document.getElementById("service-search");
    const value = input.value.trim();

    if (!value) {
        alert("Please enter a service to search.");
        return;
    }

    loadProviders(value);
    window.location.hash = "providers";
}

// Search by location
async function searchByLocation() {
    const input = document.getElementById("location-search");
    const location = input.value.trim();

    if (!location) {
        alert("Please enter your location.");
        return;
    }

    const container = document.getElementById("provider-list");

    try {
        const response = await fetch(
            "/api/providers/search?location=" + encodeURIComponent(location)
        );

        if (!response.ok) {
            throw new Error("Location search failed");
        }

        const providers = await response.json();
        displayProviders(providers);

        window.location.hash = "providers";

    } catch (error) {
        container.innerHTML =
            "<p>Unable to search location. Please try again.</p>";
        console.error(error);
    }
}

// Select service category
function selectService(service) {
    document.getElementById("service-search").value = service;
    loadProviders(service);
    window.location.hash = "providers";
}

// Login
function showLogin() {
    window.location.href = "login.html";
}

// Booking
function bookProvider(providerId) {
    window.location.href =
        "booking.html?providerId=" + encodeURIComponent(providerId);
}

// My Bookings
function showMyBookings() {
    window.location.href = "my-bookings.html";
}

// Safe text display
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