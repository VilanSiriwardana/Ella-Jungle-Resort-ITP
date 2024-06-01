import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import axios from 'axios';
import {toast} from 'react-toastify'

export function DialogCustomAnimation({ id, onUserDeleted, name }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const handleDeleteUser = async () => {
    try {
      console.log('Deleting user with ID:', id); // Add this line for debug
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      console.log('User deleted successfully');
      toast.success('User deleted successfully') // Add this line for debug
      // After successful deletion, call the callback function
      if (onUserDeleted) {
        onUserDeleted();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    handleOpen(); // Close the dialog after deletion
  };

  return (
    <>
      <Button
        className='h-[30px] px-auto pb-[25px] bg-red-600'
        onClick={handleOpen}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Delete User ?</DialogHeader>
        <DialogBody>
          Are You sure that you want to delete{' '}
          <span className='font-bold'>{name}</span> from ella jungle Resort
        </DialogBody>
        <DialogFooter>
          <Button
            variant='text'
            color='red'
            onClick={handleOpen}
            className='mr-1'
          >
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' color='green' onClick={handleDeleteUser}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
