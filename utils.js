export const getMatrix = (size) => new Array(size).fill(null).map(() => new Array(size).fill(null))

export const getRandomInt = (max) => Math.floor(Math.random() * max)

export const getEmptyPositions = (field) => {
  const result = []
  field.forEach((row, xIndex) => {
    row.forEach((item, yIndex) => {
      if (!item) {
        result.push({x: xIndex, y: yIndex})
      }
    })
  })

  return result
}

export const handleHorizontalSwipe = (row, size, direction) => {
  const rowValues = direction ? row.filter(Boolean).reverse() : row.filter(Boolean)
  let indexOfLastValue = 0
  for (let i = 1; i < rowValues.length; i++) {
    if (rowValues[indexOfLastValue] === rowValues[i]) {
      rowValues.splice(indexOfLastValue, 1, rowValues[i]*2)
      rowValues.splice(i, 1)
    }
    indexOfLastValue = i
  }
  const result = rowValues.concat(...new Array(size - rowValues.length).fill(null))
  return direction ? result.reverse() : result
}

export const transposeMatrix = (matrix) => {
  const result = []
  for (let i = 0; i < matrix.length; i++) {
    result.push(matrix.reduce((acc, row) => acc.concat(row[i]), []))
  }
  return result
}

export const isEqualMatrix = (before, after) => {
  for (let i = 0; i < before.length; i++) {
    for (let j = 0; j < before.length; j++) {
      if (before[i][j] !== after[i][j]) return true
    }
  }
  return false
}

export const sumMatrixValues = (mat) => {
  return mat.reduce((result, row) => result + row.reduce((acc, value) => acc + Number(value), 0), 0)
}