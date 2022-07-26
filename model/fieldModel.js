import { getEmptyPositions, getMatrix, getRandomInt, handleHorizontalSwipe, isEqualMatrix, sumMatrixValues, transposeMatrix } from "../utils.js";

class FieldModel {
  constructor () {
    this.size = 4
    this.randomValues = [2, 4]
    this.gameLogs = {step: 0, score: 0, history: []}
    this.field = getMatrix(this.size)
    this.emptyPositions = getEmptyPositions(this.field)
    this.addRandomValue()
    this.addRandomValue()
  }

  addRandomValue () { // 4
    const randomIndex = getRandomInt(this.emptyPositions.length)
    const {x, y} = this.emptyPositions[randomIndex]

    this.field[x][y] = this.randomValues[getRandomInt(this.randomValues.length)]
    
    this.emptyPositions.splice(randomIndex, 1)
    this.gameLogs.step++
    this.gameLogs.score = sumMatrixValues(this.field)
    this.gameLogs.history.push(this.field)
  }
  
  swipeLeft () {
    const fieldBeforeSwipe = this.field.slice() //JSON.parse(JSON.stringify(this.field))
    
    this.field = this.field.map((row) => handleHorizontalSwipe(row, this.size, false))

    this.emptyPositions = getEmptyPositions(this.field)
    isEqualMatrix(fieldBeforeSwipe, this.field) && this.addRandomValue()
  }

  swipeRight () {
    const fieldBeforeSwipe = this.field.slice() //JSON.parse(JSON.stringify(this.field))

    this.field = this.field.map((row) => handleHorizontalSwipe(row, this.size, true))
    
    this.emptyPositions = getEmptyPositions(this.field)
    isEqualMatrix(fieldBeforeSwipe, this.field) && this.addRandomValue()
  }
  
  swipeDown () {
    const fieldBeforeSwipe = this.field.slice() //JSON.parse(JSON.stringify(this.field))
    
    this.field = transposeMatrix(this.field)
    this.field = this.field.map((row) => handleHorizontalSwipe(row, this.size, true))
    this.field = transposeMatrix(this.field)

    this.emptyPositions = getEmptyPositions(this.field)
    isEqualMatrix(fieldBeforeSwipe, this.field) && this.addRandomValue()
  }
  
  swipeUp () {
    const fieldBeforeSwipe = this.field.slice() //JSON.parse(JSON.stringify(this.field))

    this.field = transposeMatrix(this.field)
    this.field = this.field.map((row) => handleHorizontalSwipe(row, this.size, false))
    this.field = transposeMatrix(this.field)
    
    this.emptyPositions = getEmptyPositions(this.field)
    isEqualMatrix(fieldBeforeSwipe, this.field) && this.addRandomValue()
  }

  stepBack () {
    if (this.gameLogs.history.length > 1)
      this.gameLogs.history.pop() 
      this.field = this.gameLogs.history.at(-1)
      this.emptyPositions = getEmptyPositions(this.field)
      this.gameLogs.score = sumMatrixValues(this.field)
    this.gameLogs.step--
  }

  validateField () {
    if (this.field.find((row) => row.includes(null))) return false
    for (let i = 0; i < this.size; i++) {
      for (let j = 1; j < this.size; j++) {
        if (this.field[i][j] === this.field[i][j-1] || this.field[j][i] === this.field[j-1][i]) return false
      }
    }
    // save score
    return true
  }
}

export default FieldModel



/*
1-> gen field
2-> swipe
3-> sum same numbers
3.1-> update empty positions
4-> add random value
4.1-> update empty positions
5-> add step, score and history
6-> validate field
6.1-> if 6 true: save score
7-> 
*/