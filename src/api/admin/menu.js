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
