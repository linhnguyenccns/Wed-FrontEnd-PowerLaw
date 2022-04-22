import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import '../../css/page-add.css'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {apiUrl} from '../../contexts/constants';

function EditAnswer() {

  let navigate = useNavigate();
  const [Loading, setLoading] = useState(false)
  const [Loading2, setLoading2] = useState(false)
  //=======================
  const [value, setvalue] = useState('')
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

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    const id = window.location.href.split('/')
    fetch(apiUrl+"/question/" + id[4], requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setvalue(result.data.Content)
          setTitle(result.data.Title)
          setLoading2(true)
        }
      })
      .catch(error => console.log('error', error));
  }, [])

  const Add = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    //đoc cookie
    var urlencoded = new URLSearchParams();
    urlencoded.append("Title", Title);
    urlencoded.append("Content", value);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    const id = window.location.href.split('/')
    fetch(apiUrl+"/question/"+id[4], requestOptions)
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
  if (Loading && Loading2) {
    Body = (
      <>
        <h4 className='add-page-title'>Edit dịch vụ</h4>
        <div className='add-page'>
          <label>Tiêu Đề</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setTitle(e.target.value)} maxLength='150' size='200' value={Title}></input>
          </div>
          <div className='Text-big'>
            <CKEditor
              editor={ClassicEditor}
              data={value}
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
      <div className='loading'>Loading...</div>
    )
  }

  return (Body)
}

export default EditAnswer