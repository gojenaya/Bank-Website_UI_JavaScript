'use strict';

const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');


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

///////////////////////////////////////
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
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

///////////////////////////////////////
//Tabbed Content - Section 2

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  //Guard clause
  if(!clicked) return;

  //Remove tabs and content
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate tab
  clicked.classList.add('operations__tab--active');

  //Activate content
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

///////////////////////////////////////
//Menu Navigation animation
const handleHover = function(e, opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el =>{
      if(el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
//Sticky Navigation

// const section1_coords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function(e){
//   if(window.scrollY > section1_coords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');

// });

//Sticky Navigation using Intersection Obvserver API

const stickyNav = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting)
    nav.classList.add('sticky');
  else
    nav.classList.remove('sticky');
};

const obsOptions = {
  root: null,
  threshold: 0,
};

const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);
