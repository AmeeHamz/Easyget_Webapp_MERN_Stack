import React, { useEffect, useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
// import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RoomIcon from "@mui/icons-material/Room";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import FlagIcon from "@mui/icons-material/Flag";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import ProductsAPI from "./ProductsAPI";
//for react tooltip
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import "tippy.js/themes/light.css";
import "tippy.js/animations/scale-extreme.css";

// import { AnimatedList } from "react-animated-list";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import GoogleMap from "./GoogleMap";
import OutsideClickHandler from "react-outside-click-handler";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
  const navigate = useNavigate();
  //  optional concept
  //  const getMode = () => {
  //   return JSON.parse(localStorage.getItem("mode")) || false;
  //  };
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow2Mobile, setModalShow2Mobile] = useState(false);

  const [hamburger, setHamburger] = useState(true);

  const [{ basket, user, totalItem, dark }, dispatch] = useStateValue();
  //optional
  // const [mode, setMode] = useState(getMode());
  // const [mode, setMode] = useState(dark);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);
  const userHomePage = async () => {
    try {
      const resp = await fetch("/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await resp.json();

      if (!resp.status === 200) {
        const error = new Error(resp.error);
        throw error;
      } else {
        // console.log(data);
        setUserName(data.firstname);
        setShow(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userHomePage();
  }, []);

  const callLogOutPage = async () => {
    try {
      const resp = await fetch("/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await resp.json();
      // console.log(data);

      if (!resp.status === 200) {
        const error = new Error(resp.error);
        throw error;
      } else {
        console.log(data);
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const callOrdersPage = async () => {
    try {
      const resp = await fetch("/orderss", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await resp.json();
      console.log(data);

      if (!resp.status === 200) {
        const error = new Error(resp.error);
        throw error;
      } else {
        navigate("/orders");
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
  const handleFilter = (event) => {
    setModalShow2(true);
    setModalShow2Mobile(true);
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = ProductsAPI.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      setModalShow2(false);
      setModalShow2Mobile(false);
      if (filteredData.length === 0) {
        // alert("Please Write Valid Product Name");
        console.log("you entered 'enter key!' in empty or unmatched data");
      } else {
        navigate(`/searchproducts/${wordEntered}`);
      }
    }
  };

  const ThemeProvider = (dark) => {
    dispatch({
      type: "SET_DARK_THEME",
      setmode: !dark,
    });
    //optional
    // setMode(!dark);
  };

  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(dark));
  }, [dark]);

  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
    // I am just adding the basket array in the local storage bcs when our page will be reload then our basket items will remain stored in the home page..
    localStorage.setItem("basket", JSON.stringify(basket));
    // console.log(
    //   `The total items are ${basket.length} in this basket of an array`
    // );
    // console.log(basket);
    // console.log(`The total subitems are ${totalItem}`);
  }, [basket]);

  // const clearInput = () => {
  //   setFilteredData([]);
  //   setWordEntered("");
  // };
  return (
    <div id="top__page">
      {/* Desktop NavBar Start here*/}

      <div className="header">
        <Link to="/">
          <img
            className="header__logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Logo"
          />
        </Link>

        <div className="location" onClick={() => setModalShow1(true)}>
          <div className="location_icon">
            <RoomIcon />
          </div>
          <div className="location_text">
            <p1 style={{ color: "rgb(202, 197, 197)" }}>
              Deliver to, <br /> <h6 style={{ fontSize: "18px" }}>Pakistan</h6>
            </p1>
          </div>
        </div>

        <Modal
          show={modalShow1}
          onHide={() => setModalShow1(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className={dark ? "dark-my-modal" : "my-modal"}
        >
          <Modal.Header className={dark ? "dark-modal-header" : "modal-header"}>
            <Modal.Title id="contained-modal-title-vcenter">
              Deliver to Pakistan
            </Modal.Title>
            {dark ? (
              <CloseButton
                variant="white"
                onClick={() => setModalShow1(false)}
              />
            ) : (
              <CloseButton
                variant="black"
                onClick={() => setModalShow1(false)}
              />
            )}
          </Modal.Header>
          <Modal.Body>
            <GoogleMap />
          </Modal.Body>
          {/* <Modal.Footer></Modal.Footer> */}
        </Modal>

        <OutsideClickHandler
          onOutsideClick={() => {
            // alert("You clicked outside of this component!!!");
            setModalShow2(false);
          }}
        >
          <div className="header__search">
            <input
              type="text"
              className={
                dark ? "dark_header__searchInput" : "header__searchInput"
              }
              placeholder="Enter Product Name..."
              value={wordEntered}
              onChange={handleFilter}
              onKeyPress={handleKey}
            />
            {/* <input
            className="header__searchInput"
            type="text"
            placeholder ="Enter Product Name..."
          /> */}

            {/* <button className="header__searchIcon__btn " type="submit">
            {filteredData.length == 0 ? (
              <SearchIcon />
            ) : (
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/searchproducts/${wordEntered}`}
              >
                <SearchIcon />
              </Link>
            )}
          </button> */}

            {filteredData.length == 0 ? (
              <Link to="" className="header__searchIcon__btn">
                <SearchIcon />
              </Link>
            ) : (
              <Link
                to={`/searchproducts/${wordEntered}`}
                className="header__searchIcon__btn"
                onClick={() => {
                  setModalShow2(false);
                }}
              >
                <SearchIcon />
              </Link>
            )}

            {modalShow2 && filteredData.length != 0 && (
              <div className={dark ? "dark_dataResult" : "dataResult"}>
                {filteredData.map((elem, key) => {
                  return (
                    <Link
                      style={{ textDecoration: "none" }}
                      className={dark ? "dark_dataItem" : "dataItem"}
                      onClick={() => {
                        setModalShow2(false);
                      }}
                      to={`/searchproducts/${elem.title}`}
                    >
                      <p>{elem.title}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </OutsideClickHandler>
        {/* Optional for below part
        {mode?():()} */}
        {dark ? (
          <Tippy
            theme={"dark"}
            arrow={false}
            animation={"fade"}
            content={
              <h1 className="Switch_to_light_theme">Switch to light theme</h1>
            }
          >
            <div className="darkmodeicon">
              <DarkModeTwoToneIcon onClick={() => ThemeProvider(dark)} />
            </div>
          </Tippy>
        ) : (
          <Tippy
            theme={"light"}
            arrow={false}
            animation={"fade"}
            content={
              <h1 className="Switch_to_dark_theme">Switch to dark theme</h1>
            }
          >
            <div className="lightmodeicon">
              <LightModeTwoToneIcon onClick={() => ThemeProvider(dark)} />
            </div>
          </Tippy>
        )}

        {/* <div className={dark ? "testingclass" : "darkmodeicon"}>
          <Brightness4SharpIcon onClick={() => ThemeProvider(dark)} />
        </div> */}

        {/* <div className="header__nav"> */}
        {/* <Link to="login" style={{ textDecoration: "none" }}> */}
        {/* <div className="header__option" id="header__option1"> */}
        {show ? (
          <div
            className="header__option1"
            method="GET"
            onClick={callLogOutPage}
          >
            <span
              style={{ paddingLeft: "5px", paddingRight: "3px" }}
              className="header__option1LineOne"
            >
              Hello,&nbsp;{userName}
              <br />
              <Link to="/login" style={{ textDecoration: "none" }}>
                <h6 className="header__option1LineTwo">Log Out</h6>
              </Link>
            </span>
          </div>
        ) : (
          <Tippy
            placement={"bottom"}
            animation={"scale-extreme"}
            theme={dark ? "dark" : "light"}
            interactive={true}
            offset={[0, 10]}
            content={
              <div className="tooltip__container">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <button className="tooltip__btn">Sign In</button>
                </Link>
                <p>
                  New customer?&nbsp;&nbsp;
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <span
                      className={
                        dark
                          ? "dark_tooltip__btn_start_here"
                          : "tooltip__btn_start_here"
                      }
                    >
                      Start here.
                    </span>
                  </Link>
                </p>
              </div>
            }
          >
            <div className="header__option1">
              {/* id="header__option1" */}
              <span
                style={{ paddingLeft: "5px", paddingRight: "3px" }}
                className="header__option1LineOne"
              >
                Hello,&nbsp;Guest User
                <br />
                <h6 className="header__option1LineTwo">Sign In</h6>
              </span>
            </div>
          </Tippy>
        )}

        {/* <Link to="/orders" style={{ textDecoration: "none" }}> */}
        <div className="header__option2" method="GET" onClick={callOrdersPage}>
          <span className="header__option2LineOne">Returns</span>
          <span className="header__option2LineTwo">& Orders</span>
        </div>
        {/* </Link> */}

        <Link to="/primevideos" style={{ textDecoration: "none" }}>
          <div className="header__option3">
            <span className="header__option3LineOne">Your</span>
            <span className="header__option3LineTwo">Prime</span>
          </div>
        </Link>

        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <div className="header__optionBasket4">
            <ShoppingCartOutlinedIcon style={{ fontSize: "30px" }} />
            <span className="header__basketCount">{totalItem}</span>
          </div>
        </Link>
      </div>

      {/* Desktop NavBar End here*/}

      {/* Mobile Hamburger Section here */}
      <div className="mob_hamburger_menu_mobile">
        {hamburger ? (
          <div className="header_mobile">
            <Link to="/">
              <img
                className="header__logo_mobile"
                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Logo"
              />
            </Link>

            <OutsideClickHandler
              onOutsideClick={() => {
                // alert("You clicked outside of this component!!!");
                setModalShow2Mobile(false);
              }}
            >
              <div className="header__search_mobile">
                <input
                  type="text"
                  className={
                    dark
                      ? "dark_header__searchInput_mobile"
                      : "header__searchInput_mobile"
                  }
                  placeholder="Enter Product Name..."
                  value={wordEntered}
                  onChange={handleFilter}
                  onKeyPress={handleKey}
                />

                {filteredData.length == 0 ? (
                  <Link to="" className="header__searchIcon__btn_mobile">
                    <SearchIcon />
                  </Link>
                ) : (
                  <Link
                    to={`/searchproducts/${wordEntered}`}
                    className="header__searchIcon__btn_mobile"
                    onClick={() => {
                      setModalShow2Mobile(false);
                    }}
                  >
                    <SearchIcon />
                  </Link>
                )}

                {modalShow2Mobile && filteredData.length != 0 && (
                  <div
                    className={
                      dark ? "dark_dataResult_mobile" : "dataResult_mobile"
                    }
                  >
                    {filteredData.map((elem, key) => {
                      return (
                        <Link
                          to={`/searchproducts/${elem.title}`}
                          style={{ textDecoration: "none" }}
                          className={
                            dark ? "dark_dataItem_mobile" : "dataItem_mobile"
                          }
                          onClick={() => {
                            setModalShow2Mobile(false);
                          }}
                        >
                          <p>{elem.title}</p>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </OutsideClickHandler>
            {dark ? (
              <Tippy
                theme={"dark"}
                arrow={false}
                animation={"fade"}
                content={
                  <h1 className="Switch_to_light_theme_mobile">
                    Switch to light theme
                  </h1>
                }
              >
                <div className="darkmodeicon_mobile">
                  <DarkModeTwoToneIcon onClick={() => ThemeProvider(dark)} />
                </div>
              </Tippy>
            ) : (
              <Tippy
                theme={"light"}
                arrow={false}
                animation={"fade"}
                content={
                  <h1 className="Switch_to_dark_theme_mobile">
                    Switch to dark theme
                  </h1>
                }
              >
                <div className="lightmodeicon_mobile">
                  <LightModeTwoToneIcon onClick={() => ThemeProvider(dark)} />
                </div>
              </Tippy>
            )}
            <MenuIcon
              className="openMenuIcon"
              onClick={() => {
                setHamburger(!hamburger);
              }}
            />
          </div>
        ) : (
          <div className="header_mobile">
            <Link to="/">
              <img
                className="header__logo_mobile"
                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Logo"
              />
            </Link>
            <div className="header__search_mobile">
              <input
                type="text"
                className={
                  dark
                    ? "dark_header__searchInput_mobile"
                    : "header__searchInput_mobile"
                }
                placeholder="Enter Product Name..."
                value={wordEntered}
                onChange={handleFilter}
                onKeyPress={handleKey}
              />

              {filteredData.length == 0 ? (
                <Link to="" className="header__searchIcon__btn_mobile">
                  <SearchIcon />
                </Link>
              ) : (
                <Link
                  to={`/searchproducts/${wordEntered}`}
                  className="header__searchIcon__btn_mobile"
                  onClick={() => {
                    setModalShow2Mobile(false);
                  }}
                >
                  <SearchIcon />
                </Link>
              )}
            </div>
            {dark ? (
              <Tippy
                theme={"dark"}
                arrow={false}
                animation={"fade"}
                content={
                  <h1 className="Switch_to_light_theme_mobile">
                    Switch to light theme
                  </h1>
                }
              >
                <div className="darkmodeicon_mobile">
                  <DarkModeTwoToneIcon onClick={() => ThemeProvider(dark)} />
                </div>
              </Tippy>
            ) : (
              <Tippy
                theme={"light"}
                arrow={false}
                animation={"fade"}
                content={
                  <h1 className="Switch_to_dark_theme_mobile">
                    Switch to dark theme
                  </h1>
                }
              >
                <div className="lightmodeicon_mobile">
                  <LightModeTwoToneIcon onClick={() => ThemeProvider(dark)} />
                </div>
              </Tippy>
            )}

            <CloseIcon
              className="closeMenuIcon"
              onClick={() => {
                setHamburger(!hamburger);
              }}
            />

            <div className="openMenuIcon_Container">
              <Link
                to="/checkout"
                style={{ textDecoration: "none", flex: "0.1" }}
              >
                <div className="header__optionBasket4__mobile">
                  <ShoppingCartOutlinedIcon style={{ fontSize: "40px" }} />
                  <span className="header__basketCount__mobile">
                    {totalItem}
                  </span>
                </div>
              </Link>

              {show ? (
                <div
                  className="header__option1__mobile"
                  method="GET"
                  onClick={callLogOutPage}
                >
                  <span
                    style={{ paddingLeft: "5px", paddingRight: "3px" }}
                    className="header__option1LineOne__mobile"
                  >
                    Hello,&nbsp;{userName}
                    <br />
                    <h6 className="header__option1LineTwo__mobile">
                      <Link
                        to="/login"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        &nbsp;&nbsp;&nbsp;Log Out
                      </Link>
                    </h6>
                  </span>
                </div>
              ) : (
                <div className="header__option1__mobile">
                  <span
                    style={{ paddingLeft: "5px", paddingRight: "3px" }}
                    className="header__option1LineOne__mobile"
                  >
                    Hello,&nbsp;Guest User
                    <br />
                    <h6 className="header__option1LineTwo__mobile">
                      <Link
                        to="/login"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Sign In
                      </Link>

                      <span>&nbsp; &nbsp;/&nbsp;&nbsp;</span>
                      <Link
                        to="/signup"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <span>Sign Up</span>
                      </Link>
                    </h6>
                  </span>
                </div>
              )}

              <Link to="/primevideos" style={{ textDecoration: "none" }}>
                <div className="header__option3__mobile">
                  <div className="header__option3LineOne__mobile">Your</div>
                  <div className="header__option3LineTwo__mobile">Prime</div>
                </div>
              </Link>

              <div
                className="header__option2__mobile"
                method="GET"
                onClick={callOrdersPage}
              >
                <div className="header__option2LineOne__mobile">Returns</div>
                <div className="header__option2LineTwo__mobile">& Orders</div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Mobile Hamburger Section End here */}
    </div>
  );
}

export default Header;
