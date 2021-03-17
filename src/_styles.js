// import { mainBack, mainFront, specialBack, specialFront } from "./colors.js"

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
