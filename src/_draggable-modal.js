import { addCustomModalStyleTag } from "./_styles.js"

export const modalBlockId = "draggable-modal-block"

export const collapsingArrowSvg
  = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="17px" height="17px">
      <g fill="none" fill-rule="evenodd">
        <path d="M3.29175 4.793c-.389.392-.389 1.027 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955c.388-.392.388-1.027 0-1.419-.389-.392-1.018-.392-1.406 0l-2.298 2.317-2.307-2.327c-.194-.195-.449-.293-.703-.293-.255 0-.51.098-.703.293z" fill="#1a2c5a">
        </path>
      </g>
    </svg>`

export function getMainModalElement () {
  return document.querySelector(`#${modalBlockId}`)
}

export function createModalBlock () {

  addCustomModalStyleTag()
  const modalBlock = document.createElement('div')
  modalBlock.setAttribute('id', modalBlockId)

  document.querySelector('body').prepend(modalBlock)

  modalBlock.onmousedown = moveModalContainer
  modalBlock.ondragstart = () => false

  // This function came from https://javascript.info/mouse-drag-and-drop
  function moveModalContainer (event) {

    if (event.target.tagName === "INPUT") return
    if (event.target.tagName === "BUTTON") return

    // const modalBlock = document.querySelector(`#${modalBlockId}`)
    // if (!modalBlock) return

    const top = document.querySelector('html').scrollTop

    let shiftX = event.clientX - modalBlock.getBoundingClientRect().left;
    let shiftY = event.clientY - modalBlock.getBoundingClientRect().top;
    modalBlock.style.position = 'fixed';
    modalBlock.style.zIndex = 1000;
    document.body.append(modalBlock);

    moveAt(event.pageX, event.pageY);

    // moves the modalBlock at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      modalBlock.style.left = pageX - shiftX + 'px';
      modalBlock.style.top = (pageY - top) - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    // move the modalBlock on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the modalBlock, remove unneeded handlers
    modalBlock.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      modalBlock.onmouseup = null;
    };

  }; // end moveModalContainer

  // return modalBlock
}
