const api = () => {
  let site_url = "";
  let custumer_api = "";
  if (window.location.hostname === "localhost") {
    site_url = "http://localhost:9000/";
    custumer_api = "http://localhost:9000/customer-app/";
    // site_url = "https://node-deploy-production.herokuapp.com";
    // custumer_api = "https://node-deploy-production.herokuapp.com/customer-app/";
  } else {
    site_url = "http://tynored.ddns.net:9000/";
    custumer_api = "http://tynored.ddns.net:9000/customer-app/";
    // site_url = "https://node-deploy-production.herokuapp.com";
    // custumer_api = "https://node-deploy-production.herokuapp.com/customer-app/";
  }
  return {
    site_url,
    custumer_api,
  };
};

export const { site_url, custumer_api } = api();
export const get_product_list = custumer_api + "get-products";
export const get_product_category = custumer_api + "get-product-category";
export const get_product_qnt_options = custumer_api + "get-product-qnt-options";
export const make_new_order = custumer_api + "make-new-order";
export const get_productsbycategory = custumer_api + "get-products-by-category";
export const search_product_by_name = custumer_api + "search-product-by-name";
export const login_with_password = custumer_api + "login-with-password";
export const register_new_user = custumer_api + "register-new-user";
export const get_product_details = custumer_api + "get-product-details";
export const get_recipe_detail = custumer_api + "get-recipe-detail";
export const get_recipe_list = custumer_api + "get-recipe-list";
export const get_all_product_category =
  custumer_api + "get-all-product-category";
// basket manegement api
export const add_product_to_basket = custumer_api + "add-product-to_basket";
export const remove_product_from_basket =
  custumer_api + "remove-product-from-basket";
export const get_basket_items = custumer_api + "get-basket-items";
export const get_search_suggestion = custumer_api + "get-search-suggestion";
export const get_seasons_best_items = custumer_api + "get-seasons-best-items";
export const get_top_deals = custumer_api + "get-top-deals";
export const update_user_details = custumer_api + "update-user-details";
export const get_user_details = custumer_api + "get-user-details";
export const user_history = custumer_api + "user-history";
export const google_clint_id="115704933900-sj32ss7siupsi3041ci1sk3rmi8msn1q.apps.googleusercontent.com"