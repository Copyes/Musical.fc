
import * as types from './actionTypes';
import { getMusicUrl, getMusicLyric, getSingerInfo, getAlbumInfo, getMusicDetail, getMusicListDetail } from '../api';


export const getChangeCurrentMusicListAction = (value) => {
  return {
    type: types.CHANGE_CURRENT_MUSIC_LIST,
    value
  }
}
/**
 * 改变播放状态
 */
export const getChangePlayingStatusAction = (status) => {
  return {
    type: types.CHANGE_PLAYING_STATUS,
    status
  }
}

/**
 * 改变当前播放歌曲信息
 * @param {Object} value
 */
export const changeCurrentMusicAction = (value) => ({
  type: types.CHANGE_CURRENT_MUSIC,
  value
});

// 获取歌单详情
export const getMusicListDetailAction = (id) => {
  return dispatch => {
    getMusicListDetail(id)
    .then(({ data }) => {
       // 将歌单传入 redux 中的 musicList
      data.playlist.tracks = formatMusicListTracks(data.playlist.tracks);
      // 改变当前歌单列表
      dispatch(getChangeCurrentMusicListAction(data.playlist));
    })
    .catch((err) => {

    })
  }
}

function formatMusicListTracks (list) {
  return list.map((item) => {
    const singers = item.ar.map((item) => {
      return {
        id: item.id,
        name: item.name
      };
    });
    return {
      id: item.id,
      musicName: item.name,
      imgUrl: item.al.picUrl,
      singers,
      album: {
        id: item.al.id,
        name: item.al.name
      }
    };
  });
}