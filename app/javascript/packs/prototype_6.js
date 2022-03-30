import { generateBackground } from '../prototypes/prototype_6/background_generator'
import { generateText } from '../prototypes/prototype_6/text_generator'
import html2canvas from 'html2canvas'

function checkRect() {
  const textWrapper = document.getElementsByClassName('textWrapper')[0]
  const boundingRect = textWrapper.getBoundingClientRect()
  console.log(boundingRect)
}

function generateStory() {
  generateBackground()
    .then(circleTypes)
    .then(generateText)
    .then(checkRect)
}


const particlesQuantity = [5, 6, 7]

// [class-name, min-diameter, max-diameter, min-layer, max-layer]
// prettier-ignore
const circleTypes = [
  ['layer4-01',      200,  400,  2, 4],
  ['layer4-02',      200,  400,  2, 4],
  ['layer4-03',      200,  400,  2, 4],
  ['layer4-04',      200,  400,  2, 4],
  ['layer4-05',      150,  300,  2, 4],
  ['layer4-06',      200,  400,  2, 4],
  ['layer4-07',      500,  800,  1, 2],
  ['layer4-08',      500,  800,  1, 2],
  ['layer4-09',      500,  800,  1, 2],
  ['layer4-10',      200,  400,  2, 4],
  ['layer4-11',      400,  600,  2, 4],
  ['layer4-12',      150,  300,  2, 4],
  ['layer4-13',      200,  400,  2, 4],
  ['layer4-14',      400,  600,  2, 4],
  ['layer4-15',      200,  400,  2, 4],
  ['layer4-16',      300,  500,  2, 4],
  ['layer4-100',     300,  500,  4, 6],
  ['layer4-101',     300,  500,  4, 6],
  ['layer4-102',     300,  500,  4, 6],
  ['layer4-103',     300,  500,  4, 6],
  ['layer4-104',     300,  500,  4, 6],
  ['layer4-105',     300,  500,  4, 6],
  ['layer4-106',     300,  500,  4, 6],
  ['layer4-200',    1000, 1200,  2, 4],
  ['layer4-201',    1000, 1200,  2, 4],
  ['layer4-202',    1000, 1200,  2, 4],
  ['layer4-203',    1000, 1200,  2, 4]
]

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function createCircle(frame) {
  const circleElement = document.createElement('div')
  const circleType = sample(circleTypes)
  circleElement.classList.add('circle')

  const top = getRandomArbitrary(-100, 400)
  const left = getRandomArbitrary(-100, 700)
  const size = getRandomArbitrary(circleType[1], circleType[2])

  circleElement.style.top = [top, 'px'].join('')
  circleElement.style.left = [left, 'px'].join('')
  circleElement.style.width = [size, 'px'].join('')
  circleElement.style.height = [size, 'px'].join('')

  circleElement.style.zIndex = Math.floor(
    getRandomArbitrary(circleType[3], circleType[4])
  )

  circleElement.style.transform = `rotate(${getRandomArbitrary(-15, 15)}deg)`
  circleElement.classList.add(circleType[0])

  frame.appendChild(circleElement)
}

function generateHash() {
  const symbols = ['a', 'b', 'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5]
  let hash = ''

  for (var i = 0; i < 6; i++) {
    hash += sample(symbols)
  }

  return hash
}

function generateImage() {
  return new Promise((resolve, reject) => {
    const container = document.getElementsByClassName('prototype_6')[0]

    html2canvas(container).then((canvas) => {
      canvas.style.position = 'absolute'
      canvas.style.left = '-99999px'
      document.body.appendChild(canvas)

      resolve()
    })
  })
}

function downloadImage() {
  const canvas = document.getElementsByTagName('canvas')[0]
  const imageData = canvas.toDataURL('image/png')

  const link = document.createElement('a')
  link.download = `Day-${generateHash()}.png`
  link.href = imageData
  link.click()
  link.remove()

  canvas.remove()
}


document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementsByClassName('prototype_6')[0]
  const frame = document.createElement('div')
  frame.classList.add('frame')
  container.appendChild(frame)
  generateStory()



  const button = document.createElement('div')
  button.classList.add('downloadButton')
  button.innerText = '✦ СОХРАНИТЬ ✦'
  document.body.appendChild(button)

  button.addEventListener('click', () => {
    generateImage().then(downloadImage)
  })

  for (var i = 0; i < sample(particlesQuantity); i++) {
    createCircle(frame)
  }
})
