import FieldView from "../view/fieldView.js"
import FieldModel from "../model/fieldModel.js"

const fieldBox = document.getElementById('field')
const scoreBox = document.getElementById('score')

const backButton = document.getElementById('back-button') 
const resetButton = document.getElementById('reset-button') 

let currentFieldModel = new FieldModel()
const currentFieldView = new FieldView(fieldBox, scoreBox)

document.addEventListener("DOMContentLoaded", () => currentFieldView.resetField(currentFieldModel.field, currentFieldModel.gameLogs.score))

window.addEventListener('keydown', (e) => {
  const handleArrows = {
    'ArrowLeft': currentFieldModel.swipeLeft.bind(currentFieldModel),
    'ArrowUp': currentFieldModel.swipeUp.bind(currentFieldModel),
    'ArrowDown': currentFieldModel.swipeDown.bind(currentFieldModel),
    'ArrowRight': currentFieldModel.swipeRight.bind(currentFieldModel)
  }
  handleArrows[e.key] && handleArrows[e.key]()
  if (currentFieldModel.validateField()) {
    return currentFieldView.endGame(currentFieldModel.gameLogs.score)
  }
  currentFieldView.resetField(currentFieldModel.field, currentFieldModel.gameLogs.score)
})

resetButton.addEventListener('click', () => {
  currentFieldModel = new FieldModel()
  currentFieldView.resetField(currentFieldModel.field, currentFieldModel.gameLogs.score)
})

backButton.addEventListener('click', () => {
  currentFieldModel.stepBack()
  currentFieldView.resetField(currentFieldModel.field, currentFieldModel.gameLogs.score)
})