import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeV2 from "@/components/home/HomeV2";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HomeV2 />
      </main>
      <Footer />
    </>
  );
}
