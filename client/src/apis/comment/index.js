import api from "apis/api";
import queryString from "query-string";

export const commentAPI = {
  async postComment(data) {
    return await api.post("/comment", { ...data });
  },

  async getComments({ postId, offset, limit }) {
    const query = { offset, limit };
    return await api.get(`/comment/${postId}?${queryString.stringify(query)}`);
  },

  async updateComment({ commentId, contentUpdate, imageBase64, videoBase64 }) {
    const data = {};
    if (contentUpdate) {
      data.contentUpdate = contentUpdate;
    }
    if (imageBase64) {
      data.imageBase64 = imageBase64;
    }
    if (videoBase64) {
      data.videoBase64 = videoBase64;
    }
    return await api.put(`/comment/${commentId}`, {
      ...data,
    });
  },

  async getReplyComment({ commentId, offset, limit }) {
    const query = { offset, limit };
    return await api.get(
      `/comment/reply/${commentId}?${queryString.stringify(query)}`
    );
  },

  async postCommentReply({
    parentId,
    userId,
    content,
    videoBase64,
    imageBase64,
    owner,
    postId,
  }) {
    console.log("owner", owner);
    const data = { parentId, userId, owner, postId };
    if (content) {
      data.content = content;
    }
    if (imageBase64) {
      data.imageBase64 = imageBase64;
    }
    if (videoBase64) {
      data.videoBase64 = videoBase64;
    }

    return await api.post(`/comment/reply`, { ...data });
  },

  async deleteComment(commentId) {
    return await api.delete(`/comment/${commentId}`);
  },
};
