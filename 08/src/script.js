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
// const positionsArray = new Float32Array(9)
// positionsArray[0] = 0
// positionsArray[1] = 0
// positionsArray[2] = 0

// positionsArray[3] = 0
// positionsArray[4] = 1
// positionsArray[5] = 0

// positionsArray[6] = 1
// positionsArray[7] = 0
// positionsArray[8] = 0

// const positionsArray = new Float32Array([
//     0, 0, 0,
//     0, 1, 0,
//     1, 0, 0
// ])

// // We're telling three.js that one vertex (in positionArray) contains 3 values
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

// const geometry = new THREE.BufferGeometry()
// // ('Attribute Name', Attribute Value) 
// // NOTE: It must be name 'position' to make three.js built-in shaders do the work needed
// geometry.setAttribute('position', positionsAttribute)




const geometry = new THREE.BufferGeometry()

// Create a bunch of triangles
const count = 100
// Each triangle consists of 3 vertices, and each vertex consists of 3 values
const positionsArray = new Float32Array(count * 3 * 3) 

// (count * 3 * 3) is also the length of the array
for (let i = 0; i < count * 3 * 3; i++) 
{
    positionsArray[i] = (Math.random() - 0.5) // - 0.5 to center the array (- 0.5 to + 0.5)
}
// Again here, We're telling three.js that one vertex (in positionArray) contains 3 values
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)


const material = new THREE.MeshBasicMaterial({
    color: 0xFF6F61,
    wireframe: true
})

const mesh = new THREE.Mesh(geometry, material)

// const mesh = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
//     new THREE.MeshBasicMaterial({ color: 0xFF6F61, wireframe: true })
// )
scene.add(mesh)








// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
camera.position.z = 3
// camera.position.y = 1
//mesh.rotation.y = 10
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