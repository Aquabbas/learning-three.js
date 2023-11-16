import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

// Import environment map loader from ThreeJS
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * Debug
 */
const gui = new GUI()









/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/8.png')
const gradientTexture = textureLoader.load('./textures/gradients/5.jpg')

// SRGB coloring is used to specify the color enconding in ThreeJS, otherwise the color will look a bit off.
doorColorTexture.colorSpace = THREE.SRGBColorSpace
matcapTexture.colorSpace = THREE.SRGBColorSpace

/*
    * Objects
*/

// MeshBasicMaterial Instantiation Method #1
//const material = new THREE.MeshBasicMaterial({ map: doorColorTexture })

// MeshBasicMaterial Instantiation Method #2
// const material = new THREE.MeshBasicMaterial()

/**
 * MeshBasicMaterial 
*/
//const material = new THREE.MeshBasicMaterial()
//material.map = doorColorTexture
// material.color = new THREE.Color('#feda6a')
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.2
// material.alphaMap = doorAlphaTexture
// Double Side Rendering. 
// Consumes more computing power, use only if needed
// material.side = THREE.DoubleSide

/**
 * MeshNormalMaterial
*/
// const material = new THREE.MeshNormalMaterial()
// material.side = THREE.DoubleSide
// material.wireframe = true
// material.flatShading = true


/**
 * MeshMatcapMaterial
*/
// const material = new THREE.MeshMatcapMaterial()
// material.side = THREE.DoubleSide
// material.matcap = matcapTexture


/**
 * MeshDepthMaterial
*/
// const material = new THREE.MeshDepthMaterial()
// material.side = THREE.DoubleSide


// Side Note: These next materials require light to be visible


/**
 * MeshLambertMaterial. More Performant
*/
// const material = new THREE.MeshLambertMaterial()
// material.side = THREE.DoubleSide


/**
 * MeshPhongMaterial. Less Performant
*/
// const material = new THREE.MeshPhongMaterial()
// material.side = THREE.DoubleSide
// material.shininess = 100
// material.specular = new THREE.Color(0xfeda6a)


/**
 * MeshToonMaterial. Cell Shaded  --> Really cool! Reminds of games like Zelda Wind Waker :D
*/
// const material = new THREE.MeshToonMaterial()
// // material.side = THREE.DoubleSide
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter

// // Deactivitae mipmapping for better performance, since we are using NearestFilter for minFilter and magFilter
// gradientTexture.generateMipmaps = false

// // This alone (without minFilter & magFilter) stretches the 3 or 5 pixels so we see a more gradient color change over the objects
// material.gradientMap = gradientTexture




// /**
//  * MeshStandardMaterial.
// */
// const material = new THREE.MeshStandardMaterial()
// material.side = THREE.DoubleSide
// material.metalness = 0.7
// material.roughness = 0.2
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// // Debug controls for the  material properties
// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)
// gui.add(material, 'side', { FrontSide: THREE.FrontSide, BackSide: THREE.BackSide, DoubleSide: THREE.DoubleSide }).name('Side');
// gui.add(material, 'map', { None: null, DoorColorTexture: doorColorTexture }).name('Map');
// gui.add(material, 'aoMap', { None: null, DoorAmbientOcclusionTexture: doorAmbientOcclusionTexture }).name('AO Map');
// gui.add(material, 'aoMapIntensity').min(0).max(3).step(0.01).name('AO Map Intensity');
// gui.add(material, 'displacementMap', { None: null, DoorHeightTexture: doorHeightTexture }).name('Displacement Map');
// gui.add(material, 'displacementScale').min(0).max(1).step(0.01).name('Displacement Scale');
// gui.add(material, 'metalnessMap', { None: null, DoorMetalnessTexture: doorMetalnessTexture }).name('Metalness Map');
// gui.add(material, 'roughnessMap', { None: null, DoorRoughnessTexture: doorRoughnessTexture }).name('Roughness Map');
// gui.add(material, 'normalMap', { None: null, DoorNormalTexture: doorNormalTexture }).name('Normal Map');
// gui.add(material.normalScale, 'x').min(0).max(1).step(0.01).name('Normal Scale X');
// gui.add(material.normalScale, 'y').min(0).max(1).step(0.01).name('Normal Scale Y');
// gui.add(material, 'transparent').name('Transparent');
// gui.add(material, 'alphaMap', { None: null, DoorAlphaTexture: doorAlphaTexture }).name('Alpha Map');


