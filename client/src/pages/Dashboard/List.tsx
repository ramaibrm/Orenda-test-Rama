import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import AddIcon from "@mui/icons-material/Add";
import DashboardTable from "../../components/DataTable";

interface IPageProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function DashboardContent(props: IPageProps) {
  function changePage() {
    if (typeof props.setPage === "function") {
      props.setPage("detail");
    }
  }
  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper
        elevation={0}
        sx={{
          p: 5,
          display: "flex",
          flexDirection: "column",
          height: 600,
        }}
      >
        <div className="md:flex md:justify-between mb-5">
          <h3 className="font-rubik font-[500] text-[18px]">All Customers</h3>
          <Button
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#CB2D3E",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#CB2D3E",
              },
            }}
            variant="contained"
            size="small"
            onClick={() => changePage()}
          >
            Add New Customer
          </Button>
        </div>
        <DashboardTable />
      </Paper>
    </Grid>
  );
}