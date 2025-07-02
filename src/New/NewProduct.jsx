// const NewProduct = () => {
// 	return (
// 		<div className='page-wrapper'>
// 			<div className='page-breadcrumb'>
// 				<div className='row'>
// 					<form style={{ width: '50%', marginLeft: '40px' }}>
// 						<div className='form-group'>
// 							<label>Product Name</label>
// 							<input
// 								type='text'
// 								className='form-control'
// 								placeholder='Enter Product Name'
// 							/>
// 						</div>
// 						<div className='form-group'>
// 							<label>Category</label>
// 							<input
// 								type='text'
// 								className='form-control'
// 								placeholder='Enter Category'
// 							/>
// 						</div>
// 						<div class='form-group'>
// 							<label>Short Description</label>
// 							<textarea
// 								class='form-control'
// 								rows='3'
// 								placeholder='Enter Short Description'></textarea>
// 						</div>
// 						<div class='form-group'>
// 							<label>Long Description</label>
// 							<textarea
// 								class='form-control'
// 								rows='6'
// 								placeholder='Enter Long Description'></textarea>
// 						</div>
// 						<div class='form-group'>
// 							<label for='exampleFormControlFile1'>
// 								Upload image (5 images)
// 							</label>
// 							<input
// 								type='file'
// 								class='form-control-file'
// 								id='exampleFormControlFile1'
// 								multiple
// 							/>
// 						</div>
// 						<button type='submit' className='btn btn-primary'>
// 							Submit
// 						</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default NewProduct;

import React, { useState } from "react";
import ProductAPI from "../API/ProductAPI";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NewProduct = () => {
   const location = useLocation();
   const params = new URLSearchParams(location.search);
   const productId = params.get("id");

   const [form, setForm] = useState({
      name: "",
      category: "",
      short_desc: "",
      long_desc: "",
      price: "",
      countInStock: 0,
      images: [],
   });
   const [errors, setErrors] = useState({});

   useEffect(() => {
      const fetchProduct = async () => {
         if (!productId) return;

         const data = await ProductAPI.getDetail(productId);
         setForm({
            name: data.name,
            category: data.category,
            short_desc: data.short_desc,
            long_desc: data.long_desc,
            price: data.price,
            countInStock: data.countInStock,
            // images: [],
         });
      };
      fetchProduct();
   }, [productId]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
   };

   const handleFileChange = (e) => {
      setForm({ ...form, images: e.target.files });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Kiểm tra đủ số ảnh
      if (!productId && form.images.length !== 4) {
         alert("Please upload exactly 4 images");
         return;
      }

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("short_desc", form.short_desc);
      formData.append("long_desc", form.long_desc);
      formData.append("price", form.price);
      formData.append("countInStock", form.countInStock);

      if (!productId) {
         for (let i = 0; i < form.images.length; i++) {
            formData.append("images", form.images[i]);
         }
      }

      try {
         if (productId) {
            await ProductAPI.updateProduct(productId, formData);
            alert("Update product successfully!");
         } else {
            await ProductAPI.postAddProduct(formData);
            alert("Add product successfully!");
         }

         setErrors({});
      } catch (err) {
         if (err.response?.data?.errors) {
            const newErrors = {};
            err.response.data.errors.forEach((e) => {
               newErrors[e.path] = e.msg;
            });
            setErrors(newErrors);
         } else {
            alert("Error adding product: " + err.response?.data?.message);
         }
      }
   };

   return (
      <div className="page-wrapper">
         <div className="page-breadcrumb">
            <div className="row">
               <form
                  style={{ width: "50%", marginLeft: "40px" }}
                  onSubmit={handleSubmit}
               >
                  <div className="form-group">
                     <label>Product Name</label>
                     <input
                        name="name"
                        type="text"
                        className="form-control"
                        value={form.name}
                        onChange={handleChange}
                     />
                     {errors.name && (
                        <small style={{ color: "red" }}>{errors.name}</small>
                     )}
                  </div>
                  <div className="form-group">
                     <label>Category</label>
                     <input
                        name="category"
                        type="text"
                        className="form-control"
                        value={form.category}
                        onChange={handleChange}
                     />
                     {errors.category && (
                        <small style={{ color: "red" }}>
                           {errors.category}
                        </small>
                     )}
                  </div>
                  <div className="form-group">
                     <label>Short Description</label>
                     <textarea
                        name="short_desc"
                        className="form-control"
                        value={form.short_desc}
                        rows="3"
                        onChange={handleChange}
                     />
                     {errors.short_desc && (
                        <small style={{ color: "red" }}>
                           {errors.short_desc}
                        </small>
                     )}
                  </div>
                  <div className="form-group">
                     <label>Long Description</label>
                     <textarea
                        name="long_desc"
                        className="form-control"
                        value={form.long_desc}
                        rows="6"
                        onChange={handleChange}
                     />
                     {errors.long_desc && (
                        <small style={{ color: "red" }}>
                           {errors.long_desc}
                        </small>
                     )}
                  </div>
                  <div className="form-group">
                     <label>Price</label>
                     <input
                        name="price"
                        type="text"
                        className="form-control"
                        value={form.price}
                        onChange={handleChange}
                     />
                     {errors.price && (
                        <small style={{ color: "red" }}>{errors.price}</small>
                     )}
                  </div>
                  <div className="form-group">
                     <label>Quantity In Stock</label>
                     <input
                        name="countInStock"
                        type="number"
                        className="form-control"
                        value={form.countInStock}
                        onChange={handleChange}
                     />
                     {errors.countInStock && (
                        <small style={{ color: "red" }}>
                           {errors.countInStock}
                        </small>
                     )}
                  </div>
                  {!productId && (
                     <div className="form-group">
                        <label>Upload image (4 images)</label>
                        <input
                           type="file"
                           className="form-control-file"
                           multiple
                           onChange={handleFileChange}
                        />
                     </div>
                  )}
                  <button type="submit" className="btn btn-primary">
                     Submit
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default NewProduct;
