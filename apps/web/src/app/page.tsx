import { HeaderBasic, HeaderWithNav, HeaderMarketing } from "@kim-ui-lib/ui";

export default function Home() {
  return (
    <main>
      <HeaderBasic logo="MyApp" tagline="Simple and Clean" />

      <HeaderWithNav
        logo="MyApp"
        links={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ]}
        cta={{ label: "Sign Up", href: "/signup" }}
      />

      <HeaderMarketing
        logo="MyApp"
        headline="Build faster with reusable components"
        ctaLabel="Get Started"
        ctaHref="/start"
        variant="gradient"
      />
    </main>
  );
}
