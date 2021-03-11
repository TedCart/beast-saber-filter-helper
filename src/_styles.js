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

    #restore-mapper-button-list {
      max-width: 200px;
    }
    #restore-mapper-button-list button {
      display: block;
      margin: 4px 0 4px 28px;
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
    .modal-section-header {
      display: inline-block;
      cursor: pointer;
      font-size: 1.2em;
    }
    .hide-button {
      margin-bottom:5px;
      /* background: #DDD; */
      /* color:#222; */
      border: 1px solid #777;
      border-radius: 2px;
      padding: 3px;
    }
    .live-button {
      margin-bottom:5px;
      font-weight: 800;
      font-size: 107%;
      border: 1px solid #777;
      border-radius: 3px;
      padding: 3px;
      color: #EEE;
      background: #2762a6;
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
      margin-left: 25px;
    }

    .modal-input-list label {
      display: inline-block;
      margin: 0 0 0 8px;
      font-size: 1em;
    }
    .modal-input-list li { margin: 0; }

    section.section-header {
      display: flex;
    }

    .toggle-arrow {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 25px;
      width:  25px;
      border-radius: 2px;
      margin: 0;
      transition: 300 ms;
      cursor: pointer;
      /* transform: rotate(-90deg); */
      opacity: .8;
    }
    .toggle-arrow:hover {
      opacity: 1;
      background: black;
    }

    .toggle-arrow svg       { transform: rotate(-90deg); transition: 300ms; }
    .open .toggle-arrow svg { transform: rotate(0deg); }

    .modal-input-list {
      opacity: 0;
      display: none;
      visibility: hidden;
      transition: visibility 0s lineaer 0.1s, opacity 0.3s ease;
      padding: 0;
      margin: 0;
    }
    .open .modal-input-list {
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
