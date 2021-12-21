import { signOutUser } from '../config'

export default function Dashboard() {
    return (
        <div onClick={signOutUser}>Dashboard</div>
    )
}