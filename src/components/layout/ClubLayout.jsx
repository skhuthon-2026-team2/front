import { Outlet, useParams } from "react-router-dom";
import { CLUB_TABS } from "../../features/club/constants";
import Header from "./Header";

const MOCK_CLUB = {
  id: 1,
  name: "연세 사진 동아리 '찰나'",
  role: "회장",
};

export default function ClubLayout() {
  const { clubId } = useParams();
  const club = MOCK_CLUB;
  const isOwner = club.role === "회장";

  const tabs = CLUB_TABS.filter((tab) => !tab.ownerOnly || isOwner);

  return (
    <div className="min-h-dvh bg-[#faf9f8]">
      <Header showSearch tabs={tabs} clubId={clubId} />
      <Outlet context={{ club }} />
    </div>
  );
}
