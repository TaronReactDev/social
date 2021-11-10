import React, {useState} from 'react';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";
import {validation} from "./validation/validationFunction";
import axios from "axios";


const Register = (props) => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [errorUserName, setErrorUserName] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false)


    const handleChangeRegistration = (type) => (e) => {
        switch (type) {
            case "userName" :
                setUserName(e.target.value);
                validation(userName, "userName") ? setErrorUserName(false) : setErrorUserName(true);
                break;
            case "email" :
                setEmail(e.target.value);
                validation(email, "email") ? setErrorEmail(false) : setErrorEmail(true);
                break;
            case "password" :
                setPassword(e.target.value);
                validation(password, "password") ? setErrorPassword(false) : setErrorPassword(true);
                break;
            case "confirmPassword" :
                setConfirmPassword(e.target.value);
                validation(confirmPassword, "confirmPassword") ? setErrorConfirmPassword(false) : setErrorConfirmPassword(true);
                break;

        }


    }

    const handleRegistration = async () => {
        if (password === confirmPassword && !errorPassword && !errorUserName && !errorEmail) {

            const registrationInfo = {
                userName,
                email,
                password
            }
            try {
                const registration = await axios.post(`/api/user/registration`, registrationInfo);
                console.log(registration)

            } catch (e) {
                console.log(e)
            }

        } else {
            alert("something went wrong")
        }
    }


    return (
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

                    <TextField error={errorUserName} label="User Name" variant="standard" value={userName}
                               onChange={handleChangeRegistration("userName")} autoComplete/>
                    <TextField error={errorEmail}
                               label="Email" variant="standard" value={email}
                               onChange={handleChangeRegistration("email")} autoComplete/>

                    <TextField
                        error={errorPassword}
                        label="Password"
                        type="password"
                        variant="standard"
                        value={password} onChange={handleChangeRegistration("password")}
                    />
                    <TextField
                        error={errorConfirmPassword}
                        label="Confirm Password"
                        type="password"
                        variant="standard"
                        value={confirmPassword} onChange={handleChangeRegistration("confirmPassword")}
                    />
                </div>

            </Box>


            <Stack spacing={2} direction="column">
                <Button variant="text" onClick={handleRegistration} disabled={!errorUserName && !errorEmail && !errorPassword && !setErrorConfirmPassword}>REGISTRATION</Button>
                <Button variant="text"> <Link to="/">LOGIN</Link></Button>
            </Stack>
        </>
    );
}

export default Register;