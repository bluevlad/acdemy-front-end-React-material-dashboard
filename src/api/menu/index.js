import superagent from "superagent";
import { BASE_API } from "../../constants/index";

export const fetchMenuTree = async () => {
  try {
    const response = await superagent.get(`${BASE_API}/menu/getMenuTree`);

    // API 응답이 직접 배열인 경우와 객체로 감싸진 경우 모두 처리
    let menuData = [];

    if (Array.isArray(response.body)) {
      menuData = response.body;
    } else if (response.body && Array.isArray(response.body.menuTree)) {
      menuData = response.body.menuTree;
    } else if (response.body && response.body.data) {
      menuData = Array.isArray(response.body.data) ? response.body.data : [];
    }

    return {
      menuTree: menuData,
    };
  } catch (error) {
    console.error("Error fetching menu tree data:", error);
    return { menuTree: [] };
  }
};
