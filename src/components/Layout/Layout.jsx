import { Sidebar } from '../'
import { Divider } from 'antd';

export default function Layout({ children, title }) {
    return (
        <div className="flex flex-col">
            <Sidebar />
            <div className="text-gray-700 bg-gray-100 h-screen w-screen px-32 py-8">
                <h1 className="mb-4 font-bold text-2xl">{title}</h1>
                <Divider />
                {children}
            </div>
        </div>
    )
}