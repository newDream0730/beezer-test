import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container
} from "@mui/material"

import {useAuth} from "../../context/authContext";
import ProductTable from '../../components/ProductTable';
import api from '../../queries/api';
import {
  readProducts
} from "../../features/productsSlice";

function Product() {
  const user = useAuth();
  const navigate = useNavigate();
  if(!user.user) {
    navigate('/login')
  }
  const products = useSelector((state : any) => state.products);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    const invokeAllProductsAPI = async () => {
      const apiResponse = await api.get('/read');
      dispatch(readProducts(apiResponse.data));
    };
 
    invokeAllProductsAPI();
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  return (
    <Container>
      <ProductTable products={products.products} />
    </Container>
  )
}

export default Product;
