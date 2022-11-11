import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategoriesList, storageUrl } from "./urls/urls";
import axios from "axios";
import { Skeleton } from "@mui/material";

function Category() {
  const navigate = useNavigate();
  const [categoriesList, setCategoriesList] = useState();
  const token = localStorage.getItem("OFTo");
  async function fecthData() {
    await axios
      .get(getCategoriesList, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCategoriesList(response.data.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("OFTo");
          navigate("/login");
        }
      });
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    token ? fecthData() : navigate("/login");
  }, []);
  return (
    <div className="category-page pb-5">
      <div className="banner">
        <div className="container">
          <h1>اختيار فئة</h1>
        </div>
      </div>
      <div className="container">
        <div className="row py-4">
          {categoriesList !== undefined ? (
            categoriesList.length !== 0 ? (
              categoriesList.map((item) => (
                <div className="col-lg-4 col-md-12 pb-4" key={item.id}>
                  <div className="box">
                    <div className="img-cat">
                      <img
                        src={
                          item.image === null
                            ? require("../../assets/img/category1.jpg")
                            : `${storageUrl}${item.image}`
                        }
                        alt="real-state"
                      />
                    </div>
                    <h2 className="title-cat">{item.name}</h2>

                    <div className="content d-flex justify-content-around ">
                      <Link to={`/sale-property/${item.id}`}>بيع</Link>
                      <Link to={`/browse-category/${item.id}`}>تصفح</Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>
                عذرا أنت لا تملك اشتراك بالفئات يرجى التواصل مع الإدارة للاشتراك
                بفئة
              </p>
            )
          ) : (
            <div className="d-flex justify-content-between align-items-start">
              <Skeleton animation="wave" width={"30%"} height={400} />
              <Skeleton animation="wave" width={"30%"} height={400} />
              <Skeleton animation="wave" width={"30%"} height={400} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Category;
