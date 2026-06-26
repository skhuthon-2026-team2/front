import { useAuthStore } from "../../stores/authStore";

/**
 * @param {"ALL" | "AUTHOR" | "OWNER"} allow
 * @param {number} [authorId]
 *
 * 사용 예:
 *   <RoleGate allow="OWNER"><button>강제 삭제</button></RoleGate>
 *   <RoleGate allow="AUTHOR" authorId={feed.authorId}><button>수정</button></RoleGate>
 */
export default function RoleGate({ allow, authorId, children }) {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;

  const isOwner = user.role === "OWNER";
  const isAuthor = authorId != null && user.id === authorId;

  if (allow === "ALL") return children;
  if (allow === "OWNER" && isOwner) return children;
  if (allow === "AUTHOR" && (isAuthor || isOwner)) return children;

  return null;
}
