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
import { UpdateListing } from "@/services/listings.services";
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
  user_id: string | null | undefined;
  listing_id: string | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
  price: number | null | undefined;
  address: string | null | undefined;
  city: string | null | undefined;
  country: string | null | undefined;
  image: string | null | undefined;
};

function UpdateListingForm({ ...props }: FormProps) {
  const router = useRouter();
  const session = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [preview, setPreview] = useState<string>(props.image || "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props.title || "",
      description: props.description || "",
      price: String(props.price),
      address: props.address || "",
      city: props.city || "",
      country: props.country || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittingForm(true);

    const formData = new FormData();
    formData.append("user_id", props.user_id as string);
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
        props.listing_id as string,
        formData,
        session.data?.user.access_token as string
      );
      toast("Listing updated successfully!");
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

  if (props === null || undefined) {
    return (
      <div className="min-h-screen col-span-4 flex justify-center items-center">
        <div className="text-center">
          <h3>MRKT</h3>
          <p className="text-neutral-500">
            An error occured while loading this page. Please try again.
          </p>
        </div>
      </div>
    );
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
                    initialContent={props.description || ""}
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
