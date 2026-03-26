/**
 * Script for handling the sidebar menu and overlay
 */
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


/**
 * Script for handling the event card modal
 */
const openButtons = document.querySelectorAll('[data-modal-target]');
const closeButtons = document.querySelectorAll('[data-modal-close]');

openButtons.forEach(button => {
    button.addEventListener('click', () => {
        let title, content, modal;

        const id = `modal-${Math.random().toString(36).substr(2, 9)}`;

        const target = button.dataset.modalTarget;
        if( target ) {
            modal = document.querySelector(target);
            if( modal ) {
                modal.classList.add('active');
                return;
            }
        }
    
        const parent = button.closest('.event-card');
        if( parent ) {
            title = parent.querySelector('.event-card-title') ? parent.querySelector('.event-card-title').textContent : '';
            content = parent.querySelector('.event-card-details') ? parent.querySelector('.event-card-details').textContent : 'No details available.';
            button.dataset.modalTarget = `#${id}`;
        } else {
            title = button.getAttribute('data-modal-title') || 'Event Details';
            content = button.getAttribute('data-modal-content') || 'No details available.';
        }

        modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = id;

        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close-button" data-close-modal>&times;</button>
                <h2>${title}</h2>
                <p>${content}</p>
            </div>
        `;

        document.body.appendChild(modal);

        setTimeout(() => {
            modal.classList.add('active');
        }, 10); // Allow the modal to be added to the DOM before adding the active class

        const closeButton = modal.querySelector('[data-close-modal]');
        if( closeButton ) {
            closeButton.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        // Close modal when clicking outside the content area
        modal.addEventListener('click', (e) => {
            const modalContent = modal.querySelector('.modal-content');
            if( ! modalContent.contains(e.target) ) {
                modal.classList.remove('active');
            }
        });
    });
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});