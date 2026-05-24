import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/api";


function LoginPage({LoginSuccess}){
    async function onLogin({email,password}) {
        const {error,data}=await login({email,password});

        if(!error){
            LoginSuccess(data);
        }
    }

    return (
        <section className="login-page">
            <h2>Silahkan masuk untuk melanjutkan....</h2>
            <LoginInput login={onLogin}/>
            <p>Belum Punya Akun ? <Link to="/register"> Daftar di sini..</Link></p>
        </section>
    )
}


LoginPage.propTypes = {
    LoginSuccess:PropTypes.func.isRequired, 
};

export default LoginPage;