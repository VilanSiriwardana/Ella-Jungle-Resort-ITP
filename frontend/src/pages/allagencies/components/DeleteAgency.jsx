import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
 
export function DeleteAgency({id}) {
  const [open, setOpen] = React.useState(false);

    const agencyid = id ;
    const Navigate = useNavigate()
  
  const handleOpen = () => setOpen(!open);


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/agencies/delete/${agencyid}`);
      
      if (response.status === 200) {
        alert('Agency deleted successfully');
        Navigate('/');
      } else {
        alert('Error deleting agency');
      }
    } catch (error) {
      alert('Error deleting agency');
      console.error('Error deleting agency:', error);
    }
  };
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient" color="red">
        Delete Profile
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Delete Your Travel Agency</DialogHeader>
        <DialogBody>
          Are You sure that you want to delete your travel agency details from ella jungle Resort
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleDelete}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}