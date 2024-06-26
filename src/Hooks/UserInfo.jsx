import { useEffect, useState } from "react"
import { auth, db } from "../firebase/config"
import { doc, getDoc } from "firebase/firestore"
import Swal from "sweetalert2"
import { onAuthStateChanged } from "firebase/auth"


export const useUserInfo=()=>{

    //MANEJO DE INFORMACION DE USUARIO ACTIVO O INACTIVO
    const [infoUser, setInfoUser] = useState(null)
    useEffect(()=>{
        const unsusbscribe = onAuthStateChanged(auth, async (currentUser)=>{
            if (currentUser) {
                const docRef = doc(db,'usuarios',auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setInfoUser(docSnap.data())
                }else{
                    Swal.fire({
                        icon: 'warning',
                        title: 'Usuario no encontrado',
                        text: 'No se encontraron datos del usuario en la base de datos.',
                    }).then(() => {
                        // Forzar cierre de sesión
                        auth.signOut();
                        setInfoUser(null);// Asegurarse de limpiar el estado del usuario
                    });
                }
            } else {
                setInfoUser(null); // Limpiar el estado cuando no hay usuario autenticado
            }
        });
        // Limpiar la suscripción en el desmontaje del componente
        return () => unsusbscribe();
    },[]);
    return {infoUser,setInfoUser};
}