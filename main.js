// import * as foo from './src/foo.js'
import  { addCustomStyleTag }         from './src/_styles.js'
import  { elementScrollJump }         from './src/_wasd-scroll.js'
import  { modalBlockId
        , getMainModalElement
        , createModalBlock
        , createCollapsibleSectionContainer
        } from './src/_draggable-modal.js'

import { selectors }          from './src/selectors.js'

// console.log('Doing all the stuff!')

const noDisplayString = "display:none;"

const hideButtonAttributes
  = { specialId: "hide-posts-special-button"
    , hideLabel: "Deactivate Filters"
    , showLabel: "Activate Filters"
    }

// Options: (provide checkbox for each)
// - Hide duplicate songs by same mapper
// - Hide songs by any mapper you choose
// - Hide songs without selected difficulty
// - Hide songs with less than x upvotes (user input)

const elementSelector
  = { mapperName:             selectors.singlePost
    , mapperParentNodeCount:  selectors.parentNodeCount
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

const hideMapperButtonAttributes
  = { specialId: "hide-mapper-button"
    , label: "Hide<br>Mapper"
    }

addCustomStyleTag()
createModalBlock()
createHideButton()
createDifficultyCheckboxes(diffSelector)
createRestoreMapperButtons(getHiddenMappers())
const bod = document.querySelector('body')
bod.addEventListener("keydown", elementScrollJump)


setTimeout(
  () => {
    console.log('Running the setTimeout function!')
    putMutationObserverOnMainElement(bod, hidePosts)
    hidePosts()
    // hideMappers()
  }
, 2000)

// ===========================================================================
// Begin support functions
// Nothing invoked beneath this point
// ===========================================================================

function getHiddenMappers() {
  const rawJSON = localStorage.getItem('hiddenMappers') || '[]'
  return JSON.parse(rawJSON)
}

function getRequiredDifficulties() {
  const rawJSON = localStorage.getItem('requiredDifficulties') || '[]'
  return JSON.parse(rawJSON)
}

function hasRequiredDifficulty (el, key) {
  return !!el.querySelector(diffSelector[key])
}

function getHideStatus() {
  const rawJSON = localStorage.getItem('isHidingPosts') || 'false'
  return JSON.parse(rawJSON)
}

function updateRequiredDifficulties () {
  const inputList = document.querySelectorAll('.modal-input-list.difficulties .input-modal-checkbox')
  if (!inputList) return
  const curRequiredDifficulties = []
  for (let i = 0; i < inputList.length; i++) {
    const curInput = inputList[i]
    if (curInput.checked) curRequiredDifficulties.push(curInput.id.replace(/^modal-checkbox-/, ''))
  } // end for loop
  localStorage.setItem('requiredDifficulties'
                      , JSON.stringify(curRequiredDifficulties)
                      )

  return curRequiredDifficulties
} // end updateRequiredDifficulties

function putMutationObserverOnMainElement (el, callback) {
  // select the target node (USER count tab)
  let mainElementTarget = document.querySelector(elementSelector.mapperName)
  for (let i = 0; i < (elementSelector.mapperParentNodeCount + 1); i++)
    mainElementTarget = mainElementTarget.parentNode

  // configuration of the observer:
  const mainElementConfig = { childList: true }

  // create an observer instance
  const mainElementObserver
    = new MutationObserver(callback) // end MutationObserver

  // pass in the target node, as well as the observer options
  mainElementObserver.observe(mainElementTarget, mainElementConfig)
} // end putMutationObserverOnMainElement

function hidePosts () {
  const postElements = document.querySelectorAll(selectors.singlePost)
  if (!postElements) return

  const hideBadPosts = getHideStatus()

  console.log(`${hideBadPosts ? 'Hiding' : 'Revealing'} those posts...`)

  createHideButton()
  updateRequiredDifficulties()

  const counts
    = { hiddenMappers: {}
      , songList: []
      }
  getHiddenMappers().forEach(e => counts.hiddenMappers[e] = 0)

  postElements.forEach((el, curIndex) => {
    let targetEl = el
    for (let i = 0; i < selectors.parentNodeCount; i++) {
      targetEl = targetEl.parentNode
    } // end for loop
    counts.curIndex = curIndex
    const isHidden = !isValidElement(targetEl, counts)
    if (isHidden && hideBadPosts) {
      targetEl.style = noDisplayString
    } else {
      targetEl.style = ""
      // (targetEl.style || '').replace("display:none;", "")
    }
  }) // end postElements forEach

  // updatePostCounts(counts.hiddenMappers)
  createHideMapperButtons()
  createRestoreMapperButtons(getHiddenMappers(), counts.hiddenMappers)
} // end hidePosts function

function createHideFunction() {
  return () => {
    localStorage.setItem('isHidingPosts', JSON.stringify(!getHideStatus()));
    hidePosts()
  } // end callback function
} // end createHideFunction

function isValidElement (el, counts) {
  const mapperNameEl  = el.querySelector(selectors.singlePost)
  const curMapperName
    = mapperNameEl
      ? mapperNameEl.innerText.trim()
      : 'NO MAPPER NAME'

  // return FALSE for duplicates
  const entryTitleEl = el.querySelector('.entry-title')
  const curSongName
    = entryTitleEl
      ? entryTitleEl.innerText.trim()
      : 'NO SONG TITLE'
  const curSongByMapper = `${curSongName} by mapper ${curMapperName}`
  counts.songList.push(curSongByMapper)
  if (counts.songList.indexOf(curSongByMapper) !== counts.curIndex) {
    // console.log(`Hiding duplicate map: ${curSongByMapper}`)
    return false
  }

  // return FALSE for a hidden mapper (and adjust their count)
  if (getHiddenMappers().indexOf(curMapperName) !== -1) {
    counts.hiddenMappers[curMapperName]++
    // console.log(`Hiding map by ${curMapperName}...`)
    return false
  }

  // return FALSE for missing required difficulty
  const requiredDifficulties = getRequiredDifficulties()
  if (requiredDifficulties.length > 0 && requiredDifficulties.every(diff => !hasRequiredDifficulty(el, diff))) {
    // console.log(`Hiding "${curSongByMapper}"`)
    // console.log(`Hiding song with missing difficulties: ${curSongByMapper}`)
    return false
  }

  return true
} // end of isValidElement

function createHideButton () {
  const buttonContainerElement = getMainModalElement()
  if (!buttonContainerElement) {
    console.log('well shit')
    return
  }

  let hideButtonElement = buttonContainerElement.querySelector(`#${hideButtonAttributes.specialId}`)
  const buttonJustCreated = !hideButtonElement

  if (!hideButtonElement) {
    console.log("creating hide button...")
    hideButtonElement     = document.createElement('button')
    hideButtonElement.id  = hideButtonAttributes.specialId
    hideButtonElement.addEventListener('click', createHideFunction())
  }

  hideButtonElement.innerText
    = getHideStatus()
      ? hideButtonAttributes.hideLabel
      : hideButtonAttributes.showLabel
  hideButtonElement.className
    = getHideStatus()
      ? 'modal-button hide-button'
      : 'modal-button live-button'

  if (buttonJustCreated) buttonContainerElement.prepend(hideButtonElement)

} // end createHideButton


function createDifficultyCheckboxes (difficultyList) {
  const difficultyContainerDiv = createCollapsibleSectionContainer("Required Difficulties", "difficulty")

  const inputListContainer = document.createElement('ul')
  inputListContainer.setAttribute('class','modal-input-list difficulties')
  inputListContainer.onclick="event.stopPropagation()"
  inputListContainer.onmousedown="event.stopPropagation()"

  const requiredDifficulties = getRequiredDifficulties()

  for (const key in difficultyList) {
    const newListItem = document.createElement('li')

    // const newCount = document.createElement('span')
    // newCount.setAttribute('class',`modal-post-count`)
    // newCount.setAttribute('id',`post-count-${key}`)
    // newCount.innerText = "0"

    const newInput = document.createElement('input')
    newInput.setAttribute('class',`input-modal-checkbox`)
    newInput.setAttribute('id',`modal-checkbox-${key}`)
    newInput.setAttribute('type',`checkbox`)
    // newInput.setAttribute('data-diff-selector',`${difficultyList[key]}`)
    newInput.oninput = function(e) {
      this.setAttribute('value', newInput.checked)
    }

    if (requiredDifficulties.indexOf(key) !== -1) newInput.checked = true

    const newLabel = document.createElement('label')
    newLabel.innerText = key
    // newListItem.append(newCount)
    newListItem.append(newInput)
    newListItem.append(newLabel)
    inputListContainer.append(newListItem)
  } // end for loop

  putMutationObserverOnInputList(inputListContainer, hidePosts)
  difficultyContainerDiv.append(inputListContainer)
} // end createDifficultyCheckboxes

function putMutationObserverOnInputList (el, callback) {
  let inputEl = el
  if (!inputEl) return

  // configuration of the observer:
  const inputElConfig
    = { attributes: true
      , characterData: true
      , subtree: true
      }

  // create an observer instance
  const mainElementObserver
    = new MutationObserver(callback) // end MutationObserver

  // pass in the target node, as well as the observer options
  mainElementObserver.observe(inputEl, inputElConfig)
} // end putMutationObserverOnInputList

function createHideMapperButtons () {
  const mapperElements = document.querySelectorAll(selectors.singlePost)
  mapperElements.forEach(el => {
    const buttonContainerDiv = el.parentNode
    // If you already have the button, just stop
    if (buttonContainerDiv.querySelector(`#${hideMapperButtonAttributes.specialId}`)) return

    const mapperName = el.innerText.trim()

    const newButton     = document.createElement('button')
    newButton.id        = hideMapperButtonAttributes.specialId
    newButton.innerHTML = hideMapperButtonAttributes.label
    newButton.className = 'hide-button'
    newButton.addEventListener('click', createHideMapperFunction(mapperName))

    buttonContainerDiv.prepend(newButton)
  }) // end mapperElements forEach
} // end createHideMapperButtons

function createHideMapperFunction(mapperName) {
  return () => {
    const hiddenMappers = getHiddenMappers()
    if (hiddenMappers.indexOf(mapperName) === -1) {
      hiddenMappers.push(mapperName)
      localStorage.setItem('hiddenMappers', JSON.stringify(hiddenMappers));
    } // end if mapperName
    hidePosts()
  } // end callback function
} // end createHideMapperFunction

function createRestoreMapperButtons (hiddenMappers, counts={}) {

  const restoreMapperContainerDiv = createCollapsibleSectionContainer("Restore Mappers", "restore-mapper")

  let listContainerDiv = document.querySelector(`#restore-mapper-button-list`)
  if (!listContainerDiv) {
    listContainerDiv    = document.createElement('section')
    listContainerDiv.id = `restore-mapper-button-list`
    listContainerDiv.className  = 'modal-input-list'
    restoreMapperContainerDiv.append(listContainerDiv)
  }

  // const noHiddenMappersMessage = "No mappers are hidden"
  // // const noHiddenMappersStyle = "margin-left: 25px; font-style: italic;"
  // if (hiddenMappers && hiddenMappers.length === 0) {
  //   listContainerDiv.innerHTML = noHiddenMappersMessage
  //   // listContainerDiv.style = noHiddenMappersStyle
  // } else {
  //   listContainerDiv.innerHTML = listContainerDiv.innerHTML.replace(noHiddenMappersMessage, '')
  //   // listContainerDiv.style = listContainerDiv.style.replace(noHiddenMappersStyle, '')
  // }

  hiddenMappers.forEach(mapperName => {
    const specialButtonId = `restore-mapper-${mapperName.replace(/[^0-9a-zA-Z]/g,'')}`
    // don't make the same button twice
    if (listContainerDiv.querySelector(`#${specialButtonId}`)) return

    const newRestoreButton      = document.createElement('button')
    newRestoreButton.id         = specialButtonId
    // newRestoreButton.innerText  = `${counts[mapperName] || 0} - ${mapperName}`
    newRestoreButton.innerText  = mapperName
    newRestoreButton.className  = 'hide-button'
    newRestoreButton.addEventListener('click', createRestoreFunction(mapperName, specialButtonId))

    listContainerDiv.append(newRestoreButton)
  }) // end hiddenMappers forEach

} // end createRestoreMapperButtons

function createRestoreFunction(mapperName, specialButtonId) {
  return () => {
    const hiddenMappers = getHiddenMappers()
    const mapperIndex = hiddenMappers.indexOf(mapperName)
    if (mapperIndex !== -1) {
      hiddenMappers.splice(mapperIndex, 1)
      localStorage.setItem('hiddenMappers', JSON.stringify(hiddenMappers));
    } // end if mapperName
    const restoreMapperButton = document.querySelector(`#${specialButtonId}`)
    if (restoreMapperButton) restoreMapperButton.remove()
    hidePosts()
  } // end callback function
} // end createRestoreFunction
