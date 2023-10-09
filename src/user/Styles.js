const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: "calc(100% - 35px)",
    position: "relative",
    left: "0",
    width: "300px",
    boxShadow: "0px 0px 2px black",
    padding: 0,
  },
  userContainer: {
    position: "absolute",
    width: "300px",
    height: "50px",
    boxSizing: "border-box",
    bottom: "35px",
    boxShadow: "1px 2px 9px #29487d",
    margin: 0,
    backgroundColor: "#fff",
  },
  signOutBtn: {
    width: "100%",
    height: "35px",
    borderBottom: "1px solid black",
    borderRadius: "0px",
    backgroundColor: "#29487d",
    color: "white",
    "&:hover": {
      backgroundColor: "#88a2ce",
    },
    boxShadow: "1px 2px 9px #29487d",
  },
});

export default styles;
