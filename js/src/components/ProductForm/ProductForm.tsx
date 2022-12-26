import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Card,
  CardContent, 
  CardHeader
} from '@mui/material';
import {useAuth} from "../../context/authContext";
import { IProductData } from '../../models/profile.interface'
import FileUpload from '../FileUpload';

function ProductForm(props : any) {
    const { product, submitText, submitAction } = props;
    const user = useAuth();

    const [productData, setProductData] = React.useState<IProductData>({
        title: '',
        price: '',
        description: '',
        imageURL: '',
        userId: user.user?.uid
    });

    useEffect(() => {
        setProductData({
            ...productData, ...product
        })
    }, [product]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProductData((prev) => ({...prev, [name]: value}))
    }

    const handleSave = () => {
        if(productData.title !== '' && productData.price !== '' && productData.description !== '') {
            submitAction(productData);
        } else {
            alert("Please fill all fields!")
        }
    };

    return (
        <Container>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Card sx={{
                    maxWidth: "400px",
                    backgroundColor: "transparent",
                }}>
                    <CardHeader title={submitText+ " product"}>
                    </CardHeader>
                    <CardContent>
                        <FileUpload productData={productData} setAvatar={(imageURL: string) => setProductData({...productData, imageURL: imageURL})} />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="title"
                            label="Title"
                            type="text"
                            value={productData.title}
                            fullWidth
                            onChange={changeHandler}
                            required
                        />
                        <TextField
                            margin="dense"
                            name="price"
                            label="Price"
                            type="number"
                            value={productData.price}
                            fullWidth
                            onChange={changeHandler}
                            required
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            value={productData.description}
                            fullWidth
                            onChange={changeHandler}
                            required
                        />
                        
                        <FormControl sx={{ mt: 1,mb: 0.5 }} fullWidth>
                            <Button 
                                variant="contained" 
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}

export default ProductForm;
