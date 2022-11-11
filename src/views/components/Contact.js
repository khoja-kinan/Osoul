import axios from "axios";
import { useEffect, useState } from "react";
import { contactUs } from "./urls/urls";
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const send = async () => {
    setIsLoading(true);
    await axios
      .post(
        contactUs,
        {
          email: email,
          name: name,
          phone: phone,
          state: country,
          message: message,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        setResponseMessage(response.data["message"]);
        setIsLoading(false);
      })
      .catch((error) => {
        setResponseMessage("Unknown error happened, please try again later");
        setIsLoading(false);
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="contact-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-12 col-12 ">
            <div className="box">
              <h2>اتصل بنا</h2>
              <p>
                لديك أسئلة ولدينا إجابات. اتصل بنا اليوم ، نحن هنا لمساعدتك.
              </p>
              {responseMessage != "" ? (
                <p className="alert alert-danger">{responseMessage}</p>
              ) : (
                ""
              )}
              <form>
                <div className="row ">
                  <div className="col-lg-6 col-md-12 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="الاسم"
                      onInput={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="البريد الإلكتروني"
                      onInput={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row ">
                  <div className="col-lg-6 col-md-12 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="رقم الهاتف"
                      onInput={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="المحافظة"
                      onInput={(e) => setCountry(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-12">
                    <textarea
                      type="text"
                      class="form-control"
                      placeholder="رسالة"
                      onInput={(e) => setMessage(e.target.value)}
                      name="message"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="text-center">
                  {isLoading ? (
                    <p>Sending Your Email...</p>
                  ) : (
                    <button
                      type="submit"
                      className="btn-send"
                      onClick={() => send()}
                    >
                      ارسال
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;
