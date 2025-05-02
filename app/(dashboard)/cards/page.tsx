import { Cards } from "@/components/sections/cards/cards";

const Page = () => {
  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Card</h1>
      </div>
      <Cards />
    </div>
  );
};

export default Page;
