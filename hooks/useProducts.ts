import { useState, useEffect } from "react";
import { Product } from "../types";
import * as productService from "../services/productService";

interface Options {
  limit?: number;
  skip?: number;
  search?: string;
  category?: string;
}

export function useProducts(options: Options = {}) {
  const { limit, skip, search, category } = options;
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetcher = search
      ? productService.searchProducts(search)
      : productService.getProducts(limit, skip, category);
    fetcher
      .then((res) => {
        setProducts(res.products);
        setTotal(res.total);
      })
      .catch((err) => setError(err.message || "Error loading products"))
      .finally(() => setLoading(false));
  }, [limit, skip, search, category]);

  return { products, total, loading, error };
}