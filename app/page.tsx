import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { StatsBar } from "@/components/stats-bar"
import { Services } from "@/components/services"
import { HowItWorks } from "@/components/how-it-works"
import { Products } from "@/components/products"
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
      <HowItWorks />
      <Products />
      <Testimonials />
      <About />
      <Faq />
      <Contact />
      <Footer />
    </>
  )
}
