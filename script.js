'use strict';

const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');


///////////////////////////////////////
// Modal window


const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function (e) {
  e.preventDefault();

  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Smooth Scrolling
btnScrollTo.addEventListener('click', function(e){
  section1.scrollIntoView({behavior: 'smooth'});
})

//Section Navigation

// document.querySelectorAll('.nav__link').forEach(
//   function(el){
//     el.addEventListener('click', function(e){
//       e.preventDefault();

//       const id = this.getAttribute('href');
//       document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//     })
//   }
// )

//Event Delegation for Section Navigation

document.querySelector('.nav__links').addEventListener('click',
function(e){
  e.preventDefault();
  console.log(e.target);
  if(e.target.classList.contains('nav__link')){
    console.log('LINK');
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});