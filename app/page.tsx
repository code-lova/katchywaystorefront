import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import Newproduct from "@/components/Newproduct";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="main">
      <Navbar />
      <section className="mt-20">
        <Hero />
      </section>
      <section className="xl:px-40 px-5 py-9">
        <Banner />
        <Newproduct />
      </section>
      <section>
        <Footer />
      </section>

    </main>
  );
}
