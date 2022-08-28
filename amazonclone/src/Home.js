import React, { useState, useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import { Carousel, Pagination } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import CarouselimagesAPI from "./CarouselimagesAPI";
import ProductsAPI from "./ProductsAPI";
import ReactPaginate from "react-paginate";
//for react slick carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import ProductsforSlickSlider from "./ProductsforSlickSlider";
import TopPopularProduct from "./TopPopularProduct";
import { useStateValue } from "./StateProvider";
import { DarkCarouselimagesAPI } from "./CarouselimagesAPI";

function Home() {
  const [{ dark }, dispatch] = useStateValue();
  const [users, setUsers] = useState(ProductsAPI);
  const [pageNumber, setPageNumber] = useState(
    JSON.parse(localStorage.getItem("changepage") || 0)
  );
  const usersPerPage = 26;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    localStorage.setItem("changepage", JSON.stringify(pageNumber));
  }, [pageNumber]);

  // for react slick carousel slider

  const PreviousBtn = (props) => {
    console.log(props);
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowBackIosIcon
          className={dark ? "dark_forprevSlick" : "forprevSlick"}
        />
      </div>
    );
  };
  const NextBtn = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowForwardIosIcon
          className={dark ? "dark_fornextSlick" : "fornextSlick"}
        />
      </div>
    );
  };

  const carouselProperties = {
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    slidesToShow: 6,
    infinite: true,
    slidesToScroll: 2,
    centerMode: false,
    centerPadding: "170px",
    responsive: [
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 5,
          centerMode: false,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div>
      <Header />

      {/* //Bootstrap BreadCrumb add for map */}

      {/* <nav aria-label="breadcrumb" className="breadstyle">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active " id="location-style" aria-current="page">
            Deliver to 
            <div id="Paks">
            <h5 id="Paks">Pakistan</h5>
            </div>
          </li>
        </ol>
      </nav> */}

      {/* <div className="home">
        <div className="home__container"> */}
      {/* <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        /> */}

      {
        //First way
        /* {Carouselimages.map(function ncard(elem) {
            return(
           <img className="home__image" src={elem.img} alt={elem.alt} />
            );
          })} */
      }

      {/* Second Way */}
      {/* <Carousel indicators={false} transitionDuration={500}>
            {CarouselimagesAPI.map((elem) => (
              <Carousel.Item>
                <img className="home__image" src={elem.img} alt={elem.alt} />
              </Carousel.Item>
            ))}
          </Carousel> */}

      {/* <Carousel indicators={false} transitionDuration={500}> */}

      {/* </Carousel> */}

      {/* 
            <Carousel.Item>
              <img
                className="home__image"
                src="/images/simage1.png"
                alt="First slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="home__image"
                src="/images/simage2.png"
                alt="Second slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="home__image"
                src="/images/simage3.png"
                alt="Third Slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="home__image"
                src="/images/simage4.png"
                alt="Fourth Slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="home__image"
                src="/images/simage5.png"
                alt="Fifth Slide"
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="home__image"
                src="/images/simage6.png"
                alt="Sixth Slide"
              />
            </Carousel.Item>
          </Carousel> */}

      {/* <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="First slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="https://images-eu.images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="Second slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="https://images-eu.images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="Third slide" />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div> */}

      {
        //Previous Product Work
        /* <Product
              id="1"
              title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
              price={199.99}
              rating={3}
              image="/images/pimage3.jpg"
            />
            <Product
              id="2"
              title="Amazon Echo (3rd generation) | Smart speaker with Alexa, "
              price={98.99}
              rating={5}
              image="/images/pimage4.png"
            />
            <Product
              id="3"
              title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
              price={598.99}
              rating={4}
              image="/images/test.jpg"
            />
            <Product
              id="4"
              title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
              price={598.99}
              rating={4}
              image="/images/pimage6.png"
            /> */
      }

      <div className="home">
        <div className="container-fluid Big_Home_Carousell_Slider">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div
                id="carouselExampleControls"
                className="carousel slide-fade"
                data-interval="3000"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  {dark
                    ? DarkCarouselimagesAPI.map((elem) =>
                        elem.img == "/images/simage1d.png" ? (
                          <div className="carousel-item active">
                            <img
                              className="home__image"
                              src={elem.img}
                              alt={elem.alt}
                            />
                          </div>
                        ) : (
                          <div className="carousel-item ">
                            <img
                              className="home__image"
                              src={elem.img}
                              alt={elem.alt}
                            />
                          </div>
                        )
                      )
                    : CarouselimagesAPI.map((elem) =>
                        elem.img == "/images/simage1.jpg" ? (
                          <div className="carousel-item active">
                            <img
                              className="home__image"
                              src={elem.img}
                              alt={elem.alt}
                            />
                          </div>
                        ) : (
                          <div className="carousel-item ">
                            <img
                              className="home__image"
                              src={elem.img}
                              alt={elem.alt}
                            />
                          </div>
                        )
                      )}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <ArrowBackIosIcon
                    className={dark ? "dark_forprevSlider" : "forprevSlider"}
                  />
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <ArrowForwardIosIcon
                    className={dark ? "dark_fornextSlider" : "fornextSlider"}
                  />
                </a>
              </div>
              {/* <Carousel
                indicators={false}
                interval={3000}>
                transitionDuration={2000}
                {dark
                  ? DarkCarouselimagesAPI.map((elem) => (
                      <Carousel.Item>
                        <img
                          className="home__image"
                          src={elem.img}
                          alt={elem.alt}
                        />
                      </Carousel.Item>
                    ))
                  : CarouselimagesAPI.map((elem) => (
                      <Carousel.Item>
                        <img
                          className="home__image"
                          src={elem.img}
                          alt={elem.alt}
                        />
                      </Carousel.Item>
                    ))}
              </Carousel> */}
            </div>
          </div>
        </div>

        <div className="container-fluid Main_Product_Row">
          <div className="row" id="home__row1__for_1st_two__rows">
            {users
              .slice(pagesVisited, pagesVisited + 8)
              //.slice(0, 8) for 1st two rows..
              .map((elem) => (
                <div className=" col-lg-3 col-md-4 col-sm-6 col-xs-12">
                  <Product
                    id={elem.id}
                    title={elem.title}
                    rprice={elem.rprice}
                    sprice={elem.sprice}
                    rating={elem.rating}
                    images={dark ? elem.darkimages[0] : elem.images[0]}
                    quantity={elem.quantity}
                  />
                </div>
              ))}
          </div>
          <div
            className={
              dark
                ? "carousel dark_slick_slider_styling"
                : "carousel slick_slider_styling"
            }
          >
            <h3
              className={
                dark
                  ? "dark_slick_slider_styling__heading3"
                  : "slick_slider_styling__heading3"
              }
            >
              Popular products in PC internationally
            </h3>
            <Slider {...carouselProperties}>
              {users
                .slice(pagesVisited + 8, pagesVisited + 18)
                // .slice(8, 18) for slick slider..
                .map((elem) => (
                  <ProductsforSlickSlider
                    id={elem.id}
                    images={dark ? elem.darkimages[0] : elem.images[0]}
                  />
                ))}
            </Slider>
          </div>
          <div className="row" id="home__row1__for_last_two__rows">
            {users
              .slice(pagesVisited + 18, pagesVisited + 26)
              // .slice(18, 26) for last two rows..
              .map((elem) => (
                <div className=" col-lg-3 col-md-4 col-sm-6 col-xs-12">
                  <Product
                    id={elem.id}
                    title={elem.title}
                    rprice={elem.rprice}
                    sprice={elem.sprice}
                    rating={elem.rating}
                    images={dark ? elem.darkimages[0] : elem.images[0]}
                    quantity={elem.quantity}
                  />
                </div>
              ))}
          </div>

          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={changePage}
            initialPage={JSON.parse(localStorage.getItem("changepage") || 0)}
            containerClassName={dark ? "dark-pagination" : "pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
          {/* <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"active"}
              previousClassName={"page-item"}
            /> */}
        </div>
      </div>

      {/* for react slick carousel below code*/}

      {/* const MultiItemCarousel = () => {
  return ( */}
      {/* <Card item={item} /> */}
      <div className="container-fluid">
        <div
          className={
            dark
              ? "carousel dark_top_product_slick_slider_styling"
              : "carousel top_product_slick_slider_styling"
          }
        >
          <h3
            className={
              dark
                ? "dark_top_product_slick_slider_styling__heading3"
                : "top_product_slick_slider_styling__heading3"
            }
          >
            Top Popular Products
          </h3>
          <Slider {...carouselProperties}>
            {users.slice(18, 25).map((elem) => (
              <TopPopularProduct
                id={elem.id}
                rprice={elem.rprice}
                images={dark ? elem.darkimages[0] : elem.images[0]}
              />
            ))}
            {users.slice(44, 51).map((elem) => (
              <TopPopularProduct
                id={elem.id}
                rprice={elem.rprice}
                images={dark ? elem.darkimages[0] : elem.images[0]}
              />
            ))}
            {users.slice(70, 78).map((elem) => (
              <TopPopularProduct
                id={elem.id}
                rprice={elem.rprice}
                images={dark ? elem.darkimages[0] : elem.images[0]}
              />
            ))}
            {users.slice(96, 103).map((elem) => (
              <TopPopularProduct
                id={elem.id}
                rprice={elem.rprice}
                images={dark ? elem.darkimages[0] : elem.images[0]}
              />
            ))}
          </Slider>
        </div>
      </div>
      {/* );
}; */}

      {/* const Card = ({ item }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        className="multi__image"
        src={item}
        alt=""
        style={{
          width: "100%",
          height: "170px",
          objectFit: "contain",
          marginBottom: "10px",
        }}
      />
      <p style={{ fontSize: "14px", padding: "5px 0" }}>TOP TRNDING TVs</p>
      <p style={{ fontSize: "16px", padding: "5px 0", color: "green" }}>
        From ₹ 7,000
      </p>
      <p style={{ fontSize: "14px", padding: "5px 0", color: "gray" }}>
        Up To ₹ 5,000 Off on HDFC
      </p>
    </div>
  );
}; */}
      {/* export default MultiItemCarousel; */}

      {/* AS A TEST SAMPLE */}
      {/* <div className="home__row">
            {ProductsAPI1.map((elem) => (
              <Product
                id={elem.id}
                title={elem.title}
                price={elem.price}
                rating={elem.rating}
                images={elem.images[0]}
              />
            ))}
          </div> */}

      {/* <div className="home__row">
            <Product
              id="5"
              title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
              price={199.99}
              rating={3}
              image="/images/pimage3.jpg"
            />
            <Product
              id="6"
              title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
              price={98.99}
              rating={5}
              image="/images/pimage4.png"
            />
            <Product
              id="7"
              title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
              price={598.99}
              rating={4}
              image="/images/pimage5.jpg"
            />
            <Product
              id="8"
              title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
              price={598.99}
              rating={4}
              image="/images/pimage6.png"
            />
          </div> */}

      {/* <div className="home__row" >
            {ProductsAPI.map((elem) => (
              <Product
                id={elem.id}
                title={elem.title}
                price={elem.price}
                rating={elem.rating}
                image={elem.image}
              />
            ))}
          </div> */}

      {/* <div className="home__row">
            <Product
              id="9"
              title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
              price={11.96}
              rating={5}
              image="/images/pimage1.jpg"
            />
            <Product
              id="10"
              title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
              price={239.0}
              rating={4}
              image="/images/pimage2.jpg"
            />
          </div> */}

      {/* <div className="home__row">
            <Product
              id="11"
              title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
              price={199.99}
              rating={3}
              image="/images/pimage3.jpg"
            />
            <Product
              id="12"
              title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
              price={98.99}
              rating={5}
              image="/images/pimage4.png"
            />
            <Product
              id="13"
              title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
              price={598.99}
              rating={4}
              image="/images/pimage5.jpg"
            />
            <Product
              id="14"
              title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
              price={598.99}
              rating={4}
              image="/images/pimage6.png"
            />
          </div>

          <div className="home__row">
            <Product
              id="15"
              title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
              price={199.99}
              rating={3}
              image="/images/pimage3.jpg"
            />
            <Product
              id="16"
              title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
              price={98.99}
              rating={5}
              image="/images/pimage4.png"
            />
            <Product
              id="17"
              title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
              price={598.99}
              rating={4}
              image="/images/pimage5.jpg"
            />
            <Product
              id="18"
              title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
              price={598.99}
              rating={4}
              image="/images/pimage6.png"
            />
          </div>

          <div className="home__row">
            <Product
              id="19"
              title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
              price={1094.98}
              rating={4}
              image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
            />
          </div> */}
      {/* </div>
      </div> */}
      <Footer name="Home_page" />
    </div>
  );
}

export default Home;
