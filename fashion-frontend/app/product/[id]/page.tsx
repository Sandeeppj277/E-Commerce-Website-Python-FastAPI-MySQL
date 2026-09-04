import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price?: number;
  base_price?: number;
  category?: string | { name?: string };
  image_url?: string;
}

async function getProduct(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return { error: `Backend returned status: ${res.status}` };
    }
    const data = await res.json();
    return { data };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { error: err.message };
    }
    return { error: "Failed to fetch" };
  }
}

export default async function ProductDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const result = await getProduct(params.id);

  // If there's an error from the backend, show the debug screen
  if (result.error || !result.data) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Debug Error Screen
        </h1>
        <p className="text-gray-700 mb-4">
          Next.js tried to fetch product #{params.id} but got this result:
        </p>
        <pre className="bg-gray-100 p-4 text-left rounded-lg text-sm overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    );
  }

  const product: Product = result.data;
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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8 text-sm text-gray-500 font-medium">
        <Link href="/" className="hover:text-store-peach transition-colors">
          Home
        </Link>
        {" / "}
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-store-apricot">
        <div className="h-[400px] md:h-[500px] bg-gray-50 rounded-2xl relative overflow-hidden flex items-center justify-center border border-gray-100">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 font-medium">
              No Image Available
            </span>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
              {product.name}
            </h1>
            {categoryName && (
              <span className="text-sm bg-store-blue/40 text-gray-800 px-3 py-1 rounded-full font-bold inline-block">
                {categoryName}
              </span>
            )}
          </div>

          <p className="text-4xl font-black text-gray-900">
            ${finalPrice.toFixed(2)}
          </p>

          <div className="flex-grow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              About this item
            </h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
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
      </div>
    </div>
  );
}
