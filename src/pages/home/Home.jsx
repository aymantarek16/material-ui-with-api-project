import { Box, Paper, Typography, IconButton } from "@mui/material";
import "./Home.css";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";

const Home = () => {
  const [mydata, setmydata] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3100/mydata")
      .then((response) => response.json())
      .then((data) => setmydata(data));
  }, []);

  const handleDelete = (item) => {
    fetch(`http://localhost:3100/mydata/${item.id}`, { method: "DELETE" });
    const filterArray = mydata.filter((myObj) => {
      return myObj.id !== item.id;
    });
    setmydata(filterArray);
  };

  let totalPrice = 0;
  return (
    <Box>
      {mydata.length === 0 ? (
        <Typography variant="h5" mt={9}>
          Store is empty and nothing to display in the screen 😴
        </Typography>
      ) : (
        mydata.map((item, index) => {
          totalPrice += item.price;
          return (
            <Paper
              key={index}
              sx={{
                position: "relative",
                width: "366px",
                display: "flex",
                justifyContent: "space-between",
                mt: "22px",
                pt: "27px",
                pb: "7px",
              }}
            >
              <Typography sx={{ ml: "16px", fontSize: "1.3em" }}>
                {item.title}
              </Typography>

              <Typography
                sx={{
                  mr: "33px",
                  fontWeight: 500,
                  fontSize: "1.4em",
                  opacity: "0.8",
                }}
                variant="h6"
              >
                ${item.price}
              </Typography>

              <IconButton
                sx={{ position: "absolute", top: "0", right: "0" }}
                onClick={() => {
                  handleDelete(item);
                }}
              >
                <Close sx={{ fontSize: "20px" }} />
              </IconButton>
            </Paper>
          );
        })
      )}
      <Typography mt="55px" textAlign="center" variant="h6">
        👉 You Spend ${totalPrice}
      </Typography>
    </Box>
  );
};

export default Home;
