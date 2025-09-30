const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const path = require('path');  // Add this for path handling

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.static('public'));

// Add this dynamic route for /group/[id] – serves group.html with the ID
app.get('/group/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'group.html'));
});

const groups = new Map();

function startRotation(groupId) {
    const group = groups.get(groupId);
    group.rotationTimer = setInterval(() => {
        group.participants.forEach(info => {
            info.issueId = `Issue-${Math.floor(Math.random() * 10000)}`;
        });
        io.to(groupId).emit('participants', getParticipants(groupId));
    }, 300000); // 5 minutes
}

function getParticipants(groupId) {
    const group = groups.get(groupId);
    return Array.from(group.participants.values()).map(info => info.issueId);
}

app.post('/api/groups', (req, res) => {
    const groupId = uuidv4().slice(0, 8);
    groups.set(groupId, {
        participants: new Map(),
        messages: [],
        rotationTimer: null
    });
    startRotation(groupId);
    res.json({ groupId });
});

app.get('/api/groups/:id', (req, res) => {
    const group = groups.get(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.json({
        participants: getParticipants(req.params.id),
        messages: group.messages
    });
});

io.on('connection', socket => {
    socket.on('join', ({ groupId, internalId }) => {
        if (!groups.has(groupId)) return;
        const group = groups.get(groupId);
        let newJoin = false;
        if (!internalId || !group.participants.has(internalId)) {
            internalId = uuidv4();
            newJoin = true;
        }
        if (newJoin) {
            const issueId = `Issue-${Math.floor(Math.random() * 10000)}`;
            group.participants.set(internalId, { issueId, joinTime: Date.now() });
            io.to(groupId).emit('message', { issueId: 'System', text: `${issueId} has joined`, time: Date.now() });
        }
        socket.join(groupId);
        socket.emit('joined', { internalId });
        io.to(groupId).emit('participants', getParticipants(groupId));
    });

    socket.on('message', ({ groupId, internalId, text }) => {
        if (!groups.has(groupId)) return;
        const group = groups.get(groupId);
        if (!group.participants.has(internalId)) return;
        const issueId = group.participants.get(internalId).issueId;
        const msg = { issueId, text, time: Date.now() };
        group.messages.push(msg);
        io.to(groupId).emit('message', msg);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));