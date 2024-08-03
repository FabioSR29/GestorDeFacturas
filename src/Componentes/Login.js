import { useState } from "react";
import React from "react";
import '../Styles/global.css'
import '../Styles/login.css'
import appFirebase from "../Credenciales";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(appFirebase);

function Login() {
    const [resgistrado, setRegistrado] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const correo = e.target.Email.value;
        const contraseña = e.target.Contraseña.value;
        const Swal = require('sweetalert2')
        if (resgistrado) {
            try {
                await createUserWithEmailAndPassword(auth, correo, contraseña);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Usuario creado",
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Asegurate de que la contraseña sea fuerte.",
                    footer: "Detalles del error:" + error
                });
            }

        } else {
            try {
                await signInWithEmailAndPassword(auth, correo, contraseña);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error...",
                    text: "Realmente estas registrado?",
                    footer: error
                });
            }

        }
    }


    return (
        <div className="login-container container vh-100 d-flex justify-content-center align-items-center">
            <div className="card w-100 shadow border-0">
                <div className="row">
                    <div className="col-md-12 p-5">
                        <h1 className="text-center">{resgistrado ? "Registrate" : "Inicia sesión"}</h1>
                        <form className="mt-4" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text material-icons">alternate_email</span>
                                    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp" placeholder="Correo electrónico" required />
                                </div>
                                <div id="Email" className="form-text">Este correo debe de ser de uso personal</div>
                            </div>
                            <div className="mb-3">
                                <div className="input-group">
                                    <span className="input-group-text material-icons">password</span>
                                    <input type="password" className="form-control" id="Contraseña" required placeholder="Contraseña" />
                                </div>
                            </div>
                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary ">{resgistrado ? "Registrar" : "Inicia sesión"}</button>
                            </div>
                        </form>

                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-center">
                                <button type="submit" className="btn btn-link mt-5" onClick={() => setRegistrado(!resgistrado)}>{resgistrado ? "¿Tienes cuesta? inicia sesion" : "¿No tienes cuesta? registrate"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;