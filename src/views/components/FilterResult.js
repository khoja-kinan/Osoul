import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function FilterResult() {
  const location = useLocation();
  const token = localStorage.getItem("OFTo");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      /* fecthDataEstate();
      fecthDataCategory(); */
    } else {
      navigate("/login");
    }
    window.scrollTo(0, 0);
  }, []);

  var settings1 = {
    rtl: true,
    infinite: true,
    speed: 500,
    slidesToShow: location.state.length > 3 ? 3 : location.state.length,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: false,
    dots: false,
    nextArrow: (
      <div>
        <i class="fas fa-arrow-right"></i>
      </div>
    ),
    prevArrow: (
      <div>
        <i class="fas fa-arrow-left"></i>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="buy-property">
      <div className="container">
        <div className="filter-section d-flex align-items-center justify-content-between">
          <p>
            <i className="fal fa-search"></i>
            نتائج البحث
          </p>
        </div>
        {location.state.length === 0 ? (
          " لا يوجد نتائج لعرضها"
        ) : (
          <Slider {...settings1} className="slider-property">
            {location.state.map((item) => (
              <Link to={`/single-property/${item.id}`} key={item.id}>
                <div className="item">
                  <div className="box">
                    <img
                      src={require("../../assets/img/slider-property.png")}
                      alt="real-state"
                    />
                    <span className="d-flex justify-content-between ">
                      <h4>{item.user.name}</h4>
                      <div className="price">{item.price} ل.س</div>
                    </span>
                    <div className="location d-flex align-items-baseline">
                      <i className="fas fa-map-marker-alt"></i>
                      <p> {item.neighborhood.name}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}
export default FilterResult;
