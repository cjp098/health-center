import { useContext } from 'react';
import { AuthContext } from '../context/AuthOnChange'

export default function Dashboard() {

    const context = useContext(AuthContext);

    return (
        <div>Dashboard</div>
    )
}