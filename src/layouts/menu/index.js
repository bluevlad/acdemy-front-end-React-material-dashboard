/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// API
import { fetchMenuTree } from "api/menu";

function Menu() {
  const [menuTree, setMenuTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("tree"); // tree or table
  const [openNodes, setOpenNodes] = useState({});

  useEffect(() => {
    const loadMenuData = async () => {
      setLoading(true);
      try {
        const data = await fetchMenuTree();
        const menuData = data.menuTree || [];
        setMenuTree(menuData);

        // 초기 로드 시 최상위 메뉴들을 자동으로 열기
        const initialOpenState = {};
        menuData.forEach((node) => {
          if (node.children && node.children.length > 0) {
            const nodeId = String(node.menuNo || node.menuId || Math.random());
            initialOpenState[nodeId] = true;
          }
        });
        setOpenNodes(initialOpenState);
      } catch (error) {
        console.error("Failed to load menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMenuData();
  }, []);

  const handleToggle = (nodeId) => {
    setOpenNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  // Recursive function to render tree items
  const renderTreeItems = (nodes, level = 0) => {
    if (!Array.isArray(nodes)) return null;

    return nodes.map((node, index) => {
      const nodeId = String(node.menuNo || node.menuId || index);
      const hasChildren = node.children && Array.isArray(node.children) && node.children.length > 0;
      const isOpen = openNodes[nodeId];
      const menuTitle = node.menuTitle || node.menuNm || node.name || "이름 없음";
      const menuUrl = node.menuUrl || "";
      const menuIcon = node.menuIcon || "";
      const isUse = node.isUse === "Y" || node.isUse === true;

      return (
        <div key={nodeId}>
          <ListItem
            disablePadding
            sx={{
              pl: level * 3,
              bgcolor: !isUse ? "action.disabledBackground" : "transparent",
            }}
          >
            <ListItemButton onClick={() => hasChildren && handleToggle(nodeId)}>
              <ListItemIcon>
                {menuIcon ? (
                  <Icon fontSize="small">{menuIcon}</Icon>
                ) : (
                  <Icon fontSize="small">{hasChildren ? "folder" : "description"}</Icon>
                )}
              </ListItemIcon>
              <ListItemText
                primary={
                  <MDBox display="flex" alignItems="center" gap={1}>
                    <MDTypography variant="button" fontWeight="medium">
                      {menuTitle}
                    </MDTypography>
                    {menuUrl && (
                      <MDTypography variant="caption" color="text">
                        ({menuUrl})
                      </MDTypography>
                    )}
                    {!isUse && (
                      <MDTypography variant="caption" color="error" sx={{ ml: 1 }}>
                        [미사용]
                      </MDTypography>
                    )}
                  </MDBox>
                }
                secondary={
                  <MDTypography variant="caption" color="text">
                    메뉴ID: {node.menuId || nodeId} | 깊이: {node.menuDepth || level}
                  </MDTypography>
                }
              />
              {hasChildren && (isOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
          {hasChildren && (
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderTreeItems(node.children, level + 1)}
              </List>
            </Collapse>
          )}
        </div>
      );
    });
  };

  // Flatten menu tree for table view
  const flattenMenuTree = (nodes, level = 0) => {
    let result = [];
    if (!Array.isArray(nodes)) return result;

    nodes.forEach((node) => {
      result.push({ ...node, level });
      if (node.children && node.children.length > 0) {
        result = result.concat(flattenMenuTree(node.children, level + 1));
      }
    });
    return result;
  };

  const flatMenuList = flattenMenuTree(menuTree);

  // Table columns
  const columns = [
    { Header: "메뉴번호", accessor: "menuNo", width: "8%", align: "center" },
    { Header: "메뉴ID", accessor: "menuId", width: "12%", align: "left" },
    { Header: "메뉴명", accessor: "menuTitle", width: "20%", align: "left" },
    { Header: "메뉴 URL", accessor: "menuUrl", width: "15%", align: "left" },
    { Header: "아이콘", accessor: "menuIcon", width: "10%", align: "center" },
    { Header: "깊이", accessor: "menuDepth", width: "8%", align: "center" },
    { Header: "상위메뉴", accessor: "menuUpperId", width: "10%", align: "center" },
    { Header: "사용여부", accessor: "isUse", width: "8%", align: "center" },
    { Header: "액션", accessor: "action", width: "9%", align: "center" },
  ];

  const rows = flatMenuList.map((menu, index) => ({
    menuNo: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {menu.menuNo || "-"}
      </MDTypography>
    ),
    menuId: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {menu.menuId || "-"}
      </MDTypography>
    ),
    menuTitle: (
      <MDBox display="flex" alignItems="center">
        <MDBox ml={menu.level * 2}>
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {"　".repeat(menu.level)}
            {menu.level > 0 && "└─ "}
            {menu.menuTitle || menu.menuNm || menu.name || "-"}
          </MDTypography>
        </MDBox>
      </MDBox>
    ),
    menuUrl: (
      <MDTypography variant="caption" color="text" fontWeight="regular">
        {menu.menuUrl || "-"}
      </MDTypography>
    ),
    menuIcon: (
      <MDBox display="flex" justifyContent="center">
        {menu.menuIcon ? (
          <Icon fontSize="small">{menu.menuIcon}</Icon>
        ) : (
          <MDTypography variant="caption" color="text">
            -
          </MDTypography>
        )}
      </MDBox>
    ),
    menuDepth: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {menu.menuDepth !== undefined ? menu.menuDepth : menu.level}
      </MDTypography>
    ),
    menuUpperId: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {menu.menuUpperId || "-"}
      </MDTypography>
    ),
    isUse: (
      <MDTypography
        variant="caption"
        color={menu.isUse === "Y" ? "success" : "error"}
        fontWeight="medium"
      >
        {menu.isUse === "Y" ? "사용" : "미사용"}
      </MDTypography>
    ),
    action: (
      <MDBox display="flex" justifyContent="center" gap={1}>
        <MDTypography
          component="a"
          href="#"
          color="text"
          onClick={(e) => {
            e.preventDefault();
            console.log("Edit menu:", menu);
          }}
        >
          <Icon fontSize="small">edit</Icon>
        </MDTypography>
        <MDTypography
          component="a"
          href="#"
          color="error"
          onClick={(e) => {
            e.preventDefault();
            console.log("Delete menu:", menu);
          }}
        >
          <Icon fontSize="small">delete</Icon>
        </MDTypography>
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
                  메뉴 관리
                </MDTypography>
                <MDBox display="flex" gap={1}>
                  <MDButton
                    variant={viewMode === "tree" ? "contained" : "outlined"}
                    color="white"
                    size="small"
                    onClick={() => setViewMode("tree")}
                  >
                    <Icon>account_tree</Icon>
                    &nbsp;트리뷰
                  </MDButton>
                  <MDButton
                    variant={viewMode === "table" ? "contained" : "outlined"}
                    color="white"
                    size="small"
                    onClick={() => setViewMode("table")}
                  >
                    <Icon>table_view</Icon>
                    &nbsp;테이블뷰
                  </MDButton>
                </MDBox>
              </MDBox>
              <MDBox pt={3} pb={3} px={3}>
                {loading ? (
                  <MDBox p={3} textAlign="center">
                    <MDTypography variant="caption">로딩 중...</MDTypography>
                  </MDBox>
                ) : (
                  <>
                    {viewMode === "tree" ? (
                      <MDBox>
                        {menuTree.length > 0 ? (
                          <List
                            sx={{ width: "100%", bgcolor: "background.paper" }}
                            component="nav"
                            aria-labelledby="menu-tree-list"
                          >
                            {renderTreeItems(menuTree)}
                          </List>
                        ) : (
                          <MDBox p={3} textAlign="center">
                            <MDTypography variant="caption" color="text">
                              메뉴 데이터가 없습니다.
                            </MDTypography>
                          </MDBox>
                        )}
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

export default Menu;
