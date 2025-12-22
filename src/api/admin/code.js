/* eslint-disable prettier/prettier */
import superagent from "superagent";
import { BASE_API } from "../../constants/index";

// 공통코드 목록 조회
export const getCodeList = async (params) => {
  try {
    const response = await superagent.get(`${BASE_API}/admin/code/getCodeList`).query(params);
    return response.body;
  } catch (error) {
    console.error("Error fetching code list:", error);
    throw error;
  }
};

// 공통코드 등록
export const insertCode = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/admin/code/insertCode`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error inserting code:", error);
    throw error;
  }
};

// 공통코드 수정
export const updateCode = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/admin/code/updateCode`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error updating code:", error);
    throw error;
  }
};

// 공통코드 삭제
export const deleteCode = async (codeNo) => {
  try {
    const response = await superagent.post(`${BASE_API}/admin/code/deleteCode`).send({ codeNo });
    return response.body;
  } catch (error) {
    console.error("Error deleting code:", error);
    throw error;
  }
};
