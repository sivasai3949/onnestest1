import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Div from "../Div";
import Spacing from "../Spacing";

export default function AISimulation() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [location]);

  return (
    <Div className="container">
      {/* Section 1: CFM */}
      <Spacing lg="100" md="60" />
      <div id="cfm">
        <h1>CFM</h1>
        <p>
          Computational Fluid Mechanics (CFM) deals with the simulation of fluid flow using numerical methods and algorithms. 
          It helps in analyzing complex engineering systems without the need for physical prototypes.
        </p>
        <Div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '30px' }}>
          <img src="/images/cfm1.jpg" alt="CFM 1" style={{ flex: '1 1 30%', maxWidth: '30%', borderRadius: '12px', minWidth: '250px' }} />
          <img src="/images/cfm2.jpg" alt="CFM 2" style={{ flex: '1 1 30%', maxWidth: '30%', borderRadius: '12px', minWidth: '250px' }} />
          <img src="/images/cfm3.jpg" alt="CFM 3" style={{ flex: '1 1 30%', maxWidth: '30%', borderRadius: '12px', minWidth: '250px' }} />
        </Div>
      </div>

      {/* Section 2: Quantum CFD */}
      <Spacing lg="100" md="60" />
      <div id="quantum-cfd">
        <h1>Quantum CFD</h1>
        <p>
          Quantum Computational Fluid Dynamics (Quantum CFD) explores the use of quantum computing for simulating and solving 
          fluid mechanics problems that are computationally intensive for classical computers.
        </p>
        <Div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '30px' }}>
          <img src="/images/qcfd1.jpg" alt="Quantum CFD 1" style={{ flex: '1 1 45%', maxWidth: '45%', borderRadius: '12px', minWidth: '250px' }} />
          <img src="/images/qcfd2.jpg" alt="Quantum CFD 2" style={{ flex: '1 1 45%', maxWidth: '45%', borderRadius: '12px', minWidth: '250px' }} />
          <img src="/images/qcfd3.jpg" alt="Quantum CFD 3" style={{ flex: '1 1 45%', maxWidth: '45%', borderRadius: '12px', minWidth: '250px' }} />
        </Div>
      </div>

      {/* Section 3: New Materials */}
      <Spacing lg="100" md="60" />
      <div id="new-materials">
        <h1>New Materials</h1>
        <p>
          The development of new materials is crucial for advancing technologies in AI, simulation, aerospace, electronics, and energy. 
          Simulation allows us to predict material behaviors under various conditions.
        </p>
        <Div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '30px' }}>
          <img src="/images/material1.jpg" alt="Material 1" style={{ flex: '1 1 30%', maxWidth: '30%', borderRadius: '12px', minWidth: '250px' }} />
          <img src="/images/material2.jpg" alt="Material 2" style={{ flex: '1 1 30%', maxWidth: '30%', borderRadius: '12px', minWidth: '250px' }} />
          <img src="/images/material3.jpg" alt="Material 3" style={{ flex: '1 1 30%', maxWidth: '30%', borderRadius: '12px', minWidth: '250px' }} />
        </Div>
      </div>

      <Spacing lg="100" md="60" />
    </Div>
  );
}
