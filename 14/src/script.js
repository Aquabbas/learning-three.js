import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'

/**
 * Base
 */
// Debug
const gui = new GUI( { 
    title: 'Press H to hide'
} )

// Hide Debug UI
// gui.close()
window.addEventListener('keydown', (event) =>
{
    if(event.key == 'h')
        gui.show(gui._hidden)

    if(event.key == 'o')
        lightFolder.open(lightFolder._closed)

    if(event.key == '1')
        ambientlightFolder.open(ambientlightFolder._closed)

    if(event.key == '2')
        hemisphereLightFolder.open(hemisphereLightFolder._closed)

    if(event.key == '3')
        directionalLighFolder.open(directionalLighFolder._closed)

    if(event.key == '4')
        pointLightFolder.open(pointLightFolder._closed)

    if(event.key == '5')
        spotLightFolder.open(spotLightFolder._closed)

    if(event.key == '6')
        rectAreaLightFolder.open(rectAreaLightFolder._closed)
})


// Folder Structure for lil-gui
const lightFolder = gui.addFolder('Lighting (Press O to open)')
lightFolder.close()

const ambientlightFolder = lightFolder      .addFolder('Ambient Light ______________________________ Press (1)')
const hemisphereLightFolder = lightFolder   .addFolder('Hemisphere Light ___________________________ Press (2)')
const directionalLighFolder = lightFolder   .addFolder('Directional Light ____________________________ Press (3)')
const pointLightFolder = lightFolder        .addFolder('Point Light _________________________________ Press (4)')
const spotLightFolder = lightFolder         .addFolder('Spot Light _________________________________ Press (5)')
const rectAreaLightFolder = lightFolder     .addFolder('RectArea Light _____________________________ Press (6)')

// Object for storing extra custom functions
const debugObject = {}


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)



/**
 * Lights
 */
/**
 * [Lights Performance Cost]
 *      Minimal Cost:
 *          1- Ambient Light
 *          2- Hemisphere Light
 *      Moderate Cost:
 *          3- Directional Light
 *          4- Point Light
 *      High Cost:
 *          5- Spot Light
 *          6- Rect Area Light
 */



/**
 * Ambient Light
 */
// ------------------------------------------------------------------------------------------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
scene.add(ambientLight)

ambientLight.visible = false
ambientlightFolder.close()

ambientlightFolder
    .add(ambientLight, 'visible')
    .name('Lights [ON/OFF]')

ambientlightFolder
    .add(ambientLight, 'intensity')
    .min(0).max(3).step(0.001)
    .name('Intensity')

    ambientlightFolder
    .addColor(ambientLight, 'color')
    .name('Color')
    .onChange(() =>
    {
        ambientLight.color.set(ambientLight.color)
    })
// ------------------------------------------------------------------------------------------------------------



/**
 * Hemisphere Light
 */
// ------------------------------------------------------------------------------------------------------------
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.9)
scene.add(hemisphereLight)

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

hemisphereLight.visible = false
hemisphereLightHelper.visible = false

hemisphereLightFolder.close()

hemisphereLightFolder
    .add(hemisphereLight, 'visible')
    .name('Lights [ON/OFF]')

hemisphereLightFolder
    .add(hemisphereLightHelper, 'visible')
    .name('Helper [ON/OFF]')

hemisphereLightFolder
    .add(hemisphereLight, 'intensity')
    .min(0).max(3).step(0.001)
    .name('Intensity')

hemisphereLightFolder
    .addColor(hemisphereLight, 'color')
    .name('Sky Light Color')
    .onChange(() =>
    {
        hemisphereLight.color.set(hemisphereLight.color)
    })

hemisphereLightFolder
    .addColor(hemisphereLight, 'groundColor')
    .name('Ground Light Color')
    .onChange(() =>
    {
        hemisphereLight.color.set(hemisphereLight.color)
    })


const hemisphereLightPositionFolder = hemisphereLightFolder.addFolder('Hemisphere Light Position')
hemisphereLightPositionFolder
    .add(hemisphereLight.position, 'x')
    .name('X')
    .min(-10).max(10).step(0.1)
