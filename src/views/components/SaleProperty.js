import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ImageUploading from "react-images-uploading";
import { useState, useEffect } from "react";
import axios from "axios";
import { NumericFormat } from "react-number-format";
import {
  getPropertiesList,
  createEstate,
  ProfileUrl,
  getEstateTypesUrl,
} from "./urls/urls";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

function SaleProperty() {
  const navigate = useNavigate();
  const [region, setRegion] = useState("");
  const [neighborHoodId, setNeighborHoodId] = useState("");
  const [des, setDes] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isSpecial, setIsSpecial] = useState(false);
  const [price, setPrice] = useState("");
  const [priceToUpload, setPriceToUpload] = useState("");
  const [estateType, setEstateType] = useState("");
  const [status, setStatus] = useState("");
  const [images, setImages] = useState([]);
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [estateTypes, setEstateTypes] = useState([]);
  const [areaSubscriptions, setAreaSubscriptions] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  const [properties, setProperties] = useState([]);
  const [propertiesValues, setPropertiesValues] = useState([]);
  const token = localStorage.getItem("OFTo");
  let params = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [ErrMsg, setErrMsg] = useState("");
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
  const checkboxValue = (value) => {
    let exist = false;
    for (const item in propertiesValues) {
      if (item.property_id === value.id) {
        item.value = value.value === true ? 1 : 0;
        exist = true;
      }
    }
    if (!exist) {
      propertiesValues.push({
        property_id: value.id,
        value: value.value === true ? 1 : 0,
      });
    }
  };
  const maxNumber = 50;
  const onChange = (imageList, addUpdateIndex) => {
    let imagesUpload = [];
    imageList.length !== 0 &&
      imageList.map((item) => imagesUpload.push(item.file));

    setImages(imageList);
    setImagesToUpload(Array.from(imagesUpload));
  };
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

  const filterProperties = (property) => {
    switch (property.type) {
      case "Range":
      case "Textfield":
        return (
          <div className="col-md-6 pb-4">
            <TextField
              id={property.id}
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
                onChange={(e) =>
                  checkValue({ id: property.id, value: e.target.value })
                }
                labelId="demo-simple-select-helper-label"
                id={property.id}
                label="new label"
              >
                {property.options.map((item) => (
                  <MenuItem value={item.name}>{item.name} </MenuItem>
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
          setNeighborhoods(response.data.data.neighborhoodSubscriptions);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

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

  const create = async () => {
    let result = null;
    const token = localStorage.getItem("OFTo");
    if (token !== null) {
      let formDate = null;
      formDate = new FormData();
      formDate.append("name", name);
      formDate.append("description", des);
      formDate.append("address", address);
      formDate.append("area_id", region);
      formDate.append("category_id", params.id);
      formDate.append("neighborhood_id", neighborHoodId);
      formDate.append("estate_type_id", estateType);

      imagesToUpload.map((item) => formDate.append("images[]", item));
      formDate.append("is_special", isSpecial === true ? 1 : 0);
      formDate.append("price", priceToUpload);
      formDate.append("status", status);
      formDate.append("property", JSON.stringify(propertiesValues));

      await axios
        .post(createEstate, formDate, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            result = res.data;
            navigate("/my-estates");
          }
        })
        .catch((err) => {
          setOpenDialog(true);
          setErrMsg(err.response.data.message);
          console.log(err.response);
        });
    }
  };

  const onError = (errors, files) => {
    console.log("Error", errors, files);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const materialUITextFieldProps = {
    id: "outlined-basic",
    label: "السعر",
    variant: "outlined",
    sx: { width: "100%" },
  };
  return (
    <div className="sale-property">
      <div className="banner">
        <h1>بيع عقار</h1>
      </div>
      <div className="container py-5">
        <form>
          <div className="box">
            <div className="row">
              <div className="col-md-6 pb-4">
                <TextField
                  id="outlined-basic"
                  label="العنوان"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6 pb-4">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    المناطق المشترك بها
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="المنطقة"
                    onChange={(e) => {
                      setRegion(e.target.value);
                    }}
                  >
                    {areaSubscriptions.map((item) => (
                      <MenuItem value={item.area.id}>{item.area.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-6 pb-4">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    الأحياء
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="الحي"
                    onChange={(e) => {
                      setNeighborHoodId(e.target.value);
                    }}
                  >
                    {neighborhoods.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-6 pb-4">
                <TextField
                  id="outlined-basic"
                  label="الاسم"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-6 pb-4">
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
                </FormControl>
              </div>
              <div className="col-md-6 pb-4">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    حالة العقار
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="حالة العقار"
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <MenuItem value={"sale"}>بيع</MenuItem>
                    <MenuItem value={"rent"}>اجار</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {properties.length !== 0 &&
                properties.map((item) => filterProperties(item))}
              <div className="col-md-6 pb-4">
                <TextField
                  id="outlined-basic"
                  label="الوصف"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setDes(e.target.value);
                  }}
                />
              </div>

              <div className="col-md-12 pb-4">
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  onError={onError}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    errors,
                  }) => (
                    // write your own UI
                    <div className="input-upload_img">
                      <button
                        className="add"
                        type="button"
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        إضافة صور
                        <i class="fas fa-plus-circle"></i>
                      </button>
                      <div className="img-group">
                        {imageList.map((image, index) => (
                          <div key={`image-${index}`} className="image-item">
                            <img src={image.data_url} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                              <button
                                type="button "
                                className="btn-update"
                                onClick={(e) => {
                                  e.preventDefault();
                                  onImageUpdate(index);
                                }}
                              >
                                تحديث
                              </button>
                              <button
                                className="btn-remove"
                                onClick={(e) => {
                                  e.preventDefault();
                                  onImageRemove(index);
                                }}
                              >
                                <i class="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors && (
                        <div>
                          {errors.maxNumber && (
                            <span>
                              Number of selected images exceed maxNumber
                            </span>
                          )}
                          {errors.acceptType && (
                            <span>Your selected file type is not allow</span>
                          )}
                          {errors.maxFileSize && (
                            <span>Selected file size exceed maxFileSize</span>
                          )}
                          {errors.resolution && (
                            <span>
                              Selected file is not match your desired resolution
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </ImageUploading>
              </div>
              <div className="col-md-12 pb-4 input-price">
                <NumericFormat
                  value={price}
                  thousandSeparator=","
                  customInput={TextField}
                  {...materialUITextFieldProps}
                  onValueChange={(values) => {
                    setPriceToUpload(values.value);
                  }}
                />
                <div className="symbol">ل.س</div>
              </div>
            </div>
            <div className="col-md-12 pb-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSpecial}
                    onChange={(e) => {
                      setIsSpecial(e.target.checked);
                    }}
                  />
                }
                label="مميز؟"
                className="checkbox"
              />
            </div>
            <Button className="send" onClick={() => create()}>
              تأكيد
            </Button>
          </div>
        </form>
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>
          <Typography variant="h3">تنبيه</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h5" sx={{ color: "red" }}>
            {ErrMsg}
          </Typography>
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
export default SaleProperty;
