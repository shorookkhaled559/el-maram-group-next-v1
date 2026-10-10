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

interface QuoteEmailProps {
  name: string;
  phone: string;
  project: string;
  message?: string;
  /** Inline image sent as an attachment with contentId "maram-logo" */
  logoSrc?: string;
}

export default function QuoteEmail({
  name,
  phone,
  project,
  message,
  logoSrc = "cid:maram-logo",
}: QuoteEmailProps) {
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  return (
    <Html lang="ar">
      <Head />
      <Preview>
        طلب عرض سعر جديد من {name} · New quote request from {name}
      </Preview>
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img src={logoSrc} width="120" height="90" alt="Maram Group" style={logo} />
          </Section>
          <div style={goldBar} />

          {/* Title */}
          <Section style={titleSection}>
            <Text style={badge}>NEW QUOTE REQUEST · طلب عرض سعر جديد</Text>
            <Text style={titleAr}>عميل جديد يطلب عرض سعر</Text>
            <Text style={titleEn}>A new client is requesting a quote</Text>
          </Section>

          {/* Details */}
          <Section style={cardWrap}>
            <div style={card}>
            <Field en="Client Name" ar="اسم العميل">
              <Text style={value} dir="auto">
                {name}
              </Text>
            </Field>

            <Hr style={fieldDivider} />

            <Field en="Phone" ar="رقم الهاتف">
              <Text style={value} dir="ltr">
                <a href={telHref} style={link}>
                  {phone}
                </a>
              </Text>
            </Field>

            <Hr style={fieldDivider} />

            <Field en="Interested Project" ar="المشروع المهتم به">
              <Text style={value} dir="auto">
                {project}
              </Text>
            </Field>

            {message && (
              <>
                <Hr style={fieldDivider} />
                <Field en="Notes" ar="ملاحظات">
                  <Text style={messageBox} dir="auto">
                    {message}
                  </Text>
                </Field>
              </>
            )}
            </div>
          </Section>

          {/* Reminder */}
          <Section style={reminderWrap}>
            <div style={reminder}>
              <Text style={reminderAr} dir="rtl">يرجى التواصل مع العميل في أقرب وقت ممكن.</Text>
              <Text style={reminderEn}>Please contact the client as soon as possible.</Text>
            </div>
          </Section>

          {/* Actions */}
          <Section style={actions}>
            <Button href={telHref} style={buttonPrimary}>
              اتصال بالعميل · Call client
            </Button>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerBrand}>Maram Group · مرام جروب</Text>
            <Text style={footerText}>
              إشعار تلقائي من موقع الشركة · Automated notification from the website
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Field({
  en,
  ar,
  children,
}: {
  en: string;
  ar: string;
  children: React.ReactNode;
}) {
  return (
    <Section style={field}>
      <Row>
        <Column style={labelEn}>{en}</Column>
        <Column style={labelAr} dir="rtl">
          {ar}
        </Column>
      </Row>
      {children}
    </Section>
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

const titleSection = { padding: "32px 28px 8px", textAlign: "center" as const };

const badge = {
  display: "inline-block",
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.08em",
  color: "#8a6a2f",
  backgroundColor: "#faf3e3",
  border: "1px solid #ecdcb5",
  borderRadius: "999px",
  padding: "6px 14px",
  margin: "0 0 18px 0",
};

const titleAr = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#18181b",
  lineHeight: "1.5",
  margin: "0",
};

const titleEn = { fontSize: "14px", color: "#71717a", margin: "4px 0 0 0" };

const cardWrap = { padding: "20px 24px 8px" };

const card = {
  padding: "8px 20px",
  backgroundColor: "#fcfbf8",
  border: "1px solid #ece7dc",
  borderRadius: "8px",
};

const field = { padding: "14px 0 4px" };

const labelBase = {
  fontSize: "11px",
  fontWeight: "700",
  letterSpacing: "0.06em",
  color: "#a08242",
  padding: "0 0 4px 0",
};
const labelEn = { ...labelBase, textAlign: "left" as const, textTransform: "uppercase" as const };
const labelAr = { ...labelBase, textAlign: "right" as const };

const value = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#18181b",
  lineHeight: "1.6",
  margin: "0 0 10px 0",
};

const link = { color: "#18181b", textDecoration: "none", borderBottom: `1px solid ${GOLD}` };

const messageBox = {
  fontSize: "15px",
  lineHeight: "1.9",
  color: "#27272a",
  backgroundColor: "#ffffff",
  border: "1px solid #ece7dc",
  borderLeft: `4px solid ${GOLD}`,
  borderRadius: "6px",
  padding: "14px 16px",
  margin: "4px 0 12px 0",
  whiteSpace: "pre-wrap" as const,
};

const fieldDivider = { borderColor: "#ece7dc", margin: "2px 0" };

const reminderWrap = { padding: "12px 24px 0" };

const reminder = {
  padding: "12px 16px",
  backgroundColor: "#faf3e3",
  border: "1px solid #ecdcb5",
  borderRadius: "8px",
  textAlign: "center" as const,
};
const reminderAr = { fontSize: "14px", fontWeight: "600", color: "#6b5222", margin: "0" };
const reminderEn = { fontSize: "13px", color: "#8a6a2f", margin: "2px 0 0 0" };

const actions = { padding: "20px 24px 32px", textAlign: "center" as const };

const buttonPrimary = {
  display: "block",
  boxSizing: "border-box" as const,
  width: "100%",
  textAlign: "center" as const,
  fontSize: "14px",
  fontWeight: "700",
  textDecoration: "none",
  padding: "14px 20px",
  borderRadius: "6px",
  backgroundColor: GOLD,
  color: "#ffffff",
};

const footer = { backgroundColor: DARK, padding: "22px 24px", textAlign: "center" as const };
const footerBrand = { fontSize: "13px", fontWeight: "700", color: GOLD, margin: "0 0 6px 0" };
const footerText = { fontSize: "12px", color: "#a1a1aa", lineHeight: "1.6", margin: "0" };