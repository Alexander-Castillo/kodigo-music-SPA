import { Link } from "react-router-dom"
import { IconoK } from "../../../assets/img/ImagesExport"


export const Navbar = ({ isExpanded, toggleSidebar }) => {


    return (
        <aside id="sidebar" className={isExpanded ? 'expand' : ''}>
            <div className="d-flex justify-content-center pt-4">
                <button id="toggle-btn" onClick={toggleSidebar} className="bg-transparent border-0 ">
                    <img src={IconoK} alt="" className="button-image" />
                </button>
                <div className="sidebar-logo">
                    <a href="#">Kodigo Music</a>
                </div>
            </div>
            <ul className="sidebar-nav">
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link"><i className="fa-regular fa-user"></i>
                        <span>Perfil</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link"><i className="fa-regular fa-calendar-check"></i>
                        <span>Tareas</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                        <i className="fa-solid fa-shield-halved"></i>
                        <span>Auth</span>
                    </a>
                    <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li className="sidebar-item">
                            <Link to="/login" className="sidebar-link">Login</Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/registro" className="sidebar-link">Register</Link>
                        </li>
                    </ul>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#multi" aria-expanded="false" aria-controls="multi">
                        <i className="lni lni-layout"></i>
                        <span>Multi Level</span>
                    </a>
                    <ul id="multi" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link collapsed" data-bs-toggle="collapse" data-bs-target="#multi-two" aria-expanded="false" aria-controls="multi-two">
                                Two Links
                            </a>
                            <ul id="multi-two" className="sidebar-dropdown list-unstyled collapse">
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-item sidebar-link">Link 1</a>
                                </li>
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-item sidebar-link">Link 2</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link"><i className="fa-regular fa-bell"></i>
                        <span>Notificacion</span>
                    </a>
                </li>
                <li className="sidebar-item">
                    <a href="#" className="sidebar-link"><i className="fa-solid fa-gear"></i>
                        <span>Configuracion</span>
                    </a>
                </li>
            </ul>
            <div className="sidebar-footer">
                <a href="#" className="sidebar-link">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <span>Logout</span>
                </a>
            </div>
        </aside>
    )
}