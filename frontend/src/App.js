import { createTheme, ThemeProvider } from "@mui/material";
import { RecoilRoot, useRecoilState } from "recoil";
import "./assets/css.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WikiRegister from "./components/WikiRegister";
import MainSection from "./page/MainSection";
import Header from "./components/Header";
import WikiEdit from "./components/WikiEdit";
import MainPage from "./page/MainPage";

const theme = createTheme({
  typography: {
    fontFamily:
      '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segae UI Emoji", "Segoe UI Symbol", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Router>
          <div>
            <Header />
            {/* 헤더. 모든 페이지에 다 붙어야 함 */}
            <Routes>
              <Route path="/" element={<MainPage />} />
              {/* 메인 페이지 */}
              <Route path="/:title" element={<MainSection />} />
              {/* 키워드 페이지 */}
              <Route path="/register" element={<WikiRegister />} />
              {/* 위키 등록 페이지 */}
              <Route path="/edit/:title" element={<WikiEdit />} />
              {/* 위키 수정 페이지 */}
            </Routes>
          </div>
        </Router>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
