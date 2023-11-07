import * as THREE from 'three'
import gsap from 'gsap'
// [Canvas] from [index.html]
const canvas = document.querySelector('canvas.webgl')


//console.log(gsap)

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

// Time
// let time = Date.now()
//const clock = new THREE.Clock()

gsap.to(mesh.position, {duration:1, delay:1, x: 2})
gsap.to(mesh.position, {duration:1, delay:2, x: 0})


// Animations
const loop = () =>
{
    /*const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    // console.log(deltaTime)
    // console.log(time)
    // Update Object

    // Multiply animation by deltaTime to get a cube rotation 
    // at the samme speed regardless of the framerate
    mesh.rotation.x += 0.001 * deltaTime
    mesh.rotation.y += 0.001 * deltaTime*/

    //const elapsedTime = clock.getElapsedTime()
    //console.log(elapsedTime)

    //mesh.rotation.x = elapsedTime
    //mesh.rotation.y = elapsedTime
    //mesh.position.x = Math.sin(elapsedTime)
    //mesh.position.y = Math.cos(elapsedTime)
    //mesh.rotation.y = Math.cos(elapsedTime)
    //camera.lookAt(mesh.position)

    // Render Object
    renderer.render(scene, camera)

    window.requestAnimationFrame(loop)
}

loop()




