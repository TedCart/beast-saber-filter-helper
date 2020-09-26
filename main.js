import * as foo from './src/foo.js'
// import { chaturbateClean } from './src/original.js'
// import { addCustomStyleTag } from './src/styles.js'
// import { miscellaneousLooseEnds } from './src/extra.js'

const noDisplayString = "display:none;"

const elementSelector
  = { mapperName:     '.mapper_id.vcard'
    , mapperParentNodeCount: 5
    , postContent:    '.post-content'
    , restoreContainerId: 'restore-mappers-container'
    , difficultyContainerId: 'difficulty-selector-container'
    }

const diffSelector
  = { easy:           'a.post-difficulty[href="/songs/?difficulty=easy"]'
    , normal:         'a.post-difficulty[href="/songs/?difficulty=normal"]'
    , hard:           'a.post-difficulty[href="/songs/?difficulty=hard"]'
    , expert:         'a.post-difficulty[href="/songs/?difficulty=expert"]'
    , expertPlus:     'a.post-difficulty[href="/songs/?difficulty=expert-plus"]'
    }


const hideButtonAttributes
  = { specialId: "hide-mapper-button"
    , label: "Hide Mapper"
    }

setTimeout(
  () => {
    console.log('Running the setTimeout function!')
    document.querySelector('head').innerHTML
      += `<style>
            .hide-button {
              border: 1px solid #777;
              border-radius: 3px;
              padding: 3px;
              margin-right: 10px;
              display: inline-block;
            }
            .live-button {
              border: 1px solid #777;
              border-radius: 3px;
              padding: 3px;
              margin-right: 10px;
              display: inline-block;
              color: #EEE;
              background: #137bf6;
            }
          </style>`
    putMutationObserverOnMainElement()
    hideMappers()
  }
, 2000)

// Begin support functions
// Nothing invoked beneath this point

function getHiddenMappers() {
  const rawJSON = localStorage.getItem('hiddenMappers') || '[]'
  return JSON.parse(rawJSON)
}

function getRequiredDifficulties() {
  const rawJSON = localStorage.getItem('requiredDifficulties') || '[]'
  return JSON.parse(rawJSON)
}

function hideMappers () {
  console.log('Hiding those mappers...')
  const hiddenMappers = getHiddenMappers()
  const requiredDifficulties = getRequiredDifficulties()
  const mapperElements = document.querySelectorAll(elementSelector.mapperName)
  // document.querySelectorAll(elementSelector.mapperName)

  mapperElements.forEach(el => {
    let targetEl = el
    for (let i = 0; i < elementSelector.mapperParentNodeCount; i++) {
      targetEl = targetEl.parentNode
    } // end for loop

    const isHidden
      = (   hiddenMappers.indexOf(el.innerText.trim()) !== -1
        || !(  requiredDifficulties.length === 0
            ||  (     requiredDifficulties.length > 0
                  &&  requiredDifficulties.some(diff => hasRequiredDifficulty(targetEl, diff))
                )
            )
        )

    if (isHidden) {
      targetEl.style = noDisplayString
    } else {
      targetEl.style = ""
      // (targetEl.style || '').replace("display:none;", "")
    }
  }) // end mapperElements forEach

  createHideButtons()
  createRestoreMapperButtons(hiddenMappers)
  createRequiredDifficultyButtons()

} // end hideMappers function

function createHideButtons () {
  const mapperElements = document.querySelectorAll(elementSelector.mapperName)
  mapperElements.forEach(el => {
    const buttonContainerDiv = el.parentNode
    // If you already have the button, just stop
    if (buttonContainerDiv.querySelector(`#${hideButtonAttributes.specialId}`)) return

    const mapperName = el.innerText.trim()

    const newButton     = document.createElement('button')
    newButton.id        = hideButtonAttributes.specialId
    newButton.innerText = hideButtonAttributes.label
    newButton.className = 'hide-button'
    newButton.addEventListener('click', createHideFunction(mapperName))

    buttonContainerDiv.prepend(newButton)

  }) // end mapperElements forEach
} // end createHideButtons

