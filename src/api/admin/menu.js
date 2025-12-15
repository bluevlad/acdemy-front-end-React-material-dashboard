import superagent from "superagent";
import { BASE_API } from "../../constants/index";

// 관리자 메뉴 트리 조회
export const getMenuTree = async () => {
  try {
    const response = await superagent.get(`${BASE_API}/admin/menu/getMenuTree`);
    return response.body;
  } catch (error) {
    console.error("Error fetching menu tree:", error);
    return { menuList: [] };
  }
};

// 메뉴 등록
export const insertMenu = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/admin/menu/insertMenu`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error inserting menu:", error);
    throw error;
  }
};

// 메뉴 수정
export const updateMenu = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/admin/menu/updateMenu`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error updating menu:", error);
    throw error;
  }
};

// 메뉴 삭제
export const deleteMenu = async (menuId) => {
  try {
    const response = await superagent.post(`${BASE_API}/admin/menu/deleteMenu`).send({ menuId });
    return response.body;
  } catch (error) {
    console.error("Error deleting menu:", error);
    throw error;
  }
};

// 메뉴 ID 중복 체크
export const checkMenuId = async (menuId) => {
  try {
    const response = await superagent.get(`${BASE_API}/admin/menu/checkMenuId`).query({ menuId });
    return response.body;
  } catch (error) {
    console.error("Error checking menu ID:", error);
    throw error;
  }
};
