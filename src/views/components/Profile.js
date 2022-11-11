import ImageUploading from "react-images-uploading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { ProfileUrl, ProfilUpdateUrl, storageUrl } from "./urls/urls";
function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const token = localStorage.getItem("OFTo");
  const [name, setName] = useState("");

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
          setProfile(response.data.data);
          setName(response.data.data.name);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  useEffect(() => {
    fecthData();
  }, []);

  const [images, setImages] = useState([]);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  const onError = (errors, files) => {
    console.log("Error", errors, files);
  };

  const handlelouout = () => {
    localStorage.removeItem("OFUsravt");
    localStorage.removeItem("OFUsrNmr");
    localStorage.removeItem("OFUsrNm");
    localStorage.removeItem("OFTo");
    navigate("/");
    navigate(0);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleSaveChanges = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", images[0].file);

    axios
      .post(ProfilUpdateUrl, formData, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-5">
            <div className="box">
              <h1>الملف الشخصي</h1>
              <div className="profile-img text-center">
                <img src={`${storageUrl}${profile.image}`} alt="profile-img" />
              </div>
              <div className="name">{profile.name}</div>
              <div className="number">{profile.phone}</div>
              <div className="address">Syria, Lattakia</div>
              <div className="edit">
                <button
                  type="button"
                  className="btn-edit"
                  data-bs-toggle="modal"
                  data-bs-target="#edit-profile"
                >
                  تعديل الملف الشخصي
                </button>
                <button
                  style={{ margin: "1rem 0" }}
                  type="button"
                  className="btn-edit"
                  onClick={() => navigate("/my-deals")}
                >
                  صفقاتي
                </button>
                <button
                  style={{ margin: "1rem 0" }}
                  type="button"
                  className="btn-edit"
                  onClick={() => navigate("/my-estates")}
                >
                  عقاراتي
                </button>
                <button
                  style={{ margin: "1rem 0" }}
                  type="button"
                  className="btn-edit"
                  onClick={handlelouout}
                >
                  تسجيل الخروج
                </button>
                {/* modal edit profile */}
                <div
                  className="modal fade"
                  id="edit-profile"
                  tabIndex="-1"
                  ariaLabelledby="exampleModalLabel"
                  ariaHidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header justify-content-center">
                        <h5 className="modal-title" id="exampleModalLabel">
                          {" "}
                          تعديل الملف الشخصي
                        </h5>
                      </div>
                      <div className="modal-body">
                        {/* section edit img */}
                        <ImageUploading
                          value={images}
                          onChange={onChange}
                          onError={onError}
                          maxNumber={maxNumber}
                          dataURLKey="data_url"
                        >
                          {({
                            imageList,
                            onImageUpload,
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
                                style={
                                  isDragging ? { color: "red" } : undefined
                                }
                                onClick={onImageUpload}
                                {...dragProps}
                              >
                                تعديل الصورة الشخصية
                                <i class="fal fa-edit"></i>
                              </button>
                              <div className="img-group">
                                {imageList.map((image, index) => (
                                  <div
                                    key={`image-${index}`}
                                    className="image-item"
                                  >
                                    <img
                                      src={image.data_url}
                                      alt=""
                                      width="100"
                                    />
                                    <div className="image-item__btn-wrapper">
                                      <button
                                        type="button "
                                        className="btn-update"
                                        onClick={() => onImageUpdate(index)}
                                      >
                                        تحديث
                                      </button>
                                      <button
                                        type="button "
                                        className="btn-remove"
                                        onClick={() => onImageRemove(index)}
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
                                    <span>
                                      Your selected file type is not allow
                                    </span>
                                  )}
                                  {errors.maxFileSize && (
                                    <span>
                                      Selected file size exceed maxFileSize
                                    </span>
                                  )}
                                  {errors.resolution && (
                                    <span>
                                      Selected file is not match your desired
                                      resolution
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </ImageUploading>
                        {/* end section edit img */}
                        {/* section edit name */}
                        <input
                          type="text"
                          className="form-control"
                          placeholder="تعديل الاسم"
                          required
                          value={name}
                          onChange={handleChangeName}
                        />
                        {/*end section edit name */}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn save"
                          onClick={handleSaveChanges}
                        >
                          حفظ{" "}
                        </button>
                        <button
                          type="button"
                          className="btn close"
                          data-bs-dismiss="modal"
                        >
                          إغلاق
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end modal edit profile */}
              </div>
              <div className="social-media d-flex justify-content-center">
                <a href="">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
