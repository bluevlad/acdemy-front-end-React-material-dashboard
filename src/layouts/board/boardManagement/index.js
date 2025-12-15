import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// API
import {
  getBoardMngList,
  insertBoardMng,
  updateBoardMng,
  deleteBoardMng,
  getBoardTypeList,
} from "api/board";

function BoardManagement() {
  const [boardMngList, setBoardMngList] = useState([]);
  const [boardTypeList, setBoardTypeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState(null);

  // Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [formData, setFormData] = useState({
    boardMngSeq: "",
    boardMngName: "",
    boardMngType: "",
    isUse: "Y",
    attachFileYn: "Y",
    replyYn: "Y",
    commentYn: "Y",
  });

  useEffect(() => {
    loadData();
    loadBoardTypes();
  }, [currentPage]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getBoardMngList({ pageIndex: currentPage });
      setBoardMngList(data.boardMngList || []);
      setPaginationInfo(data.paginationInfo);
      if (data.paginationInfo) {
        setTotalPages(
          Math.ceil(
            data.paginationInfo.totalRecordCount / data.paginationInfo.recordCountPerPage
          ) || 1
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadBoardTypes = async () => {
    try {
      const data = await getBoardTypeList();
      setBoardTypeList(data.boardTypeList || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleOpenDialog = (mode, item = null) => {
    setDialogMode(mode);
    if (mode === "edit" && item) {
      setFormData({
        boardMngSeq: item.boardMngSeq,
        boardMngName: item.boardMngName,
        boardMngType: item.boardMngType || "",
        isUse: item.isUse || "Y",
        attachFileYn: item.attachFileYn || "Y",
        replyYn: item.replyYn || "Y",
        commentYn: item.commentYn || "Y",
      });
    } else {
      setFormData({
        boardMngSeq: "",
        boardMngName: "",
        boardMngType: "BOARD_TYPE_01", // Default to first type if available?
        isUse: "Y",
        attachFileYn: "Y",
        replyYn: "Y",
        commentYn: "Y",
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (dialogMode === "add") {
        await insertBoardMng(formData);
      } else {
        await updateBoardMng(formData);
      }
      handleCloseDialog();
      loadData();
    } catch (error) {
      console.error(error);
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async (boardMngSeq) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteBoardMng(boardMngSeq);
        loadData();
      } catch (error) {
        console.error(error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const columns = [
    { Header: "번호", accessor: "boardMngSeq", align: "center" },
    { Header: "게시판명", accessor: "boardMngName", align: "left" },
    { Header: "유형", accessor: "boardMngType", align: "center" },
    { Header: "사용여부", accessor: "isUse", align: "center" },
    { Header: "첨부파일", accessor: "attachFileYn", align: "center" },
    { Header: "답글", accessor: "replyYn", align: "center" },
    { Header: "댓글", accessor: "commentYn", align: "center" },
    { Header: "등록일", accessor: "regDt", align: "center" },
    { Header: "관리", accessor: "action", align: "center" },
  ];

  const rows = boardMngList.map((item) => ({
    boardMngSeq: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {item.boardMngSeq}
      </MDTypography>
    ),
    boardMngName: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {item.boardMngName}
      </MDTypography>
    ),
    boardMngType: (
      <MDTypography variant="caption" color="text">
        {item.boardMngTypeName || item.boardMngType}
      </MDTypography>
    ),
    isUse: (
      <MDBadge
        badgeContent={item.isUse === "Y" ? "사용" : "미사용"}
        color={item.isUse === "Y" ? "success" : "dark"}
        variant="gradient"
        size="sm"
      />
    ),
    attachFileYn: (
      <MDTypography variant="caption" color="text">
        {item.attachFileYn === "Y" ? "가능" : "불가"}
      </MDTypography>
    ),
    replyYn: (
      <MDTypography variant="caption" color="text">
        {item.replyYn === "Y" ? "가능" : "불가"}
      </MDTypography>
    ),
    commentYn: (
      <MDTypography variant="caption" color="text">
        {item.commentYn === "Y" ? "가능" : "불가"}
      </MDTypography>
    ),
    regDt: (
      <MDTypography variant="caption" color="text">
        {item.regDt}
      </MDTypography>
    ),
    action: (
      <MDBox display="flex" justifyContent="center">
        <MDButton
          variant="text"
          color="info"
          iconOnly
          onClick={() => handleOpenDialog("edit", item)}
        >
          <Icon>edit</Icon>
        </MDButton>
        <MDButton
          variant="text"
          color="error"
          iconOnly
          onClick={() => handleDelete(item.boardMngSeq)}
        >
          <Icon>delete</Icon>
        </MDButton>
      </MDBox>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  게시판 관리
                </MDTypography>
                <MDButton
                  variant="contained"
                  color="white"
                  size="small"
                  onClick={() => handleOpenDialog("add")}
                >
                  <Icon>add</Icon>&nbsp;등록
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                {loading ? (
                  <MDBox p={3} textAlign="center">
                    <MDTypography variant="caption">로딩 중...</MDTypography>
                  </MDBox>
                ) : (
                  <>
                    <DataTable
                      table={{ columns, rows }}
                      isSorted={false}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      noEndBorder
                    />
                    {paginationInfo && (
                      <MDBox
                        p={3}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <MDBox>
                          <MDTypography variant="caption" color="text">
                            Total {paginationInfo.totalRecordCount} records
                          </MDTypography>
                        </MDBox>
                        <Stack spacing={2}>
                          <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            shape="rounded"
                            showFirstButton
                            showLastButton
                          />
                        </Stack>
                      </MDBox>
                    )}
                  </>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{dialogMode === "add" ? "게시판 등록" : "게시판 수정"}</DialogTitle>
        <DialogContent>
          <MDBox component="form" pt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="게시판명"
                  name="boardMngName"
                  value={formData.boardMngName}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>게시판 유형</InputLabel>
                  <Select
                    name="boardMngType"
                    value={formData.boardMngType}
                    onChange={handleFormChange}
                    label="게시판 유형"
                  >
                    {boardTypeList.map((type) => (
                      <MenuItem key={type.CODE_CD} value={type.CODE_CD}>
                        {type.CODE_NM}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="사용 여부"
                  name="isUse"
                  value={formData.isUse}
                  onChange={handleFormChange}
                  SelectProps={{ native: true }}
                >
                  <option value="Y">사용</option>
                  <option value="N">미사용</option>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="첨부파일 여부"
                  name="attachFileYn"
                  value={formData.attachFileYn}
                  onChange={handleFormChange}
                  SelectProps={{ native: true }}
                >
                  <option value="Y">가능</option>
                  <option value="N">불가</option>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="답글 여부"
                  name="replyYn"
                  value={formData.replyYn}
                  onChange={handleFormChange}
                  SelectProps={{ native: true }}
                >
                  <option value="Y">가능</option>
                  <option value="N">불가</option>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="댓글 여부"
                  name="commentYn"
                  value={formData.commentYn}
                  onChange={handleFormChange}
                  SelectProps={{ native: true }}
                >
                  <option value="Y">가능</option>
                  <option value="N">불가</option>
                </TextField>
              </Grid>
            </Grid>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseDialog} color="secondary">
            취소
          </MDButton>
          <MDButton onClick={handleSubmit} color="info" variant="gradient">
            {dialogMode === "add" ? "등록" : "수정"}
          </MDButton>
        </DialogActions>
      </Dialog>
      <Footer />
    </DashboardLayout>
  );
}

export default BoardManagement;
