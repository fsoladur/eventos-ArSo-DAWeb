// src/components/About/About.jsx
import React from 'react';
import styles from './About.module.scss';

const About = () => {
  return (
    <section className={`${styles.aboutSection} section-padding`} id="about">
      <div className="container">
        <div className="row align-items-center">

          {/* Texto izquierda */}
          <div className="col-lg-6 col-12 mb-4 mb-lg-0">
            <div className={styles.textContent}>
              <h2 className="mb-4 text-white">Sobre Nuestro Portal de Eventos</h2>
              <p className="text-white">
              Organiza y gestiona tus eventos fácilmente desde un solo lugar.
Desde aquí podrás crear nuevos eventos, asignar espacios disponibles, controlar las reservas y mantener toda la información actualizada.
¡Optimiza la experiencia tanto para organizadores como asistentes!
              </p>
              <h6 className="text-white mt-4 fw-bold">Elíge tu rol</h6>
              <p className="text-white">Solo podrás realizar acciones limitadas a tu rol, elige bien.</p>
              <h6 className="text-white mt-4 fw-bold">Prueba nuestras reservas</h6>
              <p className="text-white">Miles de eventos te están esperando</p>
            </div>
          </div>

          {/* Imagen derecha */}
          <div className="col-lg-6 col-12">
            <div className={styles.imageWrapper}>
              <img src="/images/about-image.jpg" alt="About" className="img-fluid rounded" />
              <div className={styles.overlayCard}>
                <div>
                  <h5 className="fw-bold mb-1">Crea momentos felices</h5>
                  <p className="mb-0 text-muted">Todos nuestros clientes quedan así de satisfechos</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
