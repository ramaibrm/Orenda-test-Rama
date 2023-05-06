import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import MoreVert from "@mui/icons-material/MoreVert";
import { client } from "../services/api";

interface ICustomerType {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

function createData(
  name: string,
  phone: string,
  email: string,
  address: string
) {
  return { name, phone, email, address };
}

// const rows = [
//   // createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   // createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   // createData("Eclair", 262, 16.0, 24, 6.0),
//   // createData("Cupcake", 305, 3.7, 67, 4.3),
//   // createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

// const rows : ICustomerType[] = [];

export default function DashboardTable() {
  const emptyRows: ICustomerType[] = [];
  const [page, setPage] = React.useState(0);
  const [customerLen, setCustomerLen] = React.useState(0);
  const [nameQuery, setNameQuery] = React.useState("");
  const [phoneQuery, setPhoneQuery] = React.useState("");
  const [tablePage, setTablePage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState(emptyRows);

  let searchBounce: NodeJS.Timeout;

  const handleChangePage = (event: unknown, newPage: number) => {
    setTablePage(newPage+1);
    console.log(newPage+1, 'newpage')
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getCostumerData = async () => {
    const customerRes = await client.get(`/customers?page=${tablePage}`);
    const customerJson: ICustomerType[] = customerRes.data.result;
    const dataLen = customerRes.data.len;
    const customers: ICustomerType[] = [];
    for (const data of customerJson) {
      customers.push({
        id: data.id,
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
      });
    }
    setRows(customers);
    setCustomerLen(dataLen);
  };

  const searchData = async () => {
    searchBounce = setTimeout(async () => {
      if (nameQuery) {
        const customerRes = await client.get(`/customers?name=${nameQuery}`);
        const customerJson: ICustomerType[] = customerRes.data.result;
        const dataLen = customerRes.data.len;
        const customers: ICustomerType[] = [];
        for (const data of customerJson) {
          customers.push({
            id: data.id,
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
          });
        }
        setRows(customers);
        setCustomerLen(dataLen);
      } else if (phoneQuery) {
        const customerRes = await client.get(`/customers?phone=${phoneQuery}`);
        const customerJson: ICustomerType[] = customerRes.data.result;
        const dataLen = customerRes.data.len;
        const customers: ICustomerType[] = [];
        for (const data of customerJson) {
          customers.push({
            id: data.id,
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
          });
        }
        setRows(customers);
        setCustomerLen(dataLen);
      } else {
        getCostumerData();
      }
    }, 1000);
    return () => clearTimeout(searchBounce);
  };

  React.useEffect(() => {
    getCostumerData();
  }, [tablePage]);

  React.useEffect(() => {
    searchData();
  }, [nameQuery]);

  React.useEffect(() => {
    searchData();
  }, [phoneQuery]);

  return (
    <>
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid #E0E0E0",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              {" "}
              <span className="font-rubik font-[500]">Customer Name</span>
            </TableCell>
            <TableCell align="left">
              {" "}
              <span className="font-rubik font-[500]">Phone Numbe</span>r
            </TableCell>
            <TableCell align="left">
              {" "}
              <span className="font-rubik font-[500]">Email Address</span>
            </TableCell>
            <TableCell align="left">
              {" "}
              <span className="font-rubik font-[500]">Address</span>
            </TableCell>
            <TableCell align="left">
              {" "}
              <span className="font-rubik font-[500]">Action</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField
                id="outlined-basic"
                size="small"
                onChange={(e) => setNameQuery(e.currentTarget.value)}
                label="Search name"
                variant="outlined"
              />
            </TableCell>
            <TableCell>
              <TextField
                id="outlined-basic"
                onChange={(e) => setPhoneQuery(e.currentTarget.value)}
                size="small"
                label="Filter"
                variant="outlined"
              />
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <span className="font-rubik font-[400]">{row.name}</span>
              </TableCell>
              <TableCell align="left">
                <span className="font-rubik font-[400]">{row.phone}</span>
              </TableCell>
              <TableCell align="left">
                <span className="font-rubik font-[400]">{row.email}</span>
              </TableCell>
              <TableCell align="left">
                <span className="font-rubik font-[400]">{row.address}</span>
              </TableCell>
              <TableCell align="left">
                <span className="font-rubik font-[400] cursor-pointer">
                  <MoreVert className="text-black-10" />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        sx={{
          borderTop: "1px solid #E0E0E0",
          overflow: "none",
        }}
        count={customerLen}
        rowsPerPage={rowsPerPage}
        page={tablePage - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
