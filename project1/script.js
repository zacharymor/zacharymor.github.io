// Data for the cards
const cardData = [
    { 
        "id": 1, 
        "title": "Breadboard", 
        "text": "Prototype your electronics projects with ease using this high-quality breadboard. Designed for quick and easy circuit assembly, it features a sturdy construction and ample connection points.", 
        "long_text": "Prototype your electronics projects with ease using this high-quality breadboard. Designed for quick and easy circuit assembly, it features a sturdy construction and ample connection points. Its spacious layout allows for extensive circuit designs, making it an essential tool for both beginners and advanced users. Perfect for educational purposes, hobbyists, and professional engineers alike. The robust design ensures that it can withstand frequent use, providing reliable connections every time.",
        "image_url": "images/breadbox.jpeg",
        "price": "$9.99"
    },
    { 
        "id": 2, 
        "title": "Raspberry Pi", 
        "text": "Discover the power of the Raspberry Pi, a versatile mini-computer perfect for a variety of projects. Whether you're into programming, electronics, or DIY, this compact device has you covered.", 
        "long_text": "Discover the power of the Raspberry Pi, a versatile mini-computer perfect for a variety of projects. Whether you're into programming, electronics, or DIY, this compact device has you covered. With its powerful processing capabilities, extensive community support, and a wide range of compatible accessories, the Raspberry Pi is ideal for creating anything from a home media center to a sophisticated IoT device. Small in size but big on potential, it's a must-have for any tech enthusiast.",
        "image_url": "images/raspberry-pi.jpg",
        "price": "$65.00"
    },
    { 
        "id": 3, 
        "title": "Jumpers", 
        "text": "Connect your components with ease using these high-quality jumper wires. Ideal for breadboarding and prototyping, they come in various lengths and colors for all your electronic needs.", 
        "long_text": "Connect your components with ease using these high-quality jumper wires. Ideal for breadboarding and prototyping, they come in various lengths and colors for all your electronic needs. These jumper wires are designed for durability and flexibility, ensuring secure connections and easy manipulation. Whether you're working on simple circuits or complex systems, these wires are essential for efficient and effective electronic assembly.",
        "image_url": "images/wires.jpeg",
        "price": "$5.99"
    },
    { 
        "id": 4, 
        "title": "Servo", 
        "text": "Achieve precise control in your robotics and automation projects with this reliable servo motor. Known for its accuracy and durability, it is perfect for a range of applications.", 
        "long_text": "Achieve precise control in your robotics and automation projects with this reliable servo motor. Known for its accuracy and durability, it is perfect for a range of applications. From robotic arms to RC vehicles, this servo motor offers smooth and responsive movements. Its robust construction ensures long-lasting performance, making it a dependable choice for both hobbyists and professionals looking to add precise control to their projects.",
        "image_url": "images/servo.jpeg",
        "price": "$32.49"
    },
    { 
        "id": 5, 
        "title": "Raspberry Pi Camera", 
        "text": "Add vision to your Raspberry Pi projects with this high-quality camera module. Ideal for photography, video recording, and surveillance, it delivers crisp and clear images every time.", 
        "long_text": "Add vision to your Raspberry Pi projects with this high-quality camera module. Ideal for photography, video recording, and surveillance, it delivers crisp and clear images every time. This camera module is easy to integrate with your Raspberry Pi setup, providing high-resolution imagery that enhances your projects. Whether you're building a security system, a time-lapse video recorder, or an AI vision application, this camera module offers the performance and reliability you need.",
        "image_url": "images/r-pi-camera.jpeg",
        "price": "$55.99"
    },
    { 
        "id": 6, 
        "title": "LED", 
        "text": "Illuminate your projects with these versatile LEDs. Whether you're creating eye-catching displays, adding indicators to your circuits, or enhancing your DIY projects, these LEDs offer vibrant illumination and energy efficiency.", 
        "long_text": "Illuminate your projects with these versatile LEDs. Whether you're creating eye-catching displays, adding indicators to your circuits, or enhancing your DIY projects, these LEDs offer vibrant illumination and energy efficiency. With a wide range of colors and sizes available, you can easily find the perfect LED for your needs. Their compact size and low power consumption make them ideal for battery-powered applications and embedded systems. Bring your creations to life with the brilliant glow of these high-quality LEDs.",
        "image_url": "images/led.jpg",
        "price": "$3.49"
    },
];



