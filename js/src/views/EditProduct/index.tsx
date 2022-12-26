import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box
} from '@mui/material';

import {useAuth} from "../../context/authContext";
import ProductForm from '../../components/ProductForm';
import api from '../../queries/api';

function EditProduct() {
  const user = useAuth();
  const navigate = useNavigate();
  if(!user.user) {
    navigate('/login')
  }
  const [currentID, setCurrentID] = useState<string>("");

  const { id } = useParams();

  useEffect(() => {
    setCurrentID(id !== undefined ? id : "");
  }, [])
  
  const product = useSelector((state : any) => state.products.products[currentID]);

  const onUpdateSubmit = async (data : any) => {
    const apiResponse = await api.put(`/update/${currentID}`, data);
    if(apiResponse.status === 200) {
      navigate("/");
    } else {
      alert('There was an error while updating data! Please check your network')
    }
  }

  return (
    <Box sx={{mt:5}}>
      <ProductForm product={product} submitText="Update" submitAction={onUpdateSubmit} />
    </Box>
  )
}

export default EditProduct;
