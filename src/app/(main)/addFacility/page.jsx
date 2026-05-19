"use client";
import { facilityCreate } from "@/lib/action";
import { authClient } from "@/lib/auth-client";
import { Description, Button, Input, Select, Label, ListBox, Card, TextField, FieldError, TextArea } from "@heroui/react";
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';


export default function AddFacilityPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter()

  async function handleAdd(e) {
    e.preventDefault();
    const name = e.target.name.value
    const formData = new FormData(e.target)
    const result = await facilityCreate(formData)
    if (result.success) {
      toast.success(`${name} is added successfully 🎉`);
      router.push('/facilities')
    } else {
      toast.error("Failed to add facility arena");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4 flex justify-center items-center">
      <Card className="w-full max-w-4xl p-8 shadow-2xl bg-arenaCard border border-zinc-900 rounded-none text-white">

        <div className="mb-8 border-b border-zinc-900 pb-4">
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white">
            Post a New <span className="text-arenaOrange">Facility</span>
          </h1>
          <p className="text-zinc-400 text-sm">Fill in the details to launch your next big sports arena arena.</p>
        </div>

        <form onSubmit={handleAdd} className="p-4 md:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="md:col-span-2">
              <TextField name="name" isRequired>
                <Label className="text-zinc-400">Facility Name</Label>
                <Input placeholder="e.g. Elite Football Turf" className="rounded-2xl" />
                <FieldError className="text-red-500 text-xs mt-1" />
              </TextField>
            </div>

            <div>
              <Select name="facility_type" isRequired className="w-full" placeholder="Select category">
                <Label className="text-zinc-400">Facility Type</Label>
                <Select.Trigger>
                  <Select.Value className="uppercase text-balck" />
                </Select.Trigger>
                <Select.Popover className="bg-zinc-900 border border-zinc-800 text-black">
                  <ListBox>
                    <ListBox.Item id="Football" textValue="Football">Football</ListBox.Item>
                    <ListBox.Item id="Badminton" textValue="Badminton">Badminton</ListBox.Item>
                    <ListBox.Item id="Tennis" textValue="Tennis">Tennis</ListBox.Item>
                    <ListBox.Item id="Cricket" textValue="Cricket">Cricket</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <TextField name="location" isRequired>
              <Label className="text-zinc-400">Location / Venue</Label>
              <Input placeholder="Dhanmondi, Dhaka" className="rounded-2xl" />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            <TextField name="price_per_hour" type="number" isRequired>
              <Label className="text-zinc-400">Price Per Hour (USD)</Label>
              <Input type="number" placeholder="45" className="rounded-2xl" />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            <TextField name="capacity" type="number" isRequired>
              <Label className="text-zinc-400">Max Player Capacity</Label>
              <Input type="number" placeholder="14" className="rounded-2xl" />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            <div className="md:col-span-2">
              <TextField isDisabled className="w-full" name="owner_email" value={session?.user?.email}>
                <Label className="text-zinc-400 font-sports uppercase text-sm tracking-wider">Owner Email</Label>
                <Input
                  placeholder="Auto-generated"
                  className="rounded-2xl border border-white/10 bg-arenaCard/50 text-zinc-500 font-body pl-4 mt-1.5 cursor-not-allowed opacity-80"
                />
                <Description className="text-zinc-500 text-xs mt-1 block italic font-body">This field is auto-filled by system</Description>
              </TextField>
            </div>

            <div className="md:col-span-2">
              <TextField name="image" type="url" isRequired>
                <Label className="text-zinc-400">Facility Image</Label>
                <Input type="url" placeholder="https://example.com/facility_image.jpg" className="rounded-2xl" />
                <FieldError className="text-red-500 text-xs mt-1" />
              </TextField>
            </div>

            <div>
              <TextField name="booking_count">
                <Label className="text-zinc-500">Initial Booking Count</Label>
                <Input
                  type="number" placeholder='0'
                  className="rounded-2xl opacity-50 bg-zinc-900"
                />
              </TextField>
            </div>

            <div className="md:col-span-2">
              <TextField name="available_slots" isRequired>
                <Label className="text-zinc-400">Available Slots (Comma separated)</Label>
                <Input placeholder="Type exactly like this -> 09:00 AM - 10:00 AM, 04:00 PM - 05:00 PM" className="rounded-2xl" />
                <FieldError className="text-red-500 text-xs mt-1" />
              </TextField>
            </div>

            <div className="md:col-span-2">
              <TextField name="description" isRequired>
                <Label className="text-zinc-400">Description / Ground Rules</Label>
                <TextArea placeholder="Describe your arena configurations or features in detail..." className="w-full rounded-2xl" />
                <FieldError className="text-red-500 text-xs mt-1" />
              </TextField>
            </div>

          </div>

          <Button type="submit" variant="outline" className="rounded-none w-full bg-arenaOrange text-white border-none font-bold uppercase tracking-wider">
            Add Facility
          </Button>
        </form>
      </Card>
    </div>
  );
}