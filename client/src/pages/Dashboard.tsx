import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRight from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import { mainListItems } from "../components/MenuList";
import DashboardTable from "../components/DataTable";
import DashboardContent from "./Dashboard/List";
import DashboardDetail from "./Dashboard/Detail";

// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    backgroundColor: "#CB2D3E",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardWrapper() {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState("content");
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" color="red" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-center",
              px: [1],
              color: "#FFFFFF",
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <MenuIcon sx={{ color: "#FFFFFF" }} />
            </IconButton>
          </Toolbar>
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.grey[100],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Title */}
              <Grid item xs={12} md={12} lg={12}>
                <h1 className="font-rubik text-[24px] font-[600] text-left">
                  Customers Page
                </h1>
                {page === "content" &&
                  <p className="font-rubik text-left">Main Menu</p>
                }
                {page === "detail" &&
                  <p onClick={() => setPage("content")} className="cursor-pointer font-rubik text-red-00 text-left">Main Menu  <span className="font-rubik text-black-10 text-left"><ChevronRight /> Create new customer</span></p>
                }
                {/* {page === "detail" &&
                } */}
              </Grid>
              {/* Content */}
              { page === "content" ? (<DashboardContent setPage={setPage} />) : (< DashboardDetail setPage={setPage} />) }
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardWrapper />;
}
