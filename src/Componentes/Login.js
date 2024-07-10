import { useState } from "react";
import React from "react";

import appFirebase from "../Credenciales";
import { getAut, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";
const auth = getAuth(appFirebase);

function Login() {
    const [resgistrado, setRegistrado] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const correo=e.target.Email.value;
        const  contraseña = e.target.Contraseña.value;

        if (resgistrado) {
            await createUserWithEmailAndPassword(auth,correo,contraseña);
        }else{
            await signInWithEmailAndPassword(auth,correo,contraseña);
        }
    }


    return (
        <div className="card container text-center mb-5" >
            <div className="row align-items-center">
                <div className="col">
                </div>
                <div className="col">
                    <div className="container mt-5 align-items-center">
                        <h1>{resgistrado ? "Registrate" : "Inicia sesión"}</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="Email" className="form-label">Correo electronico</label>
                                <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" required />
                                <div id="Email" className="form-text">Este correo debe de ser de uso personal</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Contraseña" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="Contraseña" required />
                            </div>
                            <button type="submit" className="btn btn-primary ">{resgistrado ? "Registrar" : "Inicia sesión"}</button>
                        </form>

                        <div className="row justify-content-center">

                            <button type="submit" className="btn btn-link mt-5" onClick={() => setRegistrado(!resgistrado)}>{resgistrado ? "Tienes cuesta? inicia sesion" : "No tienes cuesta? registrate"}</button>
                        </div>
                    </div>

                </div>
                <div className="col">
                </div>
            </div>
            <div className="col mt-5"></div>
        </div>
    )
}

export default Login;