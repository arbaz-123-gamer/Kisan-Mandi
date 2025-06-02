let login = document.querySelector('.login');
        let create = document.querySelector('.create');
        let container = document.querySelector('.container');

        login.onclick = function(){
            container.classList.add('signinForm');
        }
        
        create.onclick = function(){
            container.classList.remove('signinForm');
        }

        function validateSignup() {
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
        
            if (username === "" || email === "" || password === "" || confirmPassword === "") {
                alert("All fields are required!");
                return false;
            }
        
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return false;
            }
        
            fetch('http://127.0.0.1:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password, confirm_password: confirmPassword })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.message === "User  created successfully!") {
                    // Redirect to login or another page
                }
            })
            .catch(error => console.error('Error:', error));
        }
        

        function validateSignin() {
            const username = document.getElementById('signin-username').value;
            const password = document.getElementById('signin-password').value;
        
            if (username === "" || password === "") {
                alert("All fields are required!");
                return false;
            }
        
            fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.message === "Login successful!") {
                    // Redirect to another page
                }
            })
            .catch(error => console.error('Error:', error));
        }