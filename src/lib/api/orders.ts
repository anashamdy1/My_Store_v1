import { supabase } from '../supabase'

export interface Order {
  id: string
  product_id: string
  product_name: string
  customer_name: string
  customer_phone: string
  customer_address: string
  status: string
  created_at: string
}

export const orderAPI = {
  // جلب جميع الطلبات
  async getAllOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Order[]
  },

  // جلب طلب واحد بواسطة المعرف
  async getOrderById(id: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Order
  },

  // إضافة طلب جديد
  async addOrder(order: Omit<Order, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
    
    if (error) throw error
    return data[0] as Order
  },

  // تحديث حالة الطلب
  async updateOrderStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0] as Order
  },

  // حذف طلب
  async deleteOrder(id: string) {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}
