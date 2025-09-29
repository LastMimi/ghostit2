document.addEventListener('DOMContentLoaded', () => {
    const pathParts = location.pathname.split('/');
    const groupId = pathParts[pathParts.length - 1];
    if (!groupId) {
        alert('Invalid group ID');
        window.location.href = '/';
        return;
    }

    const storageKey = `group_${groupId}_internalId`;
    let internalId = localStorage.getItem(storageKey) || null;

    const socket = io();

    socket.emit('join', { groupId, internalId });

    socket.on('joined', ({ internalId: newId }) => {
        internalId = newId;
        localStorage.setItem(storageKey, internalId);
    });

    const participantList = document.getElementById('participant-list');
    const messagesDiv = document.getElementById('messages');
    const form = document.getElementById('message-form');
    const input = document.getElementById('message-input');

    async function loadInitialData() {
        const response = await fetch(`/api/groups/${groupId}`);
        if (!response.ok) {
            alert('Group not found');
            window.location.href = '/';
            return;
        }
        const { participants, messages } = await response.json();
        renderParticipants(participants);
        renderMessages(messages);
    }

    function renderParticipants(participants) {
        participantList.innerHTML = '';
        participants.forEach(id => {
            const li = document.createElement('li');
            li.textContent = id;
            participantList.appendChild(li);
        });
    }

    function renderMessages(messages, append = false) {
        if (!append) messagesDiv.innerHTML = '';
        messages.forEach(msg => {
            const div = document.createElement('div');
            div.textContent = `${msg.issueId}: ${msg.text} (${new Date(msg.time).toLocaleTimeString()})`;
            messagesDiv.appendChild(div);
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    socket.on('participants', renderParticipants);

    socket.on('message', msg => {
        renderMessages([msg], true);
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text || !internalId) return;
        socket.emit('message', { groupId, internalId, text });
        input.value = '';
    });

    loadInitialData();
});