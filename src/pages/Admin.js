import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import '../css/admin.css'
import { Table } from 'react-bootstrap';
import { apiUrl } from '../contexts/constants';

function Admin() {
    let navigate = useNavigate();
    const [Loading, setLoading] = useState(false)
    const [Loading2, setLoading2] = useState(false)
    const [dataTable, setdataTable] = useState([])
    const [infor, setinfor] = useState([])

    useEffect(() => {
        const checklogin = () => {
            //kiểm tra có cookie nào tồn tại hay không
            if (document.cookie.split(';').some((item) => item.trim().startsWith('accessToken='))) {
                //đoc cookie
                const cookieValue = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('accessToken='))
                    .split('=')[1];
                //Gửi req token lên server xác thực
                var myHeaders = new Headers();
                myHeaders.append("token", cookieValue);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                return fetch(apiUrl + `/login`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            setLoading(true)
                        } else {
                            navigate('/login')
                        }
                    })
                    .catch(error => console.log('error', error));
            } else {
                navigate('/login')
            }
        }
        checklogin()
    }, [navigate])

    //Infor
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(apiUrl + "/infor", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    setinfor(result.data)
                    setdataTable(result.data)
                    setLoading2(true)
                }
            })
            .catch(error => console.log('error', error));
    }, [])
    //=====================================
    //click logout
    const logout = () => {
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
    }
    //=====================================
    //Edit infor
    const EditInfor = (data) => {
        return (event) => {
            navigate('/infor-edit/' + data._id)
        }
    }
    //=====================================
    const viewInfor = () => {
        navigate('/admin')
    }
    const ViewTop = () => {
        navigate('/view-top')
    }
    const ViewService = () => {
        navigate('/view-service')
    }
    const ViewAbout = () => {
        navigate('/view-about')
    }
    const ViewEmail = () => {
        navigate('/view-email')
    }
    const ViewBlog = () => {
        navigate('/view-blog')
    }
    const ViewQue = () => {
        navigate('/view-que')
    }
    const ViewNof = () => {
        navigate('/view-nof')
    }
    //=====================================
    //HTML
    let body
    if (Loading) {
        if (Loading2) {
            const listTable = dataTable.map(data => (
                <tr key={data._id}>
                    <td><img className='Admin-table-Logo-img' src={`https://drive.google.com/uc?export=view&id=${data.Logo}`} alt=''></img></td>
                    <td><img className='Admin-table-Icon' src={`https://drive.google.com/uc?export=view&id=${data.IconPhone}`} alt=''></img></td>
                    <td>{data.PhoneNumber}</td>
                    <td><img className='Admin-table-Icon' src={`https://drive.google.com/uc?export=view&id=${data.IconInfor}`} alt=''></img></td>
                    <td>{data.Infor}</td>
                    <td><img className='Admin-table-Icon' src={`https://drive.google.com/uc?export=view&id=${data.IconEmail}`} alt=''></img></td>
                    <td>{data.Email}</td>
                    <td><img className='Admin-table-Icon' src={`https://drive.google.com/uc?export=view&id=${data.IconAddress}`} alt=''></img></td>
                    <td>{data.Address}</td>
                    <td><img className='Admin-table-Icon' src={`https://drive.google.com/uc?export=view&id=${data.IconTime}`} alt=''></img></td>
                    <td>{data.Time}</td>
                    <td>{data.Facebook}</td>
                    <td>
                        <button className='Admin-btn-edit' onClick={EditInfor(data)}>Edit</button>
                    </td>
                </tr>
            ))
            body = (
                <>
                    <div className='Home-header'>
                        <div className='Home-header__container'>
                            <div className='Home-header__logo'>
                                <img className='Home-header__logo__img' src={`https://drive.google.com/uc?export=view&id=${infor[0].Logo}`} alt=''></img>
                            </div>
                            <div className='Home-header__right'>
                                <button className='Admin-btn-logout' onClick={logout}>LogOut</button>
                            </div>
                        </div>
                    </div>
                    <div className='Home-header-2'>
                        <div className='Home-header-2__container'>
                            <div className='Home-header-2__btn Home-header-2__btn_Home' onClick={viewInfor}>Thông Tin Chung</div>
                            <div className='Home-header-2__btn' onClick={ViewTop}>Top</div>
                            <div className='Home-header-2__btn' onClick={ViewService}>Dịch Vụ</div>
                            <div className='Home-header-2__btn' onClick={ViewAbout}>Giới Thiệu</div>
                            <div className='Home-header-2__btn' onClick={ViewEmail}>Email</div>
                            <div className='Home-header-2__btn' onClick={ViewBlog}>Blog</div>
                            <div className='Home-header-2__btn' onClick={ViewQue}>Giải Đáp</div>
                            <div className='Home-header-2__btn' onClick={ViewNof}>Thông Báo</div>
                        </div>
                    </div>

                    <div className='Name'>
                        <Table className='Admin-Table' striped bordered hover >
                            <thead>
                                <tr>
                                    <th>Logo</th>
                                    <th>Icon Số ĐT</th>
                                    <th>Số ĐT</th>
                                    <th>Icon Thông Tin Cty</th>
                                    <th>Thông Tin Cty</th>
                                    <th>Icon Email</th>
                                    <th>Email</th>
                                    <th>Icon Địa Chỉ</th>
                                    <th>Địa Chỉ</th>
                                    <th>Icon Giờ</th>
                                    <th>Giờ</th>
                                    <th>Facebook</th>
                                    <th>...</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listTable}
                            </tbody>
                        </Table>
                    </div>
                </>
            )
        }else{
            body = (
                <div className='loading'>Đang Tải Dữ liệu....</div>
            )
        }
    } else {
        body = (
            <div className='loading'>Loading..</div>
        )
    }

    return (body)
}

export default Admin