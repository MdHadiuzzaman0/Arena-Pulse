"use client";
import { authClient } from "@/lib/auth-client"
import { Envelope } from "@gravity-ui/icons";
import { bookingData } from "@/lib/action";
import { toast } from "react-hot-toast";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";

const BookingButton = ({ facility }) => {
    const router = useRouter();

    const { _id, name, price_per_hour, image } = facility;
    const { data: session, isPending } = authClient.useSession()
    const user_email = session?.user.email
    const id = session?.user.id

    async function handleBook(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData.entries());
        const bookedData = {
            date: new Date(rawData.date).toLocaleDateString("en-GB", {
            weekday: "long", day: "numeric",month: "short",  year: "numeric" }),
            slot: rawData.slot,
            hours: Number(rawData.hours),
            price: Number(rawData.price),
            image: rawData.image,
            name,
            user_email, 
            id,
            status: 'Pending',
        };
        // console.log(bookedData)
        const { data: tokenData} = await authClient.token()
        const token = tokenData?.token; 
        const result = await bookingData(bookedData, token);
        console.log(result, token)
        if (result.success) {
            toast.success(`${name} is booked!`)
            router.push('/myBookings')
            router.refresh()
        }
    }

    const LoggedIn = session?.user
    if (!LoggedIn) {
  return (
    <Button 
      variant="solid" 
      disabled
      className="bg-arenaOrange/70 text-white border border-zinc-700 cursor-not-allowed opacity-50 font-sports font-black uppercase tracking-wider px-6 py-3 rounded-md"
    >
      Login to Book
    </Button>
  );
}

    return (
        <Modal>
      <Button 
        variant="solid"
        className="bg-arenaOrange hover:bg-orange-600 text-white font-sports font-black uppercase tracking-wider px-6 py-3 rounded-md transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-orange-600/10 cursor-pointer"
      >
        Book Now
      </Button>

      <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md bg-zinc-950 border border-zinc-900 rounded-xl text-white shadow-2xl p-2">
            <Modal.CloseTrigger className="text-zinc-400 hover:text-white" />
            
            <Modal.Header className="space-y-3">
              <div className="flex items-center gap-3">
                {/* <Modal.Icon className="bg-orange-600/10 border border-orange-600/20 text-arenaOrange p-2 rounded-md">
                  <CalendarDays className="size-5" />
                </Modal.Icon> */}
                <Modal.Heading className="text-xl font-sports font-black uppercase tracking-wide text-zinc-100">
                  Book Facility
                </Modal.Heading>
              </div>

              <div className="bg-orange-950/20 border border-arenaOrange/30 rounded-lg p-3 mt-2">
                <p className="text-xs font-body text-arenaOrange font-medium leading-relaxed">
                  ⚠️ **Notice:** Without login, Bookings will not be processed.
                </p>
              </div>
            </Modal.Header>

            <form className="flex flex-col gap-5 mt-4" onSubmit={handleBook}>
              <Modal.Body className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
                
                {/* Date */}
                <TextField className="w-full flex flex-col gap-1.5" name="date" type="date">
                  <Label className="text-xs uppercase tracking-wider text-zinc-400 font-sports font-bold">Date</Label>
                  <Input 
                    required 
                    className="w-full bg-arenaCard border border-zinc-800 text-white rounded-md p-2.5 text-sm focus:border-arenaOrange outline-none font-body transition-colors" 
                    placeholder="Select booking date" 
                  />
                </TextField>

                {/* Slot */}
                <TextField className="w-full flex flex-col gap-1.5" name="slot" type="text">
                  <Label className="text-xs uppercase tracking-wider text-zinc-400 font-sports font-bold">Available Slot</Label>
                  <Input 
                    required 
                    className="w-full bg-arenaCard border border-zinc-800 text-white rounded-md p-2.5 text-sm focus:border-arenaOrange outline-none font-body transition-colors" 
                    placeholder="e.g., 08:00 AM - 10:00 AM" 
                  />
                </TextField>

                {/* Hours */}
                <TextField className="w-full flex flex-col gap-1.5" name="hours" type="number">
                  <Label className="text-xs uppercase tracking-wider text-zinc-400 font-sports font-bold">Total Hours</Label>
                  <Input 
                    required 
                    min="1"
                    className="w-full bg-arenaCard border border-zinc-800 text-white rounded-md p-2.5 text-sm focus:border-arenaOrange outline-none font-body transition-colors" 
                    placeholder="Enter total hours" 
                  />
                </TextField>

                {/* Price */}
                <TextField className="w-full flex flex-col gap-1.5" name="price" type="number" defaultValue={price_per_hour} disabled>
                  <Label className="text-xs uppercase tracking-wider text-zinc-400 font-sports font-bold">Price Per Hour ($)</Label>
                  <Input 
                    className="w-full bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-md p-2.5 text-sm font-body cursor-not-allowed" 
                  />
                </TextField>

                {/* Image */}
                <TextField className="w-full flex flex-col gap-1.5" name="image" type="url" defaultValue={image} disabled>
                  <Label className="text-xs uppercase tracking-wider text-zinc-400 font-sports font-bold">Facility Image URL</Label>
                  <Input 
                    className="w-full bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-md p-2.5 text-sm font-body truncate cursor-not-allowed" 
                  />
                </TextField>

              </Modal.Body>

              <Modal.Footer className="border-t border-zinc-900 pt-4 mt-2 flex justify-end gap-3">
                <Button 
                  slot="close" 
                  variant="solid" 
                  className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-body text-sm px-4 py-2.5 rounded-md transition-colors"
                >
                  Cancel
                </Button>
                
                <Button 
                  
                  type="submit"
                  className="bg-arenaOrange hover:bg-orange-600 text-white font-body text-sm font-bold px-5 py-2.5 rounded-md transition-all shadow-lg shadow-orange-600/10 cursor-pointer"
                >
                  Confirm Booking
                </Button>
              </Modal.Footer>
            </form>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
    );
};

export default BookingButton; 