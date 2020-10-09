const commentForm = document.querySelector('.comment-form');
const commentIcon = document.querySelector('#comment-display-btn');


const showForm = () => {
    commentForm.style.display = 'flex';
}
commentIcon.addEventListener('click', showForm)


const locationWrapper = domElement(".user-location");
function scb(data) {
    locationWrapper.style.display = 'block';
    const latitude = document.createElement('p');
    const longitude = document.createElement('p');
    latitude.textContent = `Latitude: ${Math.round(data.coords.latitude)}`;
    longitude.textContent = `Longitude: ${Math.round(data.coords.longitude)}`;

    locationWrapper.appendChild(latitude);
    locationWrapper.appendChild(longitude)
    console.log(locationWrapper)
}
function fcb() {
    console.log('Failure')
}
function userLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(scb, fcb)
    } else {
        return false
    }
}

window.onload = () => {
    userLocation()
}