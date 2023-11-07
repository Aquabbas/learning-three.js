import * as THREE from 'three'




// [Canvas] from [index.html]
const canvas = document.querySelector('canvas.webgl')

// [Scene]
const scene = new THREE.Scene()

// Mesh = Geometry (the shape) + Material (how it looks)

// [Object]
// Group
const group = new THREE.Group()
group.position.y = 2
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'darkBlue'})
)

group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'darkGreen'})
)
cube2.position.x = 2
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'darkRed'})
)
cube3.position.x = 4
group.add(cube3)

// Axis Helper to get X,Y,Z axis
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)


// mesh.position.normalize()
// console.log(mesh.position.length())

// Sizes in an object
const sizes = {
    width: 800,
    height: 600
}

// [Camera]
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)

camera.position.x = 1
camera.position.y = 1
// Moving [Camera] backwards (3 units) from [Mesh]
camera.position.z = 3


// Add [Camera] to [Scene]
scene.add(camera)


// camera.lookAt(mesh.position)


// Distance between [Camera] and [Mesh]
// console.log(mesh.position.distanceTo(camera.position))




// [Renderer] 
// We also provide an object, to provide parameters.
const renderer = new THREE.WebGLRenderer({
    // property: variable (from "const canvas" above)
    canvas: canvas
})


// Resize [Renderer] to match [Camera]
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)
