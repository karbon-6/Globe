import {useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';
import './App.css';
import { AmbientLight, DirectionalLight } from 'three';
import { MeshPhongMaterial } from 'three';
import countries from './data/custom.geo.json';
import lines from './data/lines.json';
import map from './data/map.json';
function GlobeScene() {
  const globeEl = useRef();

  useEffect(() => {
    const directionalLight = new DirectionalLight('white', 5);
    const ambientLight = new AmbientLight('white', 1);
    globeEl.current.lights([ambientLight, directionalLight]);
  }, []);
  return (

    <Globe  
    pointsMerge={true} 
    pointAltitude={0.07} 
    pointRadius={0.05} 
    pointColor={() => "#ffffff"} 
    pointsData={map.maps} 
    labelAltitude={0.01} 
    labelResolution={6} 
    labelText={"city"} 
    labelSize={(e) => e.size} 
    labelDotRadius={0.3} 
    labelColor={() => "#ffcb21"} 
    labelsData={map.maps} 
    arcDashInitialGap={(e) => e.order} 
    arcsTransitionDuration={1000} 
    arcDashAnimateTime={1000} 
    arcDashGap={4} 
    arcDashLength={0.9} 
    arcStroke={0.5} 
    arcColor={() => "#900"} 
    arcAltitude={(e) => e.arcAlt} 
    arcsData={lines.pulls} 
    ref={globeEl} 
    hexPolygonResolution={3} 
    hexPolygonColor={() => "#6a6ed2"}
    hexPolygonMargin={0.7} 
    hexPolygonsData={countries.features} 
    animateIn={true} 
    showGlobe={true} 
    atmosphereAltitude={0.25} 
    atmosphereColor={'MediumSlateBlue'} 
    globeMaterial={new MeshPhongMaterial({ color: '#3a228a', immisive: '#220038', immisiveIntensity: 0.1 })}  >

    </Globe>
  );
}


function App() {
  return (
    <div className="Canvas">
      <ambientLight intensity={20} />
      <GlobeScene />
    </div>
  );
}

export default App;