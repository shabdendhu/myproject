const api = () => {
  let site_url = "http://localhost:9000/";
  let custumer_api = "http://localhost:9000/customer-app/";
  if (window.location.hostname === "localhost") {
    site_url = "http://localhost:9000/";
    custumer_api = "http://localhost:9000/customer-app/";
  } else {
    site_url = "http://192.168.43.53:9000/";
    custumer_api = "http://192.168.43.53:9000/customer-app/";
  }
  return {
    site_url,
    custumer_api
  };
};

export const { site_url, custumer_api } = api();

export const get_product_list = custumer_api + "get-products";
export const get_product_category = custumer_api + "get-product-category";
export const get_product_qnt_options = custumer_api + "get-product-qnt-options";
export const make_new_order = custumer_api + "make-new-order";
export const get_productsbycategory = custumer_api + "get-products-by-category";
