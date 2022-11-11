import { Link, useNavigate, useParams } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState, useEffect } from "react";
import axios from "axios";
import { getEstateTypesUrl, storageUrl } from "./urls/urls";
import { Skeleton } from "@mui/material";
function BrowseCategory() {
  const { catId } = useParams();
  const [value, setValue] = useState("sale");
  const [estateTypes, setEstateTypes] = useState();
  const token = localStorage.getItem("OFTo");
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function fecthDataEstateTypes() {
    await axios
      .get(`${getEstateTypesUrl}/${catId}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setEstateTypes(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  useEffect(() => {
    token ? fecthDataEstateTypes() : navigate("/login");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="browse-category">
      <div className="banner">
        <h1>عقار</h1>
      </div>

      <div className="container">
        <div className="box">
          <TabContext value={value}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              className="tab-head"
            >
              <Tab label="شراء" value="sale" className="tab-item" />
              <Tab label="آجار" value="rent" className="tab-item" />
            </TabList>

            <TabPanel value="sale">
              {estateTypes !== undefined ? (
                estateTypes.map((item) => (
                  <Link
                    to={`/buy-property/${catId}/${value}/${item.id}`}
                    key={item.id}
                  >
                    <div className="body-content mb-5">
                      <div class="img-cat">
                        {item.image !== null ? (
                          <img
                            src={`${storageUrl}${item.image}`}
                            alt="real-state"
                          />
                        ) : (
                          <img
                            src={require("../../assets/img/category1.jpg")}
                            alt="real-state"
                          />
                        )}
                      </div>
                      <div className="content">
                        <h2>{item.name}</h2>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <>
                  <Skeleton animation="wave" width={"100%"} height={400} />
                  <Skeleton animation="wave" width={"100%"} height={400} />
                  <Skeleton animation="wave" width={"100%"} height={400} />
                </>
              )}
            </TabPanel>
            <TabPanel value="rent">
              {estateTypes !== undefined ? (
                estateTypes.map((item) => (
                  <Link
                    to={`/buy-property/${catId}/${value}/${item.id}`}
                    key={item.id}
                  >
                    <div className="body-content mb-5">
                      <div class="img-cat">
                        {item.image !== null ? (
                          <img
                            src={`${storageUrl}${item.image}`}
                            alt="real-state"
                          />
                        ) : (
                          <img
                            src={require("../../assets/img/category1.jpg")}
                            alt="real-state"
                          />
                        )}
                      </div>
                      <div className="content">
                        <h2>{item.name}</h2>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <Skeleton animation="wave" width={"100%"} height={400} />
              )}
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </div>
  );
}
export default BrowseCategory;
