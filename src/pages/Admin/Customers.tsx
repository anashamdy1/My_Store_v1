import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2, Mail, Phone } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { Customer, Message, customerAPI } from '../../lib/api/customers';

function CustomersAdmin() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [customersData, messagesData] = await Promise.all([
        customerAPI.getAllCustomers(),
        customerAPI.getAllMessages()
      ]);
      setCustomers(customersData);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل البيانات",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      await customerAPI.deleteCustomer(id);
      setCustomers(prev => prev.filter(customer => customer.id !== id));
      toast({
        title: "تم بنجاح",
        description: "تم حذف العميل بنجاح"
      });
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف العميل",
        variant: "destructive"
      });
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await customerAPI.deleteMessage(id);
      setMessages(prev => prev.filter(message => message.id !== id));
      toast({
        title: "تم بنجاح",
        description: "تم حذف الرسالة بنجاح"
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف الرسالة",
        variant: "destructive"
      });
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
        <Tabs defaultValue="customers">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customers">العملاء</TabsTrigger>
            <TabsTrigger value="messages">الرسائل</TabsTrigger>
          </TabsList>

          <TabsContent value="customers">
            <div className="rounded-md border">
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">قائمة العملاء</h2>
                <div className="grid gap-4">
                  {customers.map((customer) => (
                    <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{customer.name}</h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="rounded-md border">
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">الرسائل</h2>
                <div className="grid gap-4">
                  {messages.map((message) => (
                    <div key={message.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{message.name}</h3>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDeleteMessage(message.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-gray-600 mb-2">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{message.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{message.phone}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{message.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}

export default CustomersAdmin;
