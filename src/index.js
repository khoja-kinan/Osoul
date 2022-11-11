import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./views/components/Header";
import "./assets/css/style.css";
import HomePage from "./views/components/HomePage";
import Footer from "./views/components/Footer";
import Login from "./views/components/Login";
import Profile from "./views/components/Profile";
import Category from "./views/components/Category";
import BrowseCategory from "./views/components/BrowseCategory";
import BuyProperty from "./views/components/BuyProperty";
import SingleProperty from "./views/components/SingleProperty";
import SaleProperty from "./views/components/SaleProperty";
import FilterProperty from "./views/components/FilterProperty";
import Contact from "./views/components/Contact";
import MyEstateController from "./controller/MyestateController";
import UpdateEstateController from "./controller/UpdateEstateController";
import FilterResult from "./views/components/FilterResult";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Header />

    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route element={<Profile />} path="/profile" />
      <Route element={<Category />} path="/category" />
      <Route element={<BrowseCategory />} path="/browse-category/:catId" />
      <Route
        element={<BuyProperty />}
        path="/buy-property/:catId/:status/:typeId"
      />
      <Route element={<SingleProperty />} path="/single-property/:estateId" />
      <Route element={<SaleProperty />} path="/sale-property/:id" />
      <Route element={<FilterProperty />} path="/filter-property/:id" />
      <Route element={<Contact />} path="/contact-us" />
      <Route element={<FilterResult />} path="/filter-result" />
      <Route
        element={<MyEstateController child="myDeals" />}
        path="/my-deals"
      />
      <Route
        element={<MyEstateController child="myEstates" />}
        path="/my-estates"
      />
      <Route element={<UpdateEstateController />} path="/update-estate/:id" />
    </Routes>
    <Footer />
  </BrowserRouter>
);

reportWebVitals();
