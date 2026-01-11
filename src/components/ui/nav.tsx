import { GitBranch, Mail } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <header className=" fixed top-4 left-6">
      <Image
        src={"/logo2.png"}
        alt="Logo"
        className="size-10 w-15"
        width={100}
        height={100}
      />
    </header>
  );
};

export default Header;
