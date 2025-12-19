import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import bookListData from "layouts/book/data/bookListData";

// API
import { fetchBookList } from "api/book";
import { useNavigate } from "react-router-dom";
import { createPaginationParams } from "utils/commonUtils";

function BookList() {
  const [tableData, setTableData] = useState(bookListData([]));
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      // Fetch data
      // Using pageRow 100 to show more data for now
      const params = createPaginationParams({ pageIndex: 1, pageRow: 100 });
      const result = await fetchBookList(params);

      if (result && result.list) {
        setTableData(bookListData(result.list));
      }
    };
    loadData();
  }, []);

  const handleCreate = () => {
    navigate("/book/write");
  };

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
                  교재 관리 List
                </MDTypography>
                <MDButton variant="gradient" color="dark" onClick={handleCreate}>
                  교재 등록
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={tableData}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default BookList;
