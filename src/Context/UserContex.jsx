import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [infoUser, setInfoUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const docRef = doc(db, "usuarios", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setInfoUser(docSnap.data());
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "Usuario no encontrado",
                            text: "No se encontraron datos del usuario en la base de datos.",
                        }).then(() => {
                            auth.signOut();
                            setInfoUser(null);
                        });
                    }
                } catch (error) {
                    console.error("Error al obtener los datos del usuario:", error);
                    setInfoUser(null);
                }
            } else {
                setInfoUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ infoUser, setInfoUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserInfo = () => {
    return useContext(UserContext);
};
