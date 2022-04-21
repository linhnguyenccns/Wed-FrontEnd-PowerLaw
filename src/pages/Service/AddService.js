import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import '../../css/page-add.css'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {apiUrl} from '../../contexts/constants';

function AddService() {

  let navigate = useNavigate();
  const [Loading, setLoading] = useState(false)
  //=======================
  const [value, setvalue] = useState('')
  const [Icon, setIcon] = useState('')
  const [Title, setTitle] = useState('')
  //=======================
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

  const Add = () => {
    //đoc cookie
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('accessToken='))
      .split('=')[1];
    var myHeaders = new Headers();
    myHeaders.append("token", cookieValue);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const a = Icon.split('/')
    var urlencoded = new URLSearchParams();
    urlencoded.append("Icon", a[5]);
    urlencoded.append("Title", Title);
    urlencoded.append("Content", value);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch(apiUrl+"/service", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          alert(result.message)
          navigate(-1)
        } else {
          alert(result.message)
        }
      })
      .catch(error => console.log('error', error));
  }

  //HTML
  let Body
  if (Loading) {
    Body = (
      <>
        <h4 className='add-page-title'>Thêm dịch vụ</h4>
        <div className='add-page'>
          <label>Icon</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setIcon(e.target.value)}></input>
          </div>
          <label>Tiêu Đề</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setTitle(e.target.value)}></input>
          </div>
          <div className='Text-big'>
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                const data = editor.getData();
                setvalue(data)
              }}
            />
          </div>
          <button onClick={Add} className='btn-add-page'>Xác Nhận</button>
        </div>
      </>
    )
  } else {
    Body = (
      <div>Loading...</div>
    )
  }

  return (Body)
}

export default AddService