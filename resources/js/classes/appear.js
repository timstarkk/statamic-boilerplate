//////////////////////////////
// Appear

class Appear 
{
  constructor() {
    this.appearElems         = document.querySelectorAll('[appear]');
    this.delayedAppearElems  = document.querySelectorAll('[appear-delay]');
    this.groupedAppearElems  = document.querySelectorAll('[appear-group]');
    this.groupInterval       = 200; // Time in ms between animations for grouped animation
    this.viewport            = {};
    this.viewport.offset     = 120; // Amount in px to offset the necessary position to fire animations
    this.viewport.top        = window.scrollY; // Current Scroll Position of Window
    this.viewport.bottom     = this.viewport.top + window.innerHeight; // Current viewport range
  }

  log() {
    console.log( 'Window top: ' + this.viewport.top );
    console.log( 'Window bottom: ' + this.viewport.bottom );
  }
  
  setDelayedElements() {
    this.delayedAppearElems.forEach( (element) => {
      let time = element.getAttribute('appear-delay');
      element.style.transitionDelay =  time + 'ms';
    })
  }

  delayGroupedElements() {
    let groupNameList = []

    // get all group names and add them to the list
    this.groupedAppearElems.forEach( (element) => {
      let groupName = element.getAttribute('appear-group');
      // if the group name isn't already added, add it
      if ( !groupNameList.includes(groupName) ) {
        groupNameList.push(groupName)
      }
    })

    // for each group name, add a transtion delay to each element in that group
    groupNameList.forEach( (groupName) => {
      let elementsGroup = document.querySelectorAll(`[appear-group="${groupName}"]`);
    
      elementsGroup.forEach( (element, index) => {
        element.style.transitionDelay =  this.groupInterval * index + 'ms';
      });
    })
  }

  checkForWithinFirePosition( element ) {
    let elemPosition         = element.getBoundingClientRect().top;
    let firePosition         = this.viewport.top - this.viewport.offset;
    let elemIsInView         = elemPosition < this.viewport.bottom - this.viewport.offset;
    let elemIsInFirePosition = elemPosition >= firePosition || elemPosition < firePosition;

    return elemIsInView && elemIsInFirePosition;
  }

  runAnimation( element ) {
    if ( this.checkForWithinFirePosition( element ) ) {
      element.dataset.state = 'active';
    }
  }

  checkForAnimationTrigger() {
    this.appearElems.forEach( (element) => {
      // if it is not already active, run the animation
      if ( element.dataset.state !== 'active' ) {
        this.runAnimation( element );
      }
    });
  }

  checkScrollPosition(inner, elementPosTop, viewportHeight) {
    const header = document.getElementById("header");
    const menu_button = document.getElementsByClassName("menu-button")[0];
    const menu_button_wrapper = document.getElementById("menu-button-wrapper");
    const trigger = document.getElementById("main").lastElementChild;
    const trigger2 = document.getElementById("main").firstElementChild.nextElementSibling;
    const bottom = trigger.getBoundingClientRect().bottom;
    const top = trigger2.getBoundingClientRect().top;
    const footer = document.getElementById("actual-footer");
    const atBottom = footer.getBoundingClientRect().top < 78;


    // check if at bottom of page.
    if (atBottom) {
      header.classList.add('scrolled');
      header.classList.remove('scrolledWhite');
    } else if (top <= 195) {
      // turns the navbar background white at a point
      // header.classList.add('scrolledWhite');
      header.classList.remove('scrolled');
    } else if (window.scrollY <= 500 && window.scrollY > 250) {
      header.classList.add('scrolled');
      header.classList.remove('scrolledWhite');
    } else {
      header.classList.remove('scrolled');
      header.classList.remove('scrolledWhite');
    };
  

    if(bottom <= window.innerHeight - 300){
      menu_button.classList.add("bottomScrolled");
      menu_button_wrapper.classList.add("bottomScrolled");

    } else {
      menu_button.classList.remove("bottomScrolled");
      menu_button_wrapper.classList.remove("bottomScrolled");
    };

  }

  fadeInMasthead() {
    // let elem = document.getElementById("site-fade-in");

    let bannerText = document.getElementById("banner-heading-group");

    console.dir(bannerText);
    // console.dir(elem);

    // elem.classList.remove("loading-site");
    bannerText.classList.add("site-loaded");
  }

  handleWideImgScroll() {
    // get wide img container
    const container = document.getElementById("wide-img-container");

    // get horizontal scroll
    const scrollPixels = container.scrollLeft;

    // convert horizontal scroll to percentages
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const scrollPercentage = Math.floor(((scrollPixels / maxScrollLeft) * 100).toFixed(2));

    // get % away from top
    const containerPixels = container.getBoundingClientRect().top;
    const topPercentage = 100 - Math.floor(((containerPixels / window.innerHeight) * 100).toFixed(2));


    // convert top % into scroll pixels
    const newScrollPosition = (maxScrollLeft / 100) * topPercentage;

    // console.dir(container);
    // console.log(scrollPixels);
    // console.log(maxScrollLeft);
    // console.log(topPercentage);
    // console.log(newScrollPosition);
    // console.log('enddddddd');
    // set element's new scroll position
    // container.scrollLeft = newScrollPosition;

    container.scroll({
      left: newScrollPosition,
      behavior: 'auto'
    });

    // console.log(container.scrollLeft);
    // container.scrollLeft += 30;
  }

  init() {
    this.setDelayedElements();
    this.delayGroupedElements();
    this.checkForAnimationTrigger();
    this.fadeInMasthead();

    window.addEventListener( 'scroll', () => {
      this.checkForAnimationTrigger();
    //   this.checkScrollPosition();
    //   this.handleWideImgScroll();
    })
    
    window.addEventListener( 'resize', () => {
      this.checkForAnimationTrigger();
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Appear().init();
});