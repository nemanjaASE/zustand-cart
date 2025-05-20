import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { UserIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { useStore } from "@/store/store";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useEffect } from "react";

export function User() {
  const { setAddress, address, fullName, userName, fetchUser } = useStore(
    useShallow((state) => ({
      fullName: state.fullName,
      address: state.address,
      userName: state.userName,
      setAddress: state.setAddress,
      fetchUser: state.fetchUser,
    }))
  );

  useEffect(() => {
    async function fetchData() {
      await fetchUser();
    }

    fetchData();
  }, [fetchUser]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon">
          <UserIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-y-scroll space-y-2 w-96">
        <div className="flex gap-2 items-center">
          <p>{fullName}</p>
          <p className="text-sm">{userName}</p>
        </div>
        <Label htmlFor="address">Your Address</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></Input>
      </PopoverContent>
    </Popover>
  );
}
