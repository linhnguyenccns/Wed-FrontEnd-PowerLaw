import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import '../css/admin.css'
import { Table } from 'react-bootstrap';
import parse from 'html-react-parser'
import {apiUrl} from '../contexts/constants';

function Admin() {
    let navigate = useNavigate();
    const [Loading, setLoading] = useState(false)
    const [Tag, setTag] = useState('infor')
    const [dataTable, setdataTable] = useState([])
    const [ChangeTable, setChangeTable] = useState(true)
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

                return fetch(apiUrl+`/login`, requestOptions)
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

        fetch(apiUrl+"/infor", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    setinfor(result.data)
                    setLoading(true)
                }
            })
            .catch(error => console.log('error', error));
    }, [])

    useEffect(() => {
        setLoading(false)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`${apiUrl}/${Tag}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    setdataTable(result.data)
                    setLoading(true)
                }
            })
            .catch(error => console.log('error', error));
    }, [Tag, ChangeTable])


    //click logout
    const logout = () => {
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
    }
    //=====================================
    //Add service
    const AddService = () => {
        navigate('/add-service')
    }
    //Add about
    const AddAbout = () => {
        navigate('/add-about')
    }
    //Add blog
    const AddBlog = () => {
        navigate('/add-blog')
    }
    //add-Answer"
    const AddAnswer = () => {
        navigate('/add-answer')
    }
    //add Nof
    const AddNof = () => {
        navigate('/add-nof')
    }
    //=====================================
    //Xóa service
    const DelService = (data) => {
        return (event) => {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            fetch(apiUrl+"/service/" + data._id, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        setChangeTable(!changeTable)
                    } else {
                        alert(result.message)
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    //Xóa about
    const DelAbout = (data) => {
        return (event) => {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            fetch(apiUrl+"/about/" + data._id, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        setChangeTable(!changeTable)
                    } else {
                        alert(result.message)
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    //Xóa question
    const DelQuestion = (data) => {
        return (event) => {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            fetch(apiUrl+"/question/" + data._id, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        setChangeTable(!changeTable)
                    } else {
                        alert(result.message)
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    //Xóa blog
    const Delblog = (data) => {
        return (event) => {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            fetch(apiUrl+"/blog/" + data._id, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        setChangeTable(!changeTable)
                    } else {
                        alert(result.message)
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    //Xóa thông báo
    const DelNof = (data) => {
        return (event) => {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };

            fetch(apiUrl+"nof/" + data._id, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        setChangeTable(!changeTable)
                    } else {
                        alert(result.message)
                    }
                })
                .catch(error => console.log('error', error));
        }
    }
    //=====================================
    //Chi tiết Service
    const ServiceDetails = (data) => {
        return (event) => {
            navigate('/service-details/' + data._id)
        }
    }
    //chi tiết About
    const AboutDetails = (data) => {
        return (event) => {
            navigate('/about-details/' + data._id)
        }
    }
    //chi tiết Blog
    const BlogDetails = (data) => {
        return (event) => {
            navigate('/blog-details/' + data._id)
        }
    }
    //
    const NofDetails = (data) => {
        return (event) => {
            navigate('/nof-details/' + data._id)
        }
    }

    //=====================================
    //Edit infor
    const EditInfor = (data) => {
        return (event) => {
            navigate('/infor-edit/' + data._id)
        }
    }
    //Edit Service
    const EditService = (data) => {
        return (event) => {
            navigate('/service-edit/' + data._id)
        }
    }
    //Edit Blog
    const EditBlog = (data) => {
        return (event) => {
            navigate('/blog-edit/' + data._id)
        }
    }
    //Edit About
    const EditAbout = (data) => {
        return (event) => {
            navigate('/about-edit/' + data._id)
        }
    }
    //Edit infor
    const EditQuestion = (data) => {
        return (event) => {
            navigate('/question-edit/' + data._id)
        }
    }
    //Edit Nof
    const EditNof = (data) => {
        return (event) => {
            navigate('/nof-edit/' + data._id)
        }
    }
    //=====================================
    //HTML
    let changeTable
    changeTable = (
        <>
            <select onChange={e => setTag(e.target.value)} value={Tag}>
                <option value='infor'>Thông Tin Chung</option>
                <option value='service'>Dịch Vụ</option>
                <option value='about'>Giới Thiệu</option>
                <option value='blog'>Blog</option>
                <option value='question'>Giải Đáp</option>
                <option value='nof'>Thông Báo</option>
            </select>
        </>
    )

    let body
    if (Loading) {
        let listTable
        let headerTable
        if (Tag === 'infor') {
            listTable = dataTable.map(data => (
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
            headerTable = (
                <>
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
                </>
            )
        } else if (Tag === 'service') {
            listTable = dataTable.map(data => (
                <tr key={data._id}>
                    <td><img className='Admin-table-Icon' src={`https://drive.google.com/uc?export=view&id=${data.Icon}`} alt=''></img></td>
                    <td>{data.Title}</td>
                    <td>
                        <button className='Admin-btn-edit' onClick={ServiceDetails(data)}>Chi Tiết</button>
                        <button className='Admin-btn-edit' onClick={EditService(data)}>Edit</button>
                        <button className='Admin-btn-del' onClick={DelService(data)}>Xoa</button>
                    </td>
                </tr>
            ))
            headerTable = (
                <>
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
                </>
            )
        } else if (Tag === 'about') {
            listTable = dataTable.map(data => (
                <tr key={data._id}>
                    <td><img className='Admin-table-img-about' src={`https://drive.google.com/uc?export=view&id=${data.Icon}`} alt=''></img></td>
                    <td>{data.Title1}</td>
                    <td>{data.Title2}</td>
                    <td>
                        <button className='Admin-btn-edit' onClick={AboutDetails(data)}>Chi Tiết</button>
                        <button className='Admin-btn-edit' onClick={EditAbout(data)}>Edit</button>
                        <button className='Admin-btn-del' onClick={DelAbout(data)}>Xoa</button>
                    </td>
                </tr>
            ))
            headerTable = (
                <>
                    <button className='Admin-btn-add' onClick={AddAbout}>Thêm</button>
                    <Table className='Admin-Table' striped bordered hover >
                        <thead>
                            <tr>
                                <th>Hình Ảnh</th>
                                <th>Tên</th>
                                <th>Chức Vị</th>
                                <th>...</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listTable}
                        </tbody>
                    </Table>
                </>
            )
        } else if (Tag === 'blog') {
            listTable = dataTable.map(data => (
                <tr key={data._id}>
                    <td><img className='Admin-table-Logo-img' src={`https://drive.google.com/uc?export=view&id=${data.Icon}`} alt=''></img></td>
                    <td>{data.Title1}</td>
                    <td>{data.Title2}</td>
                    <td>
                        <button className='Admin-btn-edit' onClick={BlogDetails(data)}>Chi Tiết</button>
                        <button className='Admin-btn-edit' onClick={EditBlog(data)}>Edit</button>
                        <button className='Admin-btn-del' onClick={Delblog(data)}>Xoa</button>
                    </td>
                </tr>
            ))
            headerTable = (
                <>
                    <button className='Admin-btn-add' onClick={AddBlog}>Thêm</button>
                    <Table className='Admin-Table' striped bordered hover >
                        <thead>
                            <tr>
                                <th>Hình Ảnh</th>
                                <th>Tiêu Đề</th>
                                <th>Giới Thiệu ngắn</th>
                                <th>...</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listTable}
                        </tbody>
                    </Table>
                </>
            )
        } else if (Tag === 'question') {
            listTable = dataTable.map(data => (
                <tr key={data._id}>
                    <td>{data.Title}</td>
                    <td className='question-admin'>{parse(data.Content)}</td>
                    <td>
                        <button className='Admin-btn-edit' onClick={EditQuestion(data)}>Edit</button>
                        <button className='Admin-btn-del' onClick={DelQuestion(data)}>Xoa</button>
                    </td>
                </tr>
            ))
            headerTable = (
                <>
                    <button className='Admin-btn-add' onClick={AddAnswer}>Thêm</button>
                    <Table className='Admin-Table' striped bordered hover >
                        <thead>
                            <tr>
                                <th>Tiêu Đề</th>
                                <th>Nội Dung</th>
                                <th>...</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listTable}
                        </tbody>
                    </Table>
                </>
            )
        } else if (Tag === 'nof') {
            listTable = dataTable.map(data => (
                <tr key={data._id}>
                    <td><img className='Admin-table-Logo-img' src={`https://drive.google.com/uc?export=view&id=${data.Icon}`} alt=''></img></td>
                    <td>{data.Title1}</td>
                    <td>{data.Title2}</td>
                    <td>
                        <button className='Admin-btn-edit' onClick={NofDetails(data)}>Chi Tiết</button>
                        <button className='Admin-btn-edit' onClick={EditNof(data)}>Edit</button>
                        <button className='Admin-btn-del' onClick={DelNof(data)}>Xoa</button>
                    </td>
                </tr>
            ))
            headerTable = (
                <>
                    <button className='Admin-btn-add'onClick={AddNof}>Thêm</button>
                    <Table className='Admin-Table' striped bordered hover >
                        <thead>
                            <tr>
                                <th>Hình Ảnh</th>
                                <th>Tiêu Đề</th>
                                <th>Giới Thiệu ngắn</th>
                                <th>...</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listTable}
                        </tbody>
                    </Table>
                </>
            )
        }



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

                <div className='Name'>
                    {changeTable}
                    {headerTable}
                </div>
            </>
        )
    } else {
        body = (
            <div>Loading..</div>
        )
    }

    return (body)
}

export default Admin