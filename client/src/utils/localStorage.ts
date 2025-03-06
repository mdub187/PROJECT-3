export const getSavedResourceIds = () => {
  const savedResourceIds = localStorage.getItem("saved_resources")
    ? JSON.parse(localStorage.getItem("saved_resources")!)
    : [];

  console.log("saved resource IDs", savedResourceIds);
  return savedResourceIds;
};

export const saveResourceIds = (resourceIdArr: string[]) => {
  console.log("saveResourceID:",resourceIdArr);
  if (resourceIdArr.length) {
    localStorage.setItem("saved_resources", JSON.stringify(resourceIdArr));
  } else {
    localStorage.removeItem("saved_resources");
  }
};

export const removeResourceId = (resourceId: string) => {
  const savedResourceIds = localStorage.getItem("saved_resources")
    ? JSON.parse(localStorage.getItem("saved_resources")!)
    : [];

  const updatedSavedResourceIds = savedResourceIds?.filter(
    (savedResourceId: string) => savedResourceId !== resourceId
  );

  localStorage.setItem(
    "saved_resources",
    JSON.stringify(updatedSavedResourceIds)
  );

  return true;
};
