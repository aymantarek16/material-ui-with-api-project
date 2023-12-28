import { Box, Button, InputAdornment, TextField, styled } from "@mui/material";
import "./Create.css";
import { purple } from "@mui/material/colors";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: theme.palette.ayman.main,
  "&:hover": {
    backgroundColor: theme.palette.ayman.main,
    scale: "0.99",
  },
}));

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = ({ title, price }) => {
    fetch("http://localhost:3100/mydata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price, title }),
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <Box
      sx={{ width: "370px" }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        fullWidth={true}
        label="Transaction Title"
        sx={{ mt: "22px", display: "block" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">👉</InputAdornment>,
        }}
        variant="filled"
        // ====== React Hook Form Controls ====== //
        {...register("title", {
          required: { value: true, message: "Requires field" },
          minLength: { value: 3, message: "minumn length is 3" },
        })}
        error={Boolean(errors.title)}
        helperText={
          Boolean(errors.title) ? errors.title?.message.toString() : null
        }
      />

      <TextField
        fullWidth={true}
        label=" Amount"
        sx={{ mt: "22px", display: "block" }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        variant="filled"
        type="number"
        // ====== React Hook Form Controls ====== //
        {...register("price", {
          required: { value: true, message: "Required filed" },
        })}
        error={Boolean(errors.price)}
        helperText={
          Boolean(errors.price) ? errors.price?.message.toString() : null
        }
      />

      <ColorButton sx={{ mt: "22px" }} variant="contained" type="submit">
        Submit <ChevronRight />
      </ColorButton>
    </Box>
  );
};

export default Create;
