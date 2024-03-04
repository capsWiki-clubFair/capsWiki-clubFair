import React, {useEffect, useState} from 'react';
import ReactMarkdown from "react-markdown";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const WikiEdit = () => {
    const navigate = useNavigate();
    const {title: currentTitle} = useParams(); // 현재 게시글 제목
    const [text, setText] = useState(''); // 글 상태
    const [keyword, setKeyword] = useState(''); // 키워드 상태
    const [author, setAuthor] = useState(''); // 작성자 상태

    useEffect(() => {
        // 게시글 조회 함수
        const fetchPost = async () => {
            try {
                const res = await axios.get(`http://40.82.159.67:8080/post/${encodeURIComponent(currentTitle)}`);
                const data = res.data;
                // 조회한 게시글 데이터로 상태 업데이트
                setText(data.content);
                setKeyword(data.title);
                setAuthor(data.writerName);
            } catch (err) {
                console.error(err);
            }
        }
        fetchPost()
    },[currentTitle]);

    /** 제목,작성자,내용 동작 함수 */
    const handleChangeText = (e) => {
        setText(e.target.value);
    };

    const handleChangeKeyword = (e) => {
        setKeyword(e.target.value);
    };

    const handleChangeAuthor = (e) => {
        setAuthor(e.target.value);
    };

    /** 수정 실행 함수 */
    const handleEdit = async () => {
        if (!isButtonEnabled) return; // 버튼이 비활성화 상태이면 함수 실행 되지 않음

        try {
            // put 요청데이터
            const putData = {
                title: keyword,
                writerName: author, // 수정자
                content: text
            };

            await axios.put(`http://40.82.159.67:8080/post/${encodeURIComponent(currentTitle)}`, putData)
            alert('게시글이 성공적으로 수정되었습니다.');
            navigate('/', {replace: true});
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    /** 모든 필드가 채워져 있을 때만 버튼을 활성화 */
    const isButtonEnabled = text.length > 0 && keyword.length > 0 && author.length > 0;

    return (
        <div className='wiki_edit_wrap'>
            <h3 className='fw_bold fs_24 check_header'>키워드 등록하기</h3>
            <div className='edit_section_wrap'>
                <div className='keyword_edit'>
                    <div className='fw_500 fs_17'>키워드</div>
                    <input type='text' value={keyword} onChange={handleChangeKeyword} />
                </div>
                <div className='writer_edit'>
                    <div className='fw_500 fs_17'>작성자</div>
                    <input type='text' value={author} onChange={handleChangeAuthor} />
                </div>
                <textarea
                    className='wiki_text_wrap'
                    value={text}
                    onChange={handleChangeText}
                    style={{resize: 'none', width: '90%', height:'750px', padding: '15px', marginBottom: '30px'}}
                    placeholder='여기에 마크다운 형식으로 글을 작성하세요...'
                />
                <div className='preview_wrap'>
                    <h3 className='fw_bold fs_24 check_header'>미리보기</h3>
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>
            </div>
            <div className='btn_wrap'>
                <button className='fs_15 fw_bold'
                        onClick={handleEdit}
                        disabled={!isButtonEnabled} style={isButtonEnabled ? {backgroundColor: 'var(--blue)', color: 'var(--gray)'} : {}}>수정</button>
            </div>
        </div>
    );
};

export default WikiEdit;