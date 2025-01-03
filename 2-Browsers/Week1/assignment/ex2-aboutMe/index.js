document.getElementById('nickname').textContent = 'Bob';
document.getElementById('fav-food').textContent = 'Pizza';
document.getElementById('hometown').textContent = 'New York';

const liElements = document.querySelectorAll('li');

liElements.forEach((el) => el.classList.add('list-item'));
