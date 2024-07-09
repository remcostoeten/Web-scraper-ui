"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ProductDetailsDialog({ product, isOpen, onOpenChange }) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Old Price: ${product.oldPrice}</p>
            <p>Discount: {product.discount.toFixed(2)}%</p>
            <p>Store: {product.store}</p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
