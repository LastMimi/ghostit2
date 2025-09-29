document.addEventListener('DOMContentLoaded', () => {
    const groupList = document.getElementById('group-list');
    const createButton = document.getElementById('create-group');

    function loadGroups() {
        const joinedGroups = JSON.parse(localStorage.getItem('joinedGroups')) || [];
        groupList.innerHTML = '';
        joinedGroups.forEach(id => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="/group/${id}">Group ${id}</a>`;
            groupList.appendChild(li);
        });
    }

    createButton.addEventListener('click', async () => {
        const response = await fetch('/api/groups', { method: 'POST' });
        const { groupId } = await response.json();
        const joinedGroups = JSON.parse(localStorage.getItem('joinedGroups')) || [];
        if (!joinedGroups.includes(groupId)) {
            joinedGroups.push(groupId);
            localStorage.setItem('joinedGroups', JSON.stringify(joinedGroups));
        }
        loadGroups();
        window.location.href = `/group/${groupId}`;
    });

    loadGroups();
});