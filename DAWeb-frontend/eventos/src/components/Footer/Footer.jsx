import React from "react";
import SocialIcons from "./SocialIcons";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerTop">
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
            <h5 className="footerTitle mb-3">Enlaces de interés</h5>
            <ul className="footerLinks d-flex flex-column">
              <li className="footerLinkItem">
                <a href="#" className="footerLink">
                  Inicio
                </a>
              </li>
              <li className="footerLinkItem">
                <a href="#" className="footerLink">
                  Eventos
                </a>
              </li>
              <li className="footerLinkItem">
                <a href="#" className="footerLink">
                  Reservas
                </a>
              </li>
              <li className="footerLinkItem">
                <a href="#" className="footerLink">
                  Espacios
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <h5 className="footerTitle mb-3">¿Tienes alguna duda?</h5>

            <p className="text-white d-flex mb-1">
              <a href="tel: 123-456-789" className="footerLink">
                123-456-789
              </a>
            </p>

            <p className="text-white d-flex">
              <a href="mailto:eventos@fabianto.com" className="footerLink">
                eventos@fabianto.com
              </a>
            </p>
          </div>

          <div className="col-lg-3 col-md-6 col-11 mb-4 mb-lg-0 mb-md-0">
            <h5 className="footerTitle mb-3">Localización</h5>
            <p className="location">
              Calle de los Eventos, 123 – Ciudad Universitaria, España
            </p>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 mb-md-0">
            <h5 className="footerTitle mb-3">Suscríbete a nuestro boletín</h5>
            <p className="text-white mb-3">
              Recibe las últimas novedades y ofertas exclusivas.
            </p>
            <form className="d-flex gap-1">
              <input
                type="email"
                className="form-control-sm"
                placeholder="Tu correo electrónico"
              />
              <button
                type="submit"
                className="btn btn-primary text-white fw-bold btn-sm"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-12 mt-5">
              <p className="copyright">Copyright © 2036 Eventos Fabianto</p>
            </div>

            <div className="col-lg-8 col-12 mt-lg-5">
              <ul className="footerLinks">
                <li className="footerLinkItem">
                  <a href="#" className="footerLink">
                    Terminos &amp; Condiciones
                  </a>
                </li>
                <li className="footerLinkItem">
                  <a href="#" className="footerLink">
                    Politica de privacidad
                  </a>
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
