import './App.css';
import React, {useState,useEffect} from 'react'
import {gsap, TweenMax, TimelineMax} from 'gsap'
import styled from 'styled-components'
import * as THREE from 'three';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial, // no light
  MeshPhongMaterial,
  Mesh,
  Color,
  CubeTextureLoader,
  AxesHelper,
  GridHelper,
  SpotLight,
  TextureLoader, SphereGeometry
} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/* 1. Creating the scene */
/* scene, camera, renderer 셋팅하기 + grid */
let scene, camera, renderer,controls,aspect;
let cube, earth;

function init () {

  scene = new Scene(); //set scene
  scene.background = new Color(0x392A8B)

  aspect = window.innerWidth / window.innerHeight;
  camera = new PerspectiveCamera( 85, aspect , 0.1, 1000 ); // set camera
  setCameraPosition(0,2.5,50)

  renderer = new WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight ); // set size of renderer
  document.body.appendChild( renderer.domElement ); // add renderer element to HTML document (<canvas>)

  controls= new OrbitControls (camera, renderer.domElement)

  setGrid()
  setTexture()

  /* 박스 만들기 */
  const geometry = new BoxGeometry(20, 20,20); //BoxGeometry : This is an object that contains all the points (vertices) and fill (faces) of the cube.

  const loader = new TextureLoader();
  const material = new MeshPhongMaterial( { color: 0x666666,
    map: loader.load('/images/que-holo.png'),
  } ); //MeshBasicMaterial : we need a material to color it

  cube = new Mesh ( geometry, material ); //Mesh :  takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around
  scene.add ( cube ); //By default, when we call scene.add(), the thing we add will be added to the coordinates (0,0,0).


  /* 지구 만들기 */
  const geometry2 = new SphereGeometry(100, 50,50); //BoxGeometry : This is an object that contains all the points (vertices) and fill (faces) of the cube.

  const loader2 = new TextureLoader();
  const material2 = new MeshBasicMaterial( {
    map: loader2.load('/images/earth.png'),
  } ); //MeshBasicMaterial : we need a material to color it

  earth = new Mesh ( geometry2, material2 ); //Mesh :  takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around
  earth.position.x = 100
  earth.position.x = 200
  scene.add ( earth ); //By default, when we call scene.add(), the thing we add will be added to the coordinates (0,0,0).

  /* 텍스트 만들기 */
  // const endText = new THREE.TextGeometry( '끝' );
  //   // scene.add ( endText )


  /* SpotLight */
  //SpotLight1
  const spotLight = new SpotLight(0xffffff);
  spotLight.position.set(600,1000,100);

  spotLight.castShadow = true;

  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 40;

  //SpotLight2
  const spotLight2 = new SpotLight(0xffffff);
  spotLight2.position.set(2000,-1000,3000);

  spotLight2.castShadow = true;

  spotLight2.shadow.camera.near = 500;
  spotLight2.shadow.camera.far = 4000;
  spotLight2.shadow.camera.fov = 40;

  scene.add(spotLight);
  scene.add(spotLight2);

  /* Texture */
  setTexture()

}

function setCameraPosition (x,y,z) {
  // camera.position.set(x,y,z)

  let tl = new TimelineMax().delay(.3);
  tl.to(camera.position,1, {x:x,y:y,z:z})
}

function setGrid () {
  const axes = new AxesHelper(50);
  scene.add(axes)
  const gridHelper = new GridHelper(100,5);
  scene.add(gridHelper)
}

function setTexture () {
  let imageLoader = new TextureLoader();

  imageLoader.load('/images/stars.jpg', function(data) {
    const material_univ = new MeshBasicMaterial({
      map : data,
      side :THREE.BackSide
    })
    const geometry_univ = new SphereGeometry(400,32,32);
    const mesh = new Mesh(geometry_univ, material_univ);
    scene.add( mesh )
  })
}

function render() {
  requestAnimationFrame(render)
  controls.update();
  renderer.render(scene,camera)

  /* Animating the cube */
  cube.rotation.x += 0.0009;
  cube.rotation.y += 0.002;
  earth.rotation.x += 0.0005;
  earth.rotation.y += 0.00001;
}

const App = () => {
  const [active,setActive] = useState(0);

  const cameraPosition = {
    [0] : [0,2.5,50],
    [1] : [70,30,20],
    [2] : [-60,60,60],
    [3] : [200,200,200],
  }

  React.useEffect(()=>{
    init()
    render()
  },[])

  React.useEffect(()=>{
    const arr = cameraPosition[active];
    setCameraPosition(arr[0],arr[1],arr[2])
  },[active])

  return (
    <div className="App">
      <Navigation>
        <div>
          <Button onClick={()=>{
            active === 1 ?setActive(0):setActive(1);}
          } active={active===1}>1</Button>
          <Button onClick={()=>{
            active === 2 ?setActive(0):setActive(2);}
          } active={active===2}>2</Button>
          <Button onClick={()=>{
            active === 3 ?setActive(0):setActive(3);}
          } active={active===3}>3</Button>
        </div>
      </Navigation>
    </div>
  );
}

/* style */
const Navigation = styled.div`
  position:fixed;
  left: 0;right: 0;top: 0;
  z-index: 2;
  >div{
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    margin:0 auto;
    height: 80px;
  }
`
const Button = styled.button`
 margin : 0 10px;
 width: 70px;
 height: 40px;
 background-color:  ${({active})=> active ?`#392A8B`: `rgba(255,255,255,0.5)`};
color:  ${({active})=> active ?`#fff`: `#000`};
 border: 0;
 font-size: 20px;
 outline: 0;
 transition:all .3s;
 border-radius: 6px;
 cursor:pointer;
`

/* end style */

export default App;
