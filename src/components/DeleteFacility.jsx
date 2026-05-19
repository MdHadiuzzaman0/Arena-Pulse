"use client";
import { facilityDelete } from "@/lib/action";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'

const DeleteFacility = ({ id, name}) => {
  const router = useRouter()
  async function handleDlt() {
    const result = await facilityDelete({ id, name})
    if (result.success) {
      toast.error(`${name} is removed`)
      router.push('/manageFacilities')
    }
  }

  return (
    <div>
       <AlertDialog>
      <Button variant="danger"><Trash2 /> Delete Facility</Button>
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