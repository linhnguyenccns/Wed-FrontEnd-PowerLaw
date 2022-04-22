import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Table } from 'react-bootstrap';
import parse from 'html-react-parser'
import { apiUrl } from '../../contexts/constants';

function ViewService() {

    let navigate = useNavigate();
    const [Loading, setLoading] = useState(false)
    const [Loading2, setLoading2] = useState(false)
    const [ChangeTable, setChangeTable] = useState(true)
    const [infor, setinfor] = useState([])
    const [dataTable, setdataTable] = useState([])
    //=====================================
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
                    setLoading(true)
                }
            })
            .catch(error => console.log('error', error));
    }, [])
    //click logout
    const logout = () => {
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
    }
    //=====================================
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${apiUrl}/service`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    setdataTable(result.data)
                    setLoading2(true)
                }
            })
            .catch(error => console.log('error', error));
    }, [ChangeTable])
    //=====================================
    //Add service
    const AddService = () => {
        navigate('/add-service')
    }
    //Chi tiết Service
    const ServiceDetails = (data) => {
        return (event) => {
            navigate('/service-details/' + data._id)
        }
    }
    //Edit Service
    const EditService = (data) => {
        return (event) => {
            navigate('/service-edit/' + data._id)
        }
    }
    //Xóa service
    const DelService = (data) => {
        return (event) => {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            fetch(apiUrl + "/service/" + data._id, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        setChangeTable(!ChangeTable)
                    } else {
                        alert(result.message)
                    }
                })
                .catch(error => console.log('error', error));
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
    let body
    if (Loading && Loading2) {
        const listTable = dataTable.map(data => (
            <tr key={data._id}>
                <td><img className='Admin-table-Icon' src={`https://drive.google.com/uc?export=view&id=${data.Icon}`} alt=''></img></td>
                <td>{parse(data.Title)}</td>
                <td>
                    <button className='Admin-btn-edit' onClick={ServiceDetails(data)}>Chi Tiết</button>
                    <button className='Admin-btn-edit' onClick={EditService(data)}>Edit</button>
                    <button className='Admin-btn-del' onClick={DelService(data)}>Xoa</button>
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
                    <button className='Admin-btn-add' onClick={AddService}>Thêm</button>
                    <Table className='Admin-Table' striped bordered hover >
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Tiêu Đề</th>
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
    } else {
        body = (
            <div className='loading'>Loading..</div>
        )
    }

    return (body)
}

export default ViewService