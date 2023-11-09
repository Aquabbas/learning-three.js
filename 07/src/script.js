import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Resizing [Viewport]
window.addEventListener('resize', () => 
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update [Camera] (Aspect Ratio)
    camera.aspect =  sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update [Renderer]
    renderer.setSize(sizes.width, sizes.height)

    //console.log(window.devicePixelRatio)

    // to get better quality picture for devices with a pixel ratio more than 2 for example.
    // It will just render a pixel ratio of maximum 2.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => 
{
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    }
    else
    {
        document.exitFullscreen()
    }
})



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

const mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xFF6F61 })
)
mesh2.position.x = 2
scene.add(mesh2)

const mesh3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xFF6F61 })
)
mesh3.position.x = -2
scene.add(mesh3)

const mesh4 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xFF6F61 })
)
mesh4.position.x = -2
mesh4.position.y = -2
scene.add(mesh4)

const mesh5 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xFF6F61 })
)
mesh5.position.x = -2
mesh5.position.y = 2
scene.add(mesh5)

const mesh6 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xFF6F61 })
)
mesh6.position.x = 2
mesh6.position.y = 2
scene.add(mesh6)

const mesh7 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xFF6F61 })
)
mesh7.position.x = 2
mesh7.position.y = -2
scene.add(mesh7)
/*
const mesh3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xFF6F61 })
)
mesh3.position.x = -2
scene.add(mesh3)

const mesh3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xFF6F61 })
)
mesh3.position.x = -2
scene.add(mesh3)
*/








// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
camera.position.z = 3
camera.position.y = 1
mesh.rotation.y = 10
scene.add(camera)

// [Controls]
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true










// [Renderer]
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)



// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

   






    // mesh.rotation.x += 0.01

    // Update the modifications to the [Controls]
    controls.update()

    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()