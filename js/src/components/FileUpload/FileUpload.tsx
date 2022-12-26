import React from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
    Box,
    Avatar,
    Typography
  } from '@mui/material'
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import { storage } from '../../config/firebase';


function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
  ) {
    return (
      <Box sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)',  display: 'inline-flex' }}>
        <CircularProgress sx={{width: '80px', height: '80px'}} size={80} variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{fontSize: '20px', fontWeight: 'bold'}}
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
}

function FileUpload(props: any) {
    const { productData , setAvatar }  = props;
    const [progresspercent, setProgresspercent] = React.useState<number>(0);

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const file = e.target?.files[0];

        if (!file) return;

        const storageRef = ref(storage, `products/${Date.now()+file.name}`);
        
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
        (snapshot) => {
            const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
        },
        (error) => {
            alert(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL:any) => {
                setAvatar(downloadURL);
            });
        });
    }

    return (
        <React.Fragment>
            {
                productData.imageURL ? (
                    <label htmlFor="select-image">
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <Avatar
                                alt='uploaded file'
                                src={productData.imageURL}
                                sx={{ width: 150, height: 150 }}
                            />
                        </Box>
                    </label>
                ) : (
                    <label htmlFor="select-image">
                        <Box sx={{display: 'flex', justifyContent: 'center', position: 'relative'}}>
                            <Avatar
                                alt='uploaded file'
                                sx={{ width: 150, height: 150 }}
                            />
                            {
                                !productData.avatar &&
                                <CircularProgressWithLabel value={progresspercent} />
                            }
                        </Box>
                    </label>
                ) 
            }
            <form onSubmit={handleSubmit} className='form'>
                <input hidden id="select-image" name="avatar" accept="image/*" type="file" onChange={handleSubmit} />
            </form>
        </React.Fragment>
    )
}

export default FileUpload;