import React, { useEffect } from 'react';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


function App() {
  const name ='Ranjith Bantu';
  useEffect(() => {
    // Update the document title using the browser API
    let scene, camera, renderer, controls;
    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight, 45,3000);
      camera.position.set(0, 0,-400);
      renderer = new THREE.WebGLRenderer({antialias:true});
      renderer.setSize(window.innerWidth,window.innerHeight);
      document.body.appendChild(renderer.domElement);
      controls = new OrbitControls(camera, renderer.domElement);
      controls.addEventListener('change', render);
      function render() {
        renderer.render( scene, camera );
      }
      controls.minDistance = 0;
      controls.maxDistance = 700;
      controls.update();
      
      let materialArray = [];
      let texture_ft = new THREE.TextureLoader().load( '/penguins/barren_ft.jpg');
      let texture_bk = new THREE.TextureLoader().load( '/penguins/barren_bk.jpg');
      let texture_up = new THREE.TextureLoader().load( '/penguins/barren_up.jpg');
      let texture_dn = new THREE.TextureLoader().load( '/penguins/barren_dn.jpg');
      let texture_rt = new THREE.TextureLoader().load( '/penguins/barren_rt.jpg');
      let texture_lf = new THREE.TextureLoader().load( '/penguins/barren_lf.jpg');
        
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
 
      for (let i = 0; i < 6; i++)
         materialArray[i].side = THREE.BackSide;
      let skyboxGeo = new THREE.BoxGeometry( 1000, 1000, 1000);
      let skybox = new THREE.Mesh( skyboxGeo, materialArray );
      scene.add( skybox );  
      animate();
    }
    function animate() {      
      controls.update();
      renderer.render(scene,camera);
      requestAnimationFrame(animate);
      
    }
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth/window.innerHeight;
      //camera.updateProjectMatrix();
    }) 
    init();
  });
  return (
    <div className="App">
      <h6>This is simple virtual world by {name}</h6>
    </div>
  );
}

export default App;
