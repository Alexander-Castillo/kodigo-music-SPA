import { useForm } from "react-hook-form"
import { LogoK } from "../../../assets/img/ImagesExport"
import { InputTemplate } from "../../Inputs/InputTemplate"
import { yupResolver } from "@hookform/resolvers/yup"
import { SchemaLoginForm } from "../Schema/SchemaLoginForm";
import { useLoginFormHandler } from "../components/onSubmitLoginForm";



export const LoginForm = () => {


    const { register, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(SchemaLoginForm)
    });

    const { onSubmitLoginForm } = useLoginFormHandler();

    return (
        <form onSubmit={handleSubmit(onSubmitLoginForm)}>
            <div className="mb-md-5 mt-md-4 pb-5 text-start">
                <h2></h2><h2 className="fw-bold mb-2 text-ippercase text-center"> <img src={LogoK} alt="" /></h2>
                <p className="text-white-50 mb-5 text-center">Por favor ingresa tu correo y contraseña</p>
                <InputTemplate label={'Correo:'} name={'email'} placeholder={'correo@ejemplo.ejemplo'} register={register} errors={errors} trigger={trigger} />
                <InputTemplate label={'Contraseña:'} type="password" name={'pass'} register={register} errors={errors} trigger={trigger} />
            </div>
            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">Iniciar Sesión</button>
        </form>
    )
}