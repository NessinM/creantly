import { Icons } from "@creantly/ui/shared/icons";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cache } from "react";
import { Index } from "@/registry/__index__";
import { Button } from "@/registry/default/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerPopup,
  DrawerTrigger,
} from "@/registry/default/ui/drawer";
import { ParticleCardContainer } from "./particle-card-container";
import { CodeBlockCommand } from "@/components/code-block-command";
import { ComponentSource } from "@/components/component-source";
import { CopyRegistry } from "@/components/copy-registry";
import { getRegistryItem } from "@/lib/registry";

// ─── Constants ────────────────────────────────────────────────────────────────

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://creantly.com/ui";
const IS_DEV = process.env.NODE_ENV === "development";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getCachedRegistryItem = cache((name: string) => getRegistryItem(name));

function registryUrl(name: string) {
  return `${APP_URL}/r/${name}.json`;
}

function v0Url(name: string) {
  return `https://v0.dev/chat/api/open?url=${encodeURIComponent(registryUrl(name))}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ParticleRenderer({ name }: { name: string }) {
  const Component = Index[name]?.component;

  if (!Component) {
    return (
      <p className="text-muted-foreground text-sm">
        Component {name} not found
      </p>
    );
  }

  return <Component currentPage={1} totalPages={10} totalResults={100} />;
}

function InstallCommand({ name }: { name: string }) {
  return (
    <div>
      <h2 className="mb-4 font-heading font-semibold text-xl">Installation</h2>
      <figure data-rehype-pretty-code-figure>
        <CodeBlockCommand
          __bun__={`bunx --bun shadcn@latest add @creantly/${name}`}
          __npm__={`npx shadcn@latest add @creantly/${name}`}
          __pnpm__={`pnpm dlx shadcn@latest add @creantly/${name}`}
          __yarn__={`yarn dlx shadcn@latest add @creantly/${name}`}
        />
      </figure>
    </div>
  );
}

function CodeSection({ name }: { name: string }) {
  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <h2 className="mt-6 mb-4 font-heading font-semibold text-xl">Code</h2>
        <Button
          render={
            <a href={v0Url(name)} rel="noopener noreferrer" target="_blank">
              Open in<span className="sr-only">v0</span>
              <Icons.v0 className="size-5" />
            </a>
          }
          variant="outline"
        />
      </div>
      <ComponentSource
        className="flex min-h-0 flex-1 flex-col *:data-rehype-pretty-code-figure:mt-0"
        collapsible={false}
        name={name}
      />
    </div>
  );
}

function ViewCodeDrawer({ name }: { name: string }) {
  return (
    <Drawer position="right">
      <DrawerTrigger
        render={<Button className="text-sm" size="sm" variant="outline" />}
      >
        View code
      </DrawerTrigger>
      <DrawerPopup
        className="max-w-4xl"
        showBar
        showCloseButton={false}
        variant="straight"
      >
        <DrawerContent className="flex flex-1 flex-col overflow-hidden p-6">
          <InstallCommand name={name} />
          <CodeSection name={name} />
        </DrawerContent>
      </DrawerPopup>
    </Drawer>
  );
}

function ParticleFooter({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <>
      <p className="flex flex-1 gap-1 truncate text-muted-foreground text-xs">
        <HugeiconsIcon
          className="size-3 h-lh shrink-0"
          icon={InformationCircleIcon}
          strokeWidth={2}
        />
        <span className="truncate">{description}</span>
      </p>
      <div className="flex items-center gap-1.5">
        {IS_DEV && (
          <Button
            className="text-xs"
            disabled
            size="sm"
            title="Particle name"
            variant="outline"
          >
            {name}
          </Button>
        )}
        <CopyRegistry value={registryUrl(name)} variant="outline" />
        <ViewCodeDrawer name={name} />
      </div>
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export async function ParticleCard({
  name,
  className,
  colSpan,
}: {
  name: string;
  className?: string;
  colSpan?: number;
}) {
  const particle = await getCachedRegistryItem(name);

  if (!particle) return null;

  return (
    <ParticleCardContainer
      className={className}
      colSpan={colSpan}
      footer={<ParticleFooter name={name} description={particle.description} />}
    >
      <div data-particle data-slot="preview">
        <ParticleRenderer name={name} />
      </div>
    </ParticleCardContainer>
  );
}
