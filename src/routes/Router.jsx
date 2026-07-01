import { Navigate, Route, Routes } from "react-router-dom";
// import ProtectedRoute from "../components/common/ProtectedRoute";
import ClubLayout from "../components/layout/ClubLayout";
import MainLayout from "../components/layout/MainLayout";
import LoginPage from "../features/auth/LoginPage";
import MainPage from "../features/main/MainPage";
import JoinClubPage from "../features/club/JoinClubPage";
import NicknamePage from "../features/club/NicknamePage";
import CreateClubPage from "../features/club/CreateClubPage";
import FeedPage from "../features/feed/FeedPage";
import WriteFeedPage from "../features/feed/WriteFeedPage";
import FeedManagePage from "../features/member/FeedManagePage";
import MemberManagePage from "../features/member/MemberManagePage";
import BasicProfilePage from "../features/mypage/BasicProfilePage";
import ClubProfilePage from "../features/mypage/ClubProfilePage";
import MyFeedPage from "../features/mypage/MyFeedPage";
import TimelinePage from "../features/mypage/TimelinePage";
import KakaoCallback from "../features/auth/KakaoCallback";

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
      <Route path="/oauth/kakao" element={<KakaoCallback />} />
      <Route element={<MainLayout />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/club/join" element={<JoinClubPage />} />
        <Route path="/club/join/nickname" element={<NicknamePage />} />
        <Route path="/club/create" element={<CreateClubPage />} />

        <Route path="/mypage" element={<Navigate to="/mypage/profile" replace />} />
        <Route path="/mypage/profile" element={<BasicProfilePage />} />
        <Route path="/mypage/clubs" element={<ClubProfilePage />} />
        <Route path="/mypage/feeds" element={<MyFeedPage />} />
        <Route path="/mypage/timeline" element={<TimelinePage />} />
      </Route>

      {/* 확인용 임시: ProtectedRoute 밖으로 빼둠. 인증 붙이면 아래 블록으로 되돌릴 것 */}
      <Route path="/club/:clubId" element={<ClubLayout />}>
        <Route path="feed" element={<FeedPage />} />
        <Route path="write" element={<WriteFeedPage />} />
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
        <Route path="members" element={<MemberManagePage />} />
        <Route path="members/feed" element={<FeedManagePage />} />
        <Route index element={<Navigate to="feed" replace />} />
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