hemisphereLightPositionFolder
    .add(hemisphereLight.position, 'y')
    .name('Y')
    .min(-10).max(10).step(0.1)
hemisphereLightPositionFolder
    .add(hemisphereLight.position, 'z')
    .name('Z')
    .min(-10).max(10).step(0.1)
// ------------------------------------------------------------------------------------------------------------



/**
 * Directional Light
 */
// ------------------------------------------------------------------------------------------------------------
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9)
scene.add(directionalLight)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

directionalLight.position.set(1, 1, 0)
directionalLight.visible = false
directionalLightHelper.visible = false

directionalLighFolder.close()

directionalLighFolder
    .add(directionalLight, 'visible')
    .name('Lights [ON/OFF]')

directionalLighFolder
    .add(directionalLightHelper, 'visible')
    .name('Helper [ON/OFF]')

directionalLighFolder
    .add(directionalLight, 'intensity')
    .min(0).max(3).step(0.001)
    .name('Intensity')

directionalLighFolder
    .addColor(directionalLight, 'color')
    .name('Color')
    .onChange(() =>
    {
        directionalLight.color.set(directionalLight.color)
    })


const directionalLightPositionFolder = directionalLighFolder.addFolder('Directional Light Position')
directionalLightPositionFolder
    .add(directionalLight.position, 'x')
    .name('X')
    .min(-10).max(10).step(0.1)
directionalLightPositionFolder
    .add(directionalLight.position, 'y')
    .name('Y')
    .min(-10).max(10).step(0.1)
directionalLightPositionFolder
    .add(directionalLight.position, 'z')
    .name('Z')
    .min(-10).max(10).step(0.1)
// ------------------------------------------------------------------------------------------------------------



/**
 * Point Light
 */
// ------------------------------------------------------------------------------------------------------------
const pointLight = new THREE.PointLight(0xff9000, 1.5)
scene.add(pointLight)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

pointLight.position.set(1, -0.5, 1)
// pointLight.visible = false
pointLightHelper.visible = false

pointLightFolder.close()

pointLightFolder
    .add(pointLight, 'visible')
    .name('Lights [ON/OFF]')

pointLightFolder
    .add(pointLightHelper, 'visible')
    .name('Helper [ON/OFF]')

pointLightFolder
    .add(pointLight, 'intensity')
    .min(0).max(3).step(0.001)
    .name('Intensity')

pointLightFolder
    .add(pointLight, 'distance')
    .min(0).max(10).step(0.000001)
    .name('Distance')

pointLightFolder
    .add(pointLight, 'power')
    .min(0).max(100).step(0.000001)
    .name('Power')

pointLightFolder
    .add(pointLight, 'decay')
    .min(-10).max(10).step(0.000001)
    .name('Decay')

pointLightFolder
    .addColor(pointLight, 'color')
    .name('Color')
    .onChange(() =>
    {
        pointLight.color.set(pointLight.color)
    })

const pointLightPositionFolder = pointLightFolder.addFolder('Point Light Position')
pointLightPositionFolder
    .add(pointLight.position, 'x')
    .name('X')
    .min(-10).max(10).step(0.1)
pointLightPositionFolder
    .add(pointLight.position, 'y')
    .name('Y')
    .min(-10).max(10).step(0.1)
pointLightPositionFolder
    .add(pointLight.position, 'z')
    .name('Z')
    .min(-10).max(10).step(0.1)
// ------------------------------------------------------------------------------------------------------------



/**
 * Spot Light
 */
// ------------------------------------------------------------------------------------------------------------
const spotLight = new THREE.SpotLight(
    0x78ff00, // Color
    4.5, // Intensity
    10, // Distance
    Math.PI * 0.1, // Angle
    0.25, // Penumbra
    1 // Decay
)
spotLight.position.set( 0, 1, 2)
scene.add(spotLight)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

// Make SpotLight look at the Sphere Object
spotLight.target.position.x = sphere.position.x
scene.add(spotLight.target)

// spotLight.visible = false
spotLightHelper.visible = false

spotLightFolder.close()

