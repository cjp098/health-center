import { Back } from '../'

export default function FormLayout({ children, redirect }) {
    return (
        <div>
            <Back redirect={redirect} />
            <section>
                <img
                    className="h-60 mt-5 rounded-lg w-full object-cover"
                    src="/images/background.jpg"
                    alt="profile"
                />
                {children}
            </section>
        </div>
    )
}