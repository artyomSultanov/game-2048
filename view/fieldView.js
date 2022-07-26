class FieldView {
  constructor (fieldBox, scoreBox) {
    this.levelColors = {8: '#66b032', 32: '#d0ea2b', 256: '#fefe33', 1024: '#fabc02', 4096: '#fb9902', 8192: '#fd5308', 16384: '#fe2712'}
    this.fieldBox = fieldBox
    this.scoreBox = scoreBox
  }

  resetField (field, score) {
    this.resetScore(score)
    this.render(field)
  }
  
  resetScore (score) {
    this.scoreBox.innerHTML = score
  }

  endGame (score) {
    const endModal = document.createElement('div')
    endModal.className = 'end-game'
    endModal.innerHTML = `Game over! Your score is ${score}`
    this.fieldBox.appendChild(endModal)
  }


  clear () {
    let child = this.fieldBox.lastElementChild
    while (child) {
      this.fieldBox.removeChild(child)
      child = this.fieldBox.lastElementChild
    }
  }

  render (field) {
    this.clear()
    field.forEach((row) => {
      row.forEach((value) => {
        const square = document.createElement('div')
        square.className = 'square'
        square.innerHTML = value ? value : ''
        square.style.backgroundColor = value && this.levelColors[Math.min(...Object.keys(this.levelColors).filter((key) => key >= value))]
        this.fieldBox.appendChild(square)
      })
    })
  }
}

export default FieldView