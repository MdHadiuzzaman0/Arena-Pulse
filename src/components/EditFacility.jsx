"use client";
import { facilityUpdate } from "@/lib/action";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const EditFacility = ({ facility }) => {
  const router = useRouter();
  const id = facility?._id;
  const owner_email = facility?.owner_email;

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData);
    const { name, facility_type, location, price_per_hour, image, capacity, available_slots, description } = updatedData;
    const modifiedData = {
      name,
      facility_type,
      location,
      price_per_hour: Number(price_per_hour),
      image,
      capacity: Number(capacity),
      available_slots: available_slots ? available_slots.split(",").map(slot => slot.trim()) : [],
      description,
      owner_email
    };
    const result = await facilityUpdate({ id, modifiedData })
    if (result.success) {
      toast.success(`${name} is updated`)
      router.push('/manageFacilities')
      router.refresh()
    }
  };

  return (
    <Modal>
      <Button className="bg-arenaOrange text-white font-sports uppercase tracking-wider">Open Edit Form</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md bg-black border border-white/10 rounded-2xl overflow-hidden">
            <Modal.CloseTrigger className="text-white/60 hover:text-white" />
            <Modal.Header className="bg-white/[0.02] border-b border-white/5 p-6">
              <Modal.Icon className="bg-arenaOrange/10 text-arenaOrange">
                <Envelope className="size-5" />
              </Modal.Icon>
              <Modal.Heading className="text-white font-sports uppercase tracking-wide text-xl mt-2">
                Edit <span className="text-arenaOrange">Facility</span>
              </Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-white/50 font-body">
                Update the facility details below.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6 max-h-[60vh] overflow-y-auto">
              <Surface variant="default" className="bg-transparent">
                <form id="edit-facility-form" onSubmit={handleUpdate} className="flex flex-col gap-5">
                  {/* Facility Name */}
                  <TextField className="w-full" name="name" type="text" defaultValue={facility?.name || ""}>
                    <Label className="text-zinc-400 font-sports uppercase text-xs tracking-wider">Facility Name</Label>
                    <Input placeholder="Enter facility name" className="rounded-xl border border-white/10 bg-arenaCard/50 text-white mt-1.5" />
                  </TextField>

                  {/* Facility Type */}
                  <TextField className="w-full" name="facility_type" type="text" defaultValue={facility?.facility_type || ""}>
                    <Label className="text-zinc-400 font-sports uppercase text-xs tracking-wider">Facility Type</Label>
                    <Input placeholder="e.g., Football, Cricket" className="rounded-xl border border-white/10 bg-arenaCard/50 text-white mt-1.5" />
                  </TextField>

                  {/* Location */}
                  <TextField className="w-full" name="location" type="text" defaultValue={facility?.location || ""}>
                    <Label className="text-zinc-400 font-sports uppercase text-xs tracking-wider">Location</Label>
                    <Input placeholder="Enter facility address" className="rounded-xl border border-white/10 bg-arenaCard/50 text-white mt-1.5" />
                  </TextField>

                  {/* Price Per Hour */}
                  <TextField className="w-full" name="price_per_hour" type="number" defaultValue={facility?.price_per_hour || ""}>
                    <Label className="text-zinc-400 font-sports uppercase text-xs tracking-wider">Price Per Hour ($)</Label>
                    <Input placeholder="Enter hourly rate" className="rounded-xl border border-white/10 bg-arenaCard/50 text-white mt-1.5" />
                  </TextField>

                  {/* Image */}
                  <TextField className="w-full" name="image" type="url" defaultValue={facility?.image || ""}>
                    <Label className="text-zinc-400 font-sports uppercase text-xs tracking-wider">Image Link</Label>
                    <Input placeholder="Enter your image URL" className="rounded-xl border border-white/10 bg-arenaCard/50 text-white mt-1.5" />
                  </TextField>

                  {/* Capacity */}
                  <TextField className="w-full" name="capacity" type="number" defaultValue={facility?.capacity || ""}>
                    <Label className="text-zinc-400 font-sports uppercase text-xs tracking-wider">Capacity (Players)</Label>
                    <Input placeholder="Max players allowed" className="rounded-xl border border-white/10 bg-arenaCard/50 text-white mt-1.5" />
                  </TextField>

                  {/* Available Slots */}
                  <TextField className="w-full" name="available_slots" type="text" defaultValue={facility?.available_slots?.join(", ") || ""}>
                    <Label className="text-zinc-400 font-sports uppercase text-xs tracking-wider">Available Slots</Label>
                    <Input placeholder="08:00 AM - 10:00 AM, 06:00 PM - 08:00 PM" className="rounded-xl border border-white/10 bg-arenaCard/50 text-white mt-1.5" />
                  </TextField>

                  {/* Description */}
                  <TextField className="w-full" type="text" name="description" defaultValue={facility?.description || ""}>
                    <Label className="text-zinc-400 font-sports uppercase text-xs tracking-wider">Description</Label>
                    <Input placeholder="Enter facility details" className="rounded-xl border border-white/10 bg-arenaCard/50 text-white mt-1.5" />
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer className="bg-white/[0.02] border-t border-white/5 p-4 flex gap-3">
              <Button slot="close" className="bg-white/10 text-white font-sports uppercase tracking-wider">
                Cancel
              </Button>
              <Button slot="close" type="submit" form="edit-facility-form" className="bg-arenaOrange text-white font-sports uppercase tracking-wider">
                Update Facility
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export default EditFacility;