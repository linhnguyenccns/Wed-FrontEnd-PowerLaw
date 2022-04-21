import React, { useState, useEffect } from 'react'
import '../css/Service.css'
import parse from 'html-react-parser'

function ServiceDetails() {

  const [Loading, setLoading] = useState(false)
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [Title, setTitle] = useState('')
  const [Content, setContent] = useState('')

  const [infor, setinfor] = useState([])

  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    const id = window.location.href.split('/')
    fetch("http://localhost:5000/service/" + id[4], requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setTitle(result.data.Title)
          setContent(result.data.Content)
        }
      })
      .catch(error => console.log('error', error));
  }, [])

  //Infor
  useEffect(() => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:5000/infor", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setinfor(result.data)
          setLoading(true)
        }
      })
      .catch(error => console.log('error', error));
  }, [])

  let body
  if (Loading) {
    body = (
      <>
        <div className='Service-Total'>
          <div className='Home-header'>
            <div className='Home-header__container'>
              <div className='Home-header__logo'>
                <img className='Home-header__logo__img' src={`https://drive.google.com/uc?export=view&id=${infor[0].Logo}`} alt=''></img>
              </div>
              <div className='Home-header__right'>
                <div className='Home-header__Phone'>
                  <div className='Home-header__Phone__left'>
                    <img className='Home-header__Phone-img' src={`https://drive.google.com/uc?export=view&id=${infor[0].IconPhone}`} alt=''></img>
                  </div>
                  <div className='Home-header__Phone_right'>
                    <div className='Home-header__Phone_Number'>{infor[0].PhoneNumber}</div>
                    <div className='Home-header__Phone_Title'>Hãy Liên Hệ Với Chúng Tôi</div>
                  </div>
                </div>
                <div className='Home-header__Facebook'>
                <a href={infor[0].Facebook} className='Home-header__Facebook_Span'>Facebook</a>
                </div>
              </div>
            </div>
          </div>

          {/* Header 2 */}
          <div className='Home-header-2'>
            <div className='Home-header-2__container'>
              <a className='Home-header-2__btn Home-header-2__btn_Home' href="/">Trang Chủ</a>
              <a className='Home-header-2__btn' href="#contact" data-after="Contact">Liên Hệ</a>
            </div>
          </div>

          {/* body */}
          <div className='Service_body'>
            <div className='Service_body-Container'>
              <h4 className='Service_body-Container-title'>{Title}</h4>
              <div className='Service_body-Container-connent'>
                {parse(Content)}
              </div>
            </div>
          </div>

          {/* Đấy web */}
          <section id='contact'>
            <div className='Home_bottom-1'>
              <img className='Home_bottom-1-logo' src={`https://drive.google.com/uc?export=view&id=${infor[0].Logo}`} alt=''></img>
              <div className='Home_bottom-1-info'>
                <p className='Home_bottom-1-info-1'><img className='Home_bottom-1-info-img' src={`https://drive.google.com/uc?export=view&id=${infor[0].IconInfor}`} alt=''></img>{infor[0].Infor}</p>
                <div className='Home_bottom-1-info-2-3'>
                  <p className='Home_bottom-1-info-2'><img className='Home_bottom-1-info-img' src={`https://drive.google.com/uc?export=view&id=${infor[0].IconPhone}`} alt=''></img>{infor[0].PhoneNumber}</p>
                  <p className='Home_bottom-1-info-3'><img className='Home_bottom-1-info-img' src={`https://drive.google.com/uc?export=view&id=${infor[0].IconTime}`} alt=''></img>{infor[0].Time}</p>
                </div>
                <p className='Home_bottom-1-info-4'><img className='Home_bottom-1-info-img' src={`https://drive.google.com/uc?export=view&id=${infor[0].IconEmail}`} alt=''></img>{infor[0].Email}</p>
                <p className='Home_bottom-1-info-5'><img className='Home_bottom-1-info-img' src={`https://drive.google.com/uc?export=view&id=${infor[0].IconAddress}`} alt=''></img>{infor[0].Address}</p>
              </div>
            </div>
            <div className='Home_bottom-2'>
              <p className='Home_bottom-2_text'>© 2022 All Rights Reserved</p>
            </div>
          </section>
        </div>
      </>
    )
  }
  return (body)
}

export default ServiceDetails