import { useStore } from "@/store/store";
import { Minus, Plus } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { Button } from "./ui/button";
import { useEffect } from "react";

type Props = { productId: string };

export function ChangeQtyButton({ productId }: Props) {
  const { getProductById, decQty, incQty, setTotal } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decQty: state.decQty,
      incQty: state.incQty,
      setTotal: state.setTotal,
    }))
  );
  const product = getProductById(productId);
  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotal(
          products.reduce((acc, item) => acc + item.price * item.qty, 0)
        );
      },
      { fireImmediately: true }
    );
    return unSub;
  }, [setTotal]);

  return (
    <>
      {product && (
        <div className="flex gap-2 items-center">
          <Button onClick={() => decQty(product.id)} size="icon">
            <Minus></Minus>
          </Button>
          <p>{product.qty}</p>
          <Button onClick={() => incQty(product.id)} size="icon">
            <Plus></Plus>
          </Button>
        </div>
      )}
    </>
  );
}
