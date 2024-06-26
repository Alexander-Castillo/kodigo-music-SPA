
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth,db } from "../../../firebase/config";
import Swal from "sweetalert2";

export const onSubmitRegisterForm = async (data, navegar) => {
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