import React from "react";

const DashboardCard = ({
    icon,
    title,
    numberData,
    iconColor,
    cardColor,
}) => {
    return (
        <>
            <section
                className={`${cardColor} border-2 border-blue-500 shadow-lg rounded-lg px-6 py-4`}
            >
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className="text-lg text-gray-500">{title}</div>
                    </div>
                    <div className={`${iconColor} py-2 px-2 rounded-full`}>{icon}</div>
                </div>
                <div className="text-xl uppercase font-bold text-gray-500">{numberData}</div>
            </section>
        </>
    );
};

export default DashboardCard;