const signUpTitle = document.getElementById('sign-up-title');
        const loginTitle = document.getElementById('login-title');
        const submitButton = document.getElementById('submit-btn');
        const firstNameInput = document.getElementById('firstname');
        const lastNameInput = document.getElementById('lastname');
        const nameInputSection = document.getElementById('name-input');
        const extraLinksSignUp = document.getElementById('extra-links-signup');
        const extraLinksLogin = document.getElementById('extra-links-login');
        const alreadyAccount = document.getElementById('already-account')
        const forgotPass = document.getElementById('forgot-pass')
        const noAccount = document.getElementById('no-account')

        signUpTitle.addEventListener('click', () => {
            signUpTitle.classList.add('active', 'glitch'); // Added glitch class for glitch animation
            loginTitle.classList.remove('active', 'glitch');
            submitButton.textContent = 'Sign Up';
            firstNameInput.setAttribute('required', true);
            lastNameInput.setAttribute('required', true);
            nameInputSection.style.display = 'flex';
            extraLinksSignUp.style.display = 'block';
            extraLinksLogin.style.display = 'none';
        });

        loginTitle.addEventListener('click', () => {
            signUpTitle.classList.remove('active', 'glitch'); // Removed glitch class
            loginTitle.classList.add('active', 'glitch'); // Added glitch class for glitch animation
            submitButton.textContent = 'Login';
            firstNameInput.removeAttribute('required');
            lastNameInput.removeAttribute('required');
            nameInputSection.style.display = 'none';
            extraLinksSignUp.style.display = 'none';
            extraLinksLogin.style.display = 'block';
        });


        noAccount.addEventListener('click', () => {
            signUpTitle.classList.add('active', 'glitch'); // Added glitch class for glitch animation
            loginTitle.classList.remove('active', 'glitch');
            submitButton.textContent = 'Sign Up';
            firstNameInput.setAttribute('required', true);
            lastNameInput.setAttribute('required', true);
            nameInputSection.style.display = 'flex';
            extraLinksSignUp.style.display = 'block';
            extraLinksLogin.style.display = 'none';
        });

        alreadyAccount.addEventListener('click', () => {
            signUpTitle.classList.remove('active', 'glitch'); // Removed glitch class
            loginTitle.classList.add('active', 'glitch'); // Added glitch class for glitch animation
            submitButton.textContent = 'Login';
            firstNameInput.removeAttribute('required');
            lastNameInput.removeAttribute('required');
            nameInputSection.style.display = 'none';
            extraLinksSignUp.style.display = 'none';
            extraLinksLogin.style.display = 'block';
        });