import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg')
bakedShadow.colorSpace = THREE.SRGBColorSpace
// console.log(bakedShadow)
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')
// console.log(simpleShadow)




/**
 * Only the following types of lights support shadows
 *      - DirectionalLight
 *      - SpotLight
 *      - PointLight
 */


/**
 * Base
 */
// Debug
const gui = new GUI( {
    width: 400,
    title:  'Shadows (Press H to hide)'
} )
window.addEventListener('keydown', (event) =>
{
    if(event.key == 'h')
        gui.show(gui._hidden)

    if(event.key == '1')
        ambientlightFolder.open(ambientlightFolder._closed)

    if(event.key == '2')
        directionalLightFolder.open(directionalLightFolder._closed)

    if(event.key == '3')
        spotLightShadowFolder.open(spotLightShadowFolder._closed)

    if(event.key == '4')
        pointLightShadowFolder.open(pointLightShadowFolder._closed)

    if(event.key == '5')
        materialFolder.open(materialFolder._closed)
})

// Folder Structure for lil-gui
const ambientlightFolder = gui.addFolder('Ambient Light [1]')
const directionalLightFolder = gui.addFolder('Directional Light (Shadow) [2]')
const spotLightShadowFolder = gui.addFolder('Spot Light (Shadow) [3]')
const pointLightShadowFolder = gui.addFolder('Point Light (Shadow) [4]')
const materialFolder = gui.addFolder('Material Property [5]')
materialFolder.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Ambient Light
 */
// ------------------------------------------------------------------------------------------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
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
 * Directional Light
 */
// ------------------------------------------------------------------------------------------------------------
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)

directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

directionalLight.position.set(2, 2, - 1)
directionalLight.shadow.camera.top = 6
directionalLight.shadow.camera.right = 6
directionalLight.shadow.camera.bottom = -6
directionalLight.shadow.camera.left = -6
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6
// directionalLight.shadow.radius = 10

scene.add(directionalLight)
directionalLight.visible = false
directionalLightFolder.close()



// Directional light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)
directionalLightHelper.visible = false

/**
 *  Helps with visualizing what the 
    "Shadow of the Directional Light" contains in 
    its frustum as if it's a camera

    It uses an Orthografic Camera as its frustum
 */
const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightCameraHelper)

directionalLightCameraHelper.visible = false



directionalLightFolder
    .add(directionalLight, 'visible')
    .name('Lights [ON/OFF]')


directionalLightFolder
    .add(directionalLightHelper, 'visible')
    .name('Light Helper [ON/OFF]')

directionalLightFolder
    .add(directionalLightCameraHelper, 'visible')
    .name('Shadow Helper [ON/OFF]')



directionalLightFolder
    .add(directionalLight, 'intensity')
    .min(0).max(3).step(0.001)
    .name('Directional Light Intensity')

/**
 * "Why is this  not working?" *Bangs his head on the desk in frustration*
 */
// directionalLightFolder
//     .add(directionalLight.shadow.camera, 'near')
//     .min(1).max(10).step(0.001)
//     .name('Shadow Near')

// directionalLightFolder
//     .add(directionalLight.shadow.camera, 'far')
//     .min(1).max(10).step(0.001)
//     .name('Shadow Far')

directionalLightFolder
    .addColor(directionalLight, 'color')
    .name('Color')
    .onChange(() =>
    {
        directionalLight.color.set(directionalLight.color)
    })

const directionalLightPositionFolder = directionalLightFolder.addFolder('Directional Light Position')

directionalLightPositionFolder
    .add(directionalLight.position, 'x')
    .min(- 5).max(5).step(0.001)
    .name('X')
directionalLightPositionFolder
    .add(directionalLight.position, 'y')
    .min(- 5).max(5).step(0.001)
    .name('Y')
directionalLightPositionFolder
    .add(directionalLight.position, 'z')
    .min(- 5).max(5).step(0.001)
    .name('Z')
// ------------------------------------------------------------------------------------------------------------




/**
 * Spot Light
 */
// ------------------------------------------------------------------------------------------------------------
const spotLight = new THREE.SpotLight(0xffffff, 7, 10, Math.PI * 0.3)

spotLight.castShadow = true
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6
// console.log(spotLight.shadow.camera.near)
// console.log(spotLight.shadow.camera.far)
spotLight.position.set(0, 3, 2)
spotLight.power = 50

scene.add(spotLight)
scene.add(spotLight.target)
spotLight.visible = false
spotLightShadowFolder.close()

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
spotLightHelper.visible = false



/**
 *  Helps with visualizing what the 
    "Shadow of the Spot Light" contains in 
    its frustum as if it's a camera

    It uses a Perspective Camera as its frustum
 */
const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
scene.add(spotLightCameraHelper)
spotLightCameraHelper.visible = false

spotLightShadowFolder
    .add(spotLight, 'visible')
    .name('Lights [ON/OFF]')

spotLightShadowFolder
    .add(spotLightHelper, 'visible')
    .name('Light Helper [ON/OFF]')

spotLightShadowFolder
    .add(spotLightCameraHelper, 'visible')
    .name('Shadow Helper [ON/OFF]')

spotLightShadowFolder
    .add(spotLight, 'intensity')
    .min(0).max(10).step(0.001)
    .name('Spot Light Intensity')

spotLightShadowFolder
    .add(spotLight, 'distance')
    .min(0).max(20).step(0.000001)
    .name('Distance')

