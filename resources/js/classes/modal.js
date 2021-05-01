//////////////////////////////
// Modal

class Modal
{
  constructor( elementId ) {
    this.id = elementId;
    this.modal = document.getElementById(elementId);
    this.toggleButtons = document.querySelectorAll(`[toggle*="${elementId}"]`);
    this.openButtons = document.querySelectorAll(`[open*="${elementId}"]`);
    this.closeButtons = document.querySelectorAll(`[close*="${elementId}"]`);
    this.allButtonsArray = this.getAllButtonsArray();
    this.isActive = false;
    this.isAnimating = false;
    this.duration = this.modal.dataset.duration ? this.modal.dataset.duration : 300;
  }

  log() {
    console.log( this.getData() );
  }
  
  getData() {
    return {
      id: this.id,
      isActive: this.isActive,
      isAnimating: this.isAnimating,
      duration: this.duration,
    }
  }
  
  getAllButtonsArray() {
    let allButtons = []
    allButtons = allButtons.concat(Array.from(this.toggleButtons))
    allButtons = allButtons.concat(Array.from(this.openButtons))
    allButtons = allButtons.concat(Array.from(this.closeButtons))
    return allButtons
  }
  
  toggleAllButtons( state ) {
    this.allButtonsArray.forEach( (button) => {
      button.dataset.state = state;
    })
  }

  setStateActivating() {
    this.modal.dataset.state = 'activating';
    this.toggleAllButtons( 'activating' );
  }

  setStateActive() {
    this.modal.dataset.state = 'active';
    this.toggleAllButtons( 'active' );
  }

  setStateDeactivating() {
    this.modal.dataset.state = 'deactivating';
    this.toggleAllButtons( 'deactivating' );
  }

  setStateInactive() {
    this.modal.dataset.state = 'inactive';
    this.toggleAllButtons( 'inactive' );
  }
  
  modalIsActive() {
    this.isActive = true;
    document.body.classList.add('scroll-lock');
    document.getElementsByTagName( 'html' )[0].classList.add('scroll-lock');
  }

  modalIsInactive() {
    this.isActive = false;
    document.body.classList.remove('scroll-lock');
    document.getElementsByTagName( 'html' )[0].classList.remove('scroll-lock');;
  }
  
  activate() {
    this.setStateActivating();
    this.modalIsActive();
    this.handleMenuAnimation(1);
    document.getElementById('menu');
    

    setTimeout( () => {
      this.setStateActive();
    }, this.duration);
  }
  
  deactivate() {
    this.setStateDeactivating();
    this.handleMenuAnimation(0);
    
    setTimeout( () => {
      this.setStateInactive();
      this.modalIsInactive();
    }, this.duration);
  }
  
  buttonAction( button, action ) {
    button.addEventListener("click", ( event ) => {
      event.preventDefault();

      // if there is a current animation stop
      if ( this.isAnimating ) {
        return;
      }
      this.isAnimating = true;
      
      action();

      // what happens after animation
      setTimeout(() => {
        // turn off the animation check
        this.isAnimating = false;
      }, this.duration);
    });
  }
  
  roughScale(num) {
    const parsed = parseInt(num, 10);
    if (isNaN(parsed)) { return 0; }
    return parsed;
  }

  handleMenuAnimation(opening) {
    let menu = document.getElementById('menu');

    if (opening) {
      console.log('open');
      menu.classList.add('open-menu');
    } else {
      console.log('closing');
      menu.classList.remove('open-menu');
    }
  }

  init() {
    if ( this.modal.hasAttribute('active') ) {
      let time = this.roughScale(this.modal.getAttribute('active'))
      this.modal.removeAttribute('active');
      
      if ( time > 0 ) {
        this.setStateInactive();

        setTimeout(() => {
          this.activate();
        }, time * 1000 );
      } else {
        this.setStateActive();
        this.modalIsActive();
      }
    } else {
      this.setStateInactive();
    }

    this.toggleButtons.forEach( (button) => {
      this.buttonAction( button, () => {
        !this.isActive ? this.activate() : this.deactivate()
      })
    });
    
    this.openButtons.forEach( (button) => {
      this.buttonAction( button, () => {
        !this.isActive ? this.activate() : null
      })
    });
    
    this.closeButtons.forEach( (button) => {
      this.buttonAction( button, () => {
        this.isActive ? this.deactivate() : null
      })
    });
  }
}

const initializeModal = () => {
  document.querySelectorAll('.js--modal').forEach( element => {
    if ( !element.id ) {
      console.log("Modal element needs ID to reference")
    } else {
      new Modal( element.id ).init();
    }
  });
}

document.addEventListener('DOMContentLoaded', initializeModal, false);
