"use client";
import Image from "next/image";
import Link from "next/link";
import { GetProductRequestResponseDTO } from "@/dtos/productRequest";
import { useGetBuyerProductRequests } from "@/api/productRequest/useProductRequest";

interface ProductListProps {
  products: GetProductRequestResponseDTO[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="overflow-x-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/my-product/${product.id}`} passHref>
            <div className="flex flex-col gap-3 border border-gray-200 h-full p-4 rounded-lg shadow-md bg-white cursor-pointer">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={180}
                height={180}
                className="w-full h-48 object-cover rounded-md"
              />
              <div>
                <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
                <p className="text-gray-600 text-sm">{product.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

function Page() {
  const { data: products, isLoading: loading } = useGetBuyerProductRequests();

  if (loading) {
    return <div>Loading...</div>;
  }

  const productList = products?.["product-requests"] || [];

  return (
    <div className="px-8 bg-gray-50 rounded pt-8 pb-8 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          My Product Requests
        </h1>
        <Link
          href="/my-product/create-order"
          className="text-white bg-black px-6 py-3 rounded-lg font-medium text-lg transition duration-200 hover:bg-gray-800 shadow-md"
        >
          + Create Order
        </Link>
      </div>

      <ProductList products={productList} />
    </div>
  );
}

export default Page;