/**
 * MeshPhysicalMaterial.
*/
const material = new THREE.MeshPhysicalMaterial()
material.side = THREE.DoubleSide
material.metalness = 0.7
material.roughness = 0.2
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// // Debug controls for the  material properties
// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material, 'roughness').min(0).max(1).step(0.0001)
// gui.add(material, 'side', { FrontSide: THREE.FrontSide, BackSide: THREE.BackSide, DoubleSide: THREE.DoubleSide }).name('Side');
// gui.add(material, 'map', { None: null, DoorColorTexture: doorColorTexture }).name('Map');
// gui.add(material, 'aoMap', { None: null, DoorAmbientOcclusionTexture: doorAmbientOcclusionTexture }).name('AO Map');
// gui.add(material, 'aoMapIntensity').min(0).max(3).step(0.01).name('AO Map Intensity');
// gui.add(material, 'displacementMap', { None: null, DoorHeightTexture: doorHeightTexture }).name('Displacement Map');
// gui.add(material, 'displacementScale').min(0).max(1).step(0.01).name('Displacement Scale');
// gui.add(material, 'metalnessMap', { None: null, DoorMetalnessTexture: doorMetalnessTexture }).name('Metalness Map');
// gui.add(material, 'roughnessMap', { None: null, DoorRoughnessTexture: doorRoughnessTexture }).name('Roughness Map');
// gui.add(material, 'normalMap', { None: null, DoorNormalTexture: doorNormalTexture }).name('Normal Map');
// gui.add(material.normalScale, 'x').min(0).max(1).step(0.01).name('Normal Scale X');
// gui.add(material.normalScale, 'y').min(0).max(1).step(0.01).name('Normal Scale Y');
// gui.add(material, 'transparent').name('Transparent');
// gui.add(material, 'alphaMap', { None: null, DoorAlphaTexture: doorAlphaTexture }).name('Alpha Map');


// Clearcoat. Gives a glassy look
// material.clearcoat = 1
// material.clearcoatRoughness = 0

// gui.add(material, 'clearcoat').min(0).max(1).step(0.0001)
// gui.add(material, 'clearcoatRoughness').min(0).max(1).step(0.0001)



// Sheen. Gives a fluffy look, perfect if you wanna make a pillow or something else fluffy
// material.sheen = 1
// material.sheenRoughness = 0.25
// material.sheenColor.set(1, 1, 1)

// gui.add(material, 'sheen').min(0).max(1).step(0.0001)
// gui.add(material, 'sheenRoughness').min(0).max(1).step(0.0001)
// gui.addColor(material, 'sheenColor')


// Iridescence
// material.iridescence = 1
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100, 800]

// gui.add(material, 'iridescence').min(0).max(1).step(0.0001)
// gui.add(material, 'iridescenceIOR').min(1).max(2.333).step(0.0001)
// gui.add(material.iridescenceThicknessRange, '0').min(1).max(1000).step(1)
// gui.add(material.iridescenceThicknessRange, '1').min(1).max(1000).step(1)

// Transmission
// IOR (Index of Reflection) can be used to simmulate different materials such as Dimands (2.417), Water (1.333), or Air (1.000293)
material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'transmission').min(0).max(1).step(0.0001)
gui.add(material, 'ior').min(0).max(10).step(0.0001)
gui.add(material, 'thickness').min(0).max(1).step(0.0001)










const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5


scene.add(sphere, plane, torus)

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)


/**
 * Environment Map
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./textures/environmentMap/2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background =  environmentMap
    scene.environment = environmentMap
})





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
camera.position.z = 2
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


    /**
     * Update Objects
    */
    sphere.rotation.y = elapsedTime * 0.1
    plane.rotation.y = elapsedTime * 0.1
    torus.rotation.y = elapsedTime * 0.1

    sphere.rotation.x = elapsedTime * -0.15
    plane.rotation.x = elapsedTime * -0.15
    torus.rotation.x = elapsedTime * -0.15

    // Update controls
    controls.update()
    

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()