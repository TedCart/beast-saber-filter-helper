import { mainBack, mainFront, specialBack, specialFront } from "./colors.js"

export const addCustomStyleTag = () => {
  const newStyle = document.createElement("style")
  newStyle.setAttribute('type', 'text/css')
  // classToColor background, color, padding, margin
  newStyle.innerHTML = `
    body {
      margin-top: 0;
    }

    .post-content > .row.row-fluid {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `
  document.head.appendChild(newStyle)
}

export const addCustomModalStyleTag = () => {
  const newStyle = document.createElement("style")
  newStyle.setAttribute('type', 'text/css')
  // classToColor background, color, padding, margin
  newStyle.innerHTML = `
    .modal-button {
      text-align: center;
      margin:auto;
      display: block;
      min-width: 7em;
      border: 1px solid #777;
      padding: 3px 5px;
      border-radius: 5px;
    }
    .hide-button {
      margin-bottom:5px;
      background: #DDD;
      color:#222;
    }
    .live-button {
      margin-bottom:5px;
      color: #EEE;
      background: blue;
    }
    .modal-input-list-button {
      background: #000;
      color: #DDD;
    }
    #draggable-modal-block {
      position: fixed;
      top: 200px;
      left: 10px;
      padding: 15px 5px;
      min-height: 20px;
      min-width: 20px;
      background: #333333BB;
      color: #DDD;
      z-index: 1000;
      border: solid transparent 1px;
      border-radius: 8px;
      transition: 500ms;
      opacity: .3;
    }
    #draggable-modal-block:hover {
      background: #333333BB;
      transition: 0ms;
      opacity: 1;
    }
    .input-modal-checkbox {
      display:inline-block;
    }

    .modal-input-list {
      opacity: 0;
      display: none;
      visibility: hidden;
      transition: visibility 0s lineaer 0.1s, opacity 0.3s ease;
      padding: 0;
      margin: 0;
    }
    .modal-input-list.open {
      display: block;
      visibility: visible;
      opacity: 1;
      transition-delay: 0s;
    }
    .modal-input-list li {
      display: block;
    }
    .modal-post-count {
      margin-right: 10px;
      display: inline-block;
      min-width: 3em;
      text-align: right;
    }
  `
  document.head.appendChild(newStyle)
}
