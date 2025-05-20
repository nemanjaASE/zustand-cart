import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { CircleX, ShoppingCart, Trash2 } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { useStore } from "@/store/store";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ChangeQtyButton } from "./ChangeQtyButton";

export function Cart() {
  const { reset, removeProduct, products, total, address } = useStore(
    useShallow((state) => ({
      reset: state.reset,
      products: state.products,
      removeProduct: state.removeProduct,
      total: state.total,
      address: state.address,
    }))
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="icon">
          <ShoppingCart />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-y-scroll space-y-2 w-96">
        <div className="flex gap-2 text-lg items-center">
          <h1>Cart:</h1>
          <Button onClick={reset} variant="destructive" size="icon">
            <CircleX></CircleX>
          </Button>
        </div>
        <div className="space-y-2">
          {products.map((product) => (
            <Card className="flex flex-col" key={product.id}>
              <CardHeader className="flex flex-row item-center gap-2">
                <CardTitle>{product.title}</CardTitle>
                <Button
                  onClick={() => removeProduct(product.id)}
                  size="icon"
                  variant="destructive"
                >
                  <Trash2 />
                </Button>
              </CardHeader>
              <CardContent>{product.price}</CardContent>
              <CardFooter>
                <ChangeQtyButton productId={product.id} />
              </CardFooter>
            </Card>
          ))}
        </div>
        <p>Total: {total}$</p>
        <p>Address: {address}</p>
      </PopoverContent>
    </Popover>
  );
}