spotLightFolder
    .add(spotLight, 'visible')
    .name('Lights [ON/OFF]')

spotLightFolder
    .add(spotLightHelper, 'visible')
    .name('Helper [ON/OFF]')

// Add animation button for light to go back and forth on x-axis
// debugObject

spotLightFolder
    .add(spotLight, 'intensity')
    .min(0).max(10).step(0.001)
    .name('Intensity')

spotLightFolder
    .add(spotLight, 'distance')
    .min(0).max(20).step(0.000001)
    .name('Distance')

spotLightFolder
    .add(spotLight, 'power')
    .min(0).max(100).step(0.000001)
    .name('Power')

spotLightFolder
    .add(spotLight, 'decay')
    .min(-10).max(10).step(0.000001)
    .name('Decay')

spotLightFolder
    .add(spotLight, 'penumbra')
    .min(0).max(1).step(0.000001)
    .name('Penumbra')

spotLightFolder
    .add(spotLight, 'angle')
    .min(-Math.PI/2).max(Math.PI/2).step(0.000001)
    .name('Angle')

spotLightFolder
    .addColor(spotLight, 'color')
    .name('Color')
    .onChange(() =>
    {
        spotLight.color.set(spotLight.color)
    })


const spotLightPositionFolder = spotLightFolder.addFolder('Spot Light Position')
spotLightPositionFolder
    .add(spotLight.position, 'x')
    .name('X')
    .min(-10).max(10).step(0.1)
spotLightPositionFolder
    .add(spotLight.position, 'y')
    .name('Y')
    .min(-10).max(10).step(0.1)
spotLightPositionFolder
    .add(spotLight.position, 'z')
    .name('Z')
    .min(-10).max(10).step(0.1)
// ------------------------------------------------------------------------------------------------------------



/**
 * Rect Area Light
 */
// ------------------------------------------------------------------------------------------------------------
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6,  1, 1)
scene.add(rectAreaLight)

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

rectAreaLight.position.set( -1.5, 0, 1.5)
rectAreaLight.lookAt(0, 0, 0)

// rectAreaLight.visible = false
rectAreaLightHelper.visible = false
rectAreaLightFolder.close()

rectAreaLightFolder
    .add(rectAreaLight, 'visible')
    .name('Lights [ON/OFF]')

rectAreaLightFolder
    .add(rectAreaLightHelper, 'visible')
    .name('Helper [ON/OFF]')

rectAreaLightFolder
    .add(rectAreaLight, 'height')
    .min(0).max(50).step(0.001)
    .name('Height')

rectAreaLightFolder
    .add(rectAreaLight, 'width')
    .min(0).max(50).step(0.001)
    .name('Width')

rectAreaLightFolder
    .add(rectAreaLight, 'intensity')
    .min(0).max(3).step(0.001)
    .name('Intensity')

rectAreaLightFolder
    .add(rectAreaLight, 'power')
    .min(0).max(1000).step(0.000001)
    .name('Power')

rectAreaLightFolder
    .addColor(rectAreaLight, 'color')
    .name('Color')
    .onChange(() =>
    {
        rectAreaLight.color.set(rectAreaLight.color)
    })

const rectAreaLightPositionFolder = rectAreaLightFolder.addFolder('Rect Area Light Position')
rectAreaLightPositionFolder
    .add(rectAreaLight.position, 'x')
    .name('X')
    .min(-10).max(10).step(0.1)
rectAreaLightPositionFolder
    .add(rectAreaLight.position, 'y')
    .name('Y')
    .min(-10).max(10).step(0.1)
rectAreaLightPositionFolder
    .add(rectAreaLight.position, 'z')
    .name('Z')
    .min(-10).max(10).step(0.1)
// ------------------------------------------------------------------------------------------------------------














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
camera.position.x = 2
camera.position.y = 1
camera.position.z = 2
camera.rotateX = Math.PI
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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Update Light Helpers
    hemisphereLightHelper.update()
    directionalLightHelper.update()
    pointLightHelper.update()
    spotLightHelper.update()
    // rectAreaLightHelper.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()