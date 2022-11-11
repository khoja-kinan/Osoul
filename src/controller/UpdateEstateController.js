import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateEstate from "../views/components/UpdateEstate";
import {
  createEstate,
  filter,
  getEstateTypesUrl,
  getPropertiesList,
  ProfileUrl,
} from "../views/components/urls/urls";

export default function UpdateEstateController() {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [estateId, setEstateId] = useState("");
  const [estateTypes, setEstateTypes] = useState([]);
  const [areaSubscriptions, setAreaSubscriptions] = useState([]);
  const [NeighborHoodSubscriptions, setNeighborHoodSubscriptions] = useState(
    []
  );
  const [properties, setProperties] = useState([]);
  const token = localStorage.getItem("OFTo");
  const [imagesToUpload, setImagesToUpload] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [areaId, setAreaId] = useState("");
  const [estateTypeId, setEstateTypeId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [property, setProperty] = useState([]);
  const [isSpecial, setIsSpecial] = useState("");
  const [propertiesValues, setPropertiesValues] = useState([]);
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [neighborHoodId, setNeighborHoodId] = useState("");

  let params = useParams();

  /**
   * update estate function
   */
  const update = async () => {
    setUpdating(true);
    const formDate = new FormData();
    formDate.append("name", name);
    formDate.append("description", description);
    formDate.append("address", address);
    formDate.append("area_id", areaId);
    formDate.append("category_id", categoryId);
    formDate.append("neighborhood_id", neighborHoodId);
    formDate.append("estate_type_id", estateTypeId);

    imagesToUpload.map((item) => formDate.append("images[]", item));
    formDate.append("is_special", isSpecial);
    formDate.append("price", price);
    formDate.append("status", status);
    formDate.append("property", JSON.stringify(property));
    await axios
      .post(`${createEstate}/${params.id}`, formDate, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setResponseMessage(response.data.message);
        setIsError(false);
      })
      .catch((error) => {
        console.log(error.response);
        setResponseMessage(error.response.data.message);
        setIsError(true);
      });
    setUpdating(false);
  };
  /**
   * fetch estate data
   *
   */
  const fetchData = async () => {
    let result = null;

    await axios
      .get(`${createEstate}/${params.id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        if (res.status === 200) {
          setDetails(res.data.data);
          setName(res.data.data.name);
          setDescription(res.data.data.description);
          setPrice(res.data.data.price);
          setAreaId(res.data.data.area_id);
          setCategoryId(res.data.data.category_id);
          setIsSpecial(res.data.data.is_special);
          setEstateTypeId(res.data.data.estate_type_id);
          setNeighborHoodId(res.data.data.neighborhood_id);
          fecthEstateTypes(res.data.data.category_id);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const fecthEstateTypes = async (id) => {
    await axios
      .get(getEstateTypesUrl + "/" + id, {
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
  };
  const fetchProperties = async () => {
    let result = null;
    if (token != null) {
      await axios
        .get(getPropertiesList + "/" + details.category_id, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setProperties(res.data.data.properties);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

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
          setNeighborHoodSubscriptions(
            response.data.data.neighborhoodSubscriptions
          );
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const checkboxValue = (e) => {
    let exist = false;
    for (const item in propertiesValues) {
      if (item.property_id === e.target.id) {
        item.value = e.target.value === true ? 1 : 0;
        exist = true;
      }
    }
    if (!exist) {
      propertiesValues.push({
        property_id: e.target.id,
        value: e.target.value === true ? 1 : 0,
      });
    }
  };
  const checkValue = (e) => {
    let exists = false;
    for (const item of propertiesValues) {
      if (item.property_id === e.id) {
        item.value = e.value;
        exists = true;
      }
    }
    if (!exists) {
      propertiesValues.push({
        property_id: e.id,
        value: e.value,
      });
    }
    setPropertiesValues(propertiesValues);
  };
  const checkValueText = (value) => {
    let exists = false;
    for (const item of propertiesValues) {
      if (item.property_id === value.id) {
        item.value = value.value;
        exists = true;
      }
    }
    if (!exists) {
      propertiesValues.push({
        property_id: value.id,
        value: value.value,
      });
    }
    setPropertiesValues(propertiesValues);
  };

  const filterProperties = (property, EstateProperties) => {
    switch (property.type) {
      case "Range":
      case "Textfield":
        return (
          <div className="col-md-6 pb-4">
            <TextField
              label={property.name}
              variant="outlined"
              fullWidth
              onChange={(e) => {
                checkValueText({ id: property.id, value: e.target.value });
              }}
            />
          </div>
        );
      case "Dropdown":
        return (
          <div className="col-md-6 pb-4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                {property.name}{" "}
              </InputLabel>
              <Select
                onChange={(e) => {
                  checkValue({ id: property.id, value: e.target.value });
                }}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
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
      case "Checkbox":
        return (
          <div className="col-md-4 pb-4">
            <FormControlLabel
              control={<Checkbox />}
              label={property.name}
              className="checkbox"
              onChange={(e) => {
                checkboxValue(e);
              }}
            />
          </div>
        );
      default:
        break;
    }
  };
  const checkProperty = (id) => {
    for (const item of details.properties) {
      if (item.id === id) {
        return true;
      }
    }
    return false;
  };
  useEffect(() => {
    async function fetch() {
      setLoading(true);
      await fetchData();
      await fetchProfile();

      await fetchProperties();
      setLoading(false);
    }
    fetch();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="container" style={{ margin: "50px 0px" }}>
          <div className="container col-6">
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status"></div>
            </div>
          </div>
        </div>
      ) : (
        <UpdateEstate
          details={details}
          loading={updating}
          errors={errors}
          filterProperties={filterProperties}
          checkValue={checkValue}
          checkBoxValue={checkboxValue}
          updateEstate={update}
          setRegion={setAreaId}
          setName={setName}
          areaSubscriptions={areaSubscriptions}
          estateTypes={estateTypes}
          properties={properties}
          setAddress={setAddress}
          setDes={setDescription}
          setEstateType={setEstateTypeId}
          setIsSpecial={setIsSpecial}
          is_special={isSpecial}
          setPrice={setPrice}
          setStatus={setStatus}
          responseMessage={responseMessage}
          isError={isError}
          setImagesToUpload={setImagesToUpload}
          setNeighborHoodId={setNeighborHoodId}
          NeighborHoodSubscriptions={NeighborHoodSubscriptions}
          neighborHoodId={neighborHoodId}
        />
      )}
    </div>
  );
}
