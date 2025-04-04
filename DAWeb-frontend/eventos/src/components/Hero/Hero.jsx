import React from 'react';
import styles from './Hero.module.scss';
import SocialIcons from '../Footer/SocialIcons';

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.videoWrap}>
        <video autoPlay muted loop className={styles.customVideo}>
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles.sectionOverlay}></div>

      <div className={`container text-center ${styles.heroContent}`}>
        <h1 className="display-3 fw-bold mb-3">EVENTOS</h1>
        <p className="lead mb-4">Vive el ritmo. Siente la magia.</p>
        <a href="#get-started" className={`btn ${styles.customBtn} mb-5`}>
          ¡Únete a nosotros!
        </a>
      </div>

      <div className={`container ${styles.heroInfo}`}>
        <div className="row "> 
          <div className="col-lg-9 d-flex align-items-center text-white mb-3 mb-lg-0">
          <h4 className="text-white mb-3 fw-bold">Próximo Macroevento: 29 de julio</h4>
          </div>
          <div className="col-lg-3 d-flex align-items-center">
            <h4 className="text-white mb-3 fw-bold">Share:</h4>
            <SocialIcons />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
