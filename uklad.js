var gui = new dat.GUI();

var params = {
    
    Distance_Scale: 0.01,
    Time_Scale: 10000,
    Planet_Size_Scale: 1,
    Camera_Zoom_Sensitivity: 0.5,
	Camera_Move_sensitivity: 0.5,
	Displaying_Orbits: true


};

gui.add(params, 'Distance_Scale', 0.0025, 0.1).onChange(function(value) {
    DistanceScale = value;
});

gui.add(params, 'Time_Scale', 1, 1000000000).onChange(function(value) {
    MultiTime = value;
});
gui.add(params, 'Planet_Size_Scale', 1, 5).onChange(function(value) {
    planetScale = value;
});

gui.add(params, 'Camera_Zoom_Sensitivity', 0.005, 1).onChange(function(value) {
    camZoomSpeed = value;
});

gui.add(params, 'Camera_Move_sensitivity', 0.005, 1).onChange(function(value) {
    camRotateSpeed = value;
});

gui.add(params, 'Displaying_Orbits').onChange(function(value) {
  if (value) {
    TF=true;
  } else {
    TF=false;
  }
});

var TF=true;
const  SunSize=10;
const  Year=3600*60*24*365.242199;

var DistanceScale=0.01;
var MultiTime=10000;
var camZoomSpeed = 0.5;
var camRotateSpeed = 0.5;
var planetScale=1.0;

const MercuryScale=0.003505;
const VenusScale=0.0086954;
const EarthScale=0.0091638;
const MarsScale=0.0048886;
const JupiterScale=0.1027184;
const SaturnScale=0.08659195;
const UranusScale=0.0367227;
const NeptuneScale=0.03558046;
const MoonScale=0.00249569;
const FobosScale=10*0.0000161882;
const DeimosScale=10*0.00000905172;

const MercuryDiscFromSun=83.20283;
const VenusDiscFromSun=155.147259;
const EarthDiscFromSun=214.93949;
const MarsDiscFromSun=327.49517;
const JupiterDiscFromSun=1118.4081;
const SaturnDiscFromSun=2049.89283;
const UranusDiscFromSun=4124.96009;
const NeptuneDiscFromSun=6463.00704;
const MoonDiscFromEarth=0.552298851;
const FobosDiscFromMars=0.013505747;
const DeimosDiscFromMars=0.0000337055;

const MercuryRotAroundSun=0.2408;
const VenusRotAroundSun=0.6152;
const EarthRotAroundSun=1.0;
const MarsRotAroundSun=1.8808;
const JupiterRotAroundSun=11.8637;
const SaturnRotAroundSun=29.4484;
const UranusRotAroundSun=84.0711;
const NeptuneRotAroundSun=164.8799;
const MoonRotAroundEarth=0.074794521;
const FobosRotAroundMars=0.000913242;
const DeimosRotAroundMars=0.003458742;

const SunSpin=0.0711856409;
const MercurySpin=0.2408219;
const VenusSpin=0.6653119;
const EarthSpin=0.0027379;
const MarsSpin=0.00280635;
const JupiterSpin=0.00112938;
const SaturnSpin=0.00175019;
const UranusSpin=0.001220651;
const NeptuneSpin=0.001802456;
const MoonSpin=0.074197341;
const FobosSpin=0.000867004601;
const DeimosSpin=0.0034566104;

