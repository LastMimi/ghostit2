// public/group.js
document.addEventListener('DOMContentLoaded', () => {
    const pathParts = location.pathname.split('/');
    const groupId = pathParts[pathParts.length - 1];
    if (!groupId) {
        alert('Invalid group ID');
        window.location.href = '/';
        return;
    }

    });

    loadInitialData();
