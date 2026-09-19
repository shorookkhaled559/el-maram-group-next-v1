import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface QuoteEmailProps {
  name: string;
  phone: string;
  project: string;
  message?: string;
}

export default function QuoteEmail({ name, phone, project, message }: QuoteEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Quote Request from {name} | طلب عرض سعر جديد من {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <div style={logoPlaceholder}>MG</div>
          </Section>

          {/* English Section */}
          <Section style={content}>
            <Heading style={heading}>New Quote Request</Heading>
            <Text style={paragraph}>
              You have received a new quote request from your website. Here are the details:
            </Text>

            <Section style={detailsCard}>
              <Section style={detailRow}>
                <Text style={detailLabel}>Client Name</Text>
                <Text style={detailValue}>{name}</Text>
              </Section>

              <Hr style={detailDivider} />

              <Section style={detailRow}>
                <Text style={detailLabel}>Phone Number</Text>
                <Text style={detailValue} dir="ltr">
                  {phone}
                </Text>
              </Section>

              <Hr style={detailDivider} />

              <Section style={detailRow}>
                <Text style={detailLabel}>Interested Project</Text>
                <Text style={detailValue}>{project}</Text>
              </Section>

              {message && (
                <>
                  <Hr style={detailDivider} />
                  <Section style={detailRow}>
                    <Text style={detailLabel}>Additional Notes</Text>
                    <Text style={detailValue}>{message}</Text>
                  </Section>
                </>
              )}
            </Section>

            <Text style={note}>
              Please contact the client as soon as possible to provide them with the requested quote.
            </Text>
          </Section>

          {/* Divider */}
          <Hr style={mainDivider} />

          {/* Arabic Section */}
          <Section style={content} dir="rtl">
            <Heading style={headingAr}>طلب عرض سعر جديد</Heading>
            <Text style={paragraphAr}>
              تم استلام طلب عرض سعر جديد من الموقع الإلكتروني. فيما يلي التفاصيل:
            </Text>

            <Section style={detailsCard}>
              <Section style={detailRow}>
                <Text style={detailLabelAr}>اسم العميل</Text>
                <Text style={detailValueAr}>{name}</Text>
              </Section>

              <Hr style={detailDivider} />

              <Section style={detailRow}>
                <Text style={detailLabelAr}>رقم الهاتف</Text>
                <Text style={detailValueAr} dir="ltr">
                  {phone}
                </Text>
              </Section>

              <Hr style={detailDivider} />

              <Section style={detailRow}>
                <Text style={detailLabelAr}>المشروع المهتم به</Text>
                <Text style={detailValueAr}>{project}</Text>
              </Section>

              {message && (
                <>
                  <Hr style={detailDivider} />
                  <Section style={detailRow}>
                    <Text style={detailLabelAr}>ملاحظات إضافية</Text>
                    <Text style={detailValueAr}>{message}</Text>
                  </Section>
                </>
              )}
            </Section>

            <Text style={noteAr}>
              يرجى التواصل مع العميل في أقرب وقت ممكن لتزويده بعرض السعر المطلوب.
            </Text>
          </Section>

          {/* Footer */}
          <Hr style={mainDivider} />
          <Section style={footer}>
            <Text style={footerText}>
              Maram Group Design & Built | مرام جروب للتصميم والتشييد
            </Text>
            <Text style={footerText}>
              This is an automated notification | هذا إشعار تلقائي
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#0a0a0a",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  padding: "40px 20px",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  maxWidth: "600px",
  border: "1px solid #27272a",
};

const header = {
  backgroundColor: "#0a0a0a",
  padding: "32px 24px",
  textAlign: "center" as const,
};

const logoPlaceholder = {
  width: "60px",
  height: "60px",
  backgroundColor: "#c9a05f",
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  margin: "0 auto",
};

const content = {
  padding: "32px 24px",
};

const heading = {
  fontSize: "26px",
  fontWeight: "600",
  lineHeight: "1.3",
  color: "#18181b",
  margin: "0 0 16px 0",
};

const headingAr = {
  fontSize: "26px",
  fontWeight: "600",
  lineHeight: "1.4",
  color: "#18181b",
  margin: "0 0 16px 0",
  fontFamily: "'Cairo', 'Tahoma', sans-serif",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#52525b",
  margin: "0 0 24px 0",
};

const paragraphAr = {
  fontSize: "15px",
  lineHeight: "1.8",
  color: "#52525b",
  margin: "0 0 24px 0",
  fontFamily: "'Cairo', 'Tahoma', sans-serif",
};

const detailsCard = {
  backgroundColor: "#fafafa",
  border: "1px solid #e4e4e7",
  borderLeft: "4px solid #c9a05f",
  padding: "20px",
  marginBottom: "24px",
};

const detailRow = {
  marginBottom: "0",
};

const detailLabel = {
  fontSize: "11px",
  fontWeight: "600",
  color: "#71717a",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "0 0 6px 0",
};

const detailLabelAr = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#71717a",
  textTransform: "uppercase" as const,
  letterSpacing: "0.02em",
  margin: "0 0 6px 0",
  fontFamily: "'Cairo', 'Tahoma', sans-serif",
};

const detailValue = {
  fontSize: "16px",
  fontWeight: "500",
  color: "#18181b",
  margin: "0 0 16px 0",
};

const detailValueAr = {
  fontSize: "16px",
  fontWeight: "500",
  color: "#18181b",
  margin: "0 0 16px 0",
  fontFamily: "'Cairo', 'Tahoma', sans-serif",
};

const detailDivider = {
  borderColor: "#e4e4e7",
  margin: "16px 0",
};

const note = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#71717a",
  backgroundColor: "#fef3c7",
  border: "1px solid #fde047",
  padding: "12px 16px",
  borderRadius: "4px",
  margin: "0",
};

const noteAr = {
  fontSize: "14px",
  lineHeight: "1.8",
  color: "#71717a",
  backgroundColor: "#fef3c7",
  border: "1px solid #fde047",
  padding: "12px 16px",
  borderRadius: "4px",
  margin: "0",
  fontFamily: "'Cairo', 'Tahoma', sans-serif",
};

const mainDivider = {
  borderColor: "#e4e4e7",
  margin: "0",
};

const footer = {
  padding: "24px",
  backgroundColor: "#fafafa",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "13px",
  lineHeight: "1.6",
  color: "#a1a1aa",
  textAlign: "center" as const,
  margin: "4px 0",
};
