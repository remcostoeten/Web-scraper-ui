"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import Link from "next/link"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Pagination } from "@/components/ui/pagination"
import { CartesianGrid, XAxis, Bar, BarChart, Line, LineChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"
import { MenuIcon, UserIcon, ShoppingCartIcon } from "@/components/theme/icons"
import { LineData } from "@/core/data/line-chart-data"
import { products } from "@/core/data/products"
import { Skeleton } from "@/components/ui/SkeletonLoader"
import { fakeLoader } from "@/core/lib/utils"
import { Slider } from "@/components/ui/slider"

export default function Component() {
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    discount: [0, 100],
  })
  const handleFilterChange = (type, value) => {
    if (type === "category") {
      setSelectedFilters({
        ...selectedFilters,
        category: selectedFilters.category.includes(value)
          ? selectedFilters.category.filter((item) => item !== value)
          : [...selectedFilters.category, value],
      })
    } else if (type === "discount") {
      setSelectedFilters({
        ...selectedFilters,
        discount: value,
      })
    }
  }
  const [sort, setSort] = useState("popular")
  const [showFilters, setShowFilters] = useState(true)
  const handleClearFilters = () => {
    setSelectedFilters({
      category: [],
      discount: [0, 100],
    })
  }

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(product.category)) {
          return false
        }
        if (product.discount < selectedFilters.discount[0] || product.discount > selectedFilters.discount[1]) {
          return false
        }
        if (search.toLowerCase() && !product.name.toLowerCase().includes(search.toLowerCase())) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        switch (sort) {
          case "popular":
            return b.discount - a.discount
          case "latest":
            return b.id - a.id
          case "discount":
            return b.discount - a.discount
          default:
            return 0
        }
      })
  }, [selectedFilters, sort, search])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const [loaderDuration, setLoaderDuration] = useState(2000)

  useEffect(() => {
    fakeLoader({duration: loaderDuration}).then(() => {
      setIsLoading(false)
    })
  }, [loaderDuration])

  const handleSliderChange = (value: number[]) => {
    localStorage.setItem('sliderValue', JSON.stringify(value));
    setLoaderDuration(value);
    setIsLoading(true);
    fakeLoader({duration: value[0]}).then(() => {
      setIsLoading(false);
    });
  }


  useEffect(() => {
    const storedValue = JSON.parse(localStorage.getItem('sliderValue') || '[1000]');
    setLoaderDuration(storedValue);
    setIsLoading(true);
    fakeLoader({duration: storedValue[0]}).then(() => {
      setIsLoading(false);
    });
  }, []);
  function allowTweakFakeLoaderDuration() {
    if (isLoading) {
      return
    }
    setIsLoading(true)
    fakeLoader({duration: loaderDuration[0]}).then(() => {
      setIsLoading(false)
    })
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <header className="flex items-center justify-between p-4 border-b border-gray-600">
        <div className="flex items-center space-x-4">
          <MenuIcon className="w-6 h-6" />
          <h1 className="text-xl font-bold">Web Scraper Tool</h1>
        </div>
        <div className="flex items-center space-x-4">
    <span>Loading Duration: {loaderDuration[0]}ms</span>

<input type='range' min={1000} max={3000} step={100} value={loaderDuration[0]} onChange={(e) => setLoaderDuration([parseInt(e.target.value)])} />
  </div><Button onClick={allowTweakFakeLoaderDuration} disabled={isLoading}>
  Refresh with New Duration
</Button>
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
        <aside className={`w-64 p-4 border-r border-gray-600 ${showFilters ? "" : "hidden"}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Filters</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="text-gray-400 hover:text-white"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide filters" : "Show filters"}
              </Button>
              <Button variant="outline" className="text-gray-400 hover:text-white" onClick={handleClearFilters}>
                Clear filters
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Category</h3>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="electronics"
                    checked={selectedFilters.category.includes("Electronics")}
                    onCheckedChange={() => handleFilterChange("category", "Electronics")}
                  />
                  <label htmlFor="electronics" className="text-sm">
                    Electronics
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fashion"
                    checked={selectedFilters.category.includes("Fashion")}
                    onCheckedChange={() => handleFilterChange("category", "Fashion")}
                  />
                  <label htmlFor="fashion" className="text-sm">
                    Fashion
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="home"
                    checked={selectedFilters.category.includes("Home")}
                    onCheckedChange={() => handleFilterChange("category", "Home")}
                  />
                  <label htmlFor="home" className="text-sm">
                    Home
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accessories"
                    checked={selectedFilters.category.includes("Accessories")}
                    onCheckedChange={() => handleFilterChange("category", "Accessories")}
                  />
                  <label htmlFor="accessories" className="text-sm">
                    Accessories
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="shorts"
                    checked={selectedFilters.category.includes("Shorts")}
                    onCheckedChange={() => handleFilterChange("category", "Shorts")}
                  />
                  <label htmlFor="shorts" className="text-sm">
                    Shorts
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pants"
                    checked={selectedFilters.category.includes("Pants")}
                    onCheckedChange={() => handleFilterChange("category", "Pants")}
                  />
                  <label htmlFor="pants" className="text-sm">
                    Pants
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Discount</h3>
              <div />
              <div className="flex justify-between text-sm">
                <span>{selectedFilters.discount[0]}%</span>
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
                <TableHead>Category</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Old Price</TableHead>
                <TableHead>Store</TableHead>
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
                filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Link href="#" className="flex items-center space-x-2" prefetch={false}>
                        <img src="/placeholder.svg" alt="Product" className="w-12 h-12" />
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
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <div className="inline-block rounded-full bg-green-500 px-2 py-1 text-white text-xs">
                        {product.discount}% off
                      </div>
                    </TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      <span className="line-through text-gray-500">${product.oldPrice}</span>
                      <span className="ml-2 text-green-500">-${product.oldPrice - product.price}</span>
                    </TableCell>
                    <TableCell>{product.store}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="mt-8 flex justify-center">
            {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">Popularity Metrics</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <BarchartChart className="w-full aspect-[4/3]" />
              <LinechartChart />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


function LinechartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={LineData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}



function BarchartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="min-h-[300px]"
      >
        <BarChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}


