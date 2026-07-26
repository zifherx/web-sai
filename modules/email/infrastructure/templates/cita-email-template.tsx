import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "react-email"

interface CitaEmailTemplateProps {
  clienteNombre: string
  tipoDocumento: string
  numeroDocumento: string
  celular: string
  clienteEmail: string
  placa: string
  kilometraje: string
  marcaFlat: string
  modeloFlat: string
  tipoServicio: string
  comentario: string
  sedeName: string
  sedeCiudad: string
  sedeAddress: string
  citaId: string
  fechaRegistro: Date
}

interface FieldLabelValue {
  label: string
  value: string
}

const colors = {
  primary: "#1E53BC", // Sky-500
  primaryDark: "#052667", // Sky-900
  text: "#13192E", // Blue-900
  muted: "#9B9B9B", // Gray-700
  border: "#E6E6E6", // Gray-300
  bg: "#F4F4F4", // Gray-100
  cardBg: "#ffffff",
  success: "#1AB11A", // Green-500
}

const LOGO_COLOR_URL =
  "https://www.automotoresinka.pe/assets/logos/logo-color.png"
const LOGO_BLANCO_URL =
  "https://www.automotoresinka.pe/assets/logos/logo-blanco.png"
const HOME_URL = "https://www.automotoresinka.pe"
const CITA_URL = "https://www.automotoresinka.pe/posventa/separa-tu-cita"
const FINANCIAMIENTO_URL =
  "https://www.automotoresinka.pe/comercial/financiamiento"

const EMAIL_WIDTH = 560

function Field({ label, value }: FieldLabelValue) {
  if (!value) return null
  return (
    <Row style={{ marginBottom: 8 }}>
      <Column style={{ width: 130 }}>
        <Text style={{ ...styles.label, fontWeight: "bolder" }}>{label}</Text>
      </Column>
      <Column>
        <Text style={{ ...styles.label }}>{value}</Text>
      </Column>
    </Row>
  )
}

function SectionTitle({ children }: { children: string }) {
  return (
    <Row style={{ marginBottom: 12 }}>
      <Column
        style={{ width: 4, backgroundColor: colors.primary, borderRadius: 2 }}
      />
      <Column style={{ paddingLeft: 10 }}>
        <Text style={styles.sectionTitle}>{children}</Text>
      </Column>
    </Row>
  )
}

