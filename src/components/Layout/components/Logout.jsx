
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../../Hooks/UserInfo';
import Swal from 'sweetalert2';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/config';

export const Logout = () => {
    const navigate = useNavigate();

    const { setInfoUser } = useUserInfo();
    //verificar sesion activa
    const handleLogout = () => {
        if (auth.currentUser) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "¿Deseas cerrar sesión?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, cerrar sesión',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Mostrar un Swal de carga
                    Swal.fire({
                        title: 'Cerrando sesión...',
                        text: 'Por favor, espera un momento.',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });
                    signOut(auth).then(() => {
                        setInfoUser(null);
                        setTimeout(()=>{
                            Swal.close(); // Cerrar el Swal de carga
                        navigate('/login');
                        },1500);
                    }).catch((error) => {
                        Swal.close(); // Cerrar el Swal de carga si hay un error
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error al cerrar la sesión. Por favor, inténtelo de nuevo.'
                        });
                        console.log('Error al cerrar la sesión', error);
                    });
                }
            });
        }else{
            // Mostrar alerta si no hay una sesión activa
            Swal.fire({
                icon: 'info',
                title: 'No hay sesión activa',
                text: 'Aún no has iniciado sesión.',
            });
        }
    };

    return <a onClick={handleLogout}className="sidebar-link">
    <i className="fa-solid fa-right-from-bracket"></i>
    <span>Logout</span></a>;
};