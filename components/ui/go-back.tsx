import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const Goback = () => {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-x-1.5 mb-4 py-2 cursor-pointer"
      onClick={() => router.back()}
    >
      <ArrowLeft size={20} /> Back
    </button>
  );
};
