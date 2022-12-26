import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box
} from '@mui/material';

import {useAuth} from "../../context/authContext";
import ProductForm from '../../components/ProductForm';
import api from '../../queries/api';
import { createProduct } from '../../features/productsSlice';

function CreateProduct() {
  const user = useAuth();
  const navigate = useNavigate();
  if(!user.user) {
    navigate('/login')
  }
  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    const apiResponse = await api.post(`/create`, data);
    if(apiResponse.status === 200) {
      dispatch(createProduct(apiResponse.data));
      navigate("/");
    } else {
      alert('Cannot add product data! Please check your network')
    }
  }

  return (
    <Box sx={{mt:5}}>
      <ProductForm submitText="Create" submitAction={onSubmit} />
    </Box>
  )
}

export default CreateProduct;
