// For future interactivity
console.log("Welcome to Monsoon Days Platform!");

// Example: Alert when user clicks button
// document.querySelector(".btn").addEventListener("click", () => {
//   alert("Let's start your journaling journey!");
// });

document.getElementById('loginBtn').addEventListener('click', function (e) {
  e.preventDefault();
  // Save main page HTML for restoration
  const mainPage = document.body.innerHTML;
  document.body.innerHTML = `
  <div class="form width-350px">
    <h1 class=""><center>Login</center></h1>
    <div class="mb-3">
      <label for="formGroupExampleInput" class="form-label">Username:</label>
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter username" style="width:100%;" >
    </div>
    <div class="mb-3">
      <label for="formGroupExampleInput2" class="form-label">Password:</label>
      <input type="password" class="form-control" id="formGroupExampleInput2" style="width:100%;" > <br>
        <button type="submit" class="btn btn-primary" id="loginSubmit"
          style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .rem;">
          Login
        </button> <br><br>
          <span>Not a user? </span> <a href="#" id="registerLink">Register</a>
        </div>
        </div>
        <style>
          .form {
            width: 300px;
          margin: auto;
          margin-top: 50px;
          box-shadow: 8px 8px 8px rgb(216, 218, 220), -6px -6px 8px rgb(216, 218, 220);
          padding: 5px 20px;
        }
          .form-control {
            width: 100%;
        }
        </style>
        `;
  // Back to main page on Login
  document.getElementById('loginSubmit').onclick = function (e) {
    e.preventDefault();
    document.body.innerHTML = mainPage;
    window.location.reload();
  };
  // Register link handler
  document.getElementById('registerLink').onclick = function (e) {
    e.preventDefault();
    document.body.innerHTML = `
        <div class="form width-350px">
          <h1 class=""><center>Registration</center></h1>
          <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label">Username:</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter username" required style="width:100%;">
          </div>
          <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label">Email Id:</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter a valid email address" required style="width:100%;">
          </div>
          <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label">Password:</label>
            <input type="password" class="form-control" id="formGroupExampleInput2" required style="width:100%;">
          </div>
          <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label">Confirm Password:</label>
            <input type="password" class="form-control" id="formGroupExampleInput2" required style="width:100%;"> <br>
              <button type="submit" class="btn btn-primary" id="registerSubmit"
                style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .rem;">
                Register
              </button> <br><br>
                <span>Already user? </span> <a href="#" id="loginBackLink">Login</a>
              </div>
              </div>
              <style>
                .form {
                  width: 300px;
                margin: auto;
                margin-top: 50px;
                box-shadow: 8px 8px 8px rgb(216, 218, 220), -6px -6px 8px rgb(216, 218, 220);
                padding: 5px 20px;
          }
                .form-control {
                  width: 100%;
          }
              </style>
              `;
    // Back to login page
    document.getElementById('loginBackLink').onclick = function (e) {
      e.preventDefault();
      document.getElementById('loginBtn').click();
    };
    // Register submit returns to main page
    document.getElementById('registerSubmit').onclick = function (e) {
      e.preventDefault();
      document.body.innerHTML = mainPage;
      window.location.reload();
    };
  };
});

document.querySelector('.btn.btn-light.btn-lg').addEventListener('click', function (e) {
  e.preventDefault();
  window.location.href = 'demo.html';
});

document.querySelector('.nav-link[href="#Journals"], .nav-link[href="#"], .nav-link').addEventListener('click', function (e) {
  if (this.textContent.trim() === 'Journals') {
    e.preventDefault();
    const mainPage = document.body.innerHTML;
    document.body.innerHTML = `
              <h2 class="text-center mb-4">Share Your Monsoon Story</h2>
              <form id="uploadForm">
                <div class="mb-3">
                  <label for="title" class="form-label">Title</label>
                  <input type="text" class="form-control" id="title" placeholder="Enter title" required>
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">Description</label>
                  <textarea class="form-control" id="description" rows="3" placeholder="Write something..." required></textarea>
                </div>
                <div class="mb-3">
                  <label for="imageUpload" class="form-label">Upload Image</label>
                  <input class="form-control" type="file" id="imageUpload" accept="image/*" required>
                </div>
                <img id="imagePreview" src="" alt="Preview">
                  <button type="submit" class="btn btn-primary w-100 mt-3">Upload Story</button>
              </form>
              <style>
                body {
                  font - family: 'Arial', sans-serif;
                background-color: #e6f0f7;
                padding: 30px;
        }
                #uploadForm {
                  max - width: 500px;
                margin: auto;
                background-color: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;
        }
                #uploadForm:hover {
                  transform: translateY(-5px);
        }
                #imagePreview {
                  display: none;
                margin-top: 15px;
                max-height: 200px;
                width: 100%;
                object-fit: cover;
                border-radius: 8px;
        }
              </style>
              <script>
                const imageUpload = document.getElementById('imageUpload');
                const imagePreview = document.getElementById('imagePreview');
                const uploadForm = document.getElementById('uploadForm');
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
                uploadForm.addEventListener('submit', function (e) {
                  e.preventDefault();
                const title = document.getElementById('title').value;
                const description = document.getElementById('description').value;
                const imgSrc = imagePreview.src;
                if (!title || !description || !imgSrc) return;
                alert(\`Story Uploaded!\\nTitle: \${title}\\nDescription: \${description}\`);
                uploadForm.reset();
                imagePreview.style.display = 'none';
        });
                <\/script>
                <button class="btn btn-secondary w-100 mt-3" id="backMain">Back to Main</button>
                `;
    // Back to main page
    document.getElementById('backMain').onclick = function (e) {
      e.preventDefault();
      document.body.innerHTML = mainPage;
      window.location.reload();
    };
  }
});

// Redirect to article.html when Articles is clicked
Array.from(document.querySelectorAll('.nav-link')).forEach(function (link) {
  if (link.textContent.trim() === 'Articles') {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = 'article.html';
    });
  }
});

// Redirect to community.html when Community is clicked
Array.from(document.querySelectorAll('.nav-link')).forEach(function (link) {
  if (link.textContent.trim() === 'Community') {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = 'community.html';
    });
  }
});

// Redirect to demo.html when Journals is clicked
Array.from(document.querySelectorAll('.nav-link')).forEach(function (link) {
  if (link.textContent.trim() === 'Journals') {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = 'demo.html';
    });
  }
});

