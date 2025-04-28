import { supabase } from '../supabase'

export interface Product {
  id: number
  name: string
  price: number
  description: string
  image_url: string
  created_at?: string
}

export const productAPI = {
  // جلب جميع المنتجات
  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as Product[]
  },

  // جلب منتج واحد بواسطة المعرف
  async getProductById(id: number) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Product
  },

  // إضافة منتج جديد
  async addProduct(product: Omit<Product, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
    
    if (error) throw error
    return data[0] as Product
  },

  // تحديث منتج
  async updateProduct(id: number, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0] as Product
  },

  // حذف منتج
  async deleteProduct(id: number) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}
