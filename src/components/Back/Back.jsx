import { Link } from 'react-router-dom';
import { ChevronLeft } from "react-feather";

export default function Back({ redirect }) {
    return (
        <Link to={redirect} className="font-bold text-black hover:text-black flex items-center gap-2">
            <ChevronLeft size="20" />
            Back
        </Link>
    )
}