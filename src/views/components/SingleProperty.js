import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import { createEstate, storageUrl } from "./urls/urls";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Typography,
} from "@mui/material";

function SingleProperty() {
  const { estateId } = useParams();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const token = localStorage.getItem("OFTo");
  const [openDialog, setOpenDialog] = useState(false);

  const [Estate, setEstate] = useState();
  async function fecthDataEstate() {
    await axios
      .get(`${createEstate}/${estateId}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setEstate(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  useEffect(() => {
    fecthDataEstate();
    setNav1(slider1);
    setNav2(slider2);
  }, []);
  if (Estate === undefined) {
    return <LinearProgress />;
  }

  const settingsThumbs = {
    slidesToShow: Estate.images.length >= 2 ? 2 : Estate.images.length,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: true,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: "10px",
  };
  return (
    <div className="single-property">
      <div className="container">
        <div className="row main-row">
          <div className="col-lg-6 col-md-12">
            <div className="main-slider">
              {Estate.images.length === 0 ? (
                <img
                  src={require("../../assets/img/slider-property.png")}
                  alt="real-state"
                />
              ) : (
                <img
                  src={`${storageUrl}${Estate.images[0].url}`}
                  alt="real-state"
                />
              )}
              {/*  <Slider
                {...settingsMain}
                asNavFor={nav2}
                ref={(slider) => setSlider1(slider)}
              >
                <div className="item">
                  <img
                    src={require("../../assets/img/slider-property.png")}
                    alt="real-state"
                  />
                </div>
                <div className="item">
                  <img
                    src={require("../../assets/img/item1.webp")}
                    alt="real-state"
                  />
                </div>
                <div className="item">
                  <img
                    src={require("../../assets/img/modern-apartment-architecture.jpg")}
                    alt="real-state"
                  />
                </div>
                <div className="item">
                  <img
                    src={require("../../assets/img/slider-property.png")}
                    alt="real-state"
                  />
                </div>
                <div className="item">
                  <img
                    src={require("../../assets/img/modern-apartment-architecture.jpg")}
                    alt="real-state"
                  />
                </div>
              </Slider> */}
            </div>
            <div className="thumbnail-slider">
              {Estate.images.length === 0 ? (
                <Slider
                  {...settingsThumbs}
                  asNavFor={nav1}
                  ref={(slider) => setSlider2(slider)}
                >
                  <div className="item">
                    <img
                      src={require("../../assets/img/slider-property.png")}
                      alt="real-state"
                    />
                  </div>{" "}
                  <div className="item">
                    <img
                      src={require("../../assets/img/slider-property.png")}
                      alt="real-state"
                    />
                  </div>
                  <div className="item">
                    <img
                      src={require("../../assets/img/item1.webp")}
                      alt="real-state"
                    />
                  </div>
                  <div className="item">
                    <img
                      src={require("../../assets/img/modern-apartment-architecture.jpg")}
                      alt="real-state"
                    />
                  </div>
                  <div className="item">
                    <img
                      src={require("../../assets/img/slider-property.png")}
                      alt="real-state"
                    />
                  </div>
                </Slider>
              ) : (
                <Slider
                  {...settingsThumbs}
                  asNavFor={nav1}
                  ref={(slider) => setSlider2(slider)}
                >
                  {Estate.images.map((img) => (
                    <div className="item">
                      <img src={`${storageUrl}${img.url}`} alt="real-state" />
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="d-flex title-product ">
              <h2>{Estate.name}</h2>
              <div className="price">{Estate.price} ل.س</div>
            </div>
            <p className="location">
              <i className="fal fa-map-marker-alt"></i>
              {Estate.area.name} / {Estate.neighborhood.name}
            </p>
            <div className="info-product">
              <h2>معلومات العرض </h2>
              <div className="row pt-4 pb-3">
                {Estate.values.length === 0 ? (
                  "لا تتوفر معلومات عن العرض حالياً"
                ) : (
                  <>
                    {Estate.values.map((item) => (
                      <div className="col-lg-3 col-md-6 col-sm-6 col-6 pb-4">
                        <div className="box">
                          <h5>{item.property.name}</h5>
                          <h6> {item.value}</h6>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="description">
                <p>{Estate.description}</p>
              </div>
              <div className="text-center mt-5">
                <a
                  href="#"
                  className="call"
                  onClick={() => setOpenDialog(true)}
                >
                  اتصال
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>
          <Typography variant="h5">معلومات صاحب العقار</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="p">
            اسم صاحب العقار : {Estate.user.name}
          </Typography>
          <br />
          <Typography variant="p"> رقم الهاتف : {Estate.user.phone}</Typography>
        </DialogContent>
        <DialogActions>
          <div>
            <Button variant="contained" onClick={() => setOpenDialog(false)}>
              إغلاق
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default SingleProperty;
