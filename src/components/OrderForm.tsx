import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import supabase from '../lib/supabaseClient';

interface OrderFormProps {
  productId: string;
  productName: string;
  onSuccess: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ productId, productName, onSuccess }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // إضافة أو تحديث العميل في جدول customers
      await supabase.from('customers').upsert([
        {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }
      ], { onConflict: 'phone' });

      const { error } = await supabase.from('orders').insert([
        {
          product_id: productId,
          product_name: productName,
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_address: formData.address,
          status: 'قيد الانتظار',
        },
      ]);

      if (error) throw error;

      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سيتم التواصل معك قريباً",
      });

      onSuccess();
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إرسال طلبك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          الاسم
        </label>
        <Input
          id="name"
          name="name"
          placeholder="أدخل اسمك كاملاً"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-secondary text-foreground"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          رقم الهاتف
        </label>
        <Input
          id="phone"
          name="phone"
          placeholder="01xxxxxxxxx"
          value={formData.phone}
          onChange={handleChange}
          required
          className="bg-secondary text-foreground"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium mb-1">
          العنوان
        </label>
        <Textarea
          id="address"
          name="address"
          placeholder="أدخل عنوانك بالكامل للتوصيل"
          value={formData.address}
          onChange={handleChange}
          required
          className="bg-secondary text-foreground"
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
        {loading ? "جارِ الإرسال..." : "تأكيد الطلب"}
      </Button>
    </form>
  );
};

export default OrderForm;
