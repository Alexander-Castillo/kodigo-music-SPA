import { RegisterSchema, SpecialCharacter } from "../Schema/SchemaRegisterForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form"


export const useRegisterForm = () => {
   //MANEJO DE VALIDACIONES USANDO REACT-HOOK-FORM
    const { register, handleSubmit, formState: { errors }, trigger } = useForm({
    resolver: yupResolver(RegisterSchema)
});
//MANEJO DE ESTADO PARA VALIDAR EN REALTIME LAS ESPECIFICACIONES SOLICITADAS DE LA CONTRASEÑA
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
return{
    register,
    handleSubmit,
    errors,
    trigger,
    validPass,
    validatePass
}
}

