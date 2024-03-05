import React from 'react';
import {useNavigate} from "react-router-dom";


import { useMediaQuery } from 'react-responsive' ; //반응형 모듈


const MainPage = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register')
    }

    return (
        <div className='main_introducing_wrap'>
            <h3 className='fw_bold fs_24 check_header'>대문</h3>
            <div className='introducing_wrap fw_500 fs_17'>
                <div>
                    <span className='blue_color fw_bold fs_17'>동박 위키</span>에 오신 것을 환영합니다!
                </div>
                <div>
                    <span className='blue_color fw_bold fs_17'>동박 위키</span>에서는 원하는 문서를 생성 및 편집할 수 있습니다.
                </div>
                <div>
                    지금 바로 <span className='blue_color fw_bold fs_17'>동박 위키</span>를 시작해보세요!
                </div>
                <div
                    className='blue_color fw_bold fs_20 pointer'
                    style={{marginTop:'50px'}}
                    onClick={handleRegister}
                >👉 키워드 등록하러 가기</div>
            </div>
        </div>
    );
};

export default MainPage;