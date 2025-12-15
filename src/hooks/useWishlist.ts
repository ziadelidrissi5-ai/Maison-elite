import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface WishlistItem {
  id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
    slug: string;
  };
}

export const useWishlist = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('wishlist')
      .select(`
        id,
        product_id,
        product:products (
          id,
          name,
          price,
          image_url,
          slug
        )
      `)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching wishlist:', error);
      return;
    }

    const wishlistItems = (data || []).map(item => ({
      id: item.id,
      product_id: item.product_id,
      product: item.product as unknown as WishlistItem['product']
    }));

    setItems(wishlistItems);
    setLoading(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const addToWishlist = async (productId: string) => {
    if (!user) {
      toast.error('Veuillez vous connecter pour ajouter aux favoris');
      return false;
    }

    const existingItem = items.find(item => item.product_id === productId);
    if (existingItem) {
      toast.info('Ce produit est déjà dans vos favoris');
      return false;
    }

    const { error } = await supabase
      .from('wishlist')
      .insert({ user_id: user.id, product_id: productId });

    if (error) {
      toast.error('Erreur lors de l\'ajout aux favoris');
      return false;
    }

    await fetchWishlist();
    toast.success('Produit ajouté aux favoris');
    return true;
  };

  const removeFromWishlist = async (productId: string) => {
    const item = items.find(i => i.product_id === productId);
    if (!item) return false;

    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('id', item.id);

    if (error) {
      toast.error('Erreur lors de la suppression');
      return false;
    }

    await fetchWishlist();
    toast.success('Produit retiré des favoris');
    return true;
  };

  const toggleWishlist = async (productId: string) => {
    const isInWishlist = items.some(item => item.product_id === productId);
    if (isInWishlist) {
      return removeFromWishlist(productId);
    }
    return addToWishlist(productId);
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.product_id === productId);
  };

  return {
    items,
    loading,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    itemCount: items.length,
    refetch: fetchWishlist
  };
};
