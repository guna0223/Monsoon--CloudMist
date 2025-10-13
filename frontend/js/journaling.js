
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const uploadForm = document.getElementById('uploadForm');

// Show image preview
imageUpload.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});
// -------x---------x-----------x//
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const imgInput = document.getElementById('imageUpload');
const previewTitle = document.getElementById('previewTitle');
const previewDesc = document.getElementById('previewDescription');
const previewImg = document.getElementById('previewImage');

titleInput.addEventListener('input', function () {
    previewTitle.textContent = this.value;
});

descInput.addEventListener('input', function () {
    previewDesc.textContent = this.value;
});

imgInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
        }
        reader.readAsDataURL(file);
    } else {
        previewImg.src = '';
        previewImg.style.display = 'none';
    }
});

const API_BASE = 'http://localhost:5000';

// Handle form submission
uploadForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('description').value;
    const imageFile = document.getElementById('imageUpload').files[0];

    if (!title || !content) {
        alert('Please fill title and content.');
        return;
    }

    const formData = new FormData();
    formData.append('subject', title);
    formData.append('content', content);
    formData.append('image', imageFile);

    const token = localStorage.getItem('access_token');
    if (!token) {
        alert('Please login first.');
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/journals`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            alert('Story uploaded successfully!');
            uploadForm.reset();
            imagePreview.style.display = 'none';
            window.location.href = 'profile.html';
        } else {
            alert('Upload failed.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Upload failed.');
    }
});



