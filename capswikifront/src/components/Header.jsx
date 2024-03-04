import React, { useEffect, useState } from 'react';
import logo from '../assets/images/KakaoTalk_20240227_130259911.png';
import { MdOutlineSearch } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImg from '../assets/images/KakaoTalk_20240304_135923848_01.png';

const Header = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]); // 서버로부터 받아온 키워드 저장할 상태
    const [searchTitle, setSearchTitle] = useState("") // 검색어 상태
    
    /** 서버로부터 데이터 받아올 함수 */
    useEffect(() => {
        const fetchKeywords = async () => {
            try {
                const res = await axios.get('http://40.82.159.67:8080/home');
                console.log(res.data);
                setData(res.data); // 응답 데이터를 상태에 저장
            } catch (err) {
                console.error("error: ", err.res);
            }
        };
        fetchKeywords();
    }, []); // 컴포넌트 마운트 시 1회만 실행

    /** 로고 클릭시 메인으로 이동하는 함수 */
    const handleMain = () => {
        navigate('/');
    };

    /** 검색 입력 변경 핸들러 */
    const handleChangeSearch = (e) => {
        setSearchTitle(e.target.value);
    }

    /** 검색 실행 함수 */
    const handleSearch = async (e) => {
        if (e.key === 'Enter' && searchTitle.trim() !=='') {
            try{
                const res = await axios.get(`http://40.82.159.67:8080/post/${encodeURIComponent(searchTitle.trim())}`)
                navigate(`/${res.data.title}`);
            } catch (err) {
                console.error(err);
                alert('검색된 게시글이 없습니다.')
            }
        }
    };


    /** 랜덤 페이지 이벤트 핸들러 */
    const handleRandomPage = async () => {
        try {
            const res = await axios.get('http://40.82.159.67:8080/post/random')
            navigate(`/${res.data.title}`);
        } catch (err) {
            console.error('err', err);
        }
    };

    /** 키워드 버튼 클릭 시 해당 postId 페이지로 이동 */
    const handleNavigateToPost = (title) => {
        navigate(`/${title}`);
    };

    return (
        <>
            <div className='main_wrap' style={{height:550, backgroundImage: `url(${backgroundImg})`, backgroundSize: '100% 100%', backgroundPosition: 'center'}}>
                <div className='header_wrap'>
                    <h1 className='fw_bold fs_35 header_msg'>동박 위키</h1>
                    <h3 className='fw_500 fs_20'>어서오세요- 동박위키 입니다.</h3>
                    <div className='header_btm_wrap'>
                        <img onClick={handleMain} alt='logo' src={logo} width={250} style={{marginRight: '20px', cursor:'pointer'}}/>
                        <div className='search_wrap'>
                            <MdOutlineSearch
                                width={50} height={50}
                                style={{verticalAlign:'middle'}}
                                onClick={handleSearch}
                            />
                            <div style={{height: '50px'}}>
                                <input type='text'
                                       placeholder='검색'
                                       style={{cursor:'text'}}
                                       onChange={handleChangeSearch}
                                       value={searchTitle}
                                       onKeyPress={handleSearch}/>
                            </div>
                        </div>
                        <div className='random_btn' style={{height: '50px'}}>
                            <button className='fw_bold fs_20' onClick={handleRandomPage}>랜덤검색</button>
                        </div>
                    </div>
                    <div className='keyword_wrap fs_17 fw_bold'>
                        {data.slice(0, 6).map((item, index) => (
                            <button key={index} onClick={() => handleNavigateToPost(item.title)}>{item.title}</button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;