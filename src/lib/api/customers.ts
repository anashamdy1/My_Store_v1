import { supabase } from '../supabase'

export interface Message {
  id: string
  name: string
  email: string
  phone: string
  message: string
  created_at: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  created_at: string
}

export const customerAPI = {
  // جلب جميع العملاء
  async getAllCustomers() {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Customer[]
  },

  // جلب جميع الرسائل
  async getAllMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Message[]
  },

  // حذف عميل
  async deleteCustomer(id: string) {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  // حذف رسالة
  async deleteMessage(id: string) {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  // إضافة عميل جديد
  async addCustomer(customer: Omit<Customer, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('customers')
      .insert([customer])
      .select()
    
    if (error) throw error
    return data[0] as Customer
  },

  // تحديث بيانات عميل
  async updateCustomer(id: string, updates: Partial<Customer>) {
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0] as Customer
  }
}
