import Image from "next/image";
import Link from "next/link";
import React from "react";

type CardProps = {
  id: string;
  title: string;
  price: number;
  img_url: string;
  is_featured: boolean;
};

function ListingCard({ ...props }: CardProps) {
  return (
    <Link href={`/item/${props.id}`}>
      <div className="group relative block overflow-hidden cursor-pointer">
        <div className="relative h-64">
          <Image
            src={props.img_url}
            alt={props.title}
            width={800}
            height={800}
            className="h-full absolute w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          {props.is_featured && (
            <div className="bg-primary text-white px-2 py-1 absolute top-5 right-5 rounded-md">
              <p className="text-xs">HOT!</p>
            </div>
          )}
        </div>

        <div className="relative bg-background p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {props.title}
          </h3>
          <h5 className="mt-1.5 text-gray-700 dark:text-white">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "GHS",
            }).format(props.price)}
          </h5>
        </div>
      </div>
    </Link>
  );
}

export default ListingCard;
