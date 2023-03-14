import React, { useState, useEffect } from "react";
import '../../styles/Pages/Auth.scss';
import Button from "../../components/UI/Button";
import InputField from "../../components/UI/InputField";
import { FacebookOutlined, Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { Chip, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, signInWithGoogle } from "../../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthSpinner from "../../components/UI/Spinners/AuthSpinner";

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameIsValid, setNameIsValid] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [hidePassword, setHidePassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const registerWithEmailAndPassword = async (name, email, password) => {
        setIsLoading(true);
        try {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          const user = res.user;
          await addDoc(collection(db, "users"), {
            uid: user.uid,
            imgUrl: "",
            name,
            authProvider: "local",
            email,
          });
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
        setIsLoading(false);
      };

    const signupHandler = (e) => {
        e.preventDefault();
        registerWithEmailAndPassword(name, email, password);
    };

    useEffect(() => {
        if (isLoading) return;
        if (user) navigate("/home")
    }, [user, isLoading, navigate]);

    const passwordErr_msg = "password must include at least two digits, one character and six in length";

    useEffect(() => {
        const timer = setTimeout(() => {
            if (((/[0-9].*[0-9]/).test(password) && (/[a-zA-Z]/).test(password) && password.trim().length >= 6)
                || password.trim().length === 0) {
                setPasswordIsValid(true);
            } else {
                setPasswordIsValid(false);
            }
        }, 500);

        return () => clearTimeout(timer)
    }, [password]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (/^[A-Za-z][A-Za-z0-9_]{4,14}$/.test(name) || name.trim().length === 0) {
                setNameIsValid(true)
            } else {
                setNameIsValid(false)
            }
        }, 500);

        return () => clearTimeout(timer)
    }, [name]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if ((/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) || email.trim().length === 0) {
                setEmailIsValid(true);
            } else {
                setEmailIsValid(false);
            }
        }, 500);

        return () => clearTimeout(timer)
    }, [email])


    return (
        <>
           {isLoading && <AuthSpinner />}
            <div className="auth">
                <div>
                    <h2>SIGN UP</h2>
                    <form className="auth-form" onSubmit={signupHandler}>
                        <InputField
                            id="standard-basic1"
                            placeholder="Username"
                            textColor="white"
                            Width='100%'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="filled" />
                        {!nameIsValid && <p className="err-msg">Enter a valid username</p>}
                        <InputField
                            id="standard-basic"
                            placeholder="Email"
                            textColor="white"
                            Width='100%'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="filled" />
                        {!emailIsValid && <p className="err-msg">Enter a valid email</p>}
                        <InputField
                            id="standard-basic"
                            placeholder="Password"
                            textColor="white"
                            Width='100%'
                            type={hidePassword ? "password" : "text"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            iconEnd={hidePassword ?
                                <Visibility onClick={() => setHidePassword(false)}
                                    sx={{ color: 'white', cursor: 'pointer' }} /> :
                                <VisibilityOff onClick={() => setHidePassword(true)}
                                    sx={{ color: 'white', cursor: 'pointer' }} />}
                            variant="filled" />
                        {!passwordIsValid && <p className="err-msg">{passwordErr_msg}</p>}
                        <Button className='auth_signUp-btn'
                            disabled={!nameIsValid || !emailIsValid || !passwordIsValid}
                        >SIGN UP</Button>
                    </form>
                    <div className="auth-horizontalRule">
                        <Divider sx={{ color: 'white' }}>
                            <Chip label="OR" sx={{ color: 'white', borderColor: 'white' }} />
                        </Divider>
                    </div>
                    <div className="auth-icons">
                        <Google onClick={signInWithGoogle} />
                        <FacebookOutlined />
                    </div>
                    <div className="auth-info">
                        <p>Already a user?</p>
                        <Link to='/LogIn'><p>LOGIN</p></Link>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SignUp;