import instance from "./instance";

export const getClubMembers = (clubId, page = 0, size = 20) => {
    return instance.get(`/api/clubs/${clubId}/members`, {
        params: { page, size },
    });
};

export const deleteClubMember = (clubId, clubMemberId) => {
    return instance.delete(`/api/clubs/${clubId}/members/${clubMemberId}`);
};