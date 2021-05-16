import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { Provider } from "react-redux";
import MainComponent from "./Component/templet/MainComponent";
import { useStateValue } from "./Component/templet/StateProvider";
import { get_basket_items } from "./constants/api";
// import store from "./store";

// import { useStateValue } from "./StateProvider";

// import { get_basket_items } from "../src/constants";
function App() {
  // useEffect(() => {
  // eslint-disable-next-line

  const [{ basket }, dispacher] = useStateValue();
  console.log(basket);
  const user_info = useSelector((state) => state.authorization.user_info);
  const is_loggedin = useSelector((state) => state.authorization.is_loggedin);

  // const userInfo = useSelector(
  //   (state) => state.authenticationReducer.user_info
  // );
  // console.log("isLoggedIn", user_info[0].id);
  // }, []);
  useEffect(() => {
    document.body.style.background = "#efefef";
    // document.body.style.maxWidth = "600px";
    // document.body.style.margin = "auto";
    if (is_loggedin) {
      axios
        .post(get_basket_items, {
          user_id: user_info.id,
        })
        .then((response) => {
          const basketItems = response.data.data;
          basketItems.forEach((element) => {
            dispacher({
              type: "ADD_TO_BASKET",
              item: element,
            });
          });
        });
    }
    // eslint-disable-next-line
  }, []);
  return (
    <MainComponent />
    // </Provider>
  );
}

export default App;
