/* eslint-disable prettier/prettier */
import superagent from "superagent";
import { BASE_API } from "../../constants/index";

// =====================================================
// 배너 마스터 (TB_BANNER) API
// =====================================================

// 배너 목록 조회
export const getBannerList = async (params) => {
  try {
    const response = await superagent.get(`${BASE_API}/banner/getBannerList`).query(params);
    return response.body;
  } catch (error) {
    console.error("Error fetching banner list:", error);
    throw error;
  }
};

// 배너 상세 조회
export const getBannerDetail = async (bannerCd) => {
  try {
    const response = await superagent.get(`${BASE_API}/banner/getBannerDetail`).query({ bannerCd });
    return response.body;
  } catch (error) {
    console.error("Error fetching banner detail:", error);
    throw error;
  }
};

// 배너 등록
export const insertBanner = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/banner/insertBanner`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error inserting banner:", error);
    throw error;
  }
};

// 배너 수정
export const updateBanner = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/banner/updateBanner`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error updating banner:", error);
    throw error;
  }
};

// 배너 삭제
export const deleteBanner = async (bannerCd) => {
  try {
    const response = await superagent.post(`${BASE_API}/banner/deleteBanner`).send({ bannerCd });
    return response.body;
  } catch (error) {
    console.error("Error deleting banner:", error);
    throw error;
  }
};

// =====================================================
// 배너 아이템 (TB_BANNER_ITEM) API
// =====================================================

// 배너 아이템 목록 조회
export const getBannerItemList = async (params) => {
  try {
    const response = await superagent.get(`${BASE_API}/banner/getBannerItemList`).query(params);
    return response.body;
  } catch (error) {
    console.error("Error fetching banner item list:", error);
    throw error;
  }
};

// 배너 아이템 상세 조회
export const getBannerItemDetail = async (params) => {
  try {
    const response = await superagent.get(`${BASE_API}/banner/getBannerItemDetail`).query(params);
    return response.body;
  } catch (error) {
    console.error("Error fetching banner item detail:", error);
    throw error;
  }
};

// 배너 아이템 등록
export const insertBannerItem = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/banner/insertBannerItem`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error inserting banner item:", error);
    throw error;
  }
};

// 배너 아이템 수정
export const updateBannerItem = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/banner/updateBannerItem`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error updating banner item:", error);
    throw error;
  }
};

// 배너 아이템 플래그 수정
export const updateBannerItemFlag = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/banner/updateBannerItemFlag`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error updating banner item flag:", error);
    throw error;
  }
};

// 배너 아이템 초기화
export const updateBannerItemReset = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/banner/updateBannerItemReset`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error resetting banner item:", error);
    throw error;
  }
};

// 배너 아이템 삭제
export const deleteBannerItem = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/banner/deleteBannerItem`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error deleting banner item:", error);
    throw error;
  }
};
