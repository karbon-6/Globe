import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import './App.css';
import { AmbientLight, DirectionalLight } from 'three';
import { MeshPhongMaterial } from 'three';
import countries from './data/custom.geo.json';
import lines from './data/lines.json';
import map from './data/map.json';

function GlobeScene() {
  const globeEl = useRef();
  const [arcsProcessed, setArcsProcessed] = useState(false);
  const Lines = lines.pulls;

  useEffect(() => {
    const directionalLight = new DirectionalLight('white', 5);
    const ambientLight = new AmbientLight('white', 1);
    globeEl.current.lights([ambientLight, directionalLight]);
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.35;

    console.log(Lines);
    setArcsProcessed(true);
  }, [arcsProcessed]);

  return (
    <div>
      <Globe
      ref = {globeEl}
        pointsMerge={true}
        pointAltitude={0.07}
        pointRadius={0.05}
        pointColor={() => "#ffffff"}
        pointsData={map.maps}
        labelAltitude={0.01}
        labelResolution={6}
        labelText={"city"}
        labelSize={(d) => 0.5 + d.size}
        labelDotRadius={0.3}
        labelColor={() => "#ffcb21"}
        labelsData={map.maps}
        arcDashInitialGap={(e) => e.order}
        arcsTransitionDuration={1000}
        arcDashAnimateTime={(d) => 1000}
        arcDashGap={4}
        arcDashLength={0.9}
        arcStroke={0.5}
        arcColor={() => "#900"}
        arcAltitude={(e) => e.arcAlt}
        arcsData={arcsProcessed ? Lines : []}
        hexPolygonResolution={3}
        hexPolygonColor={() => "#6a6ed2"}
        hexPolygonMargin={0.7}
        hexPolygonsData={arcsProcessed ? countries.features : []}
        animateIn={true}
        showGlobe={true}
        atmosphereAltitude={0.25}
        atmosphereColor={'MediumSlateBlue'}
        globeMaterial={new MeshPhongMaterial({ color: '#3a228a' })}
      />
    </div>
  );
}

function App() {
  return (
    <div className="Canvas">
      <GlobeScene />
    </div>
  );
}

export default App;
