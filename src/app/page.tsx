"use client";

import { useCallback, useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { MenuIcon, UserIcon, ShoppingCartIcon } from "@/components/theme/icons";
import { products } from "@/core/data/products";
import { useLoaderStore } from "../core/stores/useLoaderStore";
import Loader from "@/components/theme/LoaderTicker";
import { fakeLoader } from "@/core/lib/utils";
import { useRouter } from "next/navigation";
import { Link1Icon } from "@radix-ui/react-icons";
import Succeschart from "@/components/charts/Linechart";
import ToggleTheme from "@/components/theme/ToggleTheme";
import { ProductDetailsDialog } from "@/components/InfoDialog";
import ProductImgSkeleton from "@/components/ui/ProductImgSkeleton";
import { Skeleton } from "@/components/ui/SkeletonLoader";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Component() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    discount: [0, 100],
  });
  const { duration, setDuration } = useLoaderStore();
  const [sort, setSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();
  const [openProductId, setOpenProductId] = useState(null);

  function isDiscountAbove50(oldPrice, newPrice) {
    const discountPercentage = ((oldPrice - newPrice) / oldPrice) * 100;
    return discountPercentage > 50 ? (
      <span className="pulse text-3xl text-green-600">!!!!</span>
    ) : null;
  }

  const handleFilterChange = (type, value) => {
    if (type === "category") {
      setSelectedFilters({
        ...selectedFilters,
        category: selectedFilters.category.includes(value)
          ? selectedFilters.category.filter((item) => item !== value)
          : [...selectedFilters.category, value],
      });
    } else if (type === "discount") {
      setSelectedFilters({
        ...selectedFilters,
        discount: value,
      });
    }
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      category: [],
      discount: [0, 100],
    });
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (
          selectedFilters.category.length > 0 &&
          !selectedFilters.category.includes(product.category)
        ) {
          return false;
        }
        if (
          product.discount < selectedFilters.discount[0] ||
          product.discount > selectedFilters.discount[1]
        ) {
          return false;
        }
        if (
          search.toLowerCase() &&
          !product.name.toLowerCase().includes(search.toLowerCase())
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sort) {
          case "popular":
            return b.discount - a.discount;
          case "latest":
            return b.id - a.id;
          case "discount":
            return b.discount - a.discount;
          default:
            return 0;
        }
      });
  }, [selectedFilters, sort, search]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const loadData = useCallback(() => {
    fakeLoader({ duration }).then(() => {
      setIsLoading(false);
    });
  }, [duration]);

  useEffect(() => {
    setIsLoading(true);
    loadData();
  }, [loadData]);

  const handleSliderChange = (value) => {
    setDuration(value[0]);
    setIsLoading(true);
    reloadData();
  };

  const reloadData = () => {
    setIsLoading(true);
    fakeLoader({ duration: duration }).then(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    reloadData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters, sort, search]);

  return (
    <div className="min-h-screen ">
      <header className="flex items-center justify-between p-4 border-b dark:border-white border-gray-600">
        <div className="flex items-center space-x-4">
          <MenuIcon className="w-6 h-6" />
          <h1 className="text-xl font-bold">Web Scraper Tool</h1>
          <div className="fixed bottom-2 right-2 z-50">
            <ToggleTheme />
          </div>
        </div>
        <div className="flex flex-col space-x-4">
          <div>
            <span>Loading Duration: {duration}ms</span>
            <input
              type="range"
              min={1000}
              max={3000}
              step={100}
              value={duration}
              onChange={(e) => handleSliderChange([parseInt(e.target.value)])}
            />
          </div>
          <Loader duration={duration} />
        </div>
        <button
          onClick={reloadData}
          className="bg-gray-700 rounded-md px-3 py-2 text-white"
        >
          Reload
        </button>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search products..."
            className="bg-gray-700 rounded-md px-3 py-2 text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <UserIcon className="w-6 h-6" />
          <ShoppingCartIcon className="w-6 h-6" />
        </div>
      </header>
      <main className="flex">
        <aside
          className={`w-64 p-4 border-r border-gray-600 ${showFilters ? "" : "hidden"}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold">Filters</h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? "Hide filters" : "Show filters"}
                </Button>
                <Button
                  variant="outline"
                  className="text-gray-400 hover:text-white"
                  onClick={handleClearFilters}
                >
                  Clear filters
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Category</h3>
              <div className="flex flex-col space-y-2">
                {[
                  "Electronics",
                  "Fashion",
                  "Home",
                  "Accessories",
                  "Shorts",
                  "Pants",
                ].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category.toLowerCase()}
                      checked={selectedFilters.category.includes(category)}
                      onCheckedChange={() =>
                        handleFilterChange("category", category)
                      }
                    />
                    <label htmlFor={category.toLowerCase()} className="text-sm">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Shop</h3>
              <div className="flex justify-between text-sm">
                <span>40%</span>
                <span>{selectedFilters.discount[1]}%</span>
              </div>
            </div>
          </div>
        </aside>
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Deals</h2>
            <div className="flex items-center space-x-4">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by: Most popular" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most popular</SelectItem>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="discount">Highest discount</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="text-gray-400 hover:text-white"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide filters" : "Show filters"}
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>New price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>More than 50%</TableHead>
                <TableHead>More info</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <>
                  {[...Array(6)]?.map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={6}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                paginatedProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    onClick={() => setOpenProductId(product.id)}
                  >
                    <TableCell>
                      <Link
                        href="#"
                        className="flex items-center space-x-2"
                        prefetch={false}
                      >
                        <ProductImgSkeleton />
                        <span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span>{product.name}</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{product.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className="line-through text-gray-500">
                        ${product.oldPrice}
                      </span>
                      <span className="ml-2">
                        {(
                          ((product.oldPrice - product.price) /
                            product.oldPrice) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-underline">{product.store}</span>{" "}
                        <Link1Icon />
                      </div>
                    </TableCell>
                    <TableCell>
                      {isDiscountAbove50(product.oldPrice, product.price)}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => setOpenProductId(product.id)}
                        size="icon"
                      >
                        <span>?</span>
                      </Button>
                    </TableCell>
                    <ProductDetailsDialog
                      product={product}
                      isOpen={openProductId === product.id}
                      onOpenChange={() => setOpenProductId(null)}
                    />
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      if (currentPage !== 1) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => handlePageChange(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      if (currentPage !== totalPages) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">Popularity Metrics</h2>
            <div className="">
              <Succeschart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
