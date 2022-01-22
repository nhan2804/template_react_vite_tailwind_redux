import "react-toastify/dist/ReactToastify.css";
import "./App.css";
// import Footer from "@components/Footer";
// import Header from "@components/Header";

import { ScrollToTop } from "@components/ScrollToTop";
import GetRoutes from "@routes/GetRoutes";
import { LazyMotion } from "framer-motion";
import React from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import HeaderNav from "@components/Header";
import { Layout } from "antd";

const loadFeatures = () =>
  import("./config/framer-motion").then((res) => res.default);
function App() {
  return (
    <React.StrictMode>
      <LazyMotion features={loadFeatures} strict>
        <div style={{ position: "absolute" }} id="back-to-top-anchor" />
        <Layout className="h-full !bg-white">
          <HeaderNav />
          <div className="ml-48 text-white text-lg !bg-white"></div>
          <GetRoutes />
          {/* <Footer /> */}
        </Layout>
        <ToastContainer />
        <ScrollToTop />
        <ReactQueryDevtools initialIsOpen />
      </LazyMotion>
    </React.StrictMode>
  );
}

export default App;
