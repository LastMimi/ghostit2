document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('join-form');
    const groupIdInput = document.getElementById('group-id');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const groupId = groupIdInput.value.trim();
        if (!groupId) return;

        const response = await fetch(`/api/groups/${groupId}`);
        if (!response.ok) {
            alert('Group not found');
            return;
        }

        const joinedGroups = JSON.parse(localStorage.getItem('joinedGroups')) || [];
        if (!joinedGroups.includes(groupId)) {
            joinedGroups.push(groupId);
            localStorage.setItem('joinedGroups', JSON.stringify(joinedGroups));
        }
        window.location.href = `/group/${groupId}`;
    });
});