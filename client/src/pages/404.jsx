import Image from "next/image";
import Link from "next/link";
import not_found from "@/assets/images/not_found.png";
import LayoutWithoutHeader from "@/components/layout/LayoutWithoutHeader";
export default function FourOhFour() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <div className="w-[500px] h-[500px] relative">
        <Image
          alt="img-404"
          src={not_found}
          layout={"fill"}
          className={"object-cover"}
        />
      </div>
      <div>
        <Link href="/">
          <span className="text-xl font-bold text-primary">Go back home</span>
        </Link>
      </div>
    </div>
  );
}
FourOhFour.Layout = LayoutWithoutHeader;