spotLightShadowFolder
    .add(spotLight, 'power')
    .min(0).max(100).step(0.000001)
    .name('Power')

spotLightShadowFolder
    .add(spotLight, 'decay')
    .min(-10).max(10).step(0.000001)
    .name('Decay')

spotLightShadowFolder
    .add(spotLight, 'penumbra')
    .min(0).max(1).step(0.000001)
    .name('Penumbra')

spotLightShadowFolder
    .add(spotLight, 'angle')
    .min(-Math.PI/2).max(Math.PI/2).step(0.000001)
    .name('Angle')

spotLightShadowFolder
    .addColor(spotLight, 'color')
    .name('Color')
    .onChange(() =>
    {
        spotLight.color.set(spotLight.color)
    })

const spotLightPositionFolder = spotLightShadowFolder.addFolder('Spot Light Position')
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
 * Point Light
 */
// ------------------------------------------------------------------------------------------------------------
const pointLight = new THREE.PointLight(0xffffff, 6)
pointLight.castShadow = true
pointLight.position.set(-1, 2, 1)
pointLight.distance = 20
pointLight.decay =  1.2
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5

scene.add(pointLight)
// pointLight.visible = false
// pointLightShadowFolder.close()


const pointLightHelper = new THREE.PointLightHelper(pointLight)
scene.add(pointLightHelper)
pointLightHelper.visible = false 


/**
 *  Helps with visualizing what the 
    "Shadow of the Spot Light" contains in 
    its frustum as if it's a camera

    It uses a Downward Perspective Camera as its frustum
 */
const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
scene.add(pointLightCameraHelper)
pointLightCameraHelper.visible = false

pointLightShadowFolder
    .add(pointLight, 'visible')
    .name('Lights [ON/OFF]')

pointLightShadowFolder
    .add(pointLightHelper, 'visible')
    .name('Light Helper [ON/OFF]')

pointLightShadowFolder
    .add(pointLightCameraHelper, 'visible')
    .name('Shadow Helper [ON/OFF]')

pointLightShadowFolder
    .add(pointLight, 'intensity')
    .min(0).max(10).step(0.001)
    .name('Spot Light Intensity')

pointLightShadowFolder
    .add(pointLight, 'distance')
    .min(0).max(30).step(0.000001)
    .name('Distance')

pointLightShadowFolder
    .add(pointLight, 'power')
    .min(0).max(100).step(0.000001)
    .name('Power')

pointLightShadowFolder
    .add(pointLight, 'decay')
    .min(-10).max(10).step(0.000001)
    .name('Decay')

pointLightShadowFolder
    .addColor(pointLight, 'color')
    .name('Color')
    .onChange(() =>
    {
        pointLight.color.set(pointLight.color)
    })

const pointLightPositionFolder = pointLightShadowFolder.addFolder('Point Light Position')
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
 * Materials
 */
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7

// materialFolder.close()

materialFolder
    .add(material, 'metalness')
    .min(0).max(1).step(0.001)
materialFolder
    .add(material, 'roughness')
    .min(0).max(1).step(0.001)

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.castShadow = true

sphere.position.y = 1

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    material
)

/**
 * Baking the Shadow on the plane, using bakedShadow
 */
// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(20, 20),
//     new THREE.MeshBasicMaterial({
//         map: bakedShadow
//     })
// )


/**
 * Alpha Map: When the dark are is visible 
 * and the light are is non-visible.
 * 
 * Note: You must set "Transparent" property 
 * to "true" to see the results
 */

plane.receiveShadow = true

plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.5

scene.add(sphere, plane)

/**
 * Sphere Shadow
 */
// const sphereShadow = new THREE.Mesh(
//     new THREE.PlaneGeometry(1.5, 1.5),
//     new THREE.MeshBasicMaterial({
//         color: 0x000000,
//         transparent: true,
//         alphaMap:simpleShadow
//     })
// )
// sphereShadow.rotation.x = - Math.PI * 0.5
// sphereShadow.position.y = plane.position.y * 0.1
// scene.add(sphereShadow)






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
camera.position.y = 4
camera.position.z = 7

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
 * Shadow Activation in the Renderer
 */
renderer.shadowMap.enabled = true
// renderer.shadowMap.enabled = false

/**
 * Shadow Map Algorithms (Types)
 *      THREE.BasicShadowMap
 *          - Very performant but lousy quality
 *      THREE.PCFShadowMap
 *          - Less performant but smoother edges (default)
 *      THREE.PCFSoftShadowMap
 *          - Less performant but even softer edges
 *      THREE.VSMMShadowMap
 *          - Less performant, more constraints, can have unexpected results
 */
renderer.shadowMap.type = THREE.PCFSoftShadowMap


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Move the sphere around
    sphere.position.x = Math.cos(elapsedTime) * 1.5
    sphere.position.z = Math.sin(elapsedTime) * 1.5
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3))

    // sphere.position.x = Math.sin(elapsedTime)
    // sphere.position.z = Math.cos(elapsedTime)

    // Update the simpleShadow
    // sphereShadow.position.x = sphere.position.x
    // sphereShadow.position.z = sphere.position.z
    // sphereShadow.material.opacity = (1 - sphere.position.y)


    // Update controls
    controls.update()

    

    // Update Light Helpers
    directionalLightHelper.update()
    spotLightHelper.update()
    pointLightHelper.update()

    // Update  Shadow Helpers
    directionalLightCameraHelper.update()
    spotLightCameraHelper.update()
    pointLightCameraHelper.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()