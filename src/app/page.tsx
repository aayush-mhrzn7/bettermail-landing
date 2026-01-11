import ArrowIcon from "@/components/ui/arrow";
import { Button } from "@/components/ui/button";
import { CompatibiltyButton } from "@/components/ui/compatibility-button";

const page = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <div className="p-2 max-w-xl flex flex-col justify-center items-center">
        <h1 className="text-5xl flex  text-center font-bold font-geist">
          Write Emails That Sound You Only Better.
        </h1>
        <p className=" text-center text-muted-foreground mt-2 font-dm-sans">
          Write smarter. Send faster. Instant tone adjust, clarity boosts &
          professionalism without the effort.
        </p>
        <CompatibiltyButton />
      </div>
    </section>
  );
};

export default page;
