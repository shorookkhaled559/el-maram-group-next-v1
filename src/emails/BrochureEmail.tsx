// emails/BrochureEmail.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface BrochureEmailProps {
  brochureUrl: string;
  logoUrl?: string;
}

export default function BrochureEmail({
  brochureUrl,
  logoUrl,
}: BrochureEmailProps) {
  const displayLogoUrl = logoUrl?.includes('localhost') 
    ? 'https://via.placeholder.com/80x80/c9a05f/ffffff?text=MG' 
    : logoUrl || 'https://via.placeholder.com/80x80/c9a05f/ffffff?text=MG';

  return (
    <Html>
      <Head />
      <Preview>Maram Group Brochure | بروشور مرام جروب</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img src={displayLogoUrl} width="80" height="80" alt="Maram Group" style={logo} />
          </Section>

          {/* English Section */}
          <Section style={section}>
            <Heading style={heading}>Thank You for Your Interest</Heading>
            
            <Text style={paragraph}>
              We appreciate your interest in Maram Group. You can now download our company brochure to learn more about our latest projects and available units.
            </Text>

            <Section style={buttonContainer}>
              <Link style={button} href={brochureUrl} download="maram-group-brochure.pdf">
                Download Brochure
              </Link>
            </Section>

            <Text style={infoText}>
              If you have any questions, our sales team is ready to assist you at any time.
            </Text>
          </Section>

          {/* Divider */}
          <Hr style={divider} />

          {/* Arabic Section */}
          <Section style={section} dir="rtl">
            <Heading style={headingAr}>شكراً لاهتمامك بمرام جروب</Heading>
            
            <Text style={paragraphAr}>
              نقدر اهتمامك بمرام جروب. تقدر الآن تحمّل بروشور الشركة لتتعرف على أحدث المشاريع والوحدات المتاحة.
            </Text>

            <Section style={buttonContainer}>
              <Link style={button} href={brochureUrl} download="maram-group-brochure.pdf">
                تحميل البروشور
              </Link>
            </Section>

            <Text style={infoTextAr}>
              إذا كان لديك أي استفسار، فريق المبيعات جاهز لمساعدتك في أي وقت.
            </Text>
          </Section>

          {/* Footer */}
          <Hr style={divider} />
          
          <Section style={footer}>
            <Text style={footerText}>
              Maram Group Design & Built
            </Text>
            <Text style={footerText}>
              مرام جروب للتصميم والتشييد
            </Text>
            <Text style={footerText}>
              Golf Tower, Sherq City, Egypt
            </Text>
            <Text style={footerText}>
              برج الجولف، شرق سيتي، مصر
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ─────────────────────────────────────────────────────────
// Styles (matching website colors & vibe)
// ─────────────────────────────────────────────────────────

const main = {
  backgroundColor: "#0a0a0a", // Dark background like the website
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  padding: "40px 20px",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  maxWidth: "600px",
  border: "1px solid #27272a",
};

const logoSection = {
  backgroundColor: "#0a0a0a",
  padding: "32px 24px",
  textAlign: "center" as const,
};

const logo = {
  margin: "0 auto",
};

const section = {
  padding: "32px 24px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "600",
  lineHeight: "1.3",
  color: "#18181b",
  margin: "0 0 16px 0",
  textAlign: "center" as const,
};

const headingAr = {
  fontSize: "28px",
  fontWeight: "600",
  lineHeight: "1.3",
  color: "#18181b",
  margin: "0 0 16px 0",
  textAlign: "center" as const,
  fontFamily: "'Cairo', 'Tahoma', sans-serif",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#52525b",
  margin: "0 0 24px 0",
  textAlign: "center" as const,
};

const paragraphAr = {
  fontSize: "16px",
  lineHeight: "1.8",
  color: "#52525b",
  margin: "0 0 24px 0",
  textAlign: "center" as const,
  fontFamily: "'Cairo', 'Tahoma', sans-serif",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#c9a05f",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 40px",
  letterSpacing: "0.05em",
  textTransform: "uppercase" as const,
  borderRadius: "4px",
};

const infoText = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#71717a",
  textAlign: "center" as const,
  margin: "0",
};

const infoTextAr = {
  fontSize: "14px",
  lineHeight: "1.7",
  color: "#71717a",
  textAlign: "center" as const,
  margin: "0",
  fontFamily: "'Cairo', 'Tahoma', sans-serif",
};

const divider = {
  borderColor: "#e4e4e7",
  margin: "0",
};

const footer = {
  padding: "24px",
  backgroundColor: "#fafafa",
};

const footerText = {
  fontSize: "13px",
  lineHeight: "1.5",
  color: "#a1a1aa",
  textAlign: "center" as const,
  margin: "4px 0",
};
