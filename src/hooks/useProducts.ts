import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category_id: string | null;
  image_url: string | null;
  images: string[];
  is_new: boolean;
  is_featured: boolean;
  stock: number;
  dimensions: string | null;
  materials: string | null;
  created_at: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      setProducts(data || []);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const featuredProducts = products.filter(p => p.is_featured);
  const newProducts = products.filter(p => p.is_new);

  return { products, featuredProducts, newProducts, loading };
};

export const useProduct = (slug: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) {
        console.error('Error fetching product:', error);
        return;
      }

      setProduct(data);
      setLoading(false);
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  return { product, loading };
};
