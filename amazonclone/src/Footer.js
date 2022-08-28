import React from "react";
import { Link } from "react-router-dom";
import "./FooterorBacktoTop.css";
import BacktoTop from "./BacktoTop";
import { useStateValue } from "./StateProvider";

function Footer({ name }) {
  const [{ basket }, dispatch] = useStateValue();

  return (
    <>
      {/* below main wholeee footer big class... wrap all footer content include backToTop all in only one big class in below */}
      {/* <!-- Footer Starts --> */}

      <div
        className={
          name == "Home_page" || name == "Payment_page"
            ? "MAIN_WHOLE_FOOTER_CONTAINER_Homepg"
            : name == "Product_details_page"
            ? "MAIN_WHOLE_FOOTER_CONTAINER_for_product_detailspg"
            : name == "Checkout_page"
            ? basket.length <= 2
              ? basket.length == 0
                ? "MAIN_WHOLE_FOOTER_CONTAINER_checkoutpage_for_0_length"
                : basket.length == 1
                ? "MAIN_WHOLE_FOOTER_CONTAINER_checkoutpage_for_1_length"
                : basket.length == 2
                ? "MAIN_WHOLE_FOOTER_CONTAINER_checkoutpage_for_2_length"
                : ""
              : "MAIN_WHOLE_FOOTER_CONTAINER_Homepg"
            : name == "Search_product_page_for_1_srches"
            ? "MAIN_WHOLE_FOOTER_CONTAINER_Search_product_page_for_1_srches"
            : name == "Search_product_page_for_2_srches"
            ? "MAIN_WHOLE_FOOTER_CONTAINER_Search_product_page_for_2_srches"
            : name == "Search_product_page_for_3_srches"
            ? "MAIN_WHOLE_FOOTER_CONTAINER_Search_product_page_for_3_srches"
            : name == "Search_product_page_for_4_srches"
            ? "MAIN_WHOLE_FOOTER_CONTAINER_Search_product_page_for_4_srches"
            : name == "Search_product_page_above_4srches"
            ? "MAIN_WHOLE_FOOTER_CONTAINER_Homepg"
            : name == "Returns_orders_page"
            ? "Returns_orders_page"
            : (name = "Returns_orders_page_length_zero"
                ? "Returns_orders_page_length_zero"
                : "")
        }
        // className={
        //   basket.length <= 2
        //     ? basket.length == 0
        //       ? "MAIN_WHOLE_FOOTER_CONTAINER_0"
        //       : basket.length == 1
        //       ? "MAIN_WHOLE_FOOTER_CONTAINER_1"
        //       : basket.length == 2
        //       ? "MAIN_WHOLE_FOOTER_CONTAINER_2"
        //       : ""
        //     : "MAIN_WHOLE_FOOTER_CONTAINER"
        // }
      >
        <BacktoTop />
        <div
          className="container-fluid px-0 overflow-hidden"
          style={{ backgroundColor: "#232f3e" }}
        >
          <div className="stylefrstcontainer">
            <div className="row text-white">
              <div className="col-md-3">
                <h5
                  className="fstgridline "
                  style={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  Get to Know Us
                </h5>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Careers
                </Link>
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Blog
                </Link>
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  About Amazon
                </Link>
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Amazon Devices
                </Link>
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Offers
                </Link>
                <br />
              </div>

              <div className="col-md-3">
                <h5
                  className="fstgridline "
                  style={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  Make Money With Us
                </h5>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Sell Products on Amazon
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Sell Apps on Amazon
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Self-Publish with Us
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Affiliate Marketing
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Fullfilment Center
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Advertise Your Product
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Amazon Pay
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Host An Amazon Hub
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Sell on Amazon Business
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  See More Make Money with Us
                </Link>{" "}
                <br />
              </div>

              <div className="col-md-3">
                <h5
                  className="fstgridline "
                  style={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  Connect With Us
                </h5>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Facebook
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Twitter
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Instagram
                </Link>
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  YouTube
                </Link>
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Facebook Messenger
                </Link>
                <br />
              </div>

              <div className="col-md-3">
                <h5
                  className="fstgridline "
                  style={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  Let Us Help You
                </h5>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Amazon and COVID-19
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Your Account
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Your Orders
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Shipping Rates & Policies
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Returns & Replacements
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Manage Your Devices
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Amazon Assistant
                </Link>{" "}
                <br />
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#cccecf",
                    lineHeight: "25px",
                    fontSize: "14px",
                  }}
                  to="#"
                  className=""
                >
                  Help
                </Link>{" "}
                <br />
              </div>
            </div>
          </div>

          <div
            className="dropdown-divider mt-3"
            style={{ backgroundColor: "#37475a" }}
          ></div>

          <div className="row mt-4 mx-0 px-0">
            <div className="col-md-12 text-center">
              <img
                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                height="30"
                width="100"
                alt="amazon logo white footer"
              />
            </div>
          </div>

          {/* <!-- Sub footer starts --> */}
          <div
            className="py-3 mt-3 shadow-lg"
            style={{ backgroundColor: "#131a22", fontSize: "12px" }}
          >
            <div className="stylescndcontainer">
              <div className="row text-white">
                <div className="col-md-2">
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      Amazon Music
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Stream millions
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        of songs
                      </span>
                    </div>
                  </Link>{" "}
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      {" "}
                      Sell on Amazon
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Start a Selling
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Account
                      </span>
                    </div>
                  </Link>{" "}
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      Book Depository
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Books With Free{" "}
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Delivery
                      </span>{" "}
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        WorldWide
                      </span>
                    </div>
                  </Link>
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      {" "}
                      Ring
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Smart Home
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Security Sytems
                      </span>
                    </div>
                  </Link>
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      {" "}
                      IMDb
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Movies, TV
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        &Celebrities
                      </span>
                    </div>
                  </Link>
                  <br />
                </div>

                <div className="col-md-2">
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      Amazon Drive
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Cloud Storage
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        of songs
                      </span>
                    </div>
                  </Link>{" "}
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      {" "}
                      Amazon Global
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Ship Orders
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Internationally
                      </span>
                    </div>
                  </Link>{" "}
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      ComiXology
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Thousands of{" "}
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Delivery
                      </span>{" "}
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Digital Comics
                      </span>
                    </div>
                  </Link>
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      Blink
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Smart Security
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        for Every Home
                      </span>
                    </div>
                  </Link>
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      {" "}
                      Kindle Publishing
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Digital & Print
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Made Easy
                      </span>
                    </div>
                  </Link>
                  <br />
                </div>

                <div className="col-md-2">
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      Amazon Advertising
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Find, attract, and
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        engage customers
                      </span>
                    </div>
                  </Link>{" "}
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      {" "}
                      Amazon Business
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Everything For
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Your Business
                      </span>
                    </div>
                  </Link>{" "}
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      Box Office Mojo
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Find Movie{" "}
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Box Office Data
                      </span>
                    </div>
                  </Link>
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      {" "}
                      IMDbPro
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Get Info
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Entertainment
                      </span>
                    </div>
                  </Link>
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      {" "}
                      eero Wifi
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Stream 4k Video{" "}
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        in Every Room
                      </span>
                    </div>
                  </Link>
                  <br />
                </div>
                <div className="col-md-2">
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      6pm
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Score deals on
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        fashion brands
                      </span>
                    </div>
                  </Link>{" "}
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      {" "}
                      Home Services
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Experienced
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Happiness
                      </span>
                    </div>
                  </Link>{" "}
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      DPReview
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Digital
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Photography
                      </span>{" "}
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        WorldWide
                      </span>
                    </div>
                  </Link>
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      {" "}
                      PrimeVideo
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Video
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Distribution
                      </span>
                    </div>
                  </Link>
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      {" "}
                      Neighbors Apps
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Real-Time Crime
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        & Safety Alerts
                      </span>
                    </div>
                  </Link>
                  <br />
                </div>
                <div className="col-md-2">
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      ACX
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Audiobook
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Publishing
                      </span>
                    </div>
                  </Link>{" "}
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      Amazon Web Services
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Scalable Cloud
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Computing Services
                      </span>
                    </div>
                  </Link>{" "}
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      Fabric
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Sewing{" "}
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Quilting,knitting
                      </span>{" "}
                      <br />
                    </div>
                  </Link>
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      {" "}
                      Woot!
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Deals and
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Shenanigans
                      </span>
                    </div>
                  </Link>
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      {" "}
                      PillPack
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Pharmacy
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Simplified
                      </span>
                    </div>
                  </Link>
                  <br />
                </div>
                <div className="col-md-2">
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      AbeBooks
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Books, art
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        & collectibles
                      </span>
                    </div>
                  </Link>{" "}
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      {" "}
                      Amazon Ignite
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Sell your
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Original
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Digital Resources
                      </span>
                    </div>
                  </Link>{" "}
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      East Dane
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Designer Men's{" "}
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Fashion
                      </span>
                    </div>
                  </Link>
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      Shopbop
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Designer
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Fashion Brands
                      </span>
                    </div>
                  </Link>
                  <br />
                  <Link
                    style={{ textDecoration: "none" }}
                    to="#"
                    className="text-white"
                  >
                    <div style={{ lineHeight: "20px", color: "lightgray" }}>
                      Zappos
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        Shoes &{" "}
                      </span>
                      <br />
                      <span style={{ color: "darkgrey", fontSize: "11px" }}>
                        {" "}
                        Clothing
                      </span>
                    </div>
                  </Link>
                  <br />
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-md-12 text-center text-white">
                <p className="footercopy">
                  Conditions of Use &nbsp; &nbsp; Privacy Notice &nbsp; &nbsp;
                  Interest-Based Adds &nbsp; &nbsp; © 1996-2022,{" "}
                  <strong className="footer_end_amazon">Amazon Clone</strong>
                  &nbsp; Inc or its affiliates
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Sub footer ends --> */}
      </div>
    </>
  );
}

export default Footer;
