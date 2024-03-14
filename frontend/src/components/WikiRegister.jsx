import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {pwdata} from "../api/passworddata";

const WikiRegister = () => {
    const navigate = useNavigate();

    const [text, setText] = useState(''); // 글 상태
    const [keyword, setKeyword] = useState(''); // 키워드 상태
    const [author, setAuthor] = useState(''); // 작성자 상태
    const [password, setPassword] = useState('') // 비밀번호 상태

    /** 제목,작성자,내용 동작 함수 */
    const handleChangeText = (e) => setText(e.target.value);
    const handleChangeKeyword = (e) => setKeyword(e.target.value);
    const handleChangeAuthor = (e) => setAuthor(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);

    // 모든 필드가 채워져 있을 때만 버튼을 활성화
    const isButtonEnabled = text.length > 0 && keyword.length > 0 && author.length > 0 && password.length > 0;

    /** 패스워드 검증 */
    const validatePassword = (inputPassword) => {
        return pwdata.some(pw => pw.password === inputPassword);
    };

    /** 등록 핸들러 함수 */
    const handleSubmit = async () => {
        // 입력값 검증
        if (!keyword || !author || !text || !password) {
            alert("모든 필드를 채워서 입력해주세요.");
            return;
        }

        // 패스워드 검증
        if (!validatePassword(password)) {
            alert("유효하지 않은 비밀번호입니다.");
            return;
        }

        // 키워드 검증
        try {
            const res = await axios.get(`/post/${encodeURIComponent(keyword.trim())}`)
            if (res.data.title === keyword) {
                alert("이미 존재하는 키워드입니다.");
                return;
            }

        } catch (err) {
            // console.error(err);
        }

        const postData = {
            title: keyword,
            writerName: author,
            content: text
        };

        try {
            const res = await axios.post('/post', postData);

            alert('키워드가 성공적으로 등록되었습니다.');
            navigate('/', {replace: true});
            window.location.reload();
        } catch (err) {
            // console.error(err);
        }
    };

    return (
        <div className='wiki_register_wrap'>
            <h3 className='fw_bold fs_24 check_header'>키워드 등록하기</h3>
            <div className='register_section_wrap'>
                <div className='keyword_register'>
                    <div className='fw_500 fs_17 input_title'>키워드</div>
                    <input type='text' style={{cursor: 'text', width: '65%'}} value={keyword} onChange={handleChangeKeyword} />
                </div>
                <div className='writer_register'>
                    <div className='fw_500 fs_17 input_title' >작성자</div>
                    <input type='text' style={{cursor:'text', width: '65%'}} value={author} onChange={handleChangeAuthor} />
                </div>
                <div className='password_register'>
                    <div className='fw_500 fs_17 input_title'>등록 비밀번호</div>
                    <input type='password' style={{cursor: 'text', width: '65%'}} value={password} onChange={handleChangePassword} />
                </div>
                <textarea
                    className='wiki_text_wrap'
                    value={text}
                    onChange={handleChangeText}
                    style={{cursor:'text',resize: 'none', width: '90%', height:'750px', padding: '15px', marginBottom: '30px'}}
                    placeholder='여기에 마크다운 형식으로 글을 작성하세요. ### 이후에 소제목을 정할 수 있습니다.'
                />
                <div className='preview_wrap'>
                    <h3 className='fw_bold fs_24 check_header'>미리보기</h3>
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>
            </div>
            <div className='btn_wrap'>
                <button
                    className='fs_15 fw_bold'
                    disabled={!isButtonEnabled}
                    onClick={handleSubmit}
                    style={isButtonEnabled ? {backgroundColor: 'var(--blue)', color: 'var(--bg)'} : {}}
                >등록</button>
            </div>
        </div>
    );
};

export default WikiRegister;