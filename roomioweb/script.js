// script.js
const sliders = document.querySelectorAll('.image-slider');
sliders.forEach((slider) => {
    let currentIndex = 0;
    const images = slider.querySelectorAll('.slider-img');

    setInterval(() => {
        images.forEach((img, index) => {
            img.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
        });

        currentIndex = (currentIndex + 1) % images.length;
    }, 3000); // Change every 3 seconds
});
// Handle "Book Now" button clicks
document.querySelectorAll('.book-now').forEach(button => {
    button.addEventListener('click', (e) => {
        const roomType = e.target.dataset.roomType;
        const roomRate = e.target.dataset.roomRate;
        const description = e.target.dataset.description;

        // Redirect to booking.html with query parameters
        const url = `booking.html?roomType=${encodeURIComponent(roomType)}&roomRate=${encodeURIComponent(roomRate)}&description=${encodeURIComponent(description)}`;
        window.location.href = url;
    });
});

/// Populate form fields in booking.html
if (window.location.pathname.endsWith('booking.html')) {
    const params = new URLSearchParams(window.location.search);
    
    const roomType = params.get('roomType') || '';
    const roomRate = params.get('roomRate') || ''; // Room rate as string (with $)
    const description = params.get('description') || '';
    
    // Populate the form fields
    document.getElementById('roomType').value = roomType;
    document.getElementById('roomDescription').value = description;

    // Remove the dollar sign and convert the room rate to a number
    const numericRoomRate = parseFloat(roomRate.replace('$', '').replace('/night', '').trim());

    if (!isNaN(numericRoomRate)) {
        document.getElementById('roomRate').value = `$${numericRoomRate}/night`;  // Add dollar sign back
    }

    // Calculate total cost
    const numberOfRooms = parseInt(document.getElementById('roomQuantity').value, 10) || 1;

    const totalCost = numericRoomRate * numberOfRooms;
    
    // Display the total cost
    document.getElementById('totalCost').textContent = `Total Cost: $${totalCost.toFixed(2)}`;
}

