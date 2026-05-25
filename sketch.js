
let immagineA
let immagineB
function preload() {
	immagineA = loadImage("foglie.jpg")
	immagineB = loadImage("gatto.jpg")
}

function setup() {
	createCanvas(400, 400)
	immagineA.loadPixels()
	immagineB.loadPixels()

}
function draw() {
	background(0)

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < height; x++) {
			const col = pixel(immagineB, x, y)

      const r = pow (col.r,  7/5)
      const g = col.g
      const b = pow (col.b, 255+ 8/5)


			set(x, y, color(r, g, b))
		}
	}
	updatePixels()
}

function pixel(imm, x, y) {
	if (x < 0 || x >= imm.width || y < 0 || y >= imm.height) return { r:0, g: 0, b: 0, a: 0}
	const i = (x + y * imm.width) * 4
	const r = imm.pixels[i + 0]
	const g = imm.pixels[i + 1]
	const b = imm.pixels[i + 2]
	const a = imm.pixels[i + 3]
	return {r, g, b, a}
}
