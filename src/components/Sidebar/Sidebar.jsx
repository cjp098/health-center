import { useContext } from 'react';
import { signOutUser } from '../../config'
import { PieChart, Users, Activity, Power, Calendar, FileText } from 'react-feather'
import { Link } from 'react-router-dom'
import Avatar from 'react-avatar';
import { AuthContext } from '../../context/AuthOnChange'

export default function Sidebar() {

    const { displayName, admin } = useContext(AuthContext);

    const iconStyle = "h-5 w-5 text-gray-300 mx-auto hover:text-green-500";

    const administrator = [
        {
            id: 1,
            icons: <PieChart className={iconStyle} />,
            path: "/dashboard"
        },
        {
            id: 2,
            icons: <Calendar className={iconStyle} />,
            path: "/appointments"
        },
        {
            id: 3,
            icons: <Users className={iconStyle} />,
            path: "/staff"
        },
        {
            id: 4,
            icons: <Activity className={iconStyle} />,
            path: "/patients"
        }
    ]

    const staff = [
        {
            id: 1,
            icons: <FileText className={iconStyle} />,
            path: "/patient-record"
        }
    ]

    const list = admin ? administrator : staff

    return (
        <div className="flex flex-row h-full fixed">
            <nav className="bg-gray-900 w-20  justify-between flex flex-col ">
                <div className="mt-10 mb-10">
                    <div className="font-bold mb-3 text-center">
                        <Avatar color="#1e2a47" name={displayName} size="40" className="rounded-full" />
                    </div>
                    <div className="mt-10">
                        <ul>
                            {list.map((type) => {
                                return (
                                    <li className="mb-6" key={type.id}>
                                        <Link to={type.path}>
                                            <span>
                                                {type.icons}
                                            </span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="mb-4">
                    <div type="button" onClick={signOutUser}>
                        <span>
                            <Power className={iconStyle} />
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    )
}