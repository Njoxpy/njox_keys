import Image from "next/image";

import Navbar from "./components/navbar";
import Search from "./components/Search";
import Footer from "./components/Footer";
import Card from "./components/Card";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center p-2">
        <Search />
      </main>
      <Card />
      <Footer />
    </>
  );
}
