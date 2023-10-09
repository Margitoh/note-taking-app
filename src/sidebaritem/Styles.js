const styles = (theme) => ({
  listItem: {
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
  },
  selectedListItem: {
    backgroundColor: "#f0f0f0",
  },
  clickedItem: {
    transform: "translateX(5px)",
  },
  textSection: {
    maxWidth: "85%",
  },
  deleteIcon: {
    position: "absolute",
    right: "5px",
    top: "calc(50% - 15px)",
    "&:hover": {
      color: "red",
    },
  },
});

export default styles;
