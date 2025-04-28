
import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2, Plus } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import supabase from '../../lib/supabaseClient';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductsAdmin = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحميل المنتجات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEdit = () => {
    setCurrentProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentProduct) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', currentProduct.id);

      if (error) throw error;

      setProducts(products.filter(p => p.id !== currentProduct.id));
      toast({
        title: "تم الحذف",
        description: "تم حذف المنتج بنجاح",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف المنتج",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price || !formData.image) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    try {
      const price = parseFloat(formData.price);
      
      if (isNaN(price) || price <= 0) {
        toast({
          title: "خطأ",
          description: "يرجى إدخال سعر صحيح",
          variant: "destructive",
        });
        return;
      }

      if (currentProduct) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update({
            name: formData.name,
            description: formData.description,
            price,
            image: formData.image,
          })
          .eq('id', currentProduct.id);

        if (error) throw error;

        setProducts(products.map(p => 
          p.id === currentProduct.id 
            ? { ...p, name: formData.name, description: formData.description, price, image: formData.image }
            : p
        ));

        toast({
          title: "تم التعديل",
          description: "تم تعديل المنتج بنجاح",
        });
      } else {
        // Add new product
        const { data, error } = await supabase
          .from('products')
          .insert([
            {
              name: formData.name,
              description: formData.description,
              price,
              image: formData.image,
            },
          ])
          .select();

        if (error) throw error;

        if (data) {
          setProducts([data[0], ...products]);
        }

        toast({
          title: "تم الإضافة",
          description: "تم إضافة المنتج بنجاح",
        });
      }

      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ المنتج",
        variant: "destructive",
      });
    }
  };

  const ProductSkeletons = () => (
    <>
      {[1, 2, 3].map((i) => (
        <tr key={i} className="border-b border-border/40">
          <td className="p-4"><Skeleton className="h-16 w-16" /></td>
          <td className="p-4"><Skeleton className="h-6 w-32" /></td>
          <td className="p-4 hidden md:table-cell"><Skeleton className="h-4 w-48" /></td>
          <td className="p-4"><Skeleton className="h-6 w-20" /></td>
          <td className="p-4">
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold neon-text text-center sm:text-right">إدارة المنتجات</h1>
          <Button 
            onClick={handleAddEdit} 
            className="neon-button flex items-center gap-2"
          >
            <Plus size={16} />
            <span>إضافة منتج جديد</span>
          </Button>
        </div>

        <div className="neon-card overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40">
                <th className="p-4 text-right">الصورة</th>
                <th className="p-4 text-right">الاسم</th>
                <th className="p-4 text-right hidden md:table-cell">التفاصيل</th>
                <th className="p-4 text-right">السعر</th>
                <th className="p-4 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <ProductSkeletons />
              ) : products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-border/40 hover:bg-accent/10">
                    <td className="p-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-16 h-16 object-cover rounded-md border border-border/40" 
                      />
                    </td>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4 text-foreground/70 hidden md:table-cell">
                      {product.description.length > 100
                        ? `${product.description.substring(0, 100)}...`
                        : product.description}
                    </td>
                    <td className="p-4 font-medium">{product.price} ج.م</td>
                    <td className="p-4">
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleEdit(product)}
                          className="hover:text-primary hover:border-primary"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleDelete(product)}
                          className="hover:text-destructive hover:border-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-lg text-foreground/70">
                    لا توجد منتجات متاحة
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border border-border/40">
          <DialogHeader>
            <DialogTitle className="text-xl neon-text">
              {currentProduct ? 'تعديل منتج' : 'إضافة منتج جديد'}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                اسم المنتج
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل اسم المنتج"
                className="bg-secondary text-foreground"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                تفاصيل المنتج
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="أدخل تفاصيل المنتج"
                className="bg-secondary text-foreground min-h-[100px]"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-1">
                السعر (جنيه مصري)
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="bg-secondary text-foreground"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-1">
                رابط الصورة
              </label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="bg-secondary text-foreground"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                إلغاء
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {currentProduct ? 'حفظ التعديلات' : 'إضافة المنتج'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-card border border-border/40">
          <DialogHeader>
            <DialogTitle className="text-xl">تأكيد الحذف</DialogTitle>
          </DialogHeader>
          <p>هل أنت متأكد من رغبتك في حذف المنتج "{currentProduct?.name}"؟</p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
            >
              حذف
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ProductsAdmin;
