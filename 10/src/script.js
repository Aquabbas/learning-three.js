import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


// 

/**
 * Textures
 */

// Load Door Texture using Vanilla JS

// const image = new Image();
// const texture = new THREE.Texture(image)
// texture.colorSpace  = THREE.SRGBColorSpace

// image.onload = () =>
// {
//     texture.needsUpdate = true
// }
// image.src = '/textures/door/color.jpg'

// Use Loading Manager to show loading bar when loading assets. Use it inside your other Loaders
const loadingManager = new THREE.LoadingManager()

// loadingManager.onStart = () =>
// {
//     console.log('onStart')
// }

// loadingManager.onLoad = () =>
// {
//     console.log('onLoad')
// }

// loadingManager.onProgress = () =>
// {
//     console.log('onProgress')
// }

// loadingManager.onError = () =>
// {
//     console.log('onError')
// }

const textureLoader = new THREE.TextureLoader(loadingManager)
// Test for Minification filter
//const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')

// Test for Magnification filter
// const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png')

const colorTexture = textureLoader.load('/textures/minecraft.png')

//const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')


// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 2
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI * 0.25
// // Move Pivot point to center of the cube to rotate from there
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

// [SideNote]: You don't need MipMapping aka.[THREE.NearestFilter] if you are using [colorTexture.minFilter]
// Thus you can turn off the MipMapp Generator, to get better performance and you  get the same result
colorTexture.generateMipmaps = false

// Minification Filter makes the big textures smaller and sharpesn them
colorTexture.minFilter = THREE.NearestFilter

// Magnification Filter makes the small textures bigger and sharpens them
//colorTexture.magFilter = THREE.NearestFilter

// [SideNote]: [THREE.NearestFilter] can get you a better Performance/FrameRate if you don't care about the quality of the texture or it's not important






// Load Door Texture using a TExture Loader from three.js
// const textureLoader = new THREE.TextureLoader()
/*const texture = textureLoader.load(
    '/textures/door/color.jpg',
    () =>
    {
        console.log('load')
    },
    () =>
    {
        console.log('progress')
    },
    () =>
    {
        console.log('error')
    }
)*/

colorTexture.colorSpace = THREE.SRGBColorSpace






/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
// console.log(geometry.attributes.uv)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
//const material = new THREE.MeshBasicMaterial({ color: 'skyBlue' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()