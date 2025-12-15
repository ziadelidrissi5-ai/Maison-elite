import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  featured: boolean;
  created_at: string;
}

export const useCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching collections:', error);
        return;
      }

      setCollections(data || []);
      setLoading(false);
    };

    fetchCollections();
  }, []);

  const featuredCollections = collections.filter(c => c.featured);

  return { collections, featuredCollections, loading };
};
