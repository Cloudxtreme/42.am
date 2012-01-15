var container, stats;
var camera, scene, renderer;
var text, plane;
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    var info = document.createElement( 'div' );
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.innerHTML = 'Contact us: <a href="mailto:us@42.am">us@42.am</a>';
    container.appendChild( info );
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 150, 500 );
    scene = new THREE.Scene();
    scene.add( camera );
    var theText = "Coming soon :)";
    var hash = document.location.hash.substr( 1 );
    if (hash.length !== 0) {
	theText = hash;
    }
    var text3d = new THREE.TextGeometry( theText, {
	size: 80,
	height: 20,
	curveSegments: 4,
	font: "helvetiker"
    });
    text3d.computeBoundingBox();
    var centerOffset = -0.5 * ( text3d.boundingBox.max.x - text3d.boundingBox.min.x );
    var textMaterial = new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, overdraw: true } );
    text = new THREE.Mesh( text3d, textMaterial );
    text.doubleSided = false;
    text.position.x = centerOffset;
    text.position.y = 100;
    text.position.z = 0;
    text.rotation.x = 0;
    text.rotation.y = Math.PI * 2;
    parent = new THREE.Object3D();
    parent.add( text );
    scene.add( parent );
    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    /*
      stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.top = '0px';
      container.appendChild( stats.domElement );
    */
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
}

function onDocumentMouseDown( event ) {
    event.preventDefault();
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener( 'mouseout', onDocumentMouseOut, false );
    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
}

function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
}

function onDocumentMouseUp( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseOut( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
    document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentTouchStart( event ) {
    if ( event.touches.length == 1 ) {
	event.preventDefault();
	mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;
    }
}

function onDocumentTouchMove( event ) {
    if ( event.touches.length == 1 ) {
	event.preventDefault();
	mouseX = event.touches[ 0 ].pageX - windowHalfX;
	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
    }
}

function animate() {
    requestAnimationFrame( animate );
    render();
    //stats.update();
}

function render() {
    parent.rotation.y += ( targetRotation - parent.rotation.y ) * 0.05 + .315;
    renderer.render( scene, camera );
}
