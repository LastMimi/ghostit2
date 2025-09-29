// public/join.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('join-form');
    const groupIdInput = document.getElementById('group-id');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const groupId = groupIdInput.value.trim();
        if (!groupId) return;

        let joinedGroups = JSON.parse(localStorage.getItem('joinedGroups')) || [];
        if (!joinedGroups.includes(groupId)) {
            joinedGroups.push(groupId);
            localStorage.setItem('joinedGroups', JSON.stringify(joinedGroups));
        }
        window.location.href = `/group/${groupId}`;
    });
});