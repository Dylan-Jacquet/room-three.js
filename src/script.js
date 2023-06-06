import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

const dialogue = document.querySelector('.room__dialogue');

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
const ambientLight = new THREE.AmbientLight('0xffffff', .55);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('0xffffff', .05);
const secondeLight = new THREE.DirectionalLight('0xffffff', .65);
secondeLight.position.set(1.2, 1.2, 1.2);
directionalLight.position.set(.4, 0, 1);
secondeLight.rotation.set(1, 0.1, -.68);
directionalLight.rotation.set(1.57, 0.1, -1.57);
scene.add(directionalLight);
scene.add(secondeLight);

// GLTF loader
const gltfLoader = new GLTFLoader()

gltfLoader.load(
    './static/Scene.gltf',
    (gltf) => {
        gltf.scene.position.y = -1.5;
        gltf.scene.scale.set(.04, .04, .04)
        gltf.scene.rotation.y = Math.PI / 2;
        gltf.scene.traverse(child => {
            console.log(child)
        })
        // Ajouter un écouteur d'événement "click" à votre mesh
// Créer un raycaster
        const raycaster = new THREE.Raycaster();

// Ajouter un gestionnaire d'événements pour l'événement de clic de la souris
        window.addEventListener('click', onClick);

        function onClick(event) {
            // Obtenir la position de la souris et la convertir en coordonnées normalisées
            const mouse = new THREE.Vector2();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Lancer le rayon
            raycaster.setFromCamera(mouse, camera);

            // Intersecter les objets que vous souhaitez rendre cliquables
            const intersects = raycaster.intersectObjects(scene.children, true);

            // Si une intersection est détectée, effectuer les actions souhaitées
            if (intersects.length > 0) {
                // Par exemple, changer la couleur de l'objet touché
                console.log(intersects[0].object.name)
                intersects[0].object.name === 'tableauRembnrandtShape_1' ? rembrandtClick() : '';
                intersects[0].object.name === 'pMacScreenPIV' ? iMacPortfolio() : ''; //iMac
                intersects[0].object.name === 'pScreenMacbookShape' ? macBookCv() : ''; //Macbook
                intersects[0].object.name === 'pCouverturePIV' ? litClick() : ''; // Lit
                intersects[0].object.name === 'reveilShape' ? reveilClick() : ''; // Lit
            }
        }
        scene.add(gltf.scene);
    }
);

const buttonEvent = document.querySelectorAll('.button-click');

for (const buttonEventElement of buttonEvent) {
    buttonEventElement.addEventListener('click', (e)=>{
        switch (e.currentTarget.dataset.name){
            case 'imac':
                iMacPortfolio()
                break;
            case 'macbook':
                macBookCv()
                break;
            case 'lit':
                litClick()
                break;
            case 'reveil':
                reveilClick()
                break;
            case 'tableau':
                rembrandtClick()
                break;
        }
    })
}

// Fonction de rappel appelée lorsqu'un clic est effectué sur le mesh
function rembrandtClick() {
    dialogue.style.opacity = '0';
    setTimeout(function () {
        dialogue.innerHTML = 'Arrête de cliquer sur moi';
        dialogue.style.opacity = '1';
    }, 200);
}

function iMacPortfolio() {
    dialogue.style.opacity = '0';
    setTimeout(function () {
        dialogue.innerHTML = 'Ceci est mon portfolio, n\'hésite pas à y faire un tour: <a class="link-js" href="https://dylanjacquet.com" title="Vers la page Portfolio Dylan Jacquet" hreflang="fr"> Vers mon portfolio</a>';
        dialogue.style.opacity = '1';
    }, 200);
}

function macBookCv() {
    dialogue.style.opacity = '0';
    setTimeout(function () {
        dialogue.innerHTML = 'Ceci est mon cv réalisé pour le cours de Design web, n\'hésite pas à y faire un tour: <a class="link-js" href="https://cv.dylanjacquet.com" title="Vers la page CV Dylan Jacquet" hreflang="fr"> Vers mon CV</a>';
        dialogue.style.opacity = '1';
    }, 200);
}

function litClick() {
    dialogue.style.opacity = '0';
    setTimeout(function () {
        dialogue.innerHTML = 'Ceci est un outil primordial qui permet de se reposer pour aspirer à devenir un expert du web';
        dialogue.style.opacity = '1';
    }, 200);
}

function reveilClick() {
    dialogue.style.opacity = '0';
    setTimeout(function () {
        dialogue.innerHTML = 'Hé oui, 4h40 c\'est assez tôt mais c\'est l\'heure à laquelle je me lève pour allez à l\'école';
        dialogue.style.opacity = '1';
    }, 200);
}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 5
camera.position.y = 1
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const colorBackground = new THREE.Color('#00377B');
scene.background = colorBackground;

const tick = () => {
    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()