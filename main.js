import * as THREE from './node_modules/three/build/three.module.js';

const scene = new THREE.Scene(); 
	/* scene is the universe where you create objects, camera, light */

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
camera.position.z = 5;
	/* camera zooms in and out on the object 
		parameterss: 
			- field of view
			- aspect ratio, near frustam plane
			- far frustam plane (w/h) 
				* frustum = the camera's FOV, a truncated pyramid... sides of the frustum parallel to the camera's lens are called the near and far clipping planes, because anything outside the frustum, beyond these planes, is omitted from view.
		position: camera and object will start in the same spot, have to reposition camera or object to see object 
	*/

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight, 0.1, 1000 );
renderer.setClearColor("#1d1b1b")
document.body.appendChild( renderer.domElement );
	/* renderer is the engine */
	/* parameters:
			- canvas: if not passed, a new canvas element is created
			- context: the canvas context
			- precision: shader precision, defaults to highp
			- alpha: transparency buffer, default is false
				* example: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_globalalpha
			- premultipliedAlpha: default is true - renderer assumes colors have PA 
				* uses a default blend operation capable of mixing alpha blending with additive blending effects
				* example: https://limnu.com/premultiplied-alpha-primer-artists/
			- antialias: default is false, true smooths object edges
			- stencil: default is true, whether there is a stencil buffer of at least 8 bits (limits the render area)
			- preserveDrawingBuffer: default false, true would preserve buffers until manually altered
			- powerPreference: hints to tuser indicating suitable GPU, default is default, other options are high-performance, low-power
			- failifMajorPerformanceCaveat: indicates if render fail is because of low performance
			- depth: default true, has depth buffer of at least 16 bits
			- logarithmicDepthBuffer: default false, may be neccesary to use this if dealing with huge differences in scale in a single scene
	*/

const geometry = new THREE.BoxGeometry(1, 1, 1);
	/* geometry creates skeleton of object */
	/* Buffer attributes:
		var vertices = geometry.attributes.position.array
		var faces = geometry.index.array
	*/
	/* SPHERE:
		const geometry = new THREE.SphereGeometry(2, 50, 50);
		SphereGeometry parameters:
			- radius *
			- widthSegments *
			- heightSegments *
			- phiStart
			- phiLength
			- thetaStart
			- thetaLength
	*/

const material = new THREE.MeshLambertMaterial({ color: 0xe226b3 });
	/* the skin that covers the skeleton - defines opacity, reflection, texture */
	/* options:
		- Material(): generic material
		- MeshBasicMaterial(): draws geometries in simple shades (flat color)
			* example: https://threejs.org/docs/scenes/material-browser.html#MeshBasicMaterial 
		- MeshStandardMaterial(): standard PBR (physically based rendering)
			* example: https://threejs.org/docs/scenes/material-browser.html#MeshStandardMaterial
		- MeshPhongMaterial(): non-physically based, calculates reflectance (shiny surfaces + specular highlights) ie. porcelain
			* example: https://threejs.org/docs/scenes/material-browser.html#MeshPhongMaterial
		- MeshLambertMaterial(): non-physically based, calculates reflectance (non-shiny surfaces, no specular highlights) ie. wood
			* example: https://threejs.org/docs/scenes/material-browser.html#MeshLambertMaterial
		- MeshPhysicalMaterial(): extention of MeshStandard, with more advanced PBR
			* example: https://threejs.org/docs/scenes/material-browser.html#MeshPhysicalMaterial
	*/

const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
	/* mesh is the machine that compiles the parts */

var light = new THREE.PointLight(0xFFFFFF, 1, 500)
light.position.set(10, 0, 25)
scene.add(light)
	/* light adds shadow on reflective materials */
	/* PointLight parameters:
	- color *
	- intensity *
	- distance *
	- decay
	*/

function animate() {
	// increments rotation:
	cube.rotation.x += 0.02;
	cube.rotation.y += 0.02;
	// calls render method:
	renderer.render( scene, camera );
	// invoked by browser's current refresh rate:
	requestAnimationFrame( animate );
}
animate();
