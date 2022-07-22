document.addEventListener('DOMContentLoaded', init)

let bLog = false

function bindMouse() {
	document.getElementById("svg_0").addEventListener("mousemove", function (e) {

		let point = this.createSVGPoint()
		// point.x = e.screenX
		// point.y = e.screenY
		point.x = e.clientX
		point.y = e.clientY

		let p = point.matrixTransform(this.getScreenCTM().inverse())
		if (bLog) {
			console.log(p.x, p.y)
		}
	})
}



function init () {
	bindMouse()

	const path = document.getElementById('path')
	const boat = document.getElementById('boat')

	const path2 = document.getElementById('path2')
	const boat2 = document.getElementById('boat2')

	const path3 = document.getElementById('path3')
	const boat3 = document.getElementById('boat3')

	const path4 = document.getElementById('path4')
	const boat4 = document.getElementById('boat4')

	animatePath({
		path,
		boat,
		text: 'Nhà đầu tư cá nhân',
		duration: 2000
	})

	animatePath({
		path: path2,
		boat: boat2,
		text: 'Nhà đầu tư cá nhân',
		duration: 2000
	})

	animatePath({
		path: path3,
		boat: boat3,
		text: 'Nhà đầu tư cá nhân',
		duration: 2000
	})

	animatePath({
		path: path4,
		boat: boat4,
		text: 'Nhà đầu tư cá nhân',
		duration: 2000
	})
}
// (232 244 412 260)


function animatePath({path, boat, duration, text}) {
	let start = 0
	let ticking = false

	const pathLength = path.getTotalLength()

	function animate(timestamp) {
		if (ticking) return

		if (!start) start = timestamp
		ticking = true

		// length đi hết trong duration

		const currentTime = timestamp - start
		// const { x, y } = path.getPointAtLength(currentTime / duration * length)
		// const { x: x2, y: y2 } = path.getPointAtLength(currentTime / duration * (length + 10))
		// const { x, y } = path.getPointAtLength(currentTime * ratio)
		const { x: x2, y: y2 } = path.getPointAtLength(currentTime / duration * pathLength)
		const { x, y } = path.getPointAtLength((currentTime+10) / duration * pathLength)


		const angle = Math.atan2(y - y2, x - x2)
		// boat.setAttribute('transform', `translate(${x2} ${y2})`)
		boat.setAttribute('transform', `translate(${x2} ${y2}) rotate(${angle * 180 / Math.PI})`)

		if (currentTime > duration) {
			start = null
			return setTimeout(() => {
				ticking = false
				requestAnimationFrame(animate)
			}, 100)
		}

		ticking = false
		requestAnimationFrame(animate)
	}

	requestAnimationFrame(animate)

}
