'use strict';

const totalBacker = document.querySelector('[total-backers-preview]');
const totalFunds = document.querySelector('[total-funds-preview]');
const rewardContainer = document.getElementById('reward_boxes_container');
const progressBar = document.querySelector('[progress-bar-width]');
const bookmarkText = document.querySelector('[bookmark-icon-text]');
const bookmarkIcon = document.querySelector('[bookmark-icon-icon]');
const bookmarkSection = document.querySelector('[bookmark-section]');
const summarySection = document.querySelector('[summary-section]');
const rewardsModalShow = document.querySelector('[show-rewards-modal]');
const progressSection = document.querySelector('[progress-section]');
const modalSection = document.getElementById('modal-show');
const bambooQuantity = document.getElementById('[bamboo-quantity]');
const renderedBookmarksButton = document.querySelector(
  '[bookmark-icon-status]'
);
const noRewardRadio = document.getElementById('noreward_yes');
const bambooRadio = document.getElementById('bamboo_yes');
const blackRadio = document.getElementById('black_edition_yes');
const fundsRequired = 100000;

const crowdproject = {
  title: 'Mastercraft Bamboo Monitor Riser',
  description:
    'A beautiful & handcrafted monitor stand to reduce neck and eye strain.',
  total: 89914,
  backers: 5007,
  bookmarks: true,
  rewards: {
    bamboo: {
      title: 'Bamboo Stand',
      description:
        "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list.",
      pledge: 25,
      remaining: 4,
    },
    black: {
      title: 'Black Edition Stand',
      description:
        'You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included.',
      pledge: 75,
      remaining: 64,
    },
    mahagony: {
      title: 'Mahogany Special Edition',
      description:
        'You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added to our Backer member list. Shipping is included.',
      pledge: 200,
      remaining: 0,
    },
  },
};

let projectArray = {};

//
const getLocalStorage = () => {
  let getLocalStorage = localStorage.getItem('crowdfund');
  if (getLocalStorage == null) {
    localStorage.setItem('crowdfund', JSON.stringify(crowdproject));
  } else {
    projectArray = JSON.parse(localStorage.getItem('crowdfund'));
  }
};
getLocalStorage();

// Read local storage on load & display details information on clients side.
window.onload = () => {
  projectArray = JSON.parse(localStorage.getItem('crowdfund'));
  renderDetails();
};

// RENDER CALL
const renderDetails = () => {
  displaySummary(projectArray.total, projectArray.backers);
  checkBookmark();
  renderRewards();
  renderRewardsQuantityModal();
};

const saveState = () => {
  localStorage.setItem('crowdfund', JSON.stringify(projectArray));
};

//  RENDER SUMMARY SECTION & FORMAT VALUES
const displaySummary = (funds, backers) => {
  const fundsFormatted = new Intl.NumberFormat('en-US').format(funds);
  const backersFormatted = new Intl.NumberFormat('en-US').format(backers);

  totalFunds.innerHTML = `$${fundsFormatted}`;
  totalBacker.innerHTML = `${backersFormatted}`;
  renderProgressBar(funds);
};

// RENDER PROGRESS BAR
const renderProgressBar = currentFunds => {
  if (currentFunds <= 100000) {
    const calculatePercentage = Math.round(
      (100 * currentFunds) / fundsRequired
    );
    progressBar.style.width = `${calculatePercentage}%`;
  } else {
    const message = `<div class="completed">This project achieved its target</div>`;
    progressSection.innerHTML = message;
  }
};

const getValueDonation = () => {
  const value = Number(prompt('Add funds'));
  getValues(value);
};

const addFunds = () => {
  if (noRewardRadio.checked) {
    const noRewardValue = Number(
      document.getElementById('noreward-value').value
    );
    console.log('No Rewards Checked');
    getValues(noRewardValue);
  } else if (bambooRadio.checked) {
    const BambooValue = Number(document.getElementById('bamboo-value').value);
    console.log('Bamboo Checked');
    projectArray.rewards.bamboo.remaining--;
    getValues(BambooValue);
  } else if (blackRadio.checked) {
    const BlackValue = Number(
      document.getElementById('black-edition-value').value
    );
    console.log('Black Edition Checked');
    projectArray.rewards.black.remaining--;
    console.log(BlackValue);
    getValues(BlackValue);
  } else {
    console.log('No reward selected');
  }
  renderRewardsQuantityModal();
};