function createRestoreMapperButtons (hiddenMappers) {
  let restoreContainerDiv
  const postContentDiv = document.querySelector(elementSelector.postContent)
  // create restoreContainerDiv when it doesn't exist yet
  if (!postContentDiv.querySelector(`#${elementSelector.restoreContainerId}`)) {
    restoreContainerDiv     = document.createElement('div')
    restoreContainerDiv.id  = elementSelector.restoreContainerId
    postContentDiv.prepend(restoreContainerDiv)
  } // end create restoreContainerDiv
  restoreContainerDiv = postContentDiv.querySelector(`#${elementSelector.restoreContainerId}`)
  restoreContainerDiv.innerHTML
    = "<p style=\"display: inline-block; font-weight: 800; font-size: 1.4em;\">Click to restore each mapper's songs:</p>"

  hiddenMappers.forEach(mapperName => {
    const specialButtonId = `restore-mapper-${mapperName.replace(/[^0-9a-zA-Z]/g,'')}`
    // don't make the same button twice
    if (restoreContainerDiv.querySelector(`#${specialButtonId}`)) return

    const newRestoreButton      = document.createElement('button')
    newRestoreButton.id         = specialButtonId
    newRestoreButton.innerText  = mapperName
    newRestoreButton.className  = 'hide-button'
    newRestoreButton.addEventListener('click', createRestoreFunction(mapperName))

    restoreContainerDiv.append(newRestoreButton)
  }) // end hiddenMappers forEach
} // end createRestoreMapperButtons

function createHideFunction(mapperName) {
  return () => {
    const hiddenMappers = getHiddenMappers()
    if (hiddenMappers.indexOf(mapperName) === -1) {
      hiddenMappers.push(mapperName)
      localStorage.setItem('hiddenMappers', JSON.stringify(hiddenMappers));
    } // end if mapperName
    hideMappers()
  } // end callback function
} // end createHideFunction

function createRestoreFunction(mapperName) {
  return () => {
    const hiddenMappers = getHiddenMappers()
    const mapperIndex = hiddenMappers.indexOf(mapperName)
    if (mapperIndex !== -1) {
      hiddenMappers.splice(mapperIndex, 1)
      localStorage.setItem('hiddenMappers', JSON.stringify(hiddenMappers));
    } // end if mapperName
    hideMappers()
  } // end callback function
} // end createRestoreFunction

function putMutationObserverOnMainElement () {
  // select the target node (USER count tab)
  let mainElementTarget = document.querySelector(elementSelector.mapperName)
  for (let i = 0; i < (elementSelector.mapperParentNodeCount + 1); i++)
    mainElementTarget = mainElementTarget.parentNode

  // configuration of the observer:
  const mainElementConfig = { childList: true }

  // create an observer instance
  const mainElementObserver
    = new MutationObserver(mutations => {
        hideMappers()
        // mutations.forEach(mutation => {
        //   console.log(JSON.stringify(mutation, null, 2))
        // })
      }) // end MutationObserver

  // pass in the target node, as well as the observer options
  mainElementObserver.observe(mainElementTarget, mainElementConfig)
} // end putMutationObserverOnMainElement

// 'a.post-difficulty[href="/songs/?difficulty=expert-plus"]'

function hasRequiredDifficulty (el, difficultySelector) {
  return !!el.querySelector(difficultySelector)
}

function createRequiredDifficultyButtons () {
  let difficultySelectorDiv
  const postContentDiv = document.querySelector(elementSelector.postContent)
  if (!postContentDiv.querySelector(`#${elementSelector.difficultyContainerId}`)) {
    difficultySelectorDiv     = document.createElement('div')
    difficultySelectorDiv.id  = elementSelector.difficultyContainerId
    difficultySelectorDiv.innerHTML
      = "<p style=\"display: inline-block; font-weight: 800; font-size: 1.4em;\">Click to require difficulty:</p>"
    postContentDiv.prepend(difficultySelectorDiv)
  } // end create difficultySelectorDiv
  difficultySelectorDiv = postContentDiv.querySelector(`#${elementSelector.difficultyContainerId}`)
  const requiredDifficulties = getRequiredDifficulties()

  for (const key in diffSelector) {

    const isRequired = requiredDifficulties.indexOf(diffSelector[key]) !== -1

    const specialButtonId = `toggle-difficulty-${key}`
    // don't make the same button twice
    let newDifficultyButton = difficultySelectorDiv.querySelector(`#${specialButtonId}`)
    if (!newDifficultyButton) {
      newDifficultyButton             = document.createElement('button')
      newDifficultyButton.id          = specialButtonId
      newDifficultyButton.innerText   = key
      newDifficultyButton.className   = isRequired ? 'live-button' : 'hide-button'
      newDifficultyButton.addEventListener('click', createDifficultyFunction(diffSelector[key]))

      difficultySelectorDiv.append(newDifficultyButton)
    } else {
      newDifficultyButton.className   = isRequired ? 'live-button' : 'hide-button'
    }
  } // end for loop
} // end createRestoreMapperButtons

function createDifficultyFunction(difficultySelector) {
  return () => {
    const requiredDifficulties = getRequiredDifficulties()
    const index = requiredDifficulties.indexOf(difficultySelector)
    if (index === -1) {
      requiredDifficulties.push(difficultySelector)
    } else {
      requiredDifficulties.splice(index, 1)
    }// end if mapperName
    localStorage.setItem('requiredDifficulties', JSON.stringify(requiredDifficulties));
    hideMappers()
  } // end callback function
} // end createHideFunction
