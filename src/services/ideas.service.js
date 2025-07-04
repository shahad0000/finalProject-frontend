import axios from "axios";

const API = import.meta.env.VITE_API_URL;
// const API = "http://localhost:3000/api"

export const fetchAllIdeas = async () => {
    const res = await axios.get(`${API}/ideas`);
    return res.data.data; 
  };

export const fetchIdeaById = async (id) => {
  const res = await axios.get(`${API}/ideas/${id}`);
  return res.data;
};

export const voteIdea = async (ideaId, value) => {
  const res = await axios.post(
    `${API}/ideas/vote/`,
    { ideaId, value },
    { withCredentials: true }
  );
  return res.data;
};

export const fetchUserVote = async (userId, ideaId) => {
  const res = await axios.get(`${API}/ideas/${ideaId}/votes/user/${userId}`);
  return res.data.value; 
};
