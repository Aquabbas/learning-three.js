import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

console.log(OrbitControls)

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

const mouse = {
    x:  0,
    y:  0
}

window.addEventListener('mousemove', (event) => 
{
    mouse.x = (event.clientX / sizes.width - 0.5)
    mouse.y = - (event.clientY / sizes.height - 0.5)
    
})



// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xFF6F61 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// [Controls]
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.y = 1
// controls.update()






// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // mesh.rotation.y = elapsedTime;

    // camera.position.x = Math.sin(mouse.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(mouse.x * Math.PI * 2) * 3
    // camera.position.y = mouse.y * 15
    // camera.lookAt(mesh.position)



    // Update the modifications to the [Controls]
    controls.update()

    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()