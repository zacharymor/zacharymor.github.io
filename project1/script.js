// Data for the cards
const cardData = [
    { id: 1, title: "Card title 1", text: "Some quick example text to build on the card title and make up the bulk of the card's content." },
    { id: 2, title: "Card title 2", text: "Some quick example text to build on the card title and make up the bulk of the card's content." },
    { id: 3, title: "Card title 3", text: "Some quick example text to build on the card title and make up the bulk of the card's content." },
    { id: 4, title: "Card title 4", text: "Some quick example text to build on the card title and make up the bulk of the card's content." },
    { id: 5, title: "Card title 5", text: "Some quick example text to build on the card title and make up the bulk of the card's content." },
    { id: 6, title: "Card title 6", text: "Some quick example text to build on the card title and make up the bulk of the card's content." },
];

// Function to create and append cards
function createCards() {
    const cardContainer = document.getElementById('card-container'); //holds all the cards
    cardData.forEach(card => {
        const cardCol = document.createElement('div');
        cardCol.className = 'col-md-4';
        cardCol.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img src="https://via.placeholder.com/150" class="card-img-top" alt="Card image">
                <div class="card-body">
                    <h5 class="card-title">${card.title}</h5>
                    <p class="card-text">${card.text}</p>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#cardModal${card.id}">
                        Go somewhere
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
                        <h5 class="modal-title" id="exampleModalLabel">Modal title ${card.id}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        This is the content for modal ${card.id}.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
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