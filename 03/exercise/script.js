import * as THREE from 'three'

// [Canvas] from [index.html]
const canvas = document.querySelector('canvas.webgl')

// [Scene]
const scene = new THREE.Scene()

// Mesh = Geometry (the shape) + Material (how it looks)

// [Object]
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, /*wireframe: true*/ })
const mesh = new THREE.Mesh(geometry, material)

// Add [Object] to [Scene]
scene.add(mesh)

// Sizes in an object
const sizes = {
    width: 800,
    height: 600
}

// [Camera]
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)

// Moving [Camera] backwards (3 units) from [Mesh]
camera.position.z = 3

// Add [Camera] to [Scene]
scene.add(camera)



// [Renderer] 
// We also provide an object, to provide parameters.
const renderer = new THREE.WebGLRenderer({
    // property: variable (from "const canvas" above)
    canvas: canvas
})


// Resize [Renderer] to match [Camera]
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)
