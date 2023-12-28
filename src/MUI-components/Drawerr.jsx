import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Create,
  Home,
  Logout,
  Person2,
  Settings,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const Drawerr = ({
  drawerWidth,
  setmyMOde,
  noneORblock,
  drawerType,
  hideDrawer,
}) => {
  const currentLocation = useLocation();

  const navigate = useNavigate();
  const theme = useTheme();

  const myList = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Create", icon: <Create />, path: "/create" },
    // { text: "Profile", icon: <Person2 />, path: "/profile" },
    // { text: "Settings", icon: <Settings />, path: "/settings" },
  ];

  return (
    <>
      <Drawer
        sx={{
          display: { xs: noneORblock, sm: "block" },

          width: `${drawerWidth}px`,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: `${drawerWidth}px`,
            boxSizing: "border-box",
          },
        }}
        variant={drawerType}
        anchor="left"
        open={true}
        onClose={() => {
          hideDrawer();
        }}
      >
        <List>
          {/* NightMode */}
          <ListItem
            sx={{ display: "flex", justifyContent: "center", mb: "14px" }}
            disablePadding
          >
            <IconButton
              onClick={() => {
                localStorage.setItem(
                  "currentMode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );
                setmyMOde(theme.palette.mode === "dark" ? "light" : "dark");
              }}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7 sx={{ color: "orange" }} />
              ) : (
                <Brightness4 />
              )}
            </IconButton>
          </ListItem>
          <Divider />

          {myList.map((item , index) => {
            return (
              <ListItem
              key={index}
                sx={{
                  bgcolor:
                    currentLocation.pathname === item.path
                      ? theme.palette.ayman.main
                      : null,

                  color:
                    currentLocation.pathname === item.path
                      ? theme.palette.ayman.white
                      : null,
                }}
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}

      
        </List>
        <Divider />
      </Drawer>
    </>
  );
};

export default Drawerr;
