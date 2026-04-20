//const apiUrl = "https://wdb26-exempel-deployment-testing.2.rahtiapp.fi/api/ip";
const apiUrl = "http://127.0.0.1:8080";

// TEMP flytta till LocalStorage eller liknande:
const API_KEY = "6023d62bba4d85986b90c30c45a9ff27d722833b71b4a25bffc305443ebb272a";
//const API_KEY = "asdasd";

/*
async function getCurrentGuest() {
    const res = await fetch(`${apiUrl}/current_guest`,{
        headers: {'X-API-Key': API_KEY}
    });
    const guest = await res.json();

    console.log(guest)

}
getCurrentGuest();
*/

// Hämta nuvarande gästs bokningar
async function getBookings() {
    const res = await fetch(`${apiUrl}/bookings`,{
        headers: {'X-API-Key': API_KEY}
    });
    const bookings = await res.json();

    console.log(bookings)

    document.getElementById("bookings-list").innerHTML = '';
    for (b of bookings) {
        document.getElementById("bookings-list").innerHTML += `
            <li>
                ${b.id} - ${b.datefrom} - rum ${b.room_number} - ${b.guest_name} - ${b.nights} nätter, totalt: ${b.total_price} €
                <select id="stars-${b.id}">
                    <option value="5">⭐⭐⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>
                </select>
            </li>


        `;
    }
    
}
getBookings();

async function getRooms() {
    const res = await fetch(`${apiUrl}/rooms`);
    const rooms = await res.json();

    console.log(rooms)

    for (room of rooms) {
        document.getElementById("room-list").innerHTML += `
            <option value="${room.id}">
                ${room.room_number} - 
                ${room.room_type} - 
                ${room.price} €
            </option>
        `;
    }
}
getRooms();




async function saveBooking() {

    const booking = {
        room_id: document.getElementById("room-list").value,
        guest_id: document.getElementById("guest-list").value,
        datefrom: document.getElementById("datefrom").value,
        dateto: document.getElementById("dateto").value
    }
    
    const res = await fetch(`${apiUrl}/bookings`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(booking)
    });
    const data = await res.json();

    console.log(data);
    getBookings();
}

document.getElementById('btn-save').addEventListener('click', saveBooking);