import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getEstateTypesUrl,
  getPropertiesList,
  ProfileUrl,
  neighborHood,
  filterEstate,
} from "./urls/urls";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MyEstate from "./MyEstate";
function valueArea(value) {
  return `${value} %`;
}
function valuePrice(price) {
  return `${price} %`;
}

function FilterProperty() {
  const [area, setArea] = useState("");
  const [estateType, setEstateType] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(400);
  const [isSpecial, setIsSpecial] = useState(false);
  const [properties, setProperties] = useState([]);
  const [propertiesValues, setPropertiesValues] = useState([]);
  const [areaSubscriptions, setAreaSubscriptions] = useState([]);
  const [estateTypes, setEstateTypes] = useState([]);
  const [neighborhoodArray, setNeighborhoodArray] = useState([]);
  const token = localStorage.getItem("OFTo");
  const [resultList, setResult] = useState([]);

  let params = useParams();
  let navigate = useNavigate();

  const [value, setValue] = useState([0, 150000]);
  const [PriceValue, setPriceValue] = useState([0, 50]);

  const handleChangePrice = (event, newValue) => {
    setPriceValue(newValue);
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  const handleChangeArea = (event, newValue) => {
    setValue(newValue);
    checkValueRange(event);
  };

  const filterProperties = (property) => {
    switch (property.type) {
      case "Range":
        return (
          <div className="col-md-12 pb-5">
            <div className="label">{property.name}</div>
            <div className="sub-title justify-content-between d-flex">
              <p>Max </p>
              <p>Min</p>
            </div>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChangeArea}
              valueLabelDisplay="auto"
              getAriaValueText={valueArea}
              min={0}
              max={600}
            />
          </div>
        );

      case "Dropdown":
        return (
          <div className="col-md-12 pb-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                {property.name}{" "}
              </InputLabel>
              <Select
                onChange={(e) => {
                  checkValue({ id: property.id, value: e.target.value });
                }}
                labelId="demo-simple-select-helper-label"
                id={property.id}
                label="new label"
              >
                {property.options.map((item) => (
                  <MenuItem value={item.name} key={item.id}>
                    {item.name}{" "}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        );
    }
  };
  async function fecthData() {
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
  }
  async function fecthNeighborhoods(id) {
    await axios
      .get(neighborHood + "/" + id, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setNeighborhoodArray(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  const checkValueRange = (e) => {
    let exists = false;
    for (const item of propertiesValues) {
      if (item.property_id === e.target.id) {
        const target = e.target.value;

        exists = true;
      }
    }
    if (!exists) {
      propertiesValues.push({
        property_id: e.target.id,
        min: e.target.value[0],
        max: e.target.value[1],
      });
    }
    setPropertiesValues(propertiesValues);
  };
  const checkValue = (e) => {
    let exists = false;
    for (const item of propertiesValues) {
      if (item.id === e.id) {
        item.value = e.value;
        exists = true;
      }
    }
    if (!exists) {
      propertiesValues.push({
        id: e.id,
        value: e.value,
      });
    }
    setPropertiesValues(propertiesValues);
  };
  const Filter = async () => {
    if (token != null) {
      const data = {
        area_id: area,
        category_id: parseInt(params.id),
        estate_type_id: estateType,
        min_price: minPrice,
        max_price: maxPrice,
        is_special: isSpecial,
        neighborhood_id: neighborhood,
        properties: propertiesValues,
      };
      await axios
        .post(filterEstate, data, {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setResult(res.data.data);
            navigate("/filter-result", { state: res.data.data });
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    checkResultList(resultList);
  };
  async function fecthEstateTypes() {
    await axios
      .get(getEstateTypesUrl + "/" + params.id, {
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
    const getProperties = async () => {
      let result = null;
      if (token != null) {
        await axios
          .get(getPropertiesList + "/" + params.id, {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              result = res.data.data.properties;
              setProperties(result);
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    };
    getProperties();
    fecthData();
    fecthEstateTypes();
  }, []);
  const handleArea = (e) => {
    setArea(e.target.value);
    fecthNeighborhoods(e.target.value);
  };
  const checkResultList = () => {
    if (resultList.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      <div className="filter-page">
        <div className="container py-5">
          <form>
            <div className="box">
              <div className="row">
                <div className="col-md-4 pb-5">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      المناطق المشترك بها
                    </InputLabel>
                    <Select
                      onChange={handleArea}
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="المنطقة"
                    >
                      {areaSubscriptions.map((item) => (
                        <MenuItem value={item.area.id}>
                          {item.area.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ color: "red", textAlign: "right" }}>
                      {area === "" ? "حقل مطلوب *" : ""}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className="col-md-4 pb-5">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      نوع العقار
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="الطابق"
                      onChange={(e) => {
                        setEstateType(e.target.value);
                      }}
                    >
                      {estateTypes.map((item) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ color: "red", textAlign: "right" }}>
                      {estateType === "" ? "حقل مطلوب *" : ""}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className="col-md-4 pb-5">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      الأحياء
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="الطابق"
                      onChange={(e) => {
                        setNeighborhood(e.target.value);
                      }}
                    >
                      {neighborhoodArray.map((item) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText sx={{ color: "red", textAlign: "right" }}>
                      {neighborhood === "" ? "حقل مطلوب *" : ""}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className="col-md-12 pb-5">
                  <div className="label">السعر</div>
                  <div className="sub-title justify-content-between d-flex">
                    <p>أعلا قيمة </p>
                    <p>أدنى قيمة</p>
                  </div>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={PriceValue}
                    onChange={handleChangePrice}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000000}
                  />
                </div>
                <div className="col-md-12 pb-5">
                  {properties.map((item) => filterProperties(item))}
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          setIsSpecial(true);
                        }}
                      />
                    }
                    label="مميز؟"
                    className="checkbox"
                  />
                </div>

                <div className="col-md-12 pb-5">
                  <Button className="send" fullWidth onClick={() => Filter()}>
                    تأكيد
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default FilterProperty;
