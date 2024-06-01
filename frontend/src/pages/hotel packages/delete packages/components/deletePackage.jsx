import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export function DeletePackage({
  onDeletePackages,
  packageId,
  package_name,
  room_name,
  SActivity_name,
  spa_name,
  package_des,
  price,
  package_img,
}) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    try {
      await axios.delete(`/hotel_packages/delete/${packageId}`);
      onDeletePackages();
      alert("Package deleted successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error deleting package:", error.message);
      alert("Error deleting package. Please try again.");
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Delete</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        {isDeleting ? (
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Package Details
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Package Name: {package_name}
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Room Name: {room_name}
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Activity Name: {SActivity_name}
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Spa Package: {spa_name}
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Description: {package_des}
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Price: {price}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button color="red" onClick={handleDelete} fullWidth>
                Confirm Delete
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Are you sure you want to delete this package?
              </Typography>
              <Button color="red" onClick={() => setIsDeleting(true)}>
                Delete Package
              </Button>
            </CardBody>
          </Card>
        )}
      </Dialog>
    </>
  );
}
