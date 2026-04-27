import { CodeBlock } from "@creantly/ui/shared/code-block";
import { PageHeader, PageHeaderHeading } from "@creantly/ui/shared/page-header";

export default async function Page() {
  const code = `"dependencies": {
  "@creantly/auth": "1.18.6",
  "@creantly/video": "1.18.6",
  "@creantly/calendar": "1.18.6",
  "@creantly/mail": "1.18.6",
  "@creantly/sms": "1.18.6",
  "@creantly/payments": "1.18.6"
},`;

  return (
    <main className="container mb-16 w-full flex-1 lg:mb-20">
      <PageHeader>
        <PageHeaderHeading>
          infrastructure{" "}
          <span className="relative z-4 before:pointer-events-none before:absolute before:-inset-x-1 before:inset-y-0 before:z-4 before:-rotate-1 before:bg-linear-to-r before:from-blue-500 before:via-purple-500 before:to-orange-500 before:opacity-16 before:mix-blend-hard-light">
            partner program
          </span>{" "}
          for agencies.
        </PageHeaderHeading>
      </PageHeader>

      <div className="mx-auto max-w-2xl text-muted-foreground [&_a:not([data-slot='button'])]:text-foreground [&_strong]:text-foreground">
        <p className="not-first:mt-6 leading-relaxed">
          la tech factory de automatización para agencias y consultores.
        </p>

        <p className="not-first:mt-6 leading-relaxed">
          sistemas de voz, whatsapp, ocr, qr y cobranza automatizada listos para
          vender bajo tu marca.
        </p>

        <p className="not-first:mt-6 leading-relaxed">
          <strong>
            tú vendes. nosotros construimos. tu marca queda al frente.
          </strong>
        </p>

        <p className="not-first:mt-6 leading-relaxed">
          <strong>partner</strong>
          <br />
          tú vendes
          <br />
          defines precio, alcance y relación comercial con el cliente.
        </p>

        <p className="not-first:mt-6 leading-relaxed">
          <strong>factory</strong>
          <br />
          nosotros construimos
          <br />
          desarrollamos, desplegamos y mantenemos la infraestructura técnica.
          cada instancia es privada y dedicada.
        </p>

        <p className="not-first:mt-6 leading-relaxed">
          <strong>output</strong>
          <br />
          tu cliente recibe
          <br />
          un sistema funcional, estable y escalable operando bajo tu marca.
        </p>

        <p className="not-first:mt-6 leading-relaxed">
          <strong>system catalog</strong>
          <br />
          módulos listos para desplegar:
          <br />— voice agents (ventas, soporte, leads 24/7)
          <br />— whatsapp crm (seguimiento, nurturing, cierre)
          <br />— ocr automation (gastos, documentos)
          <br />— qr access systems (control de accesos)
          <br />— payment automation (cobranza inteligente)
        </p>

        <p className="not-first:mt-6 leading-relaxed">
          <strong>infraestructura</strong>
          <br />— instancias dedicadas por cliente (vps privada)
          <br />— cumplimiento con APIs oficiales (meta, etc.)
          <br />— escalabilidad sin degradación
        </p>

        <p className="not-first:mt-6 leading-relaxed">
          estos sistemas ya operan en producción. no son prototipos.
        </p>

        <p className="not-first:mt-6 leading-relaxed">
          creantly funciona como la capa de infraestructura que permite a
          agencias vender sistemas complejos sin equipo técnico interno.
        </p>

        <p className="not-first:mt-6 leading-relaxed">
          todo corre sobre un único entorno:
        </p>

        <p className="not-first:mt-6 leading-relaxed">
          <code className="relative z-10 px-[0.3rem] py-[0.2rem] font-mono text-primary-foreground text-sm outline-none before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:-rotate-1 before:rounded-xs before:bg-primary">
            CREANTLY_KEY=ITSTIMETOBUILD
          </code>
        </p>

        <CodeBlock
          code={code}
          copyButton={false}
          language="json"
          showLineNumbers={false}
          title="package.json"
        />

        <p className="not-first:mt-6 leading-relaxed">
          <strong>partner access</strong>
          <br />
          solicita acceso al catálogo privado de sistemas white label.
        </p>

        <p className="not-first:mt-6 leading-relaxed">
          si quieres activar este modelo en tu agencia, contáctanos{" "}
          <a
            className="font-medium underline underline-offset-4"
            href="/contact"
          >
            aquí
          </a>
          .
        </p>

        <p className="not-first:mt-6 leading-relaxed">—</p>
        <p className="not-first:mt-6 leading-relaxed">Nessin Alvarado</p>
        <p className="not-first:mt-6 text-sm leading-relaxed opacity-70">
          infrastructure architect · AI systems
        </p>
      </div>
    </main>
  );
}
