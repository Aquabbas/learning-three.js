import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
const gui = new GUI()
gui.hide()

// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
//const matcapTexture = textureLoader.load('./textures/matcaps/9.png')
// console.log(matcapTexture)
//matcapTexture.colorSpace = THREE.SRGBColorSpace

// Create an array of matcap textures
const matcapTextures = [
    textureLoader.load('./textures/matcaps/8.png'),
    textureLoader.load('./textures/matcaps/9.png'),
    textureLoader.load('./textures/matcaps/7.png'),
    textureLoader.load('./textures/matcaps/6.png'),
    textureLoader.load('./textures/matcaps/5.png'),
    textureLoader.load('./textures/matcaps/4.png'),
    textureLoader.load('./textures/matcaps/3.png'),
    textureLoader.load('./textures/matcaps/2.png')
]
matcapTextures.colorSpace = THREE.SRGBColorSpace
// console.log(matcapTextures)

/**
 * Fonts
 */
const fontLoader = new FontLoader()
// let textMesh, donut, octa, box 
let textMeshes = [] // Use an array to store text meshes
let techTextMeshes = []

fontLoader.load(
    './fonts/helvetiker_regular.typeface.json',
    (font) => 
    {
        const lines = [
            '_________________',
            'Abbas Hayder', 
            '_________________', 
            'Software Engineer', 
            'Desinger',
            'Avid Learner', 
            '_________________', 
            'Tech Used Here :'
        ]

        const techLines = [
            'JavaScript', // Add more lines as needed
            'Three.js',
            'HTML',
            'CSS',
            'Node.js',
            'Vite',
            'lil-gui',
            'WebGL'
        ]

        lines.forEach((line, index) => {
            const textGeometry = new TextGeometry(
                line,
                {
                    font: font,
                    size: 0.5,
                    height: 0.2,
                    curveSegments: 5,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 4
                }
            )
            // Defualt ThreeJS Bounding Box is a Sphere
            textGeometry.computeBoundingBox()
            textGeometry.center()

            /**
             * MatCap Materials
             */
            const material = new THREE.MeshMatcapMaterial({ matcap: matcapTextures[index] })
            // material.wireframe = true

            const textMesh = new THREE.Mesh(textGeometry, material)
            textMesh.position.y = -index * 1 // You can adjust the factor for proper spacing
            // Adjust the vertical position of the entire text block
            const totalLines = lines.length
            const verticalOffset = (totalLines - 1) * 0.75 // Adjust the value as needed
            textMesh.position.y += verticalOffset
            textMesh.position.z = 4

            scene.add(textMesh)
            textMeshes.push(textMesh) // Add text mesh to the array

            
            // Calculate vertical offset for techTextMesh
            const techVerticalOffset = verticalOffset * 1.5 // Adjust the factor as needed
            techLines.forEach((line, index) => {
                const textGeometry = new TextGeometry(
                    line,
                    {
                        font: font,
                        size: 1,
                        height: 0.2,
                        curveSegments: 5,
                        bevelEnabled: true,
                        bevelThickness: 0.03,
                        bevelSize: 0.02,
                        bevelOffset: 0,
                        bevelSegments: 4
                    }
                )
                const techTextMesh = new THREE.Mesh(textGeometry, material)
                scene.add(techTextMesh)
                techTextMeshes.push(techTextMesh)
            })


            const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
            //console.time('donuts')
            for (let i = 0; i < 33; i++)
            {
                const donutMesh = new THREE.Mesh(donutGeometry, material)
                
                donutMesh.position.x = (Math.random() - 0.5) * 100
                donutMesh.position.y = (Math.random() - 0.5) * 100
                donutMesh.position.z = -((Math.random() ) * 10)

                donutMesh.rotation.x = Math.random() * Math.PI
                donutMesh.rotation.y = Math.random() * Math.PI

                const scale = Math.random()
                donutMesh.scale.set(scale, scale, scale)
                scene.add(donutMesh)
            }
            //console.timeEnd('donuts')



            const octahedronGeometry = new THREE.OctahedronGeometry(1,0)
            //console.time('octa')
            for (let i = 0; i < 33; i++)
            {
                const octa = new THREE.Mesh(octahedronGeometry, material)

                octa.position.x = (Math.random() - 0.5) * 100
                octa.position.y = (Math.random() - 0.5) * 100
                octa.position.z = -((Math.random() ) * 50)

                octa.rotation.x = Math.random() * Math.PI
                octa.rotation.y = Math.random() * Math.PI

                const scale = Math.random()
                octa.scale.set(scale, scale, scale)
                scene.add(octa)
            }
            //console.timeEnd('octa')



            const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
            //console.time('box')
            for (let i = 0; i < 33; i++)
            {
                const box = new THREE.Mesh(boxGeometry, material)

                box.position.x = (Math.random() - 0.5) * 100
                box.position.y = (Math.random() - 0.5) * 100
                box.position.z = -((Math.random() ) * 50)

                box.rotation.x = Math.random() * Math.PI
                box.rotation.y = Math.random() * Math.PI

                const scale = Math.random()
                box.scale.set(scale, scale, scale)
                scene.add(box)
            }
            //console.timeEnd('box')
        })        
    }
)






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
camera.position.x = 3
camera.position.y = -1
camera.position.z = 12
scene.add(camera)

/**
 * GUI Controls
 */
// Camera position
// const cameraControlsFolder = gui.addFolder('Camera Controls')
// gui.add(camera.position, 'x').min(-50).max(50).step(0.0001).name('Camera X')
// gui.add(camera.position, 'y').min(-50).max(50).step(0.0001).name('Camera Y')
// gui.add(camera.position, 'z').min(-50).max(50).step(0.0001).name('Camera Z')
// // Hide the GUI controls
// cameraControlsFolder.hide()

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

    // Animate textMeshes (the static text)
    textMeshes.forEach((object) => {
        // Perform any desired animation for the static text
    })

   // Animate techTextMeshes (the text under 'Tech Used:')
    techTextMeshes.forEach((object, index) => {
        const speed = 0.1 // Adjust the speed as needed

        // Circular motion for ferris wheel effect
        const radius = 20
        const angle = elapsedTime * speed + (index * (Math.PI * 3) / (techTextMeshes.length / 2))

        // Update the position based on circular motion
        object.position.z = radius * Math.sin(angle)
        object.position.y = radius * Math.cos(angle) // Invert the y-coordinate

        // Update rotation to face the center of the ferris wheel
        //object.rotation.x = -angle - Math.PI / 2 // Invert the angle and add an offset

    

        const yOffset = -25 // Adjust the value as needed
        object.position.y += yOffset

    })


    // Animate other objects (donuts, octahedra, boxes)
    scene.traverse((object, index) => {
        if (object instanceof THREE.Mesh && !textMeshes.includes(object) && !techTextMeshes.includes(object)) {
            const speed = 0.0001 // Adjust the speed as needed

            // Move from left to right
            const displacement = Math.sin(elapsedTime * speed)
            object.position.x += displacement

            // Reset x position when the object goes beyond a threshold
            if (object.position.x > 30) {
                object.position.x = -30
            }

            // Apply rotation
            object.rotation.x += 0.01
            object.rotation.y += 0.01
        }
    })
    

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()