import axios from "axios";

const URL = "http://localhost:8000/api/group";

export const createGroup = async (data: any) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${URL}/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getGroup = async (groupId: string) => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${URL}/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateGroupName = async (groupId: string, name: string) => {
  const token = localStorage.getItem("token");

  const res = await axios.patch(
    `${URL}/${groupId}/name`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const addMember = async (userId: string, groupId: string) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${URL}/${groupId}/members`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const removeMember = async (groupId: string, userId: string) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(`${URL}/${groupId}/members/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteGroup = async (groupId: string) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(`${URL}/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
