// Community page JS
const API_BASE = 'http://localhost:5000';
const token = localStorage.getItem('access_token');

// Fetch and display community posts
function loadPosts() {
    fetch(`${API_BASE}/community`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    })
    .then(response => response.json())
    .then(posts => {
        const list = document.getElementById('comment-list');
        list.innerHTML = posts.map(p => `
            <div class="comment">
                <strong>User ${p.user_id}:</strong> ${p.content}
                <small>${new Date(p.timestamp).toLocaleString()}</small>
            </div>
        `).join('');
    })
    .catch(error => console.error('Error fetching posts:', error));
}

// Handle new post submission
document.getElementById('comment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!token) {
        alert('Please login to post.');
        return;
    }
    const content = document.getElementById('ctext').value;
    if (!content) {
        alert('Please enter content.');
        return;
    }

    fetch(`${API_BASE}/community`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content })
    })
    .then(response => response.json())
    .then(data => {
        if (response.ok) {
            document.getElementById('ctext').value = '';
            loadPosts(); // Reload posts
        } else {
            alert(data.message || 'Failed to post.');
        }
    })
    .catch(error => console.error('Error posting:', error));
});

// Load posts on page load
loadPosts();
