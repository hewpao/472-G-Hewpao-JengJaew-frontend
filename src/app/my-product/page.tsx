"use client";
import { useGetBuyerProductRequests } from "@/api/productRequest/useProductRequest";
import { GetProductRequestResponseDTO } from "@/dtos/productRequest";
import { products } from "@/mock-data/products";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const ProductList: React.FC<{ products: GetProductRequestResponseDTO[] }> = ({ products }) => {
  const session = useSession();
  console.log("page my product", session.data);

  const { data: prods3, isLoading: loadingProds3 } =
  useGetBuyerProductRequests();

  if (loadingProds3) {
    return <div>..Loading</div>;
  }

  const filteredProducts = products.filter(
    (product) => product.user_id === session.data?.user?.id
  );

  return (
    <div className="overflow-x-auto p-4">
      <div className="grid grid-cols-2 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.user_id} href={`/my-product/${product.id}`} passHref>
            <div className="border border-gray-200 p-4 rounded-lg shadow-md bg-white cursor-pointer">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

function Page() {
  const [filterStatus, setFilterStatus] = useState<"Opening" | "Pending">("Opening");

  const filteredProducts = products.filter((product) => {
    return product.delivery_status === filterStatus;
  });
  return (
    <div className="px-8 bg-gray-50 rounded pt-8 pb-8 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-semibold">My Product Request</h1>
            <Link
              href="/my-product/create-order"
              className="text-white bg-black px-6 py-3 rounded-lg font-medium text-s transition duration-200 hover:bg-gray-800 shadow-md"
            >
              + Create Order
            </Link>
      </div>


      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            filterStatus === "Opening" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilterStatus("Opening")}
        >
          Opening
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            filterStatus === "Pending" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilterStatus("Pending")}
        >
          Pending
        </button>
      </div>


      <ProductList products={filteredProducts} />
    </div>
  );
}

export default Page;
