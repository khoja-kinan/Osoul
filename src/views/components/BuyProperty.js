import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useStateRef from "react-usestateref";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { Elements_show, ProfileUrl, storageUrl } from "./urls/urls";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";

function BuyProperty() {
  const { catId, status, typeId } = useParams();
  const [value, setValue] = useState(parseInt(catId));
  const [Estate, setEstate] = useState();
  const [areaSubscriptions, setAreaSubscriptions] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [productsToShow, setProductsToShow, productsToShowRef] = useStateRef(
    []
  );
  const [special, setSpecial] = useState([]);
  const [normal, setNormal] = useState([]);

  const token = localStorage.getItem("OFTo");
  const navigate = useNavigate();
  async function fecthDataEstate() {
    await axios
      .get(
        `${Elements_show}/${catId}?category_sub=${typeId}&status=${status}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setEstate(response.data.data);
          setProductsToShow(response.data.data);
          setNormal(response.data.data.filter((item) => item.is_special === 0));
          setSpecial(
            response.data.data.filter((item) => item.is_special === 1)
          );
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  const fetchProfile = async () => {
    await axios
      .get(ProfileUrl, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setAreaSubscriptions(response.data.data.areaSubscriptions);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    if (token) {
      fecthDataEstate();
      fetchProfile();
    } else {
      navigate("/login");
    }
    window.scrollTo(0, 0);
  }, []);

  var settings1 = {
    rtl: true,
    infinite: true,
    speed: 500,
    slidesToShow: normal.length > 3 ? 3 : normal.length,
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
  const handleChangeSelectedArea = (event) => {
    setSelectedArea(event.target.value);
    setProductsToShow(
      Estate.filter((item) => item.area_id === event.target.value)
    );
    setNormal(
      productsToShowRef.current.filter((item) => item.is_special === 0)
    );
    setSpecial(
      productsToShowRef.current.filter((item) => item.is_special === 1)
    );
  };
  return (
    <div className="buy-property">
      <div className="container">
        <div className="filter-section d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <i className="fal fa-map-marker-alt"></i>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
              <InputLabel
                id="demo-simple-select-standard-label"
                sx={{ right: "0" }}
              >
                المنطقة
              </InputLabel>
              <Select
                variant="filled"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedArea}
                onChange={handleChangeSelectedArea}
              >
                {areaSubscriptions.map((item) => (
                  <MenuItem value={item.area_id} key={item.area_id}>
                    {item.area.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Link to={`/filter-property/${catId}`}>
            {" "}
            <img
              src={require("../../assets/img/Filter-icon.png")}
              alt="Filter-icon"
            />
          </Link>
        </div>
        <TabContext value={value}>
          <TabPanel value={parseInt(catId)}>
            <span className="d-flex title-slider">
              <h3>كل العروض</h3>
            </span>

            {Estate !== undefined ? (
              normal.length !== 0 ? (
                <Slider {...settings1} className="slider-property">
                  {normal.map((item) => (
                    <Link to={`/single-property/${item.id}`} key={item.id}>
                      <div className="item">
                        <div className="box">
                          {item.images.length === 0 ? (
                            <img
                              src={require("../../assets/img/slider-property.png")}
                              alt="real-state"
                            />
                          ) : (
                            <img
                              src={`${storageUrl}${item.images[0].url}`}
                              alt="real-state"
                            />
                          )}

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
              ) : (
                <p className="my-5">لا يوجد عروض في هذه المنطقة</p>
              )
            ) : (
              <div className="d-flex justify-content-between align-items-start">
                <Skeleton animation="wave" width={"30%"} height={400} />
                <Skeleton animation="wave" width={"30%"} height={400} />
                <Skeleton animation="wave" width={"30%"} height={400} />
              </div>
            )}

            <span className="d-flex title-slider">
              <h3> العروض المميزة</h3>
              <div className="all"></div>
            </span>
            <div className="grid-property">
              <div className="row ">
                {Estate !== undefined ? (
                  special.length !== 0 ? (
                    special.map((item) => (
                      <div className="col-lg-6 col-md-12 mb-5" key={item.id}>
                        <Link to={`/single-property/${item.id}`}>
                          <div className="box">
                            <div className="row sub-row">
                              <div className="col-md-7 ">
                                <div className="co-content">
                                  <span className="d-flex justify-content-between align-items-center">
                                    <h4>{item.user.name}</h4>
                                    <div className="price">{item.price}ل.س</div>
                                  </span>
                                  <div className="location d-flex align-items-baseline">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <p> {item.neighborhood.name}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-5">
                                <img
                                  src={require("../../assets/img/slider-property.png")}
                                  alt="real-state"
                                />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>لا يوجد عروض في هذه المنطقة</p>
                  )
                ) : (
                  <div className="d-flex justify-content-between align-items-start">
                    <Skeleton animation="wave" width={"45%"} height={400} />
                    <Skeleton animation="wave" width={"45%"} height={400} />
                  </div>
                )}
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}
export default BuyProperty;
