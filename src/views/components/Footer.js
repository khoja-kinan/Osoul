import { HashLink as Link } from "react-router-hash-link";
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-5 col-sm-12 pb-5">
            <Link to="/">
              <img
                src={require("../../assets/img/logo.png")}
                className="logo"
                alt="logo"
              />
            </Link>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-12 pb-4">
            <h5>اتصل بنا</h5>
            <ul className="list-unstyled">
              <li>
                <i class="fas fa-map-marker-alt"></i>
                سوريا, دمشق, مبنى 123
              </li>
              <li>
                <a href="tel:97455873497">
                  <i class="fas fa-phone"></i>
                  134 123 123 963+
                </a>
              </li>
              <li>
                <a href="mailto:info@gmail.com">
                  <i class="fas fa-envelope"></i>
                  info@gmail.com
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fas fa-globe-asia"></i>
                  www.Osoul.com
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12 pb-4">
            <h5>أقسام الموقع</h5>
            <ul className="list-unstyled ul-category">
              <li>
                <Link to="/">الصفحة الرئيسية</Link>
              </li>
              <li>
                <Link to="/#category">الفئات</Link>
              </li>
              <li>
                <Link to="/#about">لماذا أصول</Link>
              </li>
              <li>
                <Link to="/contact-us">اتصل بنا</Link>
              </li>
              <li>
                <Link to="/#downloadapp" className="download">
                  حمل التطبيق
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 d-md-none d-sm-none d-none d-lg-block">
            <ul className="list-unstyled d-flex social">
              <li>
                <a href="">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className=" text-footer">
        <div className="container ">
          <div className="row align-items-end">
            <div className="col-md-6 col-sm-6">
              <ul className="list-unstyled d-flex social m-0 d-lg-none d-md-flex">
                <li>
                  <a href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
