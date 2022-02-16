'use strict';

const menuBtn = document.querySelector('.menu-icon');
const menu = document.querySelector('[mobile-menu]');
const menuOpen = document.querySelector('[menu-icon-open]');
const modal = document.querySelector('[modal-rewards]');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('[show-rewards-modal]');
const confirmMessageSectionx = document.querySelector('[confirmation-message]');
const confirmMessageSection = document.querySelector('[confirmation-message]');
const confirmMessageButton = document.querySelector('[confirm_message]');
const modalSectionX = document.querySelector('[modal-rewards]');
const overlaySection = document.querySelector('.overlay');
const confirmMessageShow = document.getElementById('add-funds-confirm');
const addFundsConfirm = document.querySelector('[data-add-funds]');
const addFundsConfirmClass = document.querySelector('.btn-confirm-show');

menuBtn.addEventListener('click', () => {
  const toggle = menu.classList.toggle('hidden');

  if (toggle === true) {
    menuOpen.src = './assets/icon-hamburger.svg';
  } else {
    menuOpen.src = './assets/icon-close-menu.svg';
  }
});

function showNoReward() {
  document.getElementById('noreward').classList.remove('hidden');
  document.getElementById('bamboo_stand').classList.add('hidden');
  document.getElementById('black_edition').classList.add('hidden');
}

function showBambooStand() {
  document.getElementById('bamboo_stand').classList.remove('hidden');
  document.getElementById('noreward').classList.add('hidden');
  document.getElementById('black_edition').classList.add('hidden');
}

function showBlackEdition() {
  document.getElementById('black_edition').classList.remove('hidden');
  document.getElementById('bamboo_stand').classList.add('hidden');
  document.getElementById('noreward').classList.add('hidden');
}

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  // console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const openConfirmation = function () {
  confirmMessageSection.classList.remove('hidden');
  overlaySection.classList.remove('hidden');
  modalSectionX.classList.add('hidden');
};

const closeConfirmation = function () {
  confirmMessageSection.classList.add('hidden');
  overlaySection.classList.add('hidden');
};

const buttons = document.querySelectorAll('.btn-confirm-show');
buttons.forEach(function (currentBtn) {
  currentBtn.addEventListener('click', openConfirmation);
});

confirmMessageButton.addEventListener('click', closeConfirmation);
overlaySection.addEventListener('click', closeConfirmation);
