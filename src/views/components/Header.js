import { useState } from "react";
import { useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
function openNav() {
  document.getElementById("mySidenav").style.width = "280px";
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
function Header() {
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(localStorage.getItem("OFTo"));
  }, [token]);

  /*  */
  return (
    <header>
      <div className="fixed-icon">
        <a href="tel:97455873497" className="phone-call">
          <i className="fal fa-phone-plus"></i>
        </a>
        <br></br>
        <a href="mailto:info@gmail.com" className="mail">
          <i className="fal fa-envelope"></i>
        </a>
      </div>
      <div className="container">
        <div className="row align-items-baseline">
          <div className=" col-md-2 col-sm-2 col-2">
            <Link to="/">
              <img
                src={require("../../assets/img/logo.png")}
                className="logo"
                alt="logo"
              />
            </Link>
          </div>
          <div className=" col-md-10 col-sm-10 col-10">
            <nav className="align-items-center">
              {/* ul desktop */}
              <ul className="list-unstyled d-flex justify-content-between ul-desktop">
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
                {token ? (
                  <li>
                    <Link to="/profile">ملفي الشخصي</Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/login">تسجيل الدخول</Link>
                  </li>
                )}

                <li>
                  <Link to="/#downloadapp" className="download">
                    حمل التطبيق
                  </Link>
                </li>
                <li className="social-icon">
                  <a href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li className="social-icon">
                  <a href="">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li className="social-icon">
                  <a href="">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li className="social-icon">
                  <a href="">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
              </ul>
              {/*end ul desktop */}
              {/* ul mobile */}
              <div
                id="mobile_menu"
                className="d-flex justify-content-end align-items-center"
              >
                {token ? (
                  <li className="login-mobile">
                    <Link to="/profile">ملفي الشخصي</Link>
                  </li>
                ) : (
                  <div className="login-mobile">
                    <Link to="/login">تسجيل الدخول</Link>
                  </div>
                )}
                <div id="mySidenav" className="sidenav">
                  <a className="closebtn" onClick={closeNav}>
                    <i className="fa fa-times"></i>
                  </a>
                  <ul className="ul-mobile list-unstyled">
                    <li>
                      <Link to="/" onClick={closeNav}>
                        الصفحة الرئيسية
                      </Link>
                    </li>
                    <li>
                      <Link to="/#category" onClick={closeNav}>
                        الفئات
                      </Link>
                    </li>

                    <li>
                      <Link to="/#about" onClick={closeNav}>
                        لماذا أصول
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact-us">اتصل بنا</Link>
                    </li>
                    <li>
                      <Link to="/#downloadapp" className="download">
                        حمل التطبيق
                      </Link>
                    </li>
                    <div className="social-mobile d-flex justify-content-evenly">
                      <div>
                        <a href="">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </div>
                      <div>
                        <a href="">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </div>
                      <div>
                        <a href="">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </div>
                      <div>
                        <a href="">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </div>
                    </div>
                  </ul>
                </div>
                <div className="burger ">
                  <div onClick={openNav}>
                    <i className="fa fa-bars"></i>
                  </div>
                </div>
              </div>
              {/* end ul mobile */}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
