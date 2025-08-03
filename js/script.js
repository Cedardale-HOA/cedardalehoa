const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function openMenu() {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
}

function closeMenu() {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
    closeMenu();
    }
});

document.querySelectorAll('#sidebar a').forEach(link => {
    link.addEventListener('click', closeMenu);
});