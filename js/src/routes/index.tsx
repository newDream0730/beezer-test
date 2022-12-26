import {ReactElement} from "react";
import {Routes, Route} from "react-router-dom";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import Product from "../views/ProductPage";
import CreateProduct from "../views/CreateProduct";
import EditProduct from "../views/EditProduct";
import NotFoundPage from "../views/NotFoundPage";

const RootRouter: React.FC = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/product/create" element={<CreateProduct />} />
      <Route path="/product/edit/:id" element={<EditProduct />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RootRouter;
