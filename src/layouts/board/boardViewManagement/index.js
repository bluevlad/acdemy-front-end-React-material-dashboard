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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// API
import {
  getBoardCodeList,
  insertBoardCatInfo,
  deleteBoardCatInfo,
  getBoardMngList,
} from "api/board";

function BoardViewManagement() {
  const [boardCodeList, setBoardCodeList] = useState([]);
  const [boardMngList, setBoardMngList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    boardMngSeq: "",
    categoryCode: "",
    categoryName: "",
  });

  useEffect(() => {
    loadData();
    loadBoardMngs();
  }, []);

  const loadData = async (boardMngSeq = "") => {
    setLoading(true);
    try {
      const data = await getBoardCodeList({ boardMngSeq });
      setBoardCodeList(data.boardCodeList || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadBoardMngs = async () => {
    try {
      const data = await getBoardMngList({ pageIndex: 1, recordCountPerPage: 100 }); // Fetch all reasonable amount
      setBoardMngList(data.boardMngList || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDialog = () => {
    setFormData({
      boardMngSeq: "",
      categoryCode: "",
      categoryName: "",
    });
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
      await insertBoardCatInfo(formData);
      handleCloseDialog();
      loadData(formData.boardMngSeq);
    } catch (error) {
      console.error(error);
      alert("처리 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async (item) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteBoardCatInfo(item);
        loadData(item.boardMngSeq);
      } catch (error) {
        console.error(error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleBoardChange = (event) => {
    const seq = event.target.value;
    loadData(seq);
  };

  const columns = [
    { Header: "게시판 번호", accessor: "boardMngSeq", align: "center" },
    { Header: "카테고리 코드", accessor: "categoryCode", align: "center" },
    { Header: "카테고리 이름", accessor: "categoryName", align: "left" },
    { Header: "관리", accessor: "action", align: "center" },
  ];

  const rows = boardCodeList.map((item) => ({
    boardMngSeq: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {item.boardMngSeq}
      </MDTypography>
    ),
    categoryCode: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {item.categoryCode}
      </MDTypography>
    ),
    categoryName: (
      <MDTypography variant="caption" color="text">
        {item.categoryName}
      </MDTypography>
    ),
    action: (
      <MDBox display="flex" justifyContent="center">
        <MDButton variant="text" color="error" iconOnly onClick={() => handleDelete(item)}>
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
                bgColor="dark"
                borderRadius="lg"
                coloredShadow="dark"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  게시판 카테고리(View) 관리
                </MDTypography>
                <MDButton variant="contained" color="white" size="small" onClick={handleOpenDialog}>
                  <Icon>add</Icon>&nbsp;등록
                </MDButton>
              </MDBox>
              <MDBox p={3}>
                <Grid container spacing={3} mb={3}>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>게시판 선택</InputLabel>
                      <Select label="게시판 선택" onChange={handleBoardChange} defaultValue="">
                        <MenuItem value="">전체</MenuItem>
                        {boardMngList.map((b) => (
                          <MenuItem key={b.boardMngSeq} value={b.boardMngSeq}>
                            {b.boardMngName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                {loading ? (
                  <MDBox p={3} textAlign="center">
                    <MDTypography variant="caption">로딩 중...</MDTypography>
                  </MDBox>
                ) : (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>카테고리 등록</DialogTitle>
        <DialogContent>
          <MDBox component="form" pt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>게시판</InputLabel>
                  <Select
                    name="boardMngSeq"
                    value={formData.boardMngSeq}
                    onChange={handleFormChange}
                    label="게시판"
                  >
                    {boardMngList.map((b) => (
                      <MenuItem key={b.boardMngSeq} value={b.boardMngSeq}>
                        {b.boardMngName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="카테고리 코드"
                  name="categoryCode"
                  value={formData.categoryCode}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="카테고리 이름"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleFormChange}
                />
              </Grid>
            </Grid>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseDialog} color="secondary">
            취소
          </MDButton>
          <MDButton onClick={handleSubmit} color="info" variant="gradient">
            등록
          </MDButton>
        </DialogActions>
      </Dialog>
      <Footer />
    </DashboardLayout>
  );
}

export default BoardViewManagement;
