import React from 'react';
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { Grid, Paper, Avatar, Button, makeStyles} from '@material-ui/core';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import {addDoc, generateKeywords} from "firebase/firestore"
import { db } from '../firebase.config';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #005057 30%, #668f2a 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: 29,
    marginTop: 20,
    width: '100%',
  },
});

const providerFB = new FacebookAuthProvider();
const providerGG = new GoogleAuthProvider();

export default function SignIn() {

    const classes = useStyles()
    const navigate = useNavigate();
    const auth = getAuth();

    function handleLogin (provider) {
      signInWithPopup(auth, provider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        if (user) {
          const data = ({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            providerId: user.providerId,
            keywords: user.displayName
          })
          db.collection('users').doc('data').set(data)
        }
        navigate("/Home")
        
      }).catch((error) => {
        console.log(error)
      })
    }

    const formstyle={padding:30,height:600, width:500, margin:"20px auto", backgroundColor: '#14181d', color: '#fff'}

    return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '30px', paddingTop: '100px' }}>      
        <Grid align="center" className='grid-login' >
            <Paper elevation={10} style={formstyle} className='form-login' >
                <Avatar style={{ width: 86, height: 86}}/>

                <h2>Lựa chọn hình thức đăng nhập</h2>
              
                <Button className={classes.root} variant="contained" color="success" onClick={handleLogin(providerGG)}><GoogleIcon sx={{ paddingRight: 3 }} /> Đăng nhập với Google</Button>
                <Button className={classes.root} variant="contained" color="success" onClick={handleLogin(providerFB)}><FacebookIcon sx={{ paddingRight: 3 }} /> Đăng nhập với Facebook</Button>
            <div className='p-4 box mt-3 text-center'>Bạn có tải khoản chưa?</div>
           </Paper>
        </Grid>
    </div>
    )
}