const textureLoader = new THREE.TextureLoader();
const SunTexture = textureLoader.load('https://raw.githubusercontent.com/WaelYasmina/solarsystem/main/src/img/sun.jpg');
const MercuryTexture = textureLoader.load('https://raw.githubusercontent.com/WaelYasmina/solarsystem/main/src/img/mercury.jpg');
const VenusTexture = textureLoader.load('https://raw.githubusercontent.com/WaelYasmina/solarsystem/main/src/img/venus.jpg');
const EarthTexture = textureLoader.load('https://raw.githubusercontent.com/WaelYasmina/solarsystem/main/src/img/earth.jpg');
const MarsTexture = textureLoader.load('https://raw.githubusercontent.com/WaelYasmina/solarsystem/main/src/img/mars.jpg');
const JupiterTexture = textureLoader.load('https://raw.githubusercontent.com/WaelYasmina/solarsystem/main/src/img/jupiter.jpg');
const SaturnTexture = textureLoader.load('https://raw.githubusercontent.com/WaelYasmina/solarsystem/main/src/img/saturn.jpg');
const UranusTexture = textureLoader.load('https://raw.githubusercontent.com/WaelYasmina/solarsystem/main/src/img/uranus.jpg');
const NeptuneTexture = textureLoader.load('https://raw.githubusercontent.com/WaelYasmina/solarsystem/main/src/img/neptune.jpg');
const MoonTexture = textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg');
const DeimosTexture = textureLoader.load('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5938ae9e-47de-424a-8836-f98e6658d37b/dczaq88-d97d6ecd-a233-48a8-b1bc-74fd3327f95c.png/v1/fill/w_1264,h_632,q_70,strp/deimos_texture_map_by_askaniy_dczaq88-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjA0OCIsInBhdGgiOiJcL2ZcLzU5MzhhZTllLTQ3ZGUtNDI0YS04ODM2LWY5OGU2NjU4ZDM3YlwvZGN6YXE4OC1kOTdkNmVjZC1hMjMzLTQ4YTgtYjFiYy03NGZkMzMyN2Y5NWMucG5nIiwid2lkdGgiOiI8PTQwOTYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hNuoyXLVNFXX4E21fnZN6hAhDAW1VPNBsNdDzYwmGhk');
const FobosTexture = textureLoader.load('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5938ae9e-47de-424a-8836-f98e6658d37b/dcyuzcx-398c9062-444d-48c4-9e60-3b3d502d9063.png/v1/fill/w_1264,h_632,q_70,strp/phobos_texture_map_by_askaniy_dcyuzcx-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjA0OCIsInBhdGgiOiJcL2ZcLzU5MzhhZTllLTQ3ZGUtNDI0YS04ODM2LWY5OGU2NjU4ZDM3YlwvZGN5dXpjeC0zOThjOTA2Mi00NDRkLTQ4YzQtOWU2MC0zYjNkNTAyZDkwNjMucG5nIiwid2lkdGgiOiI8PTQwOTYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.vquj-n2V8i0X10mAZCNXe6e_IVL7nYnXWyr33m39bJ0');
const SpaceTexture = textureLoader.load('https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80');
const SaturnRingTexture = textureLoader.load('https://scontent-fra3-1.xx.fbcdn.net/v/t1.15752-9/327700559_490626496393568_5814436506753606614_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=CwUEOjmf1JAAX_WmhMd&_nc_ht=scontent-fra3-1.xx&oh=03_AdQDJPR-cqVF84Id9ms2YKwXq4kyYYPZcBGPwqeV0Oil5A&oe=640C8B73');


const scene = new THREE.Scene();
scene.background = SpaceTexture;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.y = 50;
camera.position.z = 120;
camera.lookAt( scene.position );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( new THREE.Color( 0xffffff ) )
document.getElementsByTagName('body')[0].appendChild( renderer.domElement );


var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0, 0, 0);
light.castShadow = true;

var AmbientLight = new THREE.AmbientLight( 0xff8080, 0.3);
scene.add( light,AmbientLight );
scene.add(light);

function makeSphere(scale,texture) {
    const geometry = new THREE.SphereGeometry(scale*SunSize, 64, 64);
    const material = new THREE.MeshPhongMaterial({map: texture})
    material.receiveShadow = true;
    return new THREE.Mesh(geometry, material);
}

function createPlanet(scale,texture){
	const sphere = makeSphere(scale,texture);
	const pivot = new THREE.Object3D();
	pivot.add(sphere);
	return{
		sphere,pivot
	}
}

function makeSun(scale,texture) {
    const geometry = new THREE.SphereGeometry(scale*SunSize, 64, 64);
    const material = new THREE.MeshBasicMaterial({map: texture})
    material.receiveShadow = true;
    return new THREE.Mesh(geometry, material);
}

function createSun(scale,texture){
	const sphere = makeSun(scale,texture);
	const pivot = new THREE.Object3D();
	pivot.add(sphere);
	return{
		sphere,pivot
	}
}

