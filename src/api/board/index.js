import superagent from "superagent";
import { BASE_API } from "../../constants/index";

// =====================================================
// 게시판 관리 (TB_BOARD_MNG) API
// =====================================================

// 게시판 관리 목록 조회
export const getBoardMngList = async (params) => {
  try {
    const response = await superagent.get(`${BASE_API}/board/getBoardMngList`).query(params);
    return response.body;
  } catch (error) {
    console.error("Error fetching board mng list:", error);
    throw error;
  }
};

// 게시판 관리 상세 조회
export const getBoardMngDetail = async (boardMngSeq) => {
  try {
    const response = await superagent
      .get(`${BASE_API}/board/getBoardMngDetail`)
      .query({ boardMngSeq });
    return response.body;
  } catch (error) {
    console.error("Error fetching board mng detail:", error);
    throw error;
  }
};

// 게시판 관리 등록
export const insertBoardMng = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/board/insertBoardMng`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error inserting board mng:", error);
    throw error;
  }
};

// 게시판 관리 수정
export const updateBoardMng = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/board/updateBoardMng`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error updating board mng:", error);
    throw error;
  }
};

// 게시판 관리 삭제
export const deleteBoardMng = async (boardMngSeq) => {
  try {
    const response = await superagent
      .post(`${BASE_API}/board/deleteBoardMng`)
      .send({ boardMngSeq });
    return response.body;
  } catch (error) {
    console.error("Error deleting board mng:", error);
    throw error;
  }
};

// 게시판 타입 목록 조회 (공지, 일반 등)
export const getBoardTypeList = async () => {
  try {
    const response = await superagent.get(`${BASE_API}/board/getBoardTypeList`);
    return response.body;
  } catch (error) {
    console.error("Error fetching board type list:", error);
    throw error;
  }
};

// =====================================================
// 게시판 (TB_BOARD) API
// =====================================================

// 게시판 목록 조회 (All)
export const getBoardList = async (params) => {
  try {
    const response = await superagent.get(`${BASE_API}/board/getBoardList`).query(params);
    return response.body;
  } catch (error) {
    console.error("Error fetching board list:", error);
    throw error;
  }
};

// 미응답 게시판 목록 조회
export const getBoardNotAnswerList = async (params) => {
  try {
    const response = await superagent.get(`${BASE_API}/board/getBoardNotAnswerList`).query(params);
    return response.body;
  } catch (error) {
    console.error("Error fetching board display list:", error); // Assuming display list logic for now
    throw error;
  }
};

// 게시판 상세 조회
export const getBoardDetail = async (params) => {
  try {
    const response = await superagent.get(`${BASE_API}/board/getBoardDetail`).query(params);
    return response.body;
  } catch (error) {
    console.error("Error fetching board detail:", error);
    throw error;
  }
};

// 게시물 등록
export const insertBoard = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/board/insertBoard`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error inserting board:", error);
    throw error;
  }
};

// 게시물 수정
export const updateBoard = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/board/updateBoard`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error updating board:", error);
    throw error;
  }
};

// 게시물 삭제
export const deleteBoard = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/board/deleteBoard`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error deleting board:", error);
    throw error;
  }
};

// 답변 게시물 등록
export const insertBoardReply = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/board/insertBoardReply`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error inserting board reply:", error);
    throw error;
  }
};

// =====================================================
// 게시판 카테고리 / 뷰 관련 (Assuming Board Code/Category is View Management)
// =====================================================

// 게시판 카테고리 정보 조회
export const getBoardCodeList = async (params) => {
  try {
    const response = await superagent.get(`${BASE_API}/board/getBoardCodeList`).query(params);
    return response.body;
  } catch (error) {
    console.error("Error fetching board code list:", error);
    throw error;
  }
};

// 게시판 카테고리 등록
export const insertBoardCatInfo = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/board/insertBoardCatInfo`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error inserting board cat info:", error);
    throw error;
  }
};

// 게시판 카테고리 삭제
export const deleteBoardCatInfo = async (data) => {
  try {
    const response = await superagent.post(`${BASE_API}/board/deleteBoardCatInfo`).send(data);
    return response.body;
  } catch (error) {
    console.error("Error deleting board cat info:", error);
    throw error;
  }
};

// 직급 코드 목록 조회
export const getRankCodeList = async (params) => {
  try {
    const response = await superagent.get(`${BASE_API}/board/getRankCodeList`).query(params);
    return response.body;
  } catch (error) {
    console.error("Error fetching rank code list:", error);
    throw error;
  }
};
