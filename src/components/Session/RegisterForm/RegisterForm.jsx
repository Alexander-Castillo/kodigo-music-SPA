import { useForm } from "react-hook-form"
import { InputTemplate } from "../../Inputs/InputTemplate";
import { Link, useNavigate } from "react-router-dom";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { LogoK } from "../../../assets/img/ImagesExport";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth,db } from "../../../firebase/config";
import Swal from "sweetalert2";


const SpecialCharacter = /[#$%&+\-@ÀÁÂÄÃÅÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŸàáâäãåçèéêëìíîïñòóôõöøùúûüýÿ]/;
const RegisterSchema = yup.object({
    usuario: yup.string().required('Ingresar el nombre de Usuario es obligatorio'),
    email: yup.string().email('Correo no valido').required('Ingresar el email es obligatorio'),
    pass: yup.string().required('Crear la contraseña es obligatorio')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .matches(SpecialCharacter, 'La contraseña debe incluir al menos un carácter especial')
        .matches(/[A-Z]/, 'La contraseña debe incluir al menos una letra mayúscula')
        .matches(/[a-z]/, 'La contraseña debe incluir al menos una letra minúscula')
        .matches(/[0-9]/, 'La contraseña debe incluir al menos un número')
        .matches(/^\S*$/, 'La contraseña no debe tener espacios vacíos')
        .matches(/^[^_]*$/, 'La contraseña no puede tener guiones bajos')
        // eslint-disable-next-line no-control-regex
        .matches(/^[^\0-\x1F\x7F-\x9F]*$/, 'La contraseña no debe tener caracteres no imprimibles')
});

export const RegisterForm = () => {

    const navegar = useNavigate();

    const { register, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(RegisterSchema)
    });

    const [validPass, setValidPass] = useState({
        length: false,
        specialChar: false,
        uppercase: false,
        lowercase: false,
        number: false,
    })

    const validatePass = (e) => {
        const contraseña = e.target.value;
        setValidPass({
            length: contraseña.length >= 8,
            specialChar: SpecialCharacter.test(contraseña),
            uppercase: /[A-Z]/.test(contraseña),
            lowercase: /[a-z]/.test(contraseña),
            number: /[0-9]/.test(contraseña),
        })
    }

    const onSubmitRegisterForm = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.pass);
            const user = userCredential.user;
            // ingresar los datos de usuario adicionales a una coleccion llamada usuarios
            await setDoc(doc(db, 'usuarios', user.uid), {
                usuario: data.usuario,
                email: data.email
            });
            // usuario registrado con exito
            Swal.fire({
                icon: 'success',
                title: 'Registro Exitoso',
                text: 'Usuario Registrado con éxito!'
            });

            navegar('/login');

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            // manejo de errores especificos
            let ErrorMsjToShow = '';
            switch (errorCode) {
                case 'auth/email-already-in-use':
                    ErrorMsjToShow = 'El correo electrónico ya está en uso.';
                    break;
                case 'auth/invalid-email':
                    ErrorMsjToShow = 'El correo electrónico no es válido.';
                    break;
                case 'auth/weak-password':
                    ErrorMsjToShow = 'La contraseña es demasiado débil.';
                    break;
                case 'auth/operation-not-allowed':
                    ErrorMsjToShow = 'Operación no permitida. Contacta al administrador.';
                    break;
                case 'auth/network-request-failed':
                    ErrorMsjToShow = 'Error de red. Por favor, inténtalo de nuevo.';
                    break;
                default:
                    ErrorMsjToShow = errorMessage;
                    break;
            }
            // mostrando alerta de error
            Swal.fire({
                icon: 'error',
                title:'Error en el registro de Usuario',
                text: ErrorMsjToShow,
                confirmButtonText: 'Entendido'
            });
            navegar('/registro')
            console.error('Error en el registro:', error);
        }
        //console.log(data);
    };
    

return (
    <form onSubmit={handleSubmit(onSubmitRegisterForm)} className="needs-validation" noValidate>
        <div className="mb-md-5 mt-md-4 text-start">
            <h2 className="fw-bold mb-2 text-ippercase text-center"> <img src={LogoK} alt="" /></h2>
            <p className="text-white-50 mb-5 text-center">Por favor completa tu información de Registro!</p>
            <InputTemplate label={'Esribe un nombre de Usuario:'} name={'usuario'} placeholder={'Escribe un nombre de Usuario.'} register={register} errors={errors} trigger={trigger} />
            <InputTemplate label={'Escribe tu correo electronico:'} name={'email'} placeholder={'ejemplo@correo.ejemplo'} register={register} errors={errors} trigger={trigger} />
            <InputTemplate label={'Crea una contraseña:'} name={'pass'} type="password" register={register} errors={errors} trigger={trigger} validatePass={validatePass} />
            <ul className='text-white text-end'>
                <li className={validPass.specialChar ? 'text-success' : ''}>Al menos un carácter especial {validPass.specialChar ? '✔' : '❌'}</li>
                <li className={validPass.uppercase ? 'text-success' : ''}>Al menos una letra mayúscula{validPass.uppercase ? '✔' : '❌'}</li>
                <li className={validPass.lowercase ? 'text-success' : ''}>Al menos una letra minúscula{validPass.lowercase ? '✔' : '❌'}</li>
                <li className={validPass.number ? 'text-success' : ''}>Al menos un número{validPass.number ? '✔' : '❌'}</li>
                <li className={validPass.length ? 'text-success' : ''}>Al menos 8 caracteres{validPass.length ? '✔' : '❌'}</li>
            </ul>
        </div>
        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">Registrar</button>
        <div className='pb-5 p-2'>
            <p className="mb-0">Ya tienes una cuenta? <Link to='/login' className="text-white-50 fw-bold">Login</Link></p>
        </div>
    </form>
)
}