import React, { useState, useEffect } from "react";
import '../../styles/Pages/Auth.scss';
import Button from '../../components/UI/Button';
import InputField from "../../components/UI/InputField";
import { FacebookOutlined, Google, VisibilityOff, Visibility } from "@mui/icons-material";
import { Chip, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../../firebase";
import { signInWithEmailAndPassword} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthSpinner from "../../components/UI/Spinners/AuthSpinner";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [user] = useAuthState(auth);
    const navigate = useNavigate();


    const logInWithEmailAndPassword = async (email, password) => {
        setIsLoading(true);
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
        setIsLoading(false);
      };

    // console.log(error)

    const loginHandler = (e) => {
        e.preventDefault();
        logInWithEmailAndPassword(email, password);
    };

    useEffect(() => {
        if (isLoading) return;
        if (user) navigate("/home")
    }, [user, isLoading, navigate]);

    return (
        <>
            {isLoading && <AuthSpinner />}
            <div className="auth">
                <div>
                    <h2>LOGIN</h2>
                    <form className="auth-form" onSubmit={loginHandler}>
                        <InputField
                            id="standard-basic"
                            placeholder="Email"
                            textColor="white"
                            Width='100%'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="filled" />
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
                        <Button className='auth_login-btn'>LOGIN</Button>
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
                        <p>Need an account?</p>
                        <Link to='/SignUp'><p>SIGN UP</p></Link>
                    </div>
                </div>
            </div>
        </>
    )
};

export default LogIn;