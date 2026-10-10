import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface BrochureEmailProps {
  /** Direct download link for the brochure PDF */
  brochureUrl: string;
  /** Inline image sent as an attachment with contentId "maram-logo" */
  logoSrc?: string;
}

const CONTACT = {
  hotline: "+20 109 469 2669",
  hotlineHref: "tel:+201094692669",
  whatsapp: "+20 106 639 5959",
  whatsappHref: "https://wa.me/201066395959",
  email: "info@maramkwdevelopment.com",
  website: "www.maram-kw.com",
  websiteHref: "https://www.maram-kw.com",
};

export default function BrochureEmail({
  brochureUrl,
  logoSrc = "cid:maram-logo",
}: BrochureEmailProps) {
  return (
    <Html lang="ar">
      <Head />
      <Preview>حمّل بروشور مرام جروب · Download the Maram Group brochure</Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img src={logoSrc} width="120" height="90" alt="Maram Group" style={logo} />
          </Section>
          <div style={goldBar} />

          {/* Arabic */}
          <Section style={block} dir="rtl">
            <Text style={headingAr}>شكراً لاهتمامك بمرام جروب</Text>
            <Text style={paragraphAr}>
              يسعدنا اهتمامك بمشاريعنا. اضغط على الزر أدناه لتحميل بروشور الشركة
              بصيغة PDF، وفيه أحدث المشاريع والوحدات المتاحة.
            </Text>
          </Section>

          {/* Download button */}
          <Section style={downloadWrap}>
            <Button href={brochureUrl} style={button}>
              تحميل البروشور · Download Brochure
            </Button>
            <Text style={fileNote}>PDF</Text>
          </Section>

          <Section style={dividerWrap}>
            <Hr style={divider} />
          </Section>

          {/* English */}
          <Section style={block}>
            <Text style={headingEn}>Thank you for your interest in Maram Group</Text>
            <Text style={paragraphEn}>
              We appreciate your interest in our projects. Use the button above to
              download our company brochure (PDF), featuring our latest projects and
              available units.
            </Text>
          </Section>

          {/* CTA */}
          <Section style={actions}>
            <Button href={CONTACT.whatsappHref} style={buttonOutline}>
              تواصل معنا على واتساب · Chat on WhatsApp
            </Button>
            <Text style={ctaNote}>
              فريق المبيعات جاهز لمساعدتك في أي وقت
              <br />
              Our sales team is ready to help you anytime
            </Text>
          </Section>

          {/* Contact info */}
          <Section style={contactWrap}>
            <div style={contactCard}>
            <ContactRow en="Hotline" ar="الخط الساخن" valueText={CONTACT.hotline} href={CONTACT.hotlineHref} />
            <ContactRow en="WhatsApp" ar="واتساب" valueText={CONTACT.whatsapp} href={CONTACT.whatsappHref} />
            <ContactRow en="Email" ar="البريد" valueText={CONTACT.email} href={`mailto:${CONTACT.email}`} />
            <ContactRow en="Website" ar="الموقع" valueText={CONTACT.website} href={CONTACT.websiteHref} />
            </div>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerBrand}>Maram Group Design & Built · مرام جروب للتصميم والتشييد</Text>
            <Text style={footerText} dir="rtl">
              المقر الرئيسي: القاهرة – التجمع الخامس · الفرع: الفيوم – برج النوران
            </Text>
            <Text style={footerText}>
              HQ: Cairo, Fifth Settlement · Branch: Fayoum, Al-Nouran Tower
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function ContactRow({
  en,
  ar,
  valueText,
  href,
}: {
  en: string;
  ar: string;
  valueText: string;
  href: string;
}) {
  return (
    <Row style={contactRow}>
      <Column style={contactLabel}>
        {en} · {ar}
      </Column>
      <Column style={contactValue}>
        <a href={href} style={link} dir="ltr">
          {valueText}
        </a>
      </Column>
    </Row>
  );
}

// ─────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────
const GOLD = "#c9a05f";
const DARK = "#0a0a0a";
const FONT = "'Segoe UI', Tahoma, Arial, sans-serif";

const body = {
  backgroundColor: "#f3f0ea",
  fontFamily: FONT,
  margin: "0",
  padding: "32px 12px",
};

const container = {
  backgroundColor: "#ffffff",
  maxWidth: "600px",
  margin: "0 auto",
  borderRadius: "10px",
  overflow: "hidden" as const,
  border: "1px solid #e7e2d8",
};

const header = {
  backgroundColor: DARK,
  padding: "28px 24px 20px",
  textAlign: "center" as const,
};

const logo = { margin: "0 auto", display: "block" };

const goldBar = { height: "3px", backgroundColor: GOLD, lineHeight: "3px", fontSize: "0" };

const block = { padding: "32px 32px 8px", textAlign: "center" as const };

const headingAr = {
  fontSize: "26px",
  fontWeight: "700",
  color: "#18181b",
  lineHeight: "1.5",
  margin: "0 0 12px 0",
};

const paragraphAr = {
  fontSize: "15px",
  lineHeight: "1.9",
  color: "#52525b",
  margin: "0 0 8px 0",
};

const headingEn = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#18181b",
  lineHeight: "1.4",
  margin: "0 0 10px 0",
};

const paragraphEn = {
  fontSize: "14px",
  lineHeight: "1.7",
  color: "#71717a",
  margin: "0 0 8px 0",
};

const downloadWrap = { padding: "8px 32px 28px", textAlign: "center" as const };

const fileNote = { fontSize: "12px", color: "#a1a1aa", margin: "10px 0 0 0" };

const dividerWrap = { padding: "0 32px" };
const divider = { borderColor: "#ece7dc", margin: "0" };

const actions = { padding: "16px 32px 8px", textAlign: "center" as const };

const button = {
  display: "block",
  boxSizing: "border-box" as const,
  width: "100%",
  textAlign: "center" as const,
  fontSize: "14px",
  fontWeight: "700",
  textDecoration: "none",
  padding: "15px 20px",
  borderRadius: "6px",
  backgroundColor: GOLD,
  color: "#ffffff",
};

const buttonOutline = {
  ...button,
  backgroundColor: "#ffffff",
  color: "#18181b",
  border: `1px solid ${GOLD}`,
};

const ctaNote = {
  fontSize: "12px",
  lineHeight: "1.7",
  color: "#a1a1aa",
  margin: "14px 0 0 0",
};

const contactWrap = { padding: "20px 24px 32px" };

const contactCard = {
  padding: "6px 18px",
  backgroundColor: "#fcfbf8",
  border: "1px solid #ece7dc",
  borderRadius: "8px",
};

const contactRow = { borderBottom: "1px solid #f0ebe0" };
const contactLabel = {
  fontSize: "12px",
  color: "#a08242",
  fontWeight: "700",
  padding: "11px 8px 11px 0",
  textAlign: "left" as const,
};
const contactValue = { fontSize: "13px", padding: "11px 0", textAlign: "right" as const };
const link = { color: "#18181b", textDecoration: "none", borderBottom: `1px solid ${GOLD}` };

const footer = { backgroundColor: DARK, padding: "22px 24px", textAlign: "center" as const };
const footerBrand = { fontSize: "13px", fontWeight: "700", color: GOLD, margin: "0 0 8px 0" };
const footerText = { fontSize: "12px", color: "#a1a1aa", lineHeight: "1.7", margin: "2px 0" };