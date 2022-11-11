import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { Link } from "react-router-dom";
import "./../../assets/css/style.css";
import { storageUrl } from "./urls/urls";

function MyEstate({ loading, list, head, child, remove }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openLoadingDialog, setLoadingDialog] = useState(false);
  const [selected, setSelected] = useState(0);
  const openAlertDialog = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };
  const removeItem = async () => {
    setOpenDialog(false);
    setLoadingDialog(true);
    const result = await remove(selected);

    setLoadingDialog(false);
  };
  return (
    <div className="list-content">
      <div className="banner">
        {child === "myEstates" ? <h1>{head[0]}</h1> : <h1>{head[1]}</h1>}
      </div>
      <div className="container">
        {loading ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status"></div>
          </div>
        ) : (
          <div className="row">
            {list.length !== 0 ? (
              list.map((item) => (
                <div className="col-lg-4 col-md-6 mb-5" key={item.id}>
                  <Link to="">
                    <div
                      className="box"
                      style={{
                        border:
                          item.is_deleted === 1 ? "3px solid red" : "none",
                      }}
                    >
                      {item.images.length > 0 ? (
                        <img
                          src={storageUrl + item.images[0].url}
                          alt="real-state"
                        />
                      ) : (
                        <img
                          src={require("../../assets/img/slider-property.png")}
                          alt="real-state"
                        />
                      )}
                      <span className="d-flex justify-content-between ">
                        {item.is_deleted === 1 ? (
                          <>
                            <h4
                              style={{
                                color: "red",
                                textDecoration: "line-through red",
                              }}
                            >
                              {item.name}
                            </h4>
                            <div
                              className="price"
                              style={{
                                color: "red",
                              }}
                            >
                              {item.delete_reason}
                            </div>
                          </>
                        ) : (
                          <>
                            <h4>{item.name}</h4>
                            <div className="price">{item.price} ل.س</div>
                          </>
                        )}
                      </span>
                      <div className="location d-flex align-items-baseline">
                        <i className="fas fa-map-marker-alt"></i>
                        <p> {item.area.name} </p>
                      </div>
                      <div className="content d-flex justify-content-around ">
                        <Link to={`/update-estate/${item.id}`}>تعديل</Link>
                        <a
                          type="button"
                          onClick={() => openAlertDialog(item.id)}
                        >
                          حذف
                        </a>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>لا يوجد عناصر لعرضها</p>
            )}
          </div>
        )}
      </div>
      {child === "myEstates" ? (
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h3">تنبيه</Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h5">هل أنت متأكد؟</Typography>
          </DialogContent>
          <DialogActions>
            <div style={{ padding: "0 10px" }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeItem()}
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
      ) : (
        ""
      )}
      <Dialog
        open={openLoadingDialog}
        onClose={() => setLoadingDialog(false)}
        fullWidth
      >
        <DialogContent>
          <div className="text-center">
            <CircularProgress />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default MyEstate;
/*end component*/

/*style*/
/*end style*/
