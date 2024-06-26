import { useUserInfo } from "../../Hooks/UserInfo";

export const Home = () => {
    const { infoUser } = useUserInfo();

    return (
        <div className="main p-3">
            <div className="text-center">
                <h1>
                    Contenido Principal{" "}
                    {infoUser && infoUser.usuario
                        ? `Bienvenido ${infoUser.usuario}`
                        : "Bienvenido al entorno gratuito"}
                </h1>
                <p>Este es el contenido principal de la página.</p>
            </div>
        </div>
    );
};