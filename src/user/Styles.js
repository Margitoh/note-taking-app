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
    height: "30px",
    boxSizing: "border-box",
    bottom: "0px",
    boxShadow: "1px 2px 9px #29487d",
    margin: 0,
    backgroundColor: "rgba(255, 255, 255, 0.0)",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  panel: {
    transition: "height 0.8s ease-in-out",
    overflow: "hidden",
    position: "absolute",
    width: "300px",
    backgroundColor: "#fff",
    bottom: "40px",
    boxShadow: "1px 2px 9px #29487d",
    margin: 0,
  },
  toggleButton: {
    position: "absolute",
    bottom: "0",
    zIndex: "2",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "0",
    fontSize: "32px",
    color: "#29487d",
    width: "32px",
    height: "32px",
  },
});

export default styles;