// Processing donation + adding individual backer
const getValues = inputValue => {
  if (projectArray.total <= 10000000) {
    projectArray.total += inputValue;
    projectArray.backers++;
  } else {
    return;
  }

  saveState();
  displaySummary(projectArray.total, projectArray.backers);
  renderProgressBar(projectArray.total);
  renderRewards();
};

// RENDER BOOKMARK ICON/BUTTON
const renderBookmarks = bookmarksState => {
  const bookmarks = `
  <img onclick="bookmarkProject();" class="bookmark-icon relative right-[-55px] z-50 w-[56px]" src="/assets/icon-bookmark${
    bookmarksState == 'bookmark' ? '' : '-added'
  }.svg" bookmark-icon-status/>

  <div onclick="bookmarkProject();" bookmark-icon-status style="background-color: ${
    bookmarksState == 'bookmark' ? '#F4F4F4' : '#F4F8F9'
  }; color: ${
    bookmarksState == 'bookmark' ? '#2F2F2F' : '#157A74'
  };" class="bookmarks relative flex h-[56px] items-center justify-center rounded-full px-5 pl-[70px] font-bold" bookmark-icon-text>${
    bookmarksState == 'bookmark' ? 'Bookmark' : 'Bookmarked'
  }</div>
    `;

  bookmarkSection.insertAdjacentHTML('afterbegin', bookmarks);
};

// CHECK IF BOOKMARKED
const checkBookmark = () => {
  let bookmarksState;
  if (projectArray.bookmarks === true) {
    bookmarksState = 'bookmarked';
  } else {
    bookmarksState = 'bookmark';
  }
  return renderBookmarks(bookmarksState);
};

// RENDER REWARDS BOXES FROM THE NESTED OBJECT ARRAY
const renderRewards = () => {
  const clear = '';
  rewardContainer.innerHTML = clear;
  const entries = Object.entries(projectArray.rewards);
  for (const [key, { title, description, pledge, remaining }] of entries) {
    const html = `
    <div class="reward-box ${remaining <= 0 ? 'disabled' : ''}">
      <div class="reward-cons">
        <h1>${title}</h1>
        <span class="pledge-span">Pledge $${pledge} or more</span>
    </div>
      <p class="paragraphs">${description}</p>
    <div class="select-reward-section-button">
      <div class="flex items-center justify-between">
        <span class="days-span">${remaining}</span>
        <span class="bg pl-2 pt-1 text-[#9c9c9c]">left</span>
      </div>
      <button class="btn bg-active-button" ${
        remaining <= 0 ? 'disabled ' : ''
      } onclick="openModal()" >Select Reward</button>
    </div>
  </div>
`;
    rewardContainer.insertAdjacentHTML('beforeend', html);
  }
};

// ADDING / REMOVING PROJECT TO / FROM BOOKMARKS
const bookmarkProject = () => {
  const clear = '';
  projectArray.bookmarks = !projectArray.bookmarks;
  saveState();
  bookmarkSection.innerHTML = clear;
  checkBookmark();
};

// RENDERING STOCK ON MODAL & DISABLING RADIO BUTTONS IF STOCK = 0
const renderRewardsQuantityModal = () => {
  if (projectArray.rewards.bamboo.remaining >= 1) {
    document.getElementById('bamboquan').innerHTML =
      projectArray.rewards.bamboo.remaining;
  } else {
    document.getElementById('bamboquan').innerHTML =
      projectArray.rewards.bamboo.remaining;
    document.getElementById('bamboorewardbox').classList.add('disabled');
    document.getElementById('bamboo_stand').classList.add('hidden');
    document.getElementById('bamboo_yes').disabled = true;
  }

  if (projectArray.rewards.black.remaining >= 1) {
    document.getElementById('blackoquan').innerHTML =
      projectArray.rewards.black.remaining;
  } else {
    document.getElementById('blackoquan').innerHTML = 0;
    document.getElementById('blackeditionbox').classList.add('disabled');
    document.getElementById('black_edition').classList.add('hidden');
    document.getElementById('black_edition_yes').disabled = true;
  }
};

//////////////////////////////////////////////////////////////
/*
const properties = Object.keys(crowdproject.rewards.bamboo);
console.log(properties);

for (const values of Object.values(crowdproject.rewards)) {
  console.log(values);
}

var retrievedObject = localStorage.getItem('crowdfund');

console.log('retrievedObject: ', JSON.parse(retrievedObject));
*/
