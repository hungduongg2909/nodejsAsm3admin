import axiosClient from "./axiosClient";

const ProductAPI = {
   getAPI: () => {
      const url = "/products";
      return axiosClient.get(url);
   },

   getCategory: (query) => {
      const url = `/products/category${query}`;
      return axiosClient.get(url);
   },

   getDetail: (id) => {
      const url = `/products/${id}`;
      return axiosClient.get(url);
   },

   getPagination: (query) => {
      const url = `/products/pagination${query}`;
      return axiosClient.get(url);
   },
   postAddProduct: (data) => {
      const url = "/products";
      return axiosClient.post(url, data);
   },
   updateProduct: (id, data) => {
      const url = `/products/${id}`;
      return axiosClient.put(url, data);
   },
   deleteProduct: (id) => {
      const url = `/products/${id}`;
      return axiosClient.delete(url);
   },
};

export default ProductAPI;
