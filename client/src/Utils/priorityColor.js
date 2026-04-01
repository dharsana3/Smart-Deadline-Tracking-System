export const priorityColor = (priority) => {

  if(priority === "HIGH") return "red";

  if(priority === "MEDIUM") return "orange";

  if(priority === "LOW") return "green";

  return "black";
};