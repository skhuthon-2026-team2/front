import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import ClubLayout from "../components/layout/ClubLayout";
import MainLayout from "../components/layout/MainLayout";
import LoginPage from "../features/auth/LoginPage";
import MainPage from "../features/main/MainPage";
import JoinClubPage from "../features/club/JoinClubPage";
import NicknamePage from "../features/club/NicknamePage";

function PlaceholderPage({ title, description }) {
  return (
    <section style={{ padding: 24 }}>
      <h1 style={{ margin: 0, fontSize: 24 }}>{title}</h1>
      <p style={{ marginTop: 12, color: "#666" }}>{description}</p>
    </section>
  );
}

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/club/join" element={<JoinClubPage />} />
        <Route path="/club/join/nickname" element={<NicknamePage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/club/:clubId" element={<ClubLayout />}>
          <Route
            path="feed"
            element={
              <PlaceholderPage
                title="피드"
                description="동아리 피드 화면이 들어갈 자리입니다."
              />
            }
          />
          <Route
            path="timeline"
            element={
              <PlaceholderPage
                title="타임라인"
                description="동아리 타임라인 화면이 들어갈 자리입니다."
              />
            }
          />
          <Route
            path="ai"
            element={
              <PlaceholderPage
                title="추천 AI"
                description="추천 AI 화면이 들어갈 자리입니다."
              />
            }
          />
          <Route index element={<Navigate to="feed" replace />} />
        </Route>
      </Route>
      <Route
        path="*"
        element={
          <PlaceholderPage
            title="Not Found"
            description="요청한 페이지를 찾을 수 없습니다."
          />
        }
      />
    </Routes>
  );
}
