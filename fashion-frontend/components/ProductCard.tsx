import Link from "next/link";

// 1. Define the shape of our product data based on the FastAPI schema
interface Product {
  id: number;
  name: string;
  base_price: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      {/* Image Placeholder */}
      <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square relative mb-4">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-300 bg-gray-200">
          {/* Simple SVG icon to represent a missing image for now */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
      </div>

      {/* Product Details */}
      <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
      <p className="text-gray-500">${product.base_price.toFixed(2)}</p>
    </Link>
  );
}
