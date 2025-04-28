import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { Order, orderAPI } from '../../lib/api/orders';

function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await orderAPI.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل الطلبات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await orderAPI.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      toast({
        title: "تم بنجاح",
        description: "تم تحديث حالة الطلب"
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث حالة الطلب",
        variant: "destructive"
      });
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      try {
        await orderAPI.deleteOrder(orderId);
        setOrders(orders.filter(order => order.id !== orderId));
        toast({
          title: "تم بنجاح",
          description: "تم حذف الطلب بنجاح"
        });
      } catch (error) {
        console.error('Error deleting order:', error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء حذف الطلب",
          variant: "destructive"
        });
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="container mx-auto p-4">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">إدارة الطلبات</h1>
        <div className="rounded-md border">
          <div className="p-4">
            <div className="grid gap-4">
              {orders.map((order) => (
                <div key={order.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{order.product_name}</h3>
                      <div className="text-gray-600">
                        <p>العميل: {order.customer_name}</p>
                        <p>الهاتف: {order.customer_phone}</p>
                        <p>العنوان: {order.customer_address}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Select
                        value={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="حالة الطلب" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="قيد الانتظار">قيد الانتظار</SelectItem>
                          <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
                          <SelectItem value="تم الشحن">تم الشحن</SelectItem>
                          <SelectItem value="تم التوصيل">تم التوصيل</SelectItem>
                          <SelectItem value="ملغي">ملغي</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="text-center p-8 text-gray-500">
                  لا توجد طلبات حالياً
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default OrdersAdmin;
