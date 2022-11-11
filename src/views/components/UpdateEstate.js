import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import ImageUploading from "react-images-uploading";
import { deleteSpecificImage, storageUrl } from "./urls/urls";

export default function UpdateEstate({
  details,
  loading,
  update,
  errors,
  properties,
  checkValue,
  filterProperties,
  checkBoxValue,
  updateEstate,
  setName,
  setRegion,
  setEstateType,
  areaSubscriptions,
  setAddress,
  setPrice,
  setIsSpecial,
  estateTypes,
  setDes,
  setStatus,
  responseMessage,
  isError,
  setImagesToUpload,
  is_special,
  NeighborHoodSubscriptions,
  setNeighborHoodId,
  neighborHoodId,
}) {
  const [images, setImages] = useState([]);
  const [imagesToPreview, setImagesToPreview] = useState(details.images);
  const token = localStorage.getItem("OFTo");
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(0);

  const maxNumber = 50;
  const onChange = (imageList, addUpdateIndex) => {
    let imagesUpload = [];
    imageList.length !== 0 &&
      imageList.map((item) => imagesUpload.push(item.file));

    setImages(imageList);
    setImagesToUpload(Array.from(imagesUpload));
  };
  const onError = (errors, files) => {
    console.log("Error", errors, files);
  };
  const openAlertDialog = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };
  const deleteImage = (id) => {
    axios
      .delete(`${deleteSpecificImage}${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  return (
    <div className="sale-property">
      <div className="banner">
        <h1>تعديل عقار</h1>
      </div>
      <div className="container py-5">
        {responseMessage == "" ? (
          ""
        ) : isError ? (
          <div className="alert alert-danger">{responseMessage}</div>
        ) : (
          <div className="alert alert-success">{responseMessage}</div>
        )}
        <form>
          <div className="box">
            <div className="row">
              <div className="col-md-6 pb-4">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-helper-label">
                    المناطق المشترك بها
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="المنطقة"
                    defaultValue={details.area_id}
                    onChange={(e) => {
                      setRegion(e.target.value);
                    }}
                  >
                    {areaSubscriptions.map((item) => (
                      <MenuItem value={item.area_id} key={item.id}>
                        {item.area.name}
                      </MenuItem>
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
                    defaultValue={neighborHoodId}
                    onChange={(e) => {
                      setNeighborHoodId(e.target.value);
                    }}
                  >
                    {NeighborHoodSubscriptions.map((item) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-6 pb-4">
                <TextField
                  id="outlined-basic"
                  label="الاسم"
                  defaultValue={details.name}
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
                    defaultValue={details.estate_type_id}
                    onChange={(e) => {
                      setEstateType(e.target.value);
                    }}
                  >
                    {estateTypes.map((item) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.name}
                      </MenuItem>
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
                    value={details.status}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  >
                    <MenuItem value={"sale"}>بيع</MenuItem>
                    <MenuItem value={"rent"}>اجار</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {properties.map((item) =>
                filterProperties(item, details.properties)
              )}
              <div className="col-md-6 pb-4">
                <TextField
                  id="outlined-basic"
                  label="الوصف"
                  defaultValue={details.description}
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
                                type="button "
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
                        {imagesToPreview.map((image, index) => (
                          <div key={`image-${index}`} className="image-item">
                            <img
                              src={`${storageUrl}${image.url}`}
                              alt=""
                              width="100"
                            />
                            <div className="image-item__btn-wrapper">
                              <button
                                type="button "
                                className="btn-remove"
                                onClick={(e) => {
                                  e.preventDefault();
                                  openAlertDialog(image.id);
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
                <TextField
                  id="outlined-basic"
                  label="السعر"
                  defaultValue={details.price}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <div className="symbol">SYP</div>
              </div>
            </div>
            <div className="col-md-12 pb-4">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={is_special === 1 ? true : false}
                    onChange={(e) => {
                      setIsSpecial(e.target.checked === true ? 1 : 0);
                    }}
                  />
                }
                label="مميز؟"
                className="checkbox"
              />
            </div>
            {loading ? (
              <div className="container col-6">
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status"></div>
                </div>
              </div>
            ) : (
              <Button className="send" onClick={() => updateEstate()}>
                تأكيد
              </Button>
            )}
          </div>
        </form>
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>
          <Typography variant="h3">تنبيه</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h5">هل أنت متأكد من حذف هذه الصورة؟</Typography>
        </DialogContent>
        <DialogActions>
          <div style={{ padding: "0 10px" }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteImage(selected)}
            >
              نعم
            </Button>
          </div>
          <div>
            <Button variant="contained" onClick={() => setOpenDialog(false)}>
              لا
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
