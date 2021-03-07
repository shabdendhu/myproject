import React, { useState, useEffect } from "react";
import { Dialog, Slide, IconButton, Icon } from "@material-ui/core";
import Search from "@material-ui/icons/Search";

import axios from "axios";
import {
  get_search_suggestion,
  search_product_by_name,
} from "../../constants/api";
import Close from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const SearchResultCard = ({ item }) => {
  return (
    <li
      key={item.product_id}
      style={{
        padding: "10px 15px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <span
        style={{
          marginLeft: "32px",
          color: "#5f5959",
          fontSize: "19px",
        }}
      >
        {item.product_name}
      </span>
      <button
        onClick={() => {
          const searchName = item.product_name.replace(/ +/g, "");
          window.location.href = `/search-results?id=${item.product_category_id}?name=${item.product_name}`;
          // console.log(market);
        }}
        style={{
          position: "absolute",
          right: 0,
          margin: "0px 10px 0px 0px",
          border: "none",
          background: "#ffb100",
          outline: "none",
          padding: "5px",
          width: "105px",
          borderRadius: "7px",
        }}
      >
        SELECT
      </button>
    </li>
  );
};
const Productfinder = ({ openSearchDilog, onSelectItems }) => {
  const [open, setOpen] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sarchResultProducts, setSarchResultProducts] = useState([]);
  const [searchResultRecipe, setSearchResultRecipe] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (searchText.length > 0) {
      axios
        .post(get_search_suggestion, {
          product_name: searchText,
        })
        .then((response) => {
          // console.log(response.data.data);
          setSarchResultProducts(response.data.data.productSuggest);
          setSearchResultRecipe(response.data.data.recipeSuggest);
        });
    }
  }, [searchText]);
  useEffect(() => {
    setOpen(!open);
    console.log(open);
  }, [openSearchDilog]);
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div>
          <div
            style={{
              margin: "10px 10px",
              position: "absolute",
              width: "94%",
              background: "white",
              borderRadius: "10px",
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 0px 0px 1px, rgba(0, 0, 0, 0.14) 0px 1px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
            }}
          >
            <div
              style={{
                display: "flex",
                borderRadius: "32px",
                display: "flex",
                flexDirection: "column",
                width: "-webkit-fill-available",
                padding: "10px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row " }}>
                <Search />
                <input
                  type="text"
                  placeholder="Type hear"
                  autoFocus
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  value={searchText}
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: "18px",
                    width: "100%",
                  }}
                />
                <span
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <Close />
                </span>
              </div>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  position: "relative",
                }}
              >
                {sarchResultProducts.length > 0 &&
                  searchText.length > 0 &&
                  sarchResultProducts.map((market) => (
                    <SearchResultCard item={market} />
                  ))}
                {searchResultRecipe.length > 0 &&
                  searchText.length > 0 &&
                  searchResultRecipe.map((market) => (
                    <SearchResultCard item={market} />
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
export default Productfinder;