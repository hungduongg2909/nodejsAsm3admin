import React, { useEffect, useState } from "react";
import queryString from "query-string";
import ProductAPI from "../API/ProductAPI";
import Pagination from "./Component/Pagination";
import { useHistory } from "react-router-dom";

function Products(props) {
   const history = useHistory();

   const [products, setProducts] = useState([]);
   const [pagination, setPagination] = useState({
      page: "1",
      count: "8",
      search: "",
      category: "all",
   });
   const [search, setSearch] = useState("");

   const onChangeText = (e) => {
      const value = e.target.value;

      setPagination({
         page: pagination.page,
         count: pagination.count,
         search: value,
         category: pagination.category,
      });
   };

   //Tổng số trang
   const [totalPage, setTotalPage] = useState();

   //Hàm này dùng để thay đổi state pagination.page
   //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
   const handlerChangePage = (value) => {
      console.log("Value: ", value);

      //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
      setPagination({
         page: value,
         count: pagination.count,
         search: pagination.search,
         category: pagination.category,
      });
   };

   const handleDelete = async (id) => {
      const confirm = window.confirm(
         "Are you sure you want to delete this product?"
      );
      if (!confirm) return;

      try {
         await ProductAPI.deleteProduct(id);
         alert("Product deleted successfully!");

         // Gọi lại API để refresh danh sách sản phẩm
         const query = queryString.stringify(pagination);
         const response = await ProductAPI.getPagination("?" + query);
         setProducts(response);
      } catch (err) {
         alert(
            "Error FE deleting product: " + err.response?.data?.message ||
               err.message
         );
      }
   };

   //Gọi hàm useEffect tìm tổng số sản phẩm để tính tổng số trang
   //Và nó phụ thuộc và state pagination
   useEffect(() => {
      const fetchAllData = async () => {
         const response = await ProductAPI.getAPI();
         // console.log(response);

         //Tính tổng số trang = tổng số sản phẩm / số lượng sản phẩm 1 trang
         const totalPage = Math.ceil(
            parseInt(response.length) / parseInt(pagination.count)
         );
         // console.log(totalPage);

         setTotalPage(totalPage);
      };

      fetchAllData();
   }, [pagination]);

   //Gọi hàm Pagination
   useEffect(() => {
      const fetchData = async () => {
         const params = {
            page: pagination.page,
            count: pagination.count,
            search: pagination.search,
            category: pagination.category,
         };

         const query = queryString.stringify(params);

         const newQuery = "?" + query;

         const response = await ProductAPI.getPagination(newQuery);
         // console.log(response);

         setProducts(response);
      };

      fetchData();
   }, [pagination]);

   return (
      <div className="page-wrapper">
         <div className="page-breadcrumb">
            <div className="row">
               <div className="col-7 align-self-center">
                  <h4 className="page-title text-truncate text-dark font-weight-medium mb-1">
                     Basic Initialisation
                  </h4>
                  <div className="d-flex align-items-center">
                     <nav aria-label="breadcrumb">
                        <ol className="breadcrumb m-0 p-0">
                           <li className="breadcrumb-item">
                              <a href="/" className="text-muted">
                                 Home
                              </a>
                           </li>
                           <li
                              className="breadcrumb-item text-muted active"
                              aria-current="page"
                           >
                              Table
                           </li>
                        </ol>
                     </nav>
                  </div>
               </div>
            </div>
         </div>
         <div className="container-fluid">
            <div className="row">
               <div className="col-12">
                  <div className="card">
                     <div className="card-body">
                        <h4 className="card-title">Products</h4>
                        <input
                           className="form-control w-25"
                           onChange={onChangeText}
                           type="text"
                           placeholder="Enter Search!"
                        />
                        <br />
                        <div className="table-responsive">
                           <table className="table table-striped table-bordered no-wrap">
                              <thead>
                                 <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Category</th>
                                    <th>Edit</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {products &&
                                    products.map((value) => (
                                       <tr key={value._id}>
                                          <td>{value._id}</td>
                                          <td>{value.name}</td>
                                          <td>{value.price}</td>
                                          <td>
                                             <img
                                                src={
                                                   value.img1.startsWith("http")
                                                      ? value.img1
                                                      : `http://localhost:5000${value.img1}`
                                                }
                                                style={{
                                                   height: "60px",
                                                   width: "60px",
                                                }}
                                                alt=""
                                             />
                                          </td>
                                          <td>{value.category}</td>
                                          <td>
                                             <a
                                                onClick={() => {
                                                   history.push(
                                                      `/new?id=${value._id}`
                                                   );
                                                   window.location.reload();
                                                }}
                                                style={{
                                                   cursor: "pointer",
                                                   color: "white",
                                                }}
                                                className="btn btn-success"
                                             >
                                                Update
                                             </a>
                                             &nbsp;
                                             <a
                                                onClick={() =>
                                                   handleDelete(value._id)
                                                }
                                                style={{
                                                   cursor: "pointer",
                                                   color: "white",
                                                }}
                                                className="btn btn-danger"
                                             >
                                                Delete
                                             </a>
                                          </td>
                                       </tr>
                                    ))}
                              </tbody>
                           </table>
                           <Pagination
                              pagination={pagination}
                              handlerChangePage={handlerChangePage}
                              totalPage={totalPage}
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <footer className="footer text-center text-muted"></footer>
      </div>
   );
}

export default Products;
