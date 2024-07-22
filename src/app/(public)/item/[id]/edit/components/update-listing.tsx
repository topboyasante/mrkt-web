"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import TipTap from "@/components/ui/rich-text";
import { CreateListing, UpdateListing } from "@/services/listings.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "This is a required field.",
  }),
  description: z.string().min(1, {
    message: "This is a required field.",
  }),
  price: z.string().min(1, {
    message: "This is a required field.",
  }),
  address: z.string().min(1, {
    message: "This is a required field.",
  }),
  city: z.string().min(1, {
    message: "This is a required field.",
  }),
  country: z.string().min(1, {
    message: "This is a required field.",
  }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB.")
    .optional(),
});

type FormProps = {
  user_id: string;
  listing_id: string;
  title: string;
  description: string;
  price: string;
  address: string;
  city: string;
  country: string;
  image: string;
};

function UpdateListingForm({
  user_id,
  title,
  description,
  price,
  address,
  city,
  country,
  image,
  listing_id,
}: FormProps) {
  const router = useRouter();
  const session = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [preview, setPreview] = useState<string>(image);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      description,
      price: String(price),
      address,
      city,
      country,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittingForm(true);

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("address", values.address);
    formData.append("city", values.city);
    formData.append("country", values.country);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      await UpdateListing(
        listing_id,
        formData,
        session.data?.user.access_token as string
      );
      toast("Listing created successfully!");
      router.push("/");
    } catch (error) {
      toast("Error creating listing.");
      console.error("Error creating listing:", error);
    } finally {
      setIsSubmittingForm(false);
    }
  }

  function UploadImageToForm(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataURL = reader.result;
        if (typeof dataURL === "string") {
          setPreview(dataURL);
        }
      };

      reader.readAsDataURL(file as File);
    } else {
      return;
    }
  }

  return (
    <div className="w-full h-full py-8">
      <div>
        <h3>Update Listing</h3>
      </div>
      <br />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0]);
                        UploadImageToForm(e);
                      }}
                    />
                    {preview && (
                      <Image
                        src={preview}
                        alt="preview_image"
                        width={1000}
                        height={1000}
                        className="w-full h-[500px] object-cover mt-2"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <TipTap
                    onChange={field.onChange}
                    initialContent={description}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmittingForm}>
            {isSubmittingForm ? <Loader /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default UpdateListingForm;
