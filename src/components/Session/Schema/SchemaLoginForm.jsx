
import * as yup from 'yup'
//VALIDACION DE FORMULARIO LOGIN
export const SchemaLoginForm = yup.object().shape({
    email: yup.string().email('Correo no valido').required('Es obligatorio ingresar el correo'),
    pass: yup.string().min(8, 'La contraseña registrada debe tener al menos 8 caracteres').required('Es obligatorio ingresar la contraseña para iniciar sesión')
})