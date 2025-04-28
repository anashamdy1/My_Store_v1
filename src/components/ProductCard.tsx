
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import OrderForm from './OrderForm';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, price, image }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  return (
    <div className="neon-card overflow-hidden bg-card flex flex-col">
      <div className="h-64 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2 neon-text">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3 flex-1">
          {description.length > 70 ? `${description.substring(0, 70)}...` : description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold">{price} ج.م</span>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button
            variant="outline"
            onClick={() => setShowDetails(true)}
            className="flex-1 neon-button"
          >
            تفاصيل
          </Button>
          <Button
            onClick={() => setShowOrderForm(true)}
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
          >
            شراء الآن
          </Button>
        </div>
      </div>

      {/* Product Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="bg-card border border-border/40">
          <DialogHeader>
            <DialogTitle className="text-xl neon-text">{name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="h-64 overflow-hidden rounded-md">
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <DialogDescription className="text-foreground/70">
              {description}
            </DialogDescription>
            <div className="flex justify-between items-center">
              <span className="font-bold text-xl">{price} ج.م</span>
              <Button 
                onClick={() => {
                  setShowDetails(false);
                  setShowOrderForm(true);
                }}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                شراء الآن
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order Form Dialog */}
      <Dialog open={showOrderForm} onOpenChange={setShowOrderForm}>
        <DialogContent className="bg-card border border-border/40 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl neon-text">طلب شراء</DialogTitle>
            <DialogDescription>
              {name} - {price} ج.م
            </DialogDescription>
          </DialogHeader>
          <OrderForm productId={id} productName={name} onSuccess={() => setShowOrderForm(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductCard;
