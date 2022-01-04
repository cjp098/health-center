import { useState, useEffect } from 'react';
import { PlusCircle, RefreshCcw, User } from 'react-feather';
import { Link } from 'react-router-dom';
import { Trash2, Edit } from 'react-feather';
import { Tag, Space, Popconfirm, Input } from 'antd';
import { arraySlice, onSearch } from '../utils/ReusableSyntax'
import httpRequest from '../api'
import { AdminTable } from "../components";
import { withRouter, useHistory } from 'react-router-dom';
import swal from 'sweetalert2';

function Staff() {

    const [current, setCurrent] = useState(1);
    const [data, setData] = useState([]);
    const [searchFilter, setSearchFilter] = useState(null);
    const history = useHistory();
    //const context = useContext(AuthContext);

    const redirectToUpdate = (event, id) => {
        event.preventDefault();

        history.push(`/updateStaff?id=${id}`)
    }

    const deleteUser = async (event, id, uid) => {
        event.preventDefault();

        await httpRequest.post("/.netlify/functions/auth?name=delete", { id, uid }).then((response) => {
            swal.fire({
                icon: "success",
                title: "YAY",
                text: response.data
            }).then(() => {
                window.location.reload();
            })
        })
    }

    const makeAdmin = async (event, email, status, uid) => {
        event.preventDefault();

        await httpRequest.post("/.netlify/functions/makeAdmin", { email, status, uid }).then((response) => {
            swal.fire({
                icon: "success",
                title: "YAY",
                text: response.data
            })
        })
    }

    const endpoint = () => {
        httpRequest
            .get("/.netlify/functions/getStaff")
            .then((response) => {
                setData(response.data);
            });
    };

    useEffect(endpoint, []);

    const columns = [
        {
            title: "Fullname",
            key: "Fullname",
            render: (staff) => {
                return (
                    <span>{`${staff.firstname} ${staff.lastname} ${staff.middlename}`}</span>
                )
            }
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Date of birth",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
            render: (dateOfBirth) => (
                <Tag color="geekblue">
                    {dateOfBirth}
                </Tag>
            ),
        },
        {
            title: "Gender",
            dataIndex: "userGender",
            key: "userGender",
        },
        {
            title: "Province",
            dataIndex: "province",
            key: "province",
        },
        {
            title: "Status",
            dataIndex: "isAdmin",
            key: "isAdmin",
            render: (isAdmin) => {
                const color = isAdmin ? "geekblue" : "volcano"
                const status = isAdmin ? "Admin" : "Staff"
                return (
                    <Tag color={color}>{status}</Tag>
                )
            }
        },
        {
            title: "Action",
            key: "action",
            render: (staff) => {
                const status = staff.isAdmin ? false : true

                return (
                    <Space size="middle" key="action">
                        {/**Edit information */}
                        <Popconfirm
                            title="would you like to edit this info?"
                            onConfirm={(event) => redirectToUpdate(event, staff.id)}
                        >
                            <Edit
                                className="text-blue-500 cursor-pointer"
                                size="20"
                                id="update"
                            />
                        </Popconfirm>

                        {/**Delete Staff */}
                        <Popconfirm
                            title="would you like to delete this user?"
                            onConfirm={(event) => deleteUser(event, staff.id, staff.uid)}
                        >
                            <Trash2
                                className="text-red-500 cursor-pointer"
                                size="20"
                                id="update"
                            />
                        </Popconfirm>

                        {/**Make admin */}

                        <Popconfirm
                            title="would you like to make this an admin?"
                            onConfirm={(event) => makeAdmin(event, staff.email, status, staff.id)}
                        >
                            <User
                                className="text-green-500 cursor-pointer"
                                size="20"
                                id="update"
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        },
    ];

    //** Data showed to the client
    const dataShowed = 5;
    const currentData = arraySlice(data, current, dataShowed);

    return (
        <>
            <section className="flex justify-between">
                <div>
                    <h1 className="text-xl">
                        Counter :{" "}
                        <strong className="text-red-500">{data.length}</strong>
                    </h1>
                </div>
                <div className="flex items-center justify-end gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-green-500 hover:bg-green-400 text-white py-1 px-4 rounded-sm flex items-center gap-2"
                        >
                            <RefreshCcw color="white" size="15" />
                            Refresh
                        </button>
                        <Link to="staff-info"
                            className="bg-blue-500 hover:bg-blue-400 text-white hover:text-white py-1 px-4 rounded-sm flex items-center gap-2"
                        >
                            <PlusCircle color="white" size="15" />
                            <span>employee</span>
                        </Link>
                    </div>
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
            </section>
            <div className="mt-6">
                <AdminTable
                    searchFilter={searchFilter}
                    columns={columns}
                    currentData={currentData}
                    DataArray={data}
                    current={current}
                    setCurrent={setCurrent}
                    dataShowed={dataShowed}
                />
            </div>
        </>
    )
}

export default withRouter(Staff);