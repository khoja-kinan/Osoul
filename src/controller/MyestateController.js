import axios from "axios";
import { useEffect, useState } from "react";
import {
  createEstate,
  myDeals,
  myEsatates,
} from "../views/components/urls/urls";
import MyEstate from "../views/components/MyEstate";

export default function MyEstateController({ child }) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [head, setHead] = useState(["عقاراتي", "صفقاتي"]);
  const token = localStorage.getItem("OFTo");

  /**
   * get my deals
   * @return void
   */
  const getDeals = async () => {
    setLoading(true);
    let result = null;
    if (token != null) {
      await axios
        .get(myDeals, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            result = res.data.data;
            setList(result);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    setLoading(false);
  };
  /**
   * get my published estates
   * @return void
   */
  const getEstate = async () => {
    setLoading(true);
    let result = null;
    if (token != null) {
      await axios
        .get(myEsatates, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            result = res.data.data;
            setList(result);
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    setLoading(false);
  };
  /**
   * delete estate
   *
   */
  const deleteEstate = async (id) => {
    await axios
      .delete(`${createEstate}/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error.response);
        return false;
      });
  };
  useEffect(() => {
    switch (child) {
      case "myDeals":
        getDeals();
        break;
      case "myEstates":
        getEstate();
        break;
      default:
        break;
    }
  }, []);
  return (
    <MyEstate
      loading={loading}
      list={list}
      head={head}
      child={child}
      remove={deleteEstate}
    />
  );
}
