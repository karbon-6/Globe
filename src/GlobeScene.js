import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import { AmbientLight, DirectionalLight, PointLight, SpotLight } from 'three';
import { MeshPhongMaterial } from 'three';
import countries from './data/custom.geo.json';

// import lines from './data/lines.json';
// import map from './data/map.json';

const GlobeScene = ({ lines, map }) => {
  const globeEl = useRef();
  const [arcsProcessed, setArcsProcessed] = useState(false);
  let Lines = [];
  let Map = [];
  if(map)
  {
    Map = map.maps;
  }
  if (lines) {
    Lines = lines.pulls;
  }

  useEffect(() => {
    const camera = globeEl.current.camera();

    const directionalLight = new DirectionalLight('white', 4);
    const ambientLight = new AmbientLight('white', 0.3);
    const pointLight = new PointLight('white', 500, 10)
    const spotLight = new SpotLight('white', 1000)
    pointLight.position.copy(camera.position);
    directionalLight.position.copy(camera.position);
    // ambientLight.position.copy(camera.position);
    globeEl.current.lights([ambientLight]);
    // globeEl.current.scene().add(directionalLight);
    globeEl.current.scene().add(directionalLight);
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.5;
    console.log(Lines);
    setArcsProcessed(true);
  }, [arcsProcessed]);

  return (
    <div>
      <Globe
        ref={globeEl}
        pointsMerge={true}
        pointAltitude={0.07}
        pointRadius={0.05}
        pointColor={() => "#ffffff"}
        pointsData={Map}
        labelAltitude={0.01}
        labelResolution={6}
        labelText={"city"}
        labelSize={(d) => 0.5 + d.size}
        labelDotRadius={0.3}
        labelColor={() => "#ffcb21"}
        labelsData={Map}
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

export default GlobeScene;
