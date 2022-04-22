import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Home.css'
import ImgHome from '../img/img_home.jpg'
import { Accordion, Carousel } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import parse from 'html-react-parser'
import {apiUrl} from '../contexts/constants';

// import facebook from '../img/facebook-app-symbol.png'

import React, { useRef, useState, useEffect } from 'react'

function Home() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const navigate = useNavigate()

    const [Loading, setLoading] = useState(false)

    let ref = useRef()
    let refs = useRef()

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

    const scroll1 = (scrollOffset) => {
        refs.current.scrollLeft += scrollOffset;
    };
    //===============================================
    const [infor, setinfor] = useState([])
    const [service, setservice] = useState([])
    const [about, setabout] = useState([])
    const [blog, setblog] = useState([])
    const [question, setquestion] = useState([])
    const [nof, setnof] = useState([])

    //===============================================
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

    //Service
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(apiUrl+"/service", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    setservice(result.data)
                }
            })
            .catch(error => console.log('error', error));
    }, [])
    //About
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(apiUrl+"/about", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    setabout(result.data)
                }
            })
            .catch(error => console.log('error', error));
    }, [])
    //Blog
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(apiUrl+"/blog", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    setblog(result.data)
                }
            })
            .catch(error => console.log('error', error));
    }, [])

    //question
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(apiUrl+"/question", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    setquestion(result.data)
                }
            })
            .catch(error => console.log('error', error));
    }, [])
    //nof
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(apiUrl+"/nof", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    setnof(result.data)
                }
            })
            .catch(error => console.log('error', error));
    }, [])

    //Click++++++++++++++++++++++++++++++++++++++++++
    //Click Service
    const ClickService = (data) => {
        return (event) => {
            navigate('/service-details/' + data._id)
        }
    }

    //ClickAbout
    const ClickAbout = (data) => {
        return (event) => {
            navigate('/about-details/' + data._id)
        }
    }

    //ClickBlog
    const ClickBlog = (data) => {
        return (event) => {
            navigate('/blog-details/' + data._id)
        }
    }

    //ClickNof
    const ClickNof = (data) => {
        return (event) => {
            navigate('/nof-details/' + data._id)
        }
    }

    let body
    if (Loading) {
        //Body 2
        const listService = service.map(data => (
            <div key={data._id} className='Home-Body-card-2'>
                <div className='Home-Body-card-2__Icon'>
                    <img className='Home-Body-card-2__Icon_Img' src={`https://drive.google.com/uc?export=view&id=${data.Icon}`} alt=''></img>
                </div>
                <div className='Home-Body-card-2__Container'>
                    <p className='Home-Body-card-2__Container_content'>{data.Title}</p>
                    <button onClick={ClickService(data)} className='Home-Body-card-2__Container_btn'>Chi Tiết</button>
                </div>
            </div>
        ))
        //Body 3
        const listAbout = about.map(data => (
            <div key={data._id} className='Home-Body-card-3' onClick={ClickAbout(data)}>
                <div className='Home-Body-card-3_Img'>
                    <img className='Home-Body-card-3_Img_CT' src={`https://drive.google.com/uc?export=view&id=${data.Icon}`} alt=''></img>
                </div>
                <div className='Home-Body-card-3_Title'>
                    <p className='Home-Body-card-3_Title-1'>{data.Title1}</p>
                    <p className='Home-Body-card-3_Title-2'>{data.Title2}</p>
                </div>
            </div>
        ))
        //Body 4
        const listBlog = blog.map(data => (
            <div key={data._id} className='Home-Body-card-4'>
                <img className='Home-Body-card-4_Img_CT' src={`https://drive.google.com/uc?export=view&id=${data.Icon}`} alt=''></img>
                <div className='Home-Body-card-4_Title_container'>
                    <p className='Home-Body-card-4_Title-1'>{data.Title1}</p>
                    <p className='Home-Body-card-4_Title-2'>{data.Title2}</p>
                    <button className='Home-Body-card-4_btn' onClick={ClickBlog(data)}>
                        Tiếp Tục Đọc
                        <svg className="w-6 h-6 Home-Body-card-4_btn_Icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        ))
        //Body 6
        const listQuestion = question.map(data => (
            <Accordion key={data._id} className='Home-body__6-table-qre'>
                <Accordion.Item eventKey={data._id}>
                    <Accordion.Header>{data.Title}</Accordion.Header>
                    <Accordion.Body>
                        {parse(data.Content)}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        ))
        //body 7
        const listNof = nof.map(data => (
            <div key={data._id} className='Home-body-7-card' onClick={ClickNof(data)}>
                <img className='Home-body-7-card-img' src={`https://drive.google.com/uc?export=view&id=${data.Icon}`} alt=''></img>
                <div className='Home-body-7-infor'>
                    <h4>{data.Title1}</h4>
                    <p>{data.Title2}</p>
                </div>
            </div>
        ))
        //HTMl
        body = (
            <>
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
                        <a className='Home-header-2__btn Home-header-2__btn_Home' href="#services" data-after="Service">Dịch Vụ</a>
                        <a className='Home-header-2__btn' href="#abunt" data-after="About">Giới Thiệu</a>
                        <a className='Home-header-2__btn' href="#blog" data-after="Blog">Blog</a>
                        <a className='Home-header-2__btn' href="#question" data-after="Question">Đặt Câu Hỏi</a>
                        <a className='Home-header-2__btn' href="#question-a" data-after="Question-a">Giải Đáp</a>
                        <a className='Home-header-2__btn' href="#notify" data-after="Notify">Thông Báo</a>
                        <a className='Home-header-2__btn' href="#contact" data-after="Contact">Liên Hệ</a>
                    </div>
                </div>

                {/* Home */}

                {/* Body 1 */}
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={ImgHome}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={ImgHome}
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={ImgHome}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                {/* Line */}
                <div className='Home-Body__Line'></div>

                {/* Body 2 */}
                {/* <section id="services"> */}
                <section id="services">
                    <div className='Home-body__2'>
                        <div className='Home-body__2-Title'>
                            <h2 className='Home-body__2-Title__chir'>Dịch Vụ</h2>
                        </div>
                        <div className='Home-body__2_AllCard'>
                            <div className='Home-body__2_AllCard_container'>

                                {listService}

                            </div>
                        </div>
                    </div>
                </section>
                {/* </section> */}

                {/* Body 3 */}
                <section id="abunt">
                    <div className='Home-Body-3'>
                        <div className='Home-body__3-Title'>
                            <h2 className='Home-body__3-Title__chir'>Đội Ngũ Của Chúng Tôi</h2>
                        </div>

                        <div className='Home-body__3_AllCard'>
                            <div className='Home-body__3_AllCard_container'>

                                {listAbout}

                            </div>
                        </div>
                    </div>
                </section>

                {/* Body 4 */}
                <section id="blog">
                    <div className='Home-body__4'>
                        <div className='Home-body__4-Title'>
                            <h2 className='Home-body__4-Title__chir-1'>Blog</h2>
                            <p className='Home-body__4-Title__chir-2'>Hoạt Động Gần Đây Của Chúng Tôi</p>
                        </div>
                        <div className='Home-body__4_AllCard'>
                            <button className='Home-body__4_AllCard-btn'><svg className="w-6 h-6 Home-body__4_AllCard-btn-l" onClick={() => scroll(-300)} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg></button>
                            <div className='Home-body__4_AllCard_container' ref={ref}>

                                {listBlog}

                            </div>
                            <button className='Home-body__4_AllCard-btn'><svg className="w-6 h-6 Home-body__4_AllCard-btn-r" onClick={() => scroll(300)} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg></button>
                        </div>
                    </div>
                </section>

                {/* Body 5 */}
                <section id='question'>
                    <h2 className='Home-body__5-Title'>ĐẶT CÂU HỎI CHO CHÚNG TÔI</h2>
                    <div className='Home-body__5-Main'>
                        <div className='Home-body__5-Main-left'>
                            <h2 className='Home-body__5-Title_Chi'>BIỂU PHÍ TƯ VẤN PHÁP LUẬT QUA EMAIL</h2>
                            <p className='Home-body__5-Title_Content'>1. Tư vấn trực tuyến qua email: Hồi đáp của Luật sư sẽ được thể hiện bằng văn bản và gửi lại qua email của khách hàng cung cấp. Phí dịch vụ: 300.000 VNĐ/Email.</p>
                            <p className='Home-body__5-Title_Content'> 2. Tư vấn bằng văn bản có ký đóng dấu qua Email: Hồi đáp của Luật sư sẽ được thể hiện bằng văn bản, được Luật sư ký và đóng dấu công ty vào văn bản tư vấn. Văn bản tư vấn sẽ được gửi dưới dạng bản Scan và gửi lại qua Email. Phí dịch vụ: 500.000 VNĐ/văn bản.</p>
                            <p className='Home-body__5-Title_Content'>3. Tư vấn bằng văn bản có ký đóng dấu gửi qua đường bưu điện: Hồi đáp của Luật sư sẽ được thể hiện bằng văn bản, được Luật sư ký và đóng dấu công ty vào văn bản tư vấn. Văn bản tư vấn sẽ được gửi dưới dạng văn bản qua đường bưu điện theo địa chỉ khách hàng cung cấp. Phí dịch vụ: 1.000.000 VNĐ/văn bản.</p>
                        </div>
                        <div className='Home-body__5-Main-right'>
                            <h2 className='Home-body__5-Title_Chi'>ĐẶT CÂU HỎI CHO CHÚNG TÔI</h2>
                            <div className='Home-body__5-Main_font'>
                                <div className='Home-body__5-Main_font-Main'>
                                    <label className='Home-body__5-font-lable'>Họ và Tên</label>
                                    <input className='Home-body__5-Main_font-input' type='text'></input>
                                    <div className='Home-body__5-Main_font-Main2'>
                                        <div className='Home-body__5-Main_font-Main2_chi'>
                                            <label className='Home-body__5-font-lable'>Email để nhận tư vấn</label>
                                            <input className='Home-body__5-Main_font-input' type='text'></input>
                                        </div>
                                        <div className='Home-body__5-Main_font-Main2_chi'>
                                            <label className='Home-body__5-font-lable'>Số điện thoại</label>
                                            <input className='Home-body__5-Main_font-input' type='tel'></input>
                                        </div>
                                    </div>
                                    <label className='Home-body__5-font-lable'>Tiêu đền câu hỏi</label>
                                    <input className='Home-body__5-Main_font-input' type='text'></input>
                                    <label className='Home-body__5-font-lable'>Nội dung tư vấn</label>
                                    <textarea className='Home-body__5-Main_font-textarea' type='text'></textarea>
                                    <button className='Home-body__5-font_btn'>Gửi Email</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*Body 6*/}
                <section id='question-a'>
                    <div className='Home-body__6-Main'>
                        <h2 className='Home-body__6-Title'>CÁC CÂU HỎI THƯỜNG GẶP</h2>
                        {listQuestion}
                    </div>
                </section>

                {/*Body 7 */}
                <section id='notify'>
                    <h2 className='Home-body__6-Title'>THÔNG BÁO</h2>
                    <div className='Home-body-7-Allcard'>
                        <button className='Home-body__4_AllCard-btn' onClick={() => scroll1(-300)}><svg className="w-6 h-6 Home-body__4_AllCard-btn-l" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg></button>
                        <div className='Home-body__5_AllCard_container' ref={refs}>
                            {listNof}
                        </div>
                        <button className='Home-body__4_AllCard-btn' onClick={() => scroll1(300)}><svg className="w-6 h-6 Home-body__4_AllCard-btn-r" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg></button>
                    </div>
                </section>

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
            </>
        )
    } else {
        body = (
            <>
                <div className='loading'>Loading...</div>
            </>
        )
    }
    return (body)
}

export default Home