function createOrbit(radius){
	var material = new THREE.LineBasicMaterial({ color: 0xffffff });
	var geometry = new THREE.BufferGeometry().setFromPoints(
    new THREE.Path().absarc(0, 0, radius, 0, Math.PI * 2).getSpacedPoints(100));
	var orbit = new THREE.Line( geometry, material );
	orbit.rotation.x=Math.PI/2;
	return orbit;
}

function scaleOrbit(orbit,radious){
	var newGeometry = new THREE.BufferGeometry().setFromPoints(
        new THREE.Path().absarc(0, 0, radious, 0, Math.PI * 2).getSpacedPoints(100));
    	orbit.geometry = newGeometry;
}


function createRing(radious,width,texture){
		const RingGeo = new THREE.RingGeometry(radious,width,100)
		const RingMat = new THREE.MeshPhongMaterial({map: texture, side: THREE.DoubleSide
	});
	RingMat.receiveShadow = true;
	const ring = new THREE.Mesh(RingGeo,RingMat);
	ring.rotation.x=Math.PI/2;
	return ring;
}



var sun = createSun(1,SunTexture)
var mercury = createPlanet(MercuryScale,MercuryTexture)
var venus = createPlanet(VenusScale,VenusTexture)
var earth = createPlanet(EarthScale,EarthTexture)
var mars = createPlanet(MarsScale,MarsTexture)
var jupiter = createPlanet(JupiterScale,JupiterTexture)
var saturn = createPlanet(SaturnScale,SaturnTexture)
var uranus = createPlanet(UranusScale,UranusTexture)
var neptune = createPlanet(NeptuneScale,NeptuneTexture)
var moon = createPlanet(MoonScale,MoonTexture)
var fobos = createPlanet(FobosScale,MoonTexture)
var deimos = createPlanet(DeimosScale,DeimosTexture)
var saturnRing = createRing(SaturnScale+0.9,1.3,SaturnRingTexture)

sun.sphere.position.x=0;
sun.pivot.position.x=0;

mercury.sphere.position.x = MercuryDiscFromSun*DistanceScale+SunSize;
mercury.pivot.position.x = 0;

venus.sphere.position.x = VenusDiscFromSun*DistanceScale+SunSize;
venus.pivot.position.x = 0;

earth.sphere.position.x = EarthDiscFromSun*DistanceScale+SunSize;
earth.pivot.position.x = 0;

mars.sphere.position.x = MarsDiscFromSun*DistanceScale+SunSize;
mars.pivot.position.x = 0;

jupiter.sphere.position.x = JupiterDiscFromSun*DistanceScale+SunSize;
jupiter.pivot.position.x = 0;

saturn.sphere.position.x = SaturnDiscFromSun*DistanceScale+SunSize;
saturn.pivot.position.x = 0;

uranus.sphere.position.x = UranusDiscFromSun*DistanceScale+SunSize;
uranus.pivot.position.x = 0;

neptune.sphere.position.x = NeptuneDiscFromSun*DistanceScale+SunSize;
neptune.pivot.position.x = 0;

moon.pivot.position.x = earth.sphere.position.x;
moon.sphere.position.x = ((EarthScale*SunSize)+MoonDiscFromEarth*DistanceScale);

fobos.pivot.position.x = mars.sphere.position.x;
fobos.sphere.position.x = ((MarsScale*SunSize)+FobosDiscFromMars*DistanceScale);

deimos.pivot.position.x = mars.sphere.position.x;
deimos.sphere.position.x = ((MarsScale*SunSize)+DeimosDiscFromMars*DistanceScale);

var mercuryOrbit = createOrbit(mercury.sphere.position.x);
var venusOrbit = createOrbit(venus.sphere.position.x);
var earthOrbit = createOrbit(earth.sphere.position.x);
var marsOrbit = createOrbit(mars.sphere.position.x);
var jupiterOrbit = createOrbit(jupiter.sphere.position.x);
var saturnOrbit = createOrbit(saturn.sphere.position.x);
var uranusOrbit = createOrbit(uranus.sphere.position.x);
var neptuneOrbit = createOrbit(neptune.sphere.position.x);

