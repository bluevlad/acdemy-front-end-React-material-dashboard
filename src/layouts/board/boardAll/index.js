import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
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
import { getBoardList } from "api/board";

function BoardAll() {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState(null);

  useEffect(() => {
    loadData();
  }, [currentPage]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getBoardList({ pageIndex: currentPage });
      setBoardList(data.boardList || []);
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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const columns = [
    { Header: "번호", accessor: "boardSeq", align: "center", width: "10%" },
    { Header: "제목", accessor: "subject", align: "left", width: "40%" },
    { Header: "작성자", accessor: "regId", align: "center", width: "15%" },
    { Header: "등록일", accessor: "regDt", align: "center", width: "15%" },
    { Header: "조회수", accessor: "hits", align: "center", width: "10%" },
    { Header: "상태", accessor: "isUse", align: "center", width: "10%" },
  ];

  const rows = boardList.map((item) => ({
    boardSeq: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {item.boardSeq}
      </MDTypography>
    ),
    subject: (
      <MDTypography variant="button" color="text" fontWeight="medium">
        {item.subject}
      </MDTypography>
    ),
    regId: (
      <MDTypography variant="caption" color="text">
        {item.regId}
      </MDTypography>
    ),
    regDt: (
      <MDTypography variant="caption" color="text">
        {item.regDt}
      </MDTypography>
    ),
    hits: (
      <MDTypography variant="caption" color="text">
        {item.hits}
      </MDTypography>
    ),
    isUse: (
      <MDBadge
        badgeContent={item.isUse === "Y" ? "사용" : "미사용"}
        color={item.isUse === "Y" ? "success" : "secondary"}
        variant="gradient"
        size="sm"
      />
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
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="primary"
              >
                <MDTypography variant="h6" color="white">
                  게시물 전체 조회
                </MDTypography>
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
      <Footer />
    </DashboardLayout>
  );
}

export default BoardAll;
