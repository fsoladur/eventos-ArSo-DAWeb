import React from 'react';
import styles from './Footer.module.scss';
import SocialIcons from './SocialIcons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className="container">
          <div className="row">

            <div className="col-lg-6 col-12">
              <h2 className="text-white mb-lg-0 fw-bold">Eventos</h2>
            </div>

            <div className="col-lg-6 col-12 d-flex justify-content-lg-end align-items-center">
                <SocialIcons />
            </div>

          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-3 col-12"> 
            <h5 className={styles.footerTitle + ' mb-3'}>Enlaces de interés</h5>
            <ul className={styles.footerLinks + ' d-flex flex-column'}>
              <li className={styles.footerLinkItem}>
                <a href="#" className={styles.footerLink}>Inicio</a>
              </li>
              <li className={styles.footerLinkItem}>
                <a href="#" className={styles.footerLink}>Eventos</a>
              </li>
              <li className={styles.footerLinkItem}>
                <a href="#" className={styles.footerLink}>Reservas</a>
              </li>
              <li className={styles.footerLinkItem}>
                <a href="#" className={styles.footerLink}>Espacios</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <h5 className={styles.footerTitle + ' mb-3'}>¿Tienes alguna duda?</h5>

            <p className="text-white d-flex mb-1">
              <a href="tel: 123-456-789" className={styles.footerLink}>
                123-456-789
              </a>
            </p>

            <p className="text-white d-flex">
              <a href="mailto:eventos@fabianto.com" className={styles.footerLink}>
                eventos@fabianto.com
              </a>
            </p>
          </div>

          <div className="col-lg-3 col-md-6 col-11 mb-4 mb-lg-0 mb-md-0">
            <h5 className={styles.footerTitle + ' mb-3'}>Localización</h5>
            <p className={styles.location}>
                Calle de los Eventos, 123 – Ciudad Universitaria, España
            </p>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 mb-md-0">
            <h5 className={styles.footerTitle + ' mb-3'}>Suscríbete a nuestro boletín</h5>
            <p className="text-white mb-3">Recibe las últimas novedades y ofertas exclusivas.</p>
            <form className='d-flex gap-1'>
                <input type="email" className='form-control-sm' placeholder="Tu correo electrónico" />
                <button type="submit" className='btn btn-primary btn-sm'>Suscribirse</button>
            </form>
          </div>

        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <div className="row">

            <div className="col-lg-3 col-12 mt-5">
              <p className={styles.copyright}>
                Copyright © 2036 Eventos Fabianto
              </p>
            </div>

            <div className="col-lg-8 col-12 mt-lg-5">
              <ul className={styles.footerLinks}>
                <li className={styles.footerLinkItem}>
                  <a href="#" className={styles.footerLink}>Terminos &amp; Condiciones</a>
                </li>
                <li className={styles.footerLinkItem}>
                  <a href="#" className={styles.footerLink}>Politica de privacidad</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
