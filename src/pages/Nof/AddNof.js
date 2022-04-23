import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import '../../css/page-add.css'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {apiUrl} from '../../contexts/constants';

function AddNof() {
  let navigate = useNavigate();
  const [Loading, setLoading] = useState(false)
  //=======================
  const [value, setvalue] = useState('')
  const [Icon, setIcon] = useState('')
  const [Title1, setTitle1] = useState('')
  const [Title2, setTitle2] = useState('')
  //=======================
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
    urlencoded.append("Title1", Title1);
    urlencoded.append("Title2", Title2);
    urlencoded.append("Content", value);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch(apiUrl+"/nof", requestOptions)
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
        <h4 className='add-page-title'>Thêm Thông Báo</h4>
        <div className='add-page'>
          <label>Hình Ảnh</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setIcon(e.target.value)} size='50'></input>
          </div>
          <label>Tiêu đề(Tối Đa 50 chữ)</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setTitle1(e.target.value)} size='50' maxLength='50'></input>
          </div>
          <label>Môt tả ngắn(Tối Đa 150 chữ)</label>
          <div className='add-page-input'>
            <textarea type='text' className='motangan' onChange={e => setTitle2(e.target.value)} maxLength='160'></textarea>
          </div>
          <label>Nội dung</label>
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
      <div className='loading'>Loading...</div>
    )
  }

  return (
    Body
  )
}

export default AddNof