import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUrl } from "./urls/urls";

function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const data = {
      phone: phoneNumber,
      password: password,
      fcm_token:
        "daa5TUpHQKmUw3GgxrOlsJ:APA91bHtqpCDZXNgB1SEg8sShraEa-z13SQaBLDXEUrZKrWPbFMWKQasPIFJAnAgT-FPpzSNAz0nNvsW9Yq6ze4LXvZyPmo3ss2wREmcic6x8Oc-V0fY1UW9oChaJ3Dzf6cMM48lx2yt",
    };
    await axios
      .post(loginUrl, data, { headers: { Accept: "application/json" } })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("OFTo", response.data.data.token);
          localStorage.setItem("OFUsrNm", response.data.data.user.name);
          localStorage.setItem("OFUsrNmr", response.data.data.user.phone);
          localStorage.setItem("OFUsravt", response.data.data.user.image);
          /* navigate("/category");
          navigate(0); */
          navigate("/profile");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="box">
              <h1>تسجيل الدخول</h1>
              <form>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="رقم الهاتف"
                    required
                    value={phoneNumber}
                    onChange={handleChangePhoneNumber}
                  />
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="كلمة المرور"
                    required
                    value={password}
                    onChange={handleChangePassword}
                  />
                  <i class="fas fa-lock"></i>
                </div>
                <div className="forget">
                  <a href="">هل نسيت كلمة المرور؟</a>
                </div>

                <button onClick={handleSubmitLogin} className="btn-submit">
                  تسجيل الدخول
                </button>
                {/* <div className="new-member text-center">
                                    <p>هل أنت مستخدم جديد؟ 
                                         <a href=""> أنشئ حساب الآن </a>
                                           </p>
                                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
