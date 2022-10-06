export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_ALL_SONGS: "SET_ALL_SONGS",
  SET_ALL_ARTISTS: "SET_ALL_ARTISTS",
  SET_ALL_ALBUMS: "SET_ALL_ALBUMS",

  //Filter Types
  SET_FILTER_CATEGORY: "SET_FILTER_CATEGORY",
  SET_FILTER_ARTIST: "SET_FILTER_ARTIST",
  SET_FILTER_LANGUAGE: "SET_FILTER_LANGUAGE",
  SET_FILTER_ALBUM: "SET_FILTER_ALBUM",

  // Alert Type
  SET_ALERT_TYPE: "SET_ALERT_TYPE",

  SET_IS_SONG_PLAYING: "SET_IS_SONG_PLAYING",
  SET_SONG_INDEX: "SET_SONG_INDEX",

  //Toggle Menu
  TOGGLE_MENU_USER: "TOGGLE_MENU_USER",
  TOGGLE_MENU_ADMIN: "TOGGLE_MENU_ADMIN",
};

const reducer = (state, action) => {
  // console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        //Cap nhat thong tin user (initialState cua user ban dau la: null)
        user: action.user,
      };

    case actionType.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers,
      };
    case actionType.SET_ALL_SONGS:
      return {
        ...state,
        allSongs: action.allSongs,
      };
    case actionType.SET_ALL_ARTISTS:
      return {
        ...state,
        allArtists: action.allArtists,
      };
    case actionType.SET_ALL_ALBUMS:
      return {
        ...state,
        allAlbums: action.allAlbums,
      };

    // Filter case
    case actionType.SET_FILTER_CATEGORY:
      return {
        ...state,
        filterCategory: action.filterCategory,
      };
    case actionType.SET_FILTER_ARTIST:
      return {
        ...state,
        filterArtist: action.filterArtist,
      };
    case actionType.SET_FILTER_LANGUAGE:
      return {
        ...state,
        filterLanguage: action.filterLanguage,
      };
    case actionType.SET_FILTER_ALBUM:
      return {
        ...state,
        filterAlbum: action.filterAlbum,
      };

    // Alert case
    case actionType.SET_ALERT_TYPE:
      return {
        ...state,
        alertType: action.alertType,
      };

    case actionType.SET_IS_SONG_PLAYING:
      return {
        ...state,
        isSongPlaying: action.isSongPlaying,
      };

    case actionType.SET_SONG_INDEX:
      return {
        ...state,
        songIndex: action.songIndex,
      };

    //Toggle Menu
    case actionType.TOGGLE_MENU_USER:
      return {
        ...state,
        isMenuUser: action.isMenuUser,
      };

    case actionType.TOGGLE_MENU_ADMIN:
      return {
        ...state,
        isMenuAdmin: action.isMenuAdmin,
      };

    default:
      // return state;
      throw new Error("Something went wrong!");
  }
};

export default reducer;
