"use client";
import { facilityDelete } from "@/lib/action";
import { AlertDialog, Button } from "@heroui/react";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation'
import { authClient } from "@/lib/auth-client";

const DeleteFacility = ({ id, name}) => {

  const router = useRouter()
  async function handleDlt() {
    const { data: tokenData} = await authClient.token()
    const token = tokenData?.token; 
    const result = await facilityDelete({ id, name, token })
    if (result.success) {
      toast.error(`${name} is removed`)
      router.push('/manageFacilities')
      router.refresh()
    }
  }

  return (
    <div>
       <AlertDialog>
      <Button variant="danger"><FaRegTrashAlt /> Delete Facility</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Facility permanently?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{name}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onPress={handleDlt} slot="close" variant="danger">
                Delete Facility
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>

    </div>
  );
};

export default DeleteFacility;