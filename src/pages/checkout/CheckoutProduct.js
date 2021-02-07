import React from "react";
import "./CheckoutProduct.css";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { useStateValue } from "../../Component/templet/StateProvider";
import CustomButton from "../../Component/templet/AddButton";
// import { useStateValue } from "../../StateProvider";/////////////////////

function CheckoutProduct({ id, image, name, amount, price, item }) {
  // console.log("itemfromcheckoutproduct", item);
  const [{ basket }, dispatch] = useStateValue();
  // console.log("item", id, image, name, amount);
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id
    });
  };
  const productId = [];
  basket.forEach(item => {
    productId.push(item.id);
  });
  var count = {};
  productId.forEach(function(i) {
    count[i] = (count[i] || 0) + 1;
  });
  // console.log(`count[id]${item.name}`, count[item.id]);
  return (
    <>
      <div
        style={{
          borderBottom: "1px solid #80808052",
          background: "rgb(249 249 249)"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "10px",
            marginBottom: "5px"
          }}
        >
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                flex: " 3 1 0%",
                border: "1px solid rgba(128, 128, 128, 0.32)",
                margin: "5px",
                padding: "5px",
                borderRadius: "10px",
                marginRight: "19px",
                background: "rgb(253, 253, 253)",
                boxShadow: "0 5px 15px rgba(0,0,0,.05)"
              }}
            >
              <img
                style={{ width: "100px", height: "100px" }}
                src={item.image}
              />
            </div>
          </div>
          <div
            style={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              height: "100px"
            }}
          >
            <div
              style={{
                flex: 1,
                paddingLeft: "7px",
                fontSize: "18px",
                fontFamily: "ProximaNova-Regular"
              }}
            >
              {item.name}
            </div>
            <div
              style={{
                flex: 1
              }}
            >
              <div
                style={{
                  borderRadius: "5px",
                  border: "1px solid #0080003b",
                  padding: "2px 0px 2px 6px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  fontSize: "15px",
                  height: "25px",
                  justifyContent: "center"
                }}
              >
                <span style={{ flex: 1 }}>{item.amount}</span>
                <span
                  style={{
                    flex: 1,
                    textAlign: "end",
                    paddingRight: "8px"
                  }}
                >
                  <KeyboardArrowDownIcon style={{ fontSize: "15px" }} />
                </span>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                width: "fit-content",
                height: " fit-content",
                margin: "4px"
              }}
            >
              <span>₹{item.price}</span>
            </div>
          </div>
        </div>
        <div style={{ float: "right", marginTop: "-44px", marginRight: "7px" }}>
          <CustomButton
            item={item}
            id={item.id}
            count={count[item.id]}
            image={item.image}
            name={item.name}
            amount={item.amount}
            price={item.price}
            stage="remove"
          />
        </div>
      </div>
    </>
  );
}

export default CheckoutProduct;
