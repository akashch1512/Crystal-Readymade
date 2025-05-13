import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { Product, FilterOptions } from "../types";

// ✅ Define context value interface
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
  deleteProduct: (id: string) => Promise<void>;
}

// ✅ Create context with proper default fallback values
const ProductContext = createContext<ProductContextValue>({
  products: [],
  categories: [],
  brands: [],
  filteredProducts: [],
  filterOptions: {},
  setFilterOptions: () => {
    throw new Error("setFilterOptions must be used within ProductProvider");
  },
  getProductById: () => undefined,
  getProductBySlug: () => undefined,
  searchProducts: () => [],
  clearFilters: () => {},
  deleteProduct: async () => {},
});

// ✅ Hook to use products
export const useProducts = () => useContext(ProductContext);

// ✅ Provider component
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});

  // ✅ Fetch products, categories, and brands
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await fetch("http://localhost:5000/api/products");
        const categoryRes = await fetch(
          "http://localhost:5000/api/products/categories"
        );
        const brandRes = await fetch(
          "http://localhost:5000/api/products/brands"
        );

        const productData = await productRes.json();
        const categoryData = await categoryRes.json();
        const brandData = await brandRes.json();

        if (productData && categoryData && brandData) {
          // ✅ Optional: handle MongoDB _id -> id mapping
          const productsWithId = productData.map((p: any) => ({
            ...p,
            id: p.id || p._id, // support both
          }));

          setProducts(productsWithId);
          setCategories(categoryData);
          setBrands(brandData);
        } else {
          console.error("Error: Missing data from API responses");
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchData();
  }, []);

  // ✅ Filter logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filterOptions.category) {
      result = result.filter(
        (product) => product.category === filterOptions.category
      );
    }

    if (filterOptions.brand) {
      result = result.filter(
        (product) => product.brand === filterOptions.brand
      );
    }

    if (filterOptions.minPrice !== undefined) {
      result = result.filter((product) => {
        const price = product.salePrice || product.price;
        return price >= filterOptions.minPrice!;
      });
    }

    if (filterOptions.maxPrice !== undefined) {
      result = result.filter((product) => {
        const price = product.salePrice || product.price;
        return price <= filterOptions.maxPrice!;
      });
    }

    if (filterOptions.rating !== undefined) {
      result = result.filter(
        (product) => product.ratings >= filterOptions.rating!
      );
    }

    if (filterOptions.tags && filterOptions.tags.length > 0) {
      result = result.filter((product) =>
        filterOptions.tags!.some((tag) => product.tags.includes(tag))
      );
    }

    if (filterOptions.sortBy) {
      switch (filterOptions.sortBy) {
        case "price-asc":
          result.sort(
            (a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)
          );
          break;
        case "price-desc":
          result.sort(
            (a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)
          );
          break;
        case "newest":
          result.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          );
          break;
        case "popular":
          result.sort((a, b) => b.ratings - a.ratings);
          break;
      }
    }

    return result;
  }, [filterOptions, products]);

  // ✅ Utility functions
  const getProductById = (id: string): Product | undefined =>
    products.find((product) => product.id === id || product._id === id);

  const getProductBySlug = (slug: string): Product | undefined =>
    products.find((product) => product.slug === slug);

  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().split(" ");

    return products.filter((product) => {
      const searchableText = `
        ${product.name}
        ${product.description}
        ${product.category}
        ${product.brand}
        ${product.tags.join(" ")}
      `.toLowerCase();

      return searchTerms.some((term) => searchableText.includes(term));
    });
  };

  const clearFilters = () => {
    setFilterOptions({});
  };

  const deleteProduct = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // ✅ Remove deleted product from state
      setProducts((prev) =>
        prev.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // ✅ Provide context value
  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        brands,
        filteredProducts,
        filterOptions,
        setFilterOptions,
        getProductById,
        getProductBySlug,
        searchProducts,
        clearFilters,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
