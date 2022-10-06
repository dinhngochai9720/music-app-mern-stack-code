import axios from "axios";

// const baseURL = "http://localhost:4000";
const baseURL = "https://music-app-mern-stack.herokuapp.com";

export const validateUser = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/login`, {
      headers: { Authorization: "Bearer " + token },
    });

    return res.data;
  } catch (error) {}
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/getAll`);

    //Bat buoc .data
    return res.data; //xem trong Read All (backend/routes/auth)
  } catch (error) {
    return null;
  }
};

export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/artists/getAll`);

    //Bat buoc .data
    return res.data; //xem trong Read All (backend/routes/artists)
  } catch (error) {
    return null;
  }
};

export const getAllSongs = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/songs/getAll`);

    //Bat buoc .data
    return res.data; //xem trong Read All (backend/routes/songs)
  } catch (error) {
    return null;
  }
};

export const getAllAlbums = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/albums/getAll`);

    //Bat buoc .data
    return res.data; //xem trong Read All (backend/routes/albums)
  } catch (error) {
    return null;
  }
};

export const changingUserRole = async (userId, role) => {
  try {
    const res = await axios.put(`${baseURL}/api/users/updateRole/${userId}`, {
      data: { role: role },
    });

    return res;
  } catch (error) {
    return null;
  }
};

export const removeUser = async (userId) => {
  try {
    const res = await axios.put(`${baseURL}/api/users/deleteUser/${userId}`);

    return res;
  } catch (error) {
    return null;
  }
};

export const removeSong = async (songId) => {
  try {
    const res = await axios.delete(`${baseURL}/api/songs/delete/${songId}`);

    return res;
  } catch (error) {
    return null;
  }
};

export const removeArtist = async (artistId) => {
  try {
    const res = await axios.delete(`${baseURL}/api/artists/delete/${artistId}`);

    return res;
  } catch (error) {
    return null;
  }
};

export const removeAlbum = async (albumId) => {
  try {
    const res = await axios.delete(`${baseURL}/api/albums/delete/${albumId}`);

    return res;
  } catch (error) {
    return null;
  }
};

export const saveNewSong = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/songs/create`, { ...data });

    return (await res).data.savedSong;
  } catch (error) {
    return null;
  }
};

export const saveNewArtist = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/artists/create`, { ...data });

    return (await res).data.savedArtist;
  } catch (error) {
    return null;
  }
};

export const saveNewAlbum = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/albums/create`, { ...data });

    return (await res).data.savedAlbum;
  } catch (error) {
    return null;
  }
};