// Function to create and append cards
function createCards() {
    const cardContainer = document.getElementById('card-container'); // holds all the cards
    cardData.forEach(card => {
        const cardCol = document.createElement('div');
        cardCol.className = 'col-md-4';
        cardCol.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img src="${card.image_url}" class="card-img-top h-100" alt="Card image">
                <div class="card-body">
                    <h5 class="card-title">${card.title}</h5>
                    <p class="card-text">${card.text}</p>
                    <button type="button" class="btn btn-tertiary border-warning border-5 rounded-0 sm-w-100 btn-md-only btn-light" data-toggle="modal" data-target="#cardModal${card.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        cardContainer.appendChild(cardCol);

        // Create modal for each card
        const modal = document.createElement('div');
        modal.className = 'modal fade animate__animated';
        modal.setAttribute('data-animation', 'fadeIn');
        modal.id = `cardModal${card.id}`;
        modal.tabIndex = -1;
        modal.setAttribute('aria-labelledby', 'exampleModalLabel');
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${card.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <!-- Modal Body -->
                    <div class="modal-body">
                        <p><strong>Description:</strong> ${card.long_text}</p>
                        <p><strong>Unit Price:</strong> ${card.price}</p>
                        <img src="${card.image_url}" alt="Product Image" class="img-fluid">
                        <div class="form-group mt-3">
                            <label for="quantity${card.id}">Enter how many items you would like to purchase:</label>
                            <input type="number" id="quantity${card.id}" class="form-control" min="1">
                        </div>
                        <button class="btn btn-success addToCartBtn" data-card-id="${card.id}">Add to Cart</button>
                        <div id="summary${card.id}" class="mt-3"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Handle modal animation on show event
        $(`#${modal.id}`).on('shown.bs.modal', function () {
            $(this).find('.modal-dialog').addClass('animate__animated animate__fadeIn');
        });

        // Handle modal animation on hide event
        $(`#${modal.id}`).on('hidden.bs.modal', function () {
            $(this).find('.modal-dialog').removeClass('animate__animated animate__fadeIn');
        });
    });
}

// Delegate the event handling for dynamically created "Add to Cart" buttons
$(document).on('click', '.addToCartBtn', function() {
    const cardId = $(this).data('card-id');
    const quantity = $(`#quantity${cardId}`).val();
    const unitPrice = 10; // Assuming unit price is $10
    if (quantity && quantity > 0 && !isNaN(quantity)) {
        const totalPrice = quantity * unitPrice;
        $(`#summary${cardId}`).html(`<p>Great! Order of ${quantity} items is received, total price is $${totalPrice.toFixed(2)}.</p>`);
        $(this).hide(); // Hide the button after it is clicked
    } else {
        $(`#summary${cardId}`).html('<p class="text-danger">Please enter a valid quantity.</p>');
    }
});

// Function to handle the "Learn more" button click
function handleLearnMoreButtonClick() {
    $('.learn-more-btn').click(function(event) {
        event.preventDefault(); // Prevent the default behavior of the anchor tag
        $('#multiPageModal').modal('show'); // Open the multi-page modal
    });
}

// Call the function to handle the "Learn more" button click
$(document).ready(function() {
    handleLearnMoreButtonClick();
});

// Function to create and append multi-page modal
function createMultiPageModal() {
    const multiPageModal = document.createElement('div');
    multiPageModal.className = 'modal fade';
    multiPageModal.id = 'multiPageModal';
    multiPageModal.tabIndex = -1;
    multiPageModal.setAttribute('aria-labelledby', 'multiPageModalLabel');
    multiPageModal.setAttribute('aria-hidden', 'true');
    multiPageModal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="multiPageModalLabel">Multi-Page Modal</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="page page1">
                        <h5>Page 1</h5>
                        <p>This is the content for page 1.</p>
                        <button class="btn btn-primary next-page">Next</button>
                    </div>
                    <div class="page page2 d-none">
                        <h5>Page 2</h5>
                        <p>This is the content for page 2.</p>
                        <button class="btn btn-primary prev-page mr-2">Previous</button>
                        <button class="btn btn-primary next-page">Next</button>
                    </div>
                    <div class="page page3 d-none">
                        <h5>Page 3</h5>
                        <p>This is the content for page 3.</p>
                        <button class="btn btn-primary prev-page mr-2">Previous</button>
                        <button class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(multiPageModal);

    // Handle next page button click
    $('.next-page').click(function() {
        const currentPage = $(this).closest('.page');
        currentPage.addClass('d-none');
        currentPage.next('.page').removeClass('d-none');
    });

    // Handle previous page button click
    $('.prev-page').click(function() {
        const currentPage = $(this).closest('.page');
        currentPage.addClass('d-none');
        currentPage.prev('.page').removeClass('d-none');
    });

    // Reset modal to first page when opened
    $('#multiPageModal').on('show.bs.modal', function () {
        $('.page').addClass('d-none');
        $('.page1').removeClass('d-none');
    });
}

// Call the function to create multi-page modal on page load
window.onload = function() {
    createCards();
    createMultiPageModal();
};

function showModal() {
    // Get the current scroll position
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show modal
    $('.login-modal').show();
    
    // Prevent scrolling by fixing body position and maintaining scroll position
    $('body').css({
        'position': 'fixed',
        'top': -scrollPosition + 'px',
        'width': '100%'
    });
}

function hideModal() {
    // Hide modal
    $('.login-modal').hide();
    
    // Restore scrolling by resetting body position
    $('body').css({
        'position': '',
        'top': '',
        'width': ''
    });
    
    // Restore scroll position
    var scrollPosition = parseInt($('body').css('top'));
    $('body').scrollTop(-scrollPosition);
}

const signUpTitle = document.getElementById('sign-up-title');
const loginTitle = document.getElementById('login-title');
const submitButton = document.getElementById('submit-btn');
const firstNameInput = document.getElementById('firstname');
const lastNameInput = document.getElementById('lastname');
const nameInputSection = document.getElementById('name-input');
const extraLinksSignUp = document.getElementById('extra-links-signup');
const extraLinksLogin = document.getElementById('extra-links-login');
const alreadyAccount = document.getElementById('already-account');
const forgotPass = document.getElementById('forgot-pass');
const noAccount = document.getElementById('no-account');

signUpTitle.addEventListener('click', () => {
    signUpTitle.classList.add('active', 'glitch');
    loginTitle.classList.remove('active', 'glitch');
    submitButton.textContent = 'Sign Up';
    firstNameInput.setAttribute('required', true);
    lastNameInput.setAttribute('required', true);
    nameInputSection.style.display = 'flex';
    extraLinksSignUp.style.display = 'block';
    extraLinksLogin.style.display = 'none';
});

loginTitle.addEventListener('click', () => {
    signUpTitle.classList.remove('active', 'glitch');
    loginTitle.classList.add('active', 'glitch');
    submitButton.textContent = 'Login';
    firstNameInput.removeAttribute('required');
    lastNameInput.removeAttribute('required');
    nameInputSection.style.display = 'none';
    extraLinksSignUp.style.display = 'none';
    extraLinksLogin.style.display = 'block';
});

noAccount.addEventListener('click', () => {
    signUpTitle.classList.add('active', 'glitch');
    loginTitle.classList.remove('active', 'glitch');
    submitButton.textContent = 'Sign Up';
    firstNameInput.setAttribute('required', true);
    lastNameInput.setAttribute('required', true);
    nameInputSection.style.display = 'flex';
    extraLinksSignUp.style.display = 'block';
    extraLinksLogin.style.display = 'none';
});

alreadyAccount.addEventListener('click', () => {
    signUpTitle.classList.remove('active', 'glitch');
    loginTitle.classList.add('active', 'glitch');
    submitButton.textContent = 'Login';
    firstNameInput.removeAttribute('required');
    lastNameInput.removeAttribute('required');
    nameInputSection.style.display = 'none';
    extraLinksSignUp.style.display = 'none';
    extraLinksLogin.style.display = 'block';
});

// Function to dynamically add or remove login button from the navbar
function toggleLoginButton() {
    const navbar = document.querySelector('.navbar-collapse');
    const loginButton = document.querySelector('#login-button');
    if (navbar.classList.contains('show')) {
        loginButton.style.display = 'block'; // Hide login button when navbar is open
    } else {
        loginButton.style.display = 'none'; // Show login button when navbar is closed
    }
}

// Event listener to toggle login button when navbar is shown or hidden
document.querySelector('.navbar-toggler').addEventListener('click', toggleLoginButton);
