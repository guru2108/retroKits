import AddToBag from '@/app/components/AddToBag';
import CheckoutNow from '@/app/components/CheckoutNow';
import ImageGallery from '@/app/components/ImageGallery';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { fullProduct } from '@/app/interface';
import { client } from '@/app/lib/sanity';
import { Button } from '@/components/ui/button';
import { Star, Truck } from 'lucide-react';

async function getData(slug: string) {
    const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category->name,
          price_id
      }`;

    const data = await client.fetch(query);

    return data;
}

export const dynamic = 'force-dynamic';

export default async function ProductPge({
    params,
}: {
    params: { slug: string };
}) {
    const data: fullProduct = await getData(params.slug);

    return (
        <div className="bg-background">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="grid gap-8 md:grid-cols-2">
                    <ImageGallery images={data.images} />

                    <div className="md:py-8">
                        <div className="mb-2 md:mb-3">
                            <span className="mb-0.5 inline-block text-white">
                                {data.categoryName}
                            </span>
                            <h2 className="text-2xl font-bold text-white shiny lg:text-3xl">
                                {data.name}
                            </h2>
                        </div>

                        <div className="mb-6 flex items-center gap-3 md:mb-10">
                            <Button className="rounded-full gap-x-2">
                                <span className="text-sm">5</span>
                                <Star className="h-5 w-5" />
                            </Button>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Size" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="XS">XS</SelectItem>
                                    <SelectItem value="S">S</SelectItem>
                                    <SelectItem value="M">M</SelectItem>

                                    <SelectItem value="L">L</SelectItem>
                                    <SelectItem value="XL">XL</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-end gap-2">
                                <span className="text-xl font-bold text-white md:text-2xl">
                                    {data.price}
                                </span>
                            </div>

                            <span className="text-sm text-gray-500">
                                Incl. Vat plus shipping
                            </span>
                        </div>

                        <div className="mb-6 flex items-center gap-2 text-gray-500">
                            <Truck className="w-6 h-6" />
                            <span className="text-sm">2-4 Day Shipping</span>
                        </div>

                        <div className="flex gap-2.5">
                            <AddToBag
                                currency="GBP"
                                description={data.description}
                                image={data.images[0]}
                                name={data.name}
                                price={data.price}
                                key={data._id}
                                price_id={data.price_id}
                            />
                            <CheckoutNow
                                currency="GBP"
                                description={data.description}
                                image={data.images[0]}
                                name={data.name}
                                price={data.price}
                                key={data._id}
                                price_id={data.price_id}
                            />
                        </div>

                        <p className="mt-12 text-base text-white tracking-wide">
                            {data.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
