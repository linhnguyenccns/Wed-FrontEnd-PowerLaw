import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import '../css/page-add.css'
import {apiUrl} from '../contexts/constants';

function EditInfor() {
  let navigate = useNavigate();
  const [Loading, setLoading] = useState(false)
  //=======================
  const [Logo, setLogo] = useState('')
  const [IconDT, setIconDT] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [IconThongTin, setIconThongTin] = useState('')
  const [ThongTin, setThongTin] = useState('')
  const [IconEmail, setIconEmail] = useState('')
  const [Email, setEmail] = useState('')
  const [IconAddress, setIconAddress] = useState('')
  const [Address, setAddress] = useState('')
  const [IconTime, setIconTime] = useState('')
  const [Time, setTime] = useState('')
  const [Facebook, setFacebook] = useState('')
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

    fetch(apiUrl+"/infor", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setLogo(result.data[0].Logo)
          setIconDT(result.data[0].IconPhone)
          setphoneNumber(result.data[0].PhoneNumber)
          setIconThongTin(result.data[0].IconInfor)
          setThongTin(result.data[0].Infor)
          setIconEmail(result.data[0].IconEmail)
          setEmail(result.data[0].Email)
          setIconAddress(result.data[0].IconAddress)
          setAddress(result.data[0].Address)
          setIconTime(result.data[0].IconTime)
          setTime(result.data[0].Time)
          setFacebook(result.data[0].Facebook)
        }
      })
      .catch(error => console.log('error', error));
  }, [])


  const Add = () => {
    //đoc cookie
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('accessToken='))
      .split('=')[1];
    var myHeaders = new Headers();
    myHeaders.append("token", cookieValue);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const id = window.location.href.split('/')
    let a;
    let b;
    let c;
    let d;
    let e;
    let f;
    if(Logo.indexOf('https://') > -1) {
      //là địa chỉ web
      a = Logo.split('/')[5]
    }else{
      a = Logo
    }

    if(IconDT.indexOf('https://') > -1) {
      //là địa chỉ web
      b = IconDT.split('/')[5]
    }else{
      b = IconDT
    }

    if(IconThongTin.indexOf('https://') > -1) {
      //là địa chỉ web
      c = IconThongTin.split('/')[5]
    }else{
      c = IconThongTin
    }

    if(IconEmail.indexOf('https://') > -1) {
      //là địa chỉ web
      d = IconEmail.split('/')[5]
    }else{
      d = IconEmail
    }

    if(IconAddress.indexOf('https://') > -1) {
      //là địa chỉ web
      e = IconAddress.split('/')[5]
    }else{
      e = IconAddress
    }

    if(IconTime.indexOf('https://') > -1) {
      //là địa chỉ web
      f = IconTime.split('/')[5]
    }else{
      f = IconTime
    }

    var urlencoded = new URLSearchParams();
    urlencoded.append("id",id[4] );
    urlencoded.append("Logo", a);
    urlencoded.append("IconPhone", b);
    urlencoded.append("PhoneNumber", phoneNumber);
    urlencoded.append("IconInfor", c);
    urlencoded.append("Infor", ThongTin);
    urlencoded.append("IconEmail", d);
    urlencoded.append("Email", Email);
    urlencoded.append("IconAddress", e);
    urlencoded.append("Address", Address);
    urlencoded.append("IconTime", f);
    urlencoded.append("Time", Time);
    urlencoded.append("Facebook", Facebook);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch(apiUrl+"/infor", requestOptions)
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
        <h4 className='add-page-title'>Chỉnh sửa Thông tin</h4>
        <div className='add-page'>
          <label>Logo</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setLogo(e.target.value)} size='200' value={Logo}></input>
          </div>
          <label>Icon Điện Thoại</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setIconDT(e.target.value)} size='200' value={IconDT}></input>
          </div>
          <label>Số điện thoại</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setphoneNumber(e.target.value)} size='200' value={phoneNumber}></input>
          </div>
          <label>Icon Thông tin</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setIconThongTin(e.target.value)} size='200' value={IconThongTin}></input>
          </div>
          <label>Thông Tin Công ty</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setThongTin(e.target.value)} size='200' value={ThongTin}></input>
          </div>
          <label>Icon Email</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setIconEmail(e.target.value)} size='200' value={IconEmail}></input>
          </div>
          <label>Email</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setEmail(e.target.value)} size='200' value={Email}></input>
          </div>
          <label>Icon Địa Chỉ</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setIconAddress(e.target.value)} size='200' value={IconAddress}></input>
          </div>
          <label>Địa Chỉ</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setAddress(e.target.value)} size='200' value={Address}></input>
          </div>
          <label>Icon Giờ</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setIconTime(e.target.value)} size='200' value={IconTime}></input>
          </div>
          <label>Giờ</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setTime(e.target.value)} size='200' value={Time}></input>
          </div>
          <label>FaceBook</label>
          <div className='add-page-input'>
            <input type='text' onChange={e => setFacebook(e.target.value)} size='200' value={Facebook}></input>
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

  return (
    Body
  )
}

export default EditInfor