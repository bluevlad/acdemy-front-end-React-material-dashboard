import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import MDButton from "components/MDButton";

function Overview() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = () => {
      try {
        const storedProfile = sessionStorage.getItem("userProfile");
        if (storedProfile) {
          setUser(JSON.parse(storedProfile));
        } else {
          // Fallback or redirect if no session data
          // navigate("/authentication/sign-in");
        }
      } catch (error) {
        console.error("Failed to load profile from session", error);
      }
    };
    fetchProfile();
  }, []);

  const logout = () => {
    sessionStorage.clear();
    // Also clear localStorage if we used it before, to be safe
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/authentication/sign-in");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              {user ? (
                <ProfileInfoCard
                  title="profile information"
                  description={`Hello, ${user.userNm || user.userId || "User"}`}
                  info={{
                    fullName: user.userNm || user.userId || "",
                    id: user.userId || "",
                    email: user.email || "",
                    role: user.userRole || "",
                    address: user.address1 ? `${user.address1} ${user.address2 || ""}` : "",
                  }}
                  social={[
                    {
                      link: "https://www.facebook.com/",
                      icon: <FacebookIcon />,
                      color: "facebook",
                    },
                  ]}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
              ) : (
                <MDBox p={2}>
                  <MDTypography variant="body2">No profile data. Please login again.</MDTypography>
                </MDBox>
              )}
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
            <Grid item xs={12} xl={4}>
              {/* Could add more profile content here */}
              <MDBox p={2}>
                <MDButton variant="gradient" color="error" fullWidth onClick={logout}>
                  Logout
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
