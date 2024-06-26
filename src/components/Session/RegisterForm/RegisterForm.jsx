
import { InputTemplate } from "../../Inputs/InputTemplate";
import { Link, useNavigate } from "react-router-dom";


import { LogoK } from "../../../assets/img/ImagesExport";
import { useRegisterForm } from "../ReactHookForm/useRegisterForm";
import { onSubmitRegisterForm } from "../components/onSubmitRegisterForm";

    //01schema

export const RegisterForm = () => {

    const navegar = useNavigate();
    //02 use registerform
    const { register, handleSubmit, errors, trigger, validPass, validatePass } = useRegisterForm();

    //03 onSubmitRegisterForm
    const onSubmit=(data)=>{
        onSubmitRegisterForm(data,navegar);
        //console.log(data);
    }

    
    

return (
    <form onSubmit={handleSubmit(onSubmit)} className="needs-validation" noValidate>
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
            <p className="mb-0">Volver al entorno publico <Link to='/' className="text-white-50 fw-bold">Home</Link></p>
        </div>
    </form>
)
}