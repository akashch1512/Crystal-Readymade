import React, { createContext, useState, useContext, useMemo } from 'react';
import { Product, FilterOptions } from '../types';
import { products, categories, brands } from '../data/mockData';

interface ProductContextValue {
  products: Product[];
  categories: string[];
  brands: string[];
  filteredProducts: Product[];
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  searchProducts: (query: string) => Product[];
  clearFilters: () => void;
}

const ProductContext = createContext<ProductContextValue>({
  products: [],
  categories: [],
  brands: [],
  filteredProducts: [],
  filterOptions: {},
  setFilterOptions: () => {},
  getProductById: () => undefined,
  getProductBySlug: () => undefined,
  searchProducts: () => [],
  clearFilters: () => {}
});

export const useProducts = () => useContext(ProductContext);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  
  // Extract unique categories and brands
  const availableCategories = useMemo(() => 
    [...new Set(categories.map(cat => cat.name))], 
    []
  );
  
  const availableBrands = useMemo(() => 
    [...new Set(brands.map(brand => brand.name))], 
    []
  );
  
  // Apply filters to products
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Filter by category
    if (filterOptions.category) {
      result = result.filter(product => 
        product.category === filterOptions.category
      );
    }
    
    // Filter by brand
    if (filterOptions.brand) {
      result = result.filter(product => 
        product.brand === filterOptions.brand
      );
    }
    
    // Filter by price range
    if (filterOptions.minPrice !== undefined) {
      result = result.filter(product => {
        const price = product.salePrice || product.price;
        return price >= (filterOptions.minPrice || 0);
      });
    }
    
    if (filterOptions.maxPrice !== undefined) {
      result = result.filter(product => {
        const price = product.salePrice || product.price;
        return price <= (filterOptions.maxPrice || Infinity);
      });
    }
    
    // Filter by rating
    if (filterOptions.rating !== undefined) {
      result = result.filter(product => 
        product.ratings >= (filterOptions.rating || 0)
      );
    }
    
    // Filter by tags
    if (filterOptions.tags && filterOptions.tags.length > 0) {
      result = result.filter(product => 
        filterOptions.tags?.some(tag => product.tags.includes(tag))
      );
    }
    
    // Sort products
    if (filterOptions.sortBy) {
      switch (filterOptions.sortBy) {
        case 'price-asc':
          result.sort((a, b) => {
            const priceA = a.salePrice || a.price;
            const priceB = b.salePrice || b.price;
            return priceA - priceB;
          });
          break;
        case 'price-desc':
          result.sort((a, b) => {
            const priceA = a.salePrice || a.price;
            const priceB = b.salePrice || b.price;
            return priceB - priceA;
          });
          break;
        case 'newest':
          result.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case 'popular':
          result.sort((a, b) => b.ratings - a.ratings);
          break;
      }
    }
    
    return result;
  }, [filterOptions]);
  
  const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
  };
  
  const getProductBySlug = (slug: string): Product | undefined => {
    return products.find(product => product.slug === slug);
  };
  
  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) return [];
    
    const searchTerms = query.toLowerCase().split(' ');
    
    return products.filter(product => {
      const searchableText = `
        ${product.name} 
        ${product.description} 
        ${product.category} 
        ${product.brand} 
        ${product.tags.join(' ')}
      `.toLowerCase();
      
      return searchTerms.some(term => searchableText.includes(term));
    });
  };
  
  const clearFilters = () => {
    setFilterOptions({});
  };
  
  return (
    <ProductContext.Provider value={{
      products,
      categories: availableCategories,
      brands: availableBrands,
      filteredProducts,
      filterOptions,
      setFilterOptions,
      getProductById,
      getProductBySlug,
      searchProducts,
      clearFilters
    }}>
      {children}
    </ProductContext.Provider>
  );
};