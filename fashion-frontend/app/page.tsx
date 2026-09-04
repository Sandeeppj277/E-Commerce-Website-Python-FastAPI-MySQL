import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price?: number;
  base_price?: number;
  category?: string | { name?: string };
  image_url?: string;
}

async function getProducts() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/products/", {
      cache: "no-store",
    });

    if (!res.ok) {
      return { products: [], error: "Failed to load products." };
    }

    const data = await res.json();
    return { products: data, error: null };
  } catch {
    return { products: [], error: "Backend Offline." };
  }
}

export default async function Home(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { products, error } = await getProducts();

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-500 mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Backend Offline
        </h2>
        <p>Make sure your FastAPI server is running on port 8000!</p>
      </div>
    );
  }

  // Extract categories dynamically from the database records
  const categoryList: string[] = products.map((p: Product) => {
    if (
      typeof p.category === "object" &&
      p.category !== null &&
      "name" in p.category
    ) {
      return String(p.category.name ?? "General");
    }
    return typeof p.category === "string" ? p.category : "General";
  });

  const categories: string[] = ["All", ...Array.from(new Set(categoryList))];

  // Safely await searchParams (fixes Next.js 15+ errors)
  const searchParams = await props.searchParams;
  const currentCategory = searchParams?.category || "All";

  // Filter the products array before rendering
  const filteredProducts = products.filter((product: Product) => {
    if (currentCategory === "All") return true;

    const catName =
      typeof product.category === "object" &&
      product.category !== null &&
      "name" in product.category
        ? String(product.category.name)
        : typeof product.category === "string"
          ? product.category
          : "General";

    return catName === currentCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900">New Arrivals</h1>

        {/* Dynamically Rendered Category Links */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat: string, index: number) => (
            <Link
              key={index}
              href={
                cat === "All" ? "/" : `/?category=${encodeURIComponent(cat)}`
              }
              className={`px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer transition-colors ${
                currentCategory === cat
                  ? "bg-store-apricot text-gray-900 shadow-sm"
                  : "bg-white text-gray-600 hover:bg-store-apricot/40 border border-store-apricot/50"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Product Grid mapped to the FILTERED products */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          <p className="text-lg font-medium">
            No products found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product: Product) => {
            const finalPrice = product.price ?? product.base_price ?? 0;

            const categoryName =
              typeof product.category === "object" &&
              product.category !== null &&
              "name" in product.category
                ? String(product.category.name)
                : typeof product.category === "string"
                  ? product.category
                  : null;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm border border-store-apricot overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                {/* 1. IMAGE IS NOW A CLICKABLE LINK */}
                <Link href={`/product/${product.id}`} className="block">
                  <div className="h-64 bg-gray-100 w-full relative overflow-hidden flex items-center justify-center">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">
                        [ No Image Provided ]
                      </span>
                    )}
                  </div>
                </Link>

                {/* Product Details */}
                <div className="p-5 flex flex-col flex-grow gap-2">
                  <div className="flex justify-between items-start">
                    {/* 2. TITLE IS NOW A CLICKABLE LINK */}
                    <Link href={`/product/${product.id}`}>
                      <h2 className="text-lg font-bold text-gray-900 hover:text-store-peach transition-colors">
                        {product.name}
                      </h2>
                    </Link>
                    {categoryName && (
                      <span className="text-xs bg-store-blue/40 text-gray-700 px-2.5 py-1 rounded-full font-medium">
                        {categoryName}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-xl font-extrabold text-gray-900 mt-2">
                    ${finalPrice.toFixed(2)}
                  </p>

                  <AddToCartButton
                    product={{
                      id: product.id,
                      name: product.name,
                      price: finalPrice,
                      description: product.description,
                      image_url: product.image_url,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