const earthSystem = new THREE.Group();
	earthSystem.add(earth.pivot,moon.pivot,earth.sphere)

const marsSystem = new THREE.Group();
	marsSystem.add(mars.pivot,fobos.pivot,deimos.pivot)

const orbits = new THREE.Object3D();
	orbits.add(mercuryOrbit,venusOrbit,earthOrbit,marsOrbit,jupiterOrbit,saturnOrbit,uranusOrbit,neptuneOrbit);



const saturnSystem = new THREE.Object3D();
saturnSystem.add(saturn.pivot,saturnRing);

	controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.listenToKeyEvents( window ); 
 
				controls.enableDamping = true; 
				controls.dampingFactor = 0.1;
 
				controls.screenSpacePanning = true;

 
				controls.minDistance = 0.3;
				controls.maxDistance = 200;
 
				controls.maxPolarAngle = Math.PI / 2;


scene.add(sun.pivot,mercury.pivot,venus.pivot,jupiter.pivot,saturnSystem,uranus.pivot,neptune.pivot,earthSystem,marsSystem,orbits);


	function animate() {
	
controls.zoomSpeed = camZoomSpeed;
controls.rotateSpeed = camRotateSpeed;

if(TF==true){orbits.visible=true;}
else{orbits.visible=false;}


sun.sphere.position.x=0;
sun.pivot.position.x=0;


mercury.sphere.position.x = MercuryDiscFromSun*DistanceScale+SunSize;
mercury.pivot.position.x = 0;
mercury.sphere.scale.x=planetScale;
mercury.sphere.scale.y=planetScale;
mercury.sphere.scale.z=planetScale;

venus.sphere.position.x = VenusDiscFromSun*DistanceScale+SunSize;
venus.pivot.position.x = 0;
venus.sphere.scale.x=planetScale;
venus.sphere.scale.y=planetScale;
venus.sphere.scale.z=planetScale;

earth.sphere.position.x = EarthDiscFromSun*DistanceScale+SunSize;
earth.pivot.position.x = 0;
earth.sphere.scale.x=planetScale;
earth.sphere.scale.y=planetScale;
earth.sphere.scale.z=planetScale;

mars.sphere.position.x = MarsDiscFromSun*DistanceScale+SunSize;
mars.pivot.position.x = 0;
mars.sphere.scale.x=planetScale;
mars.sphere.scale.y=planetScale;
mars.sphere.scale.z=planetScale;

jupiter.sphere.position.x = JupiterDiscFromSun*DistanceScale+SunSize;
jupiter.pivot.position.x = 0;
jupiter.sphere.scale.x=planetScale;
jupiter.sphere.scale.y=planetScale;
jupiter.sphere.scale.z=planetScale;

saturn.sphere.position.x = SaturnDiscFromSun*DistanceScale+SunSize;
saturn.pivot.position.x = 0;
saturn.sphere.scale.x=planetScale;
saturn.sphere.scale.y=planetScale;
saturn.sphere.scale.z=planetScale;
saturnRing.position.x=saturn.sphere.position.x;
saturnRing.scale.x=planetScale;
saturnRing.scale.y=planetScale;
saturnRing.scale.z=planetScale;


uranus.sphere.position.x = UranusDiscFromSun*DistanceScale+SunSize;
uranus.pivot.position.x = 0;
uranus.sphere.scale.x=planetScale;
uranus.sphere.scale.y=planetScale;
uranus.sphere.scale.z=planetScale;

neptune.sphere.position.x = NeptuneDiscFromSun*DistanceScale+SunSize;
neptune.pivot.position.x = 0;
neptune.sphere.scale.x=planetScale;
neptune.sphere.scale.y=planetScale;
neptune.sphere.scale.z=planetScale;

moon.pivot.position.x = earth.sphere.position.x;
moon.sphere.position.x = ((EarthScale*SunSize*planetScale)+MoonDiscFromEarth*DistanceScale*10*planetScale);
moon.sphere.scale.x=planetScale;
moon.sphere.scale.y=planetScale;
moon.sphere.scale.z=planetScale;

fobos.pivot.position.x = mars.sphere.position.x;
fobos.sphere.position.x = ((MarsScale*SunSize*planetScale)+FobosDiscFromMars*DistanceScale*10*planetScale);
fobos.sphere.scale.x=planetScale;
fobos.sphere.scale.y=planetScale;
fobos.sphere.scale.z=planetScale;

deimos.pivot.position.x = mars.sphere.position.x;
deimos.sphere.position.x = ((MarsScale*SunSize*planetScale)+DeimosDiscFromMars*DistanceScale*10*planetScale);
deimos.sphere.scale.x=planetScale;
deimos.sphere.scale.y=planetScale;
deimos.sphere.scale.z=planetScale;


 
		scaleOrbit(mercuryOrbit,mercury.sphere.position.x);
		scaleOrbit(venusOrbit,venus.sphere.position.x);
		scaleOrbit(earthOrbit,earth.sphere.position.x);
		scaleOrbit(marsOrbit,mars.sphere.position.x);
		scaleOrbit(jupiterOrbit,jupiter.sphere.position.x);
		scaleOrbit(saturnOrbit,saturn.sphere.position.x);
		scaleOrbit(uranusOrbit,uranus.sphere.position.x);
		scaleOrbit(neptuneOrbit,neptune.sphere.position.x);


		mercury.pivot.rotation.y+=((2*Math.PI*MultiTime)/(Year*MercuryRotAroundSun));
		venus.pivot.rotation.y+=((2*Math.PI*MultiTime)/(Year*VenusRotAroundSun));
		earthSystem.rotation.y+=((2*Math.PI*MultiTime)/(Year*EarthRotAroundSun));
		marsSystem.rotation.y+=((2*Math.PI*MultiTime)/(Year*MarsRotAroundSun));
		jupiter.pivot.rotation.y+=((2*Math.PI*MultiTime)/(Year*JupiterRotAroundSun));
		saturnSystem.rotation.y+=((2*Math.PI*MultiTime)/(Year*SaturnRotAroundSun));
		uranus.pivot.rotation.y+=((2*Math.PI*MultiTime)/(Year*UranusRotAroundSun));
		neptune.pivot.rotation.y+=((2*Math.PI*MultiTime)/(Year*NeptuneRotAroundSun));
		moon.pivot.rotation.y+=((2*Math.PI*MultiTime)/(Year*MoonRotAroundEarth));
		fobos.pivot.rotation.y+=((2*Math.PI*MultiTime)/(Year*FobosRotAroundMars));
		deimos.pivot.rotation.y+=((2*Math.PI*MultiTime)/(Year*DeimosRotAroundMars));

		sun.sphere.rotation.y+=((2*Math.PI*MultiTime)/(Year*SunSpin));
		mercury.sphere.rotation.y+=((2*Math.PI*MultiTime)/(Year*MercurySpin));
		venus.sphere.rotation.y-=((2*Math.PI*MultiTime)/(Year*VenusSpin));
		earth.sphere.rotation.y+=((2*Math.PI*MultiTime)/(Year*EarthSpin));
		mars.sphere.rotation.y+=((2*Math.PI*MultiTime)/(Year*MarsSpin));
		jupiter.sphere.rotation.y+=((2*Math.PI*MultiTime)/(Year*JupiterSpin));
		saturn.sphere.rotation.y+=((2*Math.PI*MultiTime)/(Year*SaturnSpin));
		uranus.sphere.rotation.y+=((2*Math.PI*MultiTime)/(Year*UranusSpin));
		neptune.sphere.rotation.y+=((2*Math.PI*MultiTime)/(Year*NeptuneSpin));
		moon.sphere.rotation.y+=((2*Math.PI*MultiTime)/(Year*MoonSpin));
		fobos.sphere.rotation.y+=((2*Math.PI*MultiTime)/(Year*FobosSpin));
		deimos.sphere.rotation.y+=((2*Math.PI*MultiTime)/(Year*DeimosSpin));
		saturnRing.rotation.z-=((2*Math.PI*MultiTime)/(Year*SaturnSpin));

 		controls.update();
 		renderer.render(scene, camera);	
}
renderer.setAnimationLoop(animate);