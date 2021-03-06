import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom"
import axios from "axios";
import {validation} from "./validation/validationFunction";
import {Redirect} from "react-router-dom";
import * as path from "path";

const LoginPage = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)

    const [homePage, setHomePage] = useState(false)

    const handleChangeLogin = (type) => (e) => {
        switch (type) {
            case "email":
                setEmail(e.target.value);
                validation(email, "email") ? setErrorEmail(false) : setErrorEmail(true);
                break;

            case "password":
                setPassword(e.target.value);
                validation(password, "password") ? setErrorPassword(false) : setErrorPassword(true);

                break;

        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const LoginInfo = {
            email,
            password
        }
        try {
            const login = await axios.post(`/api/user/login`, LoginInfo)
            if(login.data){
            window.localStorage.setItem("auth", login.data)
                setHomePage(true);

            }

        } catch (e) {
            console.log(e)
        }
    }




    const handleGetData = async () => {
        const auth = window.localStorage.getItem("auth");
        const post = await axios.get(`/api/user/some`, {
            headers: {
                'Authorization': `Bearer ${auth}`
            }
        } )



    }

    const handleLoginToRegistration = () => {
    }

    return (<>
        { homePage ?  <Button variant="text" onClick={handleGetData} >Get Data</Button>
                :
                <>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>

                        <TextField error={errorEmail} label="Email" variant="standard" value={email}
                                   onChange={handleChangeLogin("email")}/>

                        <TextField
                            error={errorPassword}
                            label="Password"
                            type="password"
                            variant="standard"
                            value={password} onChange={handleChangeLogin("password")}
                        />
                    </div>

                </Box>

                <Stack spacing={2} direction="column">
                    <Button variant="text" onClick={handleLogin} >LOGIN</Button>
                    <Button variant="text"> <Link to="/regitration">REGISTRATION </Link></Button>
                </Stack>

            </> }

        </>
    );
}

export default LoginPage;