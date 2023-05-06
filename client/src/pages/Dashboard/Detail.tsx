import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField, Divider, Button } from "@mui/material";
import { client } from "../../services/api";
import Swal from "sweetalert2";
import * as Joi from "joi";

interface ICustomerFormType {
  name: string;
  phone: string;
  address: string;
  email: string;
}

interface ICustomerFormErrorType {
  name: string;
  phone: string;
  address: string;
  email: string;
}

enum Inputs {
  Name = "name",
  Address = "address",
  Phone = "phone",
  Email = "email",
}

interface IPageProps {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

export default function DashboardDetail(props: IPageProps) {
  const [customerValue, setCustomerValue] = React.useState<ICustomerFormType>({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const [inputErrors, setInputErrors] = React.useState<ICustomerFormErrorType>({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const inputErrorHandler = (val: string | number, input: Inputs) => {
    const result = {
      isError: false,
      errorMessage: "",
    };
    if (input == Inputs.Name) {
      const nameSchema = Joi.string().alphanum().min(3).required();
      const validation = nameSchema.validate(val);
      if (validation.error) {
        result.isError = true;
        result.errorMessage = validation.error.message;
      }
    } else if (input == Inputs.Email) {
      const emailSchema = Joi.string().email({ tlds: { allow: false} }).required();
      const validation = emailSchema.validate(val);
      console.log(validation,"email")
      if (validation.error) {
        result.isError = true;
        result.errorMessage = validation.error.message;
      }
    } else if (input == Inputs.Address) {
      const addressSchema = Joi.string().required();
      const validation = addressSchema.validate(val);
      if (validation.error) {
        result.isError = true;
        result.errorMessage = validation.error.message;
      }
    } else if (input == Inputs.Phone) {
      const phoneSchema = Joi.number().min(3).required();
      const validation = phoneSchema.validate(val);
      if (validation.error) {
        result.isError = true;
        result.errorMessage = validation.error.message;
      }
    }
    return result;
  };

  const changePage = () => {
    if (typeof props.setPage === "function") {
      props.setPage("content");
    }
  };
  const postCustomerData = async () => {
    try {
      const customerRes = await client.post(`/customer`, customerValue);
      Swal.fire({
        icon: 'success',
        title: 'Customer created successfully.',
        showConfirmButton: false,
        timer: 1500
      })
      props.setPage("content")
    } catch (err: any) {
      console.log(err)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
      setInputErrors({
        ...inputErrors,
        name: inputErrorHandler(customerValue.name, Inputs.Name).errorMessage,
      });
      setInputErrors({
        ...inputErrors,
        email: inputErrorHandler(customerValue.email, Inputs.Email).errorMessage,
      });
      setInputErrors({
        ...inputErrors,
        phone: inputErrorHandler(customerValue.phone, Inputs.Phone).errorMessage,
      });
      setInputErrors({
        ...inputErrors,
        address: inputErrorHandler(customerValue.address, Inputs.Address)
          .errorMessage,
      });
      console.log(inputErrors.email, "email")
    }
  };

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
        <div className="mb-5">
          <h3 className="font-rubik font-[500] text-left text-[18px]">
            Customer Information
          </h3>
        </div>
        <Grid container>
          <Grid className="px-2" item xs={12} md={6} lg={6}>
            <TextField
              id="outlined-basic"
              size="small"
              onChange={(e) =>
                setCustomerValue({
                  ...customerValue,
                  name: e.currentTarget.value,
                })
              }
              required
              error={inputErrors.name ? true : false}
              helperText={inputErrors.name}
              fullWidth={true}
              label="Customer Name"
              variant="outlined"
            />
            <Grid container className="md:pt-6 pt-3">
              <Grid className="md:pr-2" item xs={12} md={6} lg={6}>
                <TextField
                  id="outlined-basic"
                  size="small"
                  error={inputErrors.phone ? true : false}
                  onChange={(e) =>
                    setCustomerValue({
                      ...customerValue,
                      phone: e.currentTarget.value,
                    })
                  }
                  required
                  fullWidth={true}
                  helperText={inputErrors.phone}
                  type="number"
                  label="Phone Number"
                  variant="outlined"
                />
              </Grid>
              <Grid className="md:pl-2 md:pt-0 pt-3" item xs={12} md={6} lg={6}>
                <TextField
                  id="outlined-basic"
                  error={inputErrors.email ? true : false}
                  size="small"
                  onChange={(e) =>
                    setCustomerValue({
                      ...customerValue,
                      email: e.currentTarget.value,
                    })
                  }
                  required
                  fullWidth={true}
                  helperText={inputErrors.email}
                  label="Email Address"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid className="px-2 h-fit md:pt-0 pt-3" item xs={12} md={6} lg={6}>
            <TextField
              id="outlined-basic"
              rows={3}
              required
              error={inputErrors.address ? true : false}
              onChange={(e) =>
                setCustomerValue({
                  ...customerValue,
                  address: e.currentTarget.value,
                })
              }
              fullWidth={true}
              helperText={inputErrors.address}
              multiline
              label="Address"
              variant="outlined"
            />
          </Grid>
        </Grid>
        {/* <DashboardTable /> */}
      </Paper>
      <Divider sx={{ mx: 3 }} />
      <div className="bg-white-00 w-full py-5 flex justify-end pr-6">
        <Button
          disableElevation
          onClick={() => changePage()}
          sx={{
            backgroundColor: "#FFFFFF",
            textTransform: "none",
            mr: 2,
            width: 180,
            border: "1px solid #E0E0E0",
            bottom: 1,
            "&:hover": {
              backgroundColor: "#FFFFFF",
            },
            color: "#000",
          }}
          variant="contained"
          size="large"
        >
          Cancel
        </Button>
        <Button
          onClick={() => postCustomerData()}
          sx={{
            backgroundColor: "#CB2D3E",
            textTransform: "none",
            width: 180,
            bottom: 1,
            "&:hover": {
              backgroundColor: "#CB2D3E",
            },
          }}
          variant="contained"
          size="large"
        >
          Create New
        </Button>
      </div>
    </Grid>
  );
}
