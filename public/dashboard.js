// public/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const groupList = document.getElementById('group-list');
const createButton = document.getElementById('create-group');

function loadGroups() {
    const joinedGroups = JSON.parse(localStorage.getItem('joinedGroups')) || [];
    groupList.innerHTML = '';
joinedGroups.forEach(id => {
    const li = document.createElement('li');
    li.textContent = `Group ID: ${id}`;
    groupList.appendChild(li);
}

// Example event listener for createButton (adjust as needed)
createButton.addEventListener('click', () => {
    const groupId = prompt('Enter new group ID:');
    if (groupId) {
        let joinedGroups = JSON.parse(localStorage.getItem('joinedGroups')) || [];
        joinedGroups.push(groupId);
        localStorage.setItem('joinedGroups', JSON.stringify(joinedGroups));
        loadGroups();
        window.location.href = `/group/${groupId}`;
    }
});

loadGroups();
});