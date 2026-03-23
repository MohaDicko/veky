import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { StatsBar } from "@/components/stats-bar"
import { Services } from "@/components/services"
import { Destinations } from "@/components/destinations"
import { HowItWorks } from "@/components/how-it-works"
import { Products } from "@/components/products"
import { Calculator } from "@/components/calculator"
import { Testimonials } from "@/components/testimonials"
import { About } from "@/components/about"
import { Faq } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <StatsBar />
      <Services />
      <Destinations />
      <HowItWorks />
      <Products />
      <Calculator />
      <Testimonials />
      <About />
      <Faq />
      <Contact />
      <Footer />
    </>
  )
}
