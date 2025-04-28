import { toaster } from "@/components/ui/toaster";
import { toaster as sonner } from "@/components/ui/sonner";
import { tooltipprovider } from "@/components/ui/tooltip";
import { queryclient, queryclientprovider } from "@tanstack/react-query";
import { browserrouter, routes, route } from "react-router-dom";
import index from "./pages/index";
import products from "./pages/products";
import contact from "./pages/contact";
import login from "./pages/admin/login";
import productsadmin from "./pages/admin/products";
import ordersadmin from "./pages/admin/orders";
import customersadmin from "./pages/admin/customers";
import notfound from "./pages/notfound";

const queryclient = new queryclient();

const app = () => (
  <queryclientprovider client={queryclient}>
    <tooltipprovider>
      <toaster />
      <sonner />
      <browserrouter>
        <routes>
          <route path="/" element={<index />} />
          <route path="/products" element={<products />} />
          <route path="/contact" element={<contact />} />
          <route path="/admin/login" element={<login />} />
          <route path="/admin/products" element={<productsadmin />} />
          <route path="/admin/orders" element={<ordersadmin />} />
          <route path="/admin/customers" element={<customersadmin />} />
          <route path="*" element={<notfound />} />
        </routes>
      </browserrouter>
    </tooltipprovider>
  </queryclientprovider>
);

export default app;
