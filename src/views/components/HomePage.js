import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function HomePage() {
  const token = localStorage.getItem("OFTo");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: false,
    nextArrow: (
      <div>
        <i class="fa fa-angle-right"></i>
      </div>
    ),
    prevArrow: (
      <div>
        <i class="fa fa-angle-left"></i>
      </div>
    ),
  };
  return (
    <div className="intro">
      <Slider {...settings} className="intro-slide">
        <div className="item item1">
          <div className="container">
            <div className="content">
              <h2>
                ابحث عن منزل أحلامك في سوريا
                <br></br>
                عقارات فخمة للبيع
              </h2>
              <p>
                بحث واحد • 200000+ قائمة • أكثر من 7000 بائع موثوق به • 120 دولة
              </p>
            </div>
          </div>
        </div>
        <div className="item item2">
          <div className="container">
            <div className="content">
              <h2>
                !أشتري سيارة معتمدة تثق بها
                <br></br>
                الألاف من السيارات المفحوصة مسبقا{" "}
              </h2>
              <p>
                بحث واحد • 200000+ قائمة • أكثر من 7000 بائع موثوق به • 120 دولة
              </p>
            </div>
          </div>
        </div>
        <div className="item item3">
          <div className="container">
            <div className="content">
              <h2>استكشف المنازل في أصول </h2>
              <p>
                بحث واحد • 200000+ قائمة • أكثر من 7000 بائع موثوق به • 120 دولة
              </p>
            </div>
          </div>
        </div>
      </Slider>

      <div className="category" id="category">
        <div className="container">
          <div className="title">تصفح الفئات المميزة </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 col-cat">
              <Link to={token ? "/category" : "/login"}>
                <div className="img-cat">
                  <img
                    src={require("../../assets/img/category1.jpg")}
                    alt="real-state"
                  />
                </div>
                <div className="content-cat">
                  <h3 className="sub-title">عقارات</h3>
                  <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                </div>
              </Link>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 col-cat">
              <Link to={token ? "/category" : "/login"}>
                <div className="img-cat">
                  <img
                    src={require("../../assets/img/category2.jpg")}
                    alt="cars"
                  />
                </div>
                <div className="content-cat">
                  <h3 className="sub-title">سيارات</h3>
                  <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="about" id="about">
        <div className="container">
          <div className="title">لماذا أصول؟</div>
          <p>
            أصول هي وساطة عقارية كاملة الخدمات تخدم سوق سوريا منذ عام 2021. يقدم
            فريقنا خدمات شاملة للشراء والبيع والتأجير وفرص التطوير الخاصة. نحن
            متخصصون في الخدمات الاستشارية للمساعدة في تمكين عملائنا وتثقيفهم حتى
            يتمكنوا من اتخاذ قرارات مستنيرة وتحقيق أهدافهم العقارية.
          </p>
          <div className="row pt-5">
            <div className="col-md-6">
              <div className="box">
                <h4>مهمتنا</h4>
                <p>
                  لقيادة العملاء وإرشادهم إلى خدمة لا يتم المساس بها أبدًا ، وأن
                  تصبح وجهة الوساطة العقارية الأكثر تفضيلًا لجميع العملاء
                  المحليين والدوليين في سوريا.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="box">
                <h4>رؤيتنا</h4>
                <p>
                  تتمثل رؤيتنا في أن نكون المزود الرائد للخدمات العقارية في
                  سوريا لجميع العملاء الدوليين والمحليين. رؤيتنا شفافة وقابلة
                  للتحقيق من خلال الأخلاق والتواضع.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-download" id="downloadapp">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="box">
                <p>التطبيق رقم واحد في سوريا</p>
                <h3>
                  يتيح لك تطبيق أصول أفضل بحث عن العقارات والسيارت وغير ذلك
                  <br></br>
                  <br></br>
                  قم بالتحميل الآن
                  <i className="fa fa-long-arrow-down"></i>
                </h3>
                <div className="download-app">
                  <a href="">
                    <img
                      src={require("../../assets/img/play.png")}
                      alt="google-play"
                    />
                  </a>
                  <a href="">
                    <img
                      src={require("../../assets/img/app.png")}
                      alt="app-store"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 mockup">
              <img
                src={require("../../assets/img/fibo-mobile.png")}
                alt="app"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="contact">
                <div className="container">
                    <div className="title text-center">اتصل بنا</div>
                    <form>
                        <div className="row justify-content-center mb-4">
                            <div className="col-md-6">
                                <label for="name">الاسم</label>
                                <input type="text" className="form-control" name="name" required />
                            </div>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <div className="col-md-6">
                            <label for="email">البريد الإلكتروني</label>
                                <input type="email" className="form-control" name="email" required />
                            </div>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <div className="col-md-6">
                            <label for="phone">رقم الهاتف</label>
                                <input type="text" className="form-control" name="phone" required />
                            </div>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <div className="col-md-6">
                            <label for="message">الرسالة</label>
                                <textarea type="text" className="form-control" name="message" required ></textarea>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="send">إرسال</button>
                        </div>
                    </form>
                </div>
            </div> */}
    </div>
  );
}

export default HomePage;
