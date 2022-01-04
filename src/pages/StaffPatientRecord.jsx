import { useState, useEffect } from "react";
import { arraySlice, onSearch } from "../utils/ReusableSyntax";
import { Tag, Space, Input, Popconfirm } from "antd";
import { AdminTable } from "../components";
import httpRequest from "../api";
import { RefreshCcw } from 'react-feather';
import { withRouter, useHistory } from "react-router-dom";

function StaffPatientRecord() {
    const [current, setCurrent] = useState(1);
    const [searchFilter, setSearchFilter] = useState(null);
    const [data, setData] = useState([]);
    const history = useHistory();

    const httpEndpoint = async () => {
        await httpRequest
            .get("/.netlify/functions/patientRecord")
            .then((response) => {
                setData(response.data);
            });
    };

    useEffect(httpEndpoint, []);

    const toComplaints = (event, id) => {
        event.preventDefault();

        history.push(`/viewing-record?id=${id}`)
    }

    const columns = [
        {
            title: "ITR",
            dataIndex: "ITR",
            key: "ITR",
        },
        {
            title: "Fullname",
            key: "fullname",
            render: (info) => (
                <span>{`${info.firstname} ${info.middlename} ${info.lastname}`}</span>
            ),
        },
        {
            title: "Date Of Birth",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            render: (dateOfBirth) => <Tag color="geekblue">{dateOfBirth}</Tag>,
        },
        {
            title: "Civil Status",
            dataIndex: "userCivilStatus",
            key: "userCivilStatus",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Gender",
            dataIndex: "userGender",
            key: "userGender",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Action",
            key: "action",
            render: (patient) => (
                <Space size="middle" key="action">
                    <Popconfirm
                        title="would you like to continue?"
                        onConfirm={(event) => toComplaints(event, patient.id)}
                        className="cursor-pointer bg-blue-500 hover:bg-blue-400 py-2 px-3 rounded-sm shadow-lg text-white"
                    >
                        view record
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const dataShowed = 5;
    const currentData = arraySlice(data, current, dataShowed);

    return (
        <section>
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h1 className="text-xl">
                        Counter :{" "}
                        <strong className="text-red-500">{data.length}</strong>
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-green-500 hover:bg-green-400 text-white py-1 px-4 rounded-sm flex items-center gap-2"
                    >
                        <RefreshCcw color="white" size="15" />
                        Refresh
                    </button>
                    <Input.Search
                        allowClear
                        className="w-full md:max-w-xs"
                        placeholder="Search..."
                        onSearch={(nameSearch) => {
                            const sea = onSearch(nameSearch, data);
                            setSearchFilter(sea);
                        }}
                    />
                </div>
            </div>
            <AdminTable
                searchFilter={searchFilter}
                columns={columns}
                currentData={currentData}
                DataArray={data}
                current={current}
                setCurrent={setCurrent}
                dataShowed={dataShowed}
            />
        </section>
    );
}

export default withRouter(StaffPatientRecord)