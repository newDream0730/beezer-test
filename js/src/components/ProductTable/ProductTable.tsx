import React, {useState, useEffect, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Avatar
} from "@mui/material";
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import api from "../../queries/api";
import {
    deleteProduct
} from "../../features/productsSlice";

  
const ProductTable = (props: any) => {
    const dispatch = useDispatch();
    const { products } = props;
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [deleteId, setDeleteId] = useState('');
    const row = products? Object.keys(products).map((row: string, index) => {
        return (
        <TableRow
            key={row}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {index+1}
            </TableCell>
            <TableCell>
                <Avatar
                    alt={products[row].name}
                    src={products[row].imageURL}
                    sx={{ width: 50, height: 50 }}
                />
            </TableCell>
            <TableCell component="th" scope="row">{products[row].title}</TableCell>
            <TableCell align="left">{products[row].price}</TableCell>
            <TableCell align="left">{products[row].description}</TableCell>
            <TableCell align="left" sx={{minWidth: '200px'}}>
                <Button variant="contained" onClick={() => showDeleteModal(row)} sx={{mr: 1}}>
                    <Delete></Delete>
                </Button>
                <Link to={`/product/edit/${row}`}>
                    <Button variant="outlined">
                        <Edit></Edit>
                    </Button>
                </Link>
                
            </TableCell>
        </TableRow>
        )
    }) : <TableRow><TableCell align="center" colSpan={7}>No data to show</TableCell></TableRow>

    const showDeleteModal = (id : string) => {
        setDeleteId(id);
        setDialogOpen(true);
      }

    const hideModal = () => setDialogOpen(false);

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleDelete = async () => {
        const apiResponse = await api.delete(`/delete/${deleteId}`);
        dispatch(deleteProduct(apiResponse.data));
        hideModal()
    }


    return (
        <Container>
            <Dialog open={dialogOpen} onClose={handleClose}>
                <DialogTitle>Are you sure to delete!</DialogTitle>
                <DialogContent>
                
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
            <Box sx={{ mt: 5 }}>
                <Link to="/product/create" style={{textDecoration: 'none'}}>
                    <Button variant="contained">
                        Create Product
                    </Button>
                </Link>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="left">Product</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {row}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    )
  };
  
  export default ProductTable;
  