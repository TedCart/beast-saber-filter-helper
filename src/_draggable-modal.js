import { addCustomModalStyleTag } from "./_styles.js"

export const modalBlockId = "draggable-modal-block"

export const collapsingArrowSvg
  = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="17px" height="17px">
      <g fill="none" fill-rule="evenodd">
        <path d="M3.29175 4.793c-.389.392-.389 1.027 0 1.419l2.939 2.965c.218.215.5.322.779.322s.556-.107.769-.322l2.93-2.955c.388-.392.388-1.027 0-1.419-.389-.392-1.018-.392-1.406 0l-2.298 2.317-2.307-2.327c-.194-.195-.449-.293-.703-.293-.255 0-.51.098-.703.293z" fill="#FFFFFF">
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
  // modalBlock.setAttribute('title', "Click and hold to drag...")

  document.querySelector('body').prepend(modalBlock)

  modalBlock.onmousedown = moveModalContainer
  modalBlock.ondragstart = () => false

  // This function came from https://javascript.info/mouse-drag-and-drop
  function moveModalContainer (event) {

    if (event.target.tagName === "INPUT") return
    if (event.target.tagName === "BUTTON") return
    if (event.target.tagName === "SPAN") return
    if (event.target.tagName === "SECTION") return
    if (event.target.tagName === "LABEL") return
    if (event.target.tagName === "SVG") return
    if (event.target.tagName === "G") return
    if (event.target.tagName === "PATH") return
    // if (event.target.tagName === "LI") return

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

export function createCollapsibleSectionContainer (sectionTitle, idPrefix) {
  const el = getMainModalElement()
  if (!el) return

  const firstAttempt = document.querySelector(`#${idPrefix}-filter-container`)
  if (firstAttempt) return firstAttempt

  function toggleSectionVisibility (ev) {
    ev.preventDefault()
    const containerDiv = document.querySelector(`#${idPrefix}-filter-container`)
    const isOpen = /open/.test(containerDiv.className)

    isOpen
      ? containerDiv.classList.remove('open')
      : containerDiv.classList.add('open')
  } // end toggleSectionVisibility

  const sectionContainerDiv = document.createElement('section')
  sectionContainerDiv.setAttribute('id',`${idPrefix}-filter-container`)
  sectionContainerDiv.setAttribute('class','open')

  const sectionHeaderDiv = document.createElement('section')
  sectionHeaderDiv.setAttribute('class','section-header')
  sectionHeaderDiv.onclick=toggleSectionVisibility

  const toggleArrowDiv = document.createElement('section')
  toggleArrowDiv.setAttribute('class','toggle-arrow')
  toggleArrowDiv.innerHTML = collapsingArrowSvg
  toggleArrowDiv.onclick=toggleSectionVisibility
  sectionHeaderDiv.append(toggleArrowDiv)

  const sectionHeaderText = document.createElement('span')
  sectionHeaderText.setAttribute('class','modal-section-header')
  sectionHeaderText.innerText = sectionTitle
  sectionHeaderDiv.append(sectionHeaderText)

  sectionContainerDiv.append(sectionHeaderDiv)
  el.append(sectionContainerDiv)

  return sectionContainerDiv
} // end createCollapsibleSectionContainer