export function CitaEmailTemplate({
  clienteNombre,
  tipoDocumento,
  numeroDocumento,
  celular,
  clienteEmail,
  placa,
  kilometraje,
  marcaFlat,
  modeloFlat,
  tipoServicio,
  comentario,
  sedeName,
  sedeCiudad,
  sedeAddress,
  citaId,
  fechaRegistro = new Date(),
}: CitaEmailTemplateProps) {
  const fecha = fechaRegistro.toLocaleString("es-PE", {
    dateStyle: "long",
    timeStyle: "short",
  })

  return (
    <Html>
      <Head />
      <Preview>
        Nueva cita - {clienteNombre} · {tipoServicio} · {sedeName}
      </Preview>
      <Body
        style={{
          backgroundColor: colors.bg,
          fontFamily: "Arial,Helvetica, sans-serif",
          padding: "24px 0",
        }}
      >
        <Container
          style={{
            maxWidth: EMAIL_WIDTH,
            margin: "0 auto",
          }}
        >
          <Section
            style={{
              backgroundColor: colors.primaryDark,
              borderRadius: "12px 12px 0 0",
            }}
          >
            <Link href={HOME_URL} style={{ display: "block" }}>
              <Img
                src={LOGO_BLANCO_URL}
                alt="Automotores Inka"
                width={EMAIL_WIDTH}
                style={{
                  width: "100%",
                  maxWidth: EMAIL_WIDTH,
                  display: "block",
                  borderRadius: "12px 12px 0 0",
                }}
              />
            </Link>
          </Section>

          <Section
            style={{
              backgroundColor: colors.cardBg,
              padding: "20px 32px 0",
            }}
          >
            <Row>
              <Column>
                <Text
                  style={{
                    display: "inline-block",
                    backgroundColor: colors.success,
                    color: "#ffffff",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 999,
                    margin: 0,
                  }}
                >
                  ✅ NUEVA CITA REGISTRADA
                </Text>
              </Column>
            </Row>

            <Text
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: colors.text,
                margin: "12px 0 2px",
              }}
            >
              {clienteNombre}
            </Text>

            <Text style={{ fontSize: 13, color: colors.muted, margin: 0 }}>
              {tipoServicio} · {sedeName}
            </Text>
          </Section>

          <Section
            style={{ backgroundColor: colors.cardBg, padding: "8px 32px 8px" }}
          >
            <Hr style={{ borderColor: colors.border, margin: "20px 0" }} />

            <SectionTitle>Cliente</SectionTitle>
            <Field
              label="Documento"
              value={`${tipoDocumento} ${numeroDocumento}`}
            />
            <Field label="Celular" value={celular} />
            <Field label="Correo" value={clienteEmail} />

            <Hr style={{ borderColor: colors.border, margin: "20px 0" }} />

            <SectionTitle>Vehículo</SectionTitle>
            <Field label="Placa" value={placa} />
            <Field label="Kilometraje" value={`${kilometraje} km`} />
            <Field label="Marca" value={marcaFlat} />
            <Field label="Modelo" value={modeloFlat} />

            <Hr style={{ borderColor: colors.border, margin: "20px 0" }} />

            <SectionTitle>Servicio</SectionTitle>
            <Field label="Tipo" value={tipoServicio} />
            <Field label="Comentario" value={comentario} />

            <Hr style={{ borderColor: colors.border, margin: "20px 0" }} />

            <SectionTitle>Sede asignada</SectionTitle>
            <Field label="Concesionario" value={sedeName} />
            <Field label="Ciudad" value={sedeCiudad} />
            <Field label="Dirección" value={sedeAddress} />
          </Section>

          <Section
            style={{
              backgroundColor: colors.cardBg,
              padding: "8px 32px 32px",
              textAlign: "center",
            }}
          >
            <Row>
              <Column style={{ padding: "0 6px" }}>
                <Button
                  href={CITA_URL}
                  style={{
                    backgroundColor: colors.primary,
                    color: "#ffffff",
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "12px 20px",
                    borderRadius: 8,
                    width: "80%",
                    textAlign: "center",
                  }}
                >
                  Agenda otra cita
                </Button>
              </Column>
              <Column style={{ padding: "0 6px" }}>
                <Button
                  href={FINANCIAMIENTO_URL}
                  style={{
                    backgroundColor: "#ffffff",
                    color: colors.primary,
                    border: `1.5px solid ${colors.primary}`,
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "12px 20px",
                    borderRadius: 8,
                    width: "80%",
                    textAlign: "center",
                  }}
                >
                  Cotiza tu vehículo
                </Button>
              </Column>
            </Row>
          </Section>

          <Section
            style={{
              backgroundColor: colors.bg,
              padding: "16px 32px",
              textAlign: "center",
              borderRadius: "0 0 12px 12px",
            }}
          >
            <Text style={{ fontSize: 11, color: colors.muted, margin: 0 }}>
              Cita #{citaId} · Registrada el {fecha}
            </Text>
            <Link
              href={HOME_URL}
              style={{ fontSize: 11, color: colors.primary, fontWeight: 700 }}
            >
              www.automotoresinka.pe
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const styles = {
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: colors.primary,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
    marginBottom: 0,
  },
  label: { fontSize: 13, color: colors.muted, fontWeight: 700, margin: 0 },
  value: { fontSize: 13, color: colors.text, margin: 0, fontWeight: 400 },
}
