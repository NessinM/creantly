import { cache, Suspense } from "react";
import { Index } from "@/registry/__index__";
import { Skeleton } from "@/registry/default/ui/skeleton";
import type { RegistryCategory } from "@/registry/registry-categories";
import { ParticleCard } from "./particle-card";
import { ParticleCardContainer } from "./particle-card-container";

// ─── Types ────────────────────────────────────────────────────────────────────

type Particle = {
  name: string;
  categories?: RegistryCategory[];
  registryDependencies?: string[];
  meta?: { className?: string; colSpan?: number };
};

// ─── Constants ────────────────────────────────────────────────────────────────

const RELEVANCE_WEIGHTS = {
  namePrefix: 30,
  registryDep: 20,
  firstCategory: 10,
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function calculateRelevanceWeight(
  particle: Particle,
  searchTerms: RegistryCategory[],
): number {
  let weight = 0;

  for (const term of searchTerms) {
    const slug = term.replace(/\s+/g, "-");
    const deps = particle.registryDependencies ?? [];
    const categories = particle.categories ?? [];

    if (particle.name.startsWith(`p-${slug}-`))
      weight += RELEVANCE_WEIGHTS.namePrefix;
    if (deps.includes(`@creantly/${slug}`))
      weight += RELEVANCE_WEIGHTS.registryDep;
    if (categories[0] === term) weight += RELEVANCE_WEIGHTS.firstCategory;
  }

  return weight;
}

function matchesAllCategories(
  particle: Particle,
  selected: RegistryCategory[],
): boolean {
  const categories = particle.categories ?? [];
  return selected.every((cat) => categories.includes(cat));
}

const getParticles = cache(
  (): Particle[] =>
    Object.values(Index).filter(
      (item) => item.type === "registry:block",
    ) as Particle[],
);

// ─── Sub-components ───────────────────────────────────────────────────────────

function ParticleCardSkeleton({ className }: { className?: string }) {
  return (
    <ParticleCardContainer
      className={className}
      footer={
        <>
          <div className="flex flex-1 gap-1">
            <Skeleton className="size-4 shrink-0" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="size-7" />
            <Skeleton className="h-7 w-20" />
          </div>
        </>
      }
    >
      <Skeleton className="h-7 w-64" />
    </ParticleCardContainer>
  );
}

function EmptyState() {
  return (
    <div className="text-center">
      <p className="text-muted-foreground">
        No particles found for the selected filters
      </p>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export async function ParticlesDisplay({
  selectedCategories,
}: {
  selectedCategories: RegistryCategory[];
}) {
  const particles = getParticles();

  const filteredParticles = particles
    .filter((particle) => matchesAllCategories(particle, selectedCategories))
    .sort(
      (a, b) =>
        calculateRelevanceWeight(b, selectedCategories) -
        calculateRelevanceWeight(a, selectedCategories),
    );

  if (filteredParticles.length === 0) return <EmptyState />;

  return (
    <div className="grid flex-1 items-stretch gap-9 pb-12 lg:grid-cols-2 lg:gap-6 xl:gap-9">
      {filteredParticles.map(({ name, meta }) => (
        <Suspense
          fallback={<ParticleCardSkeleton className={meta?.className} />}
          key={name}
        >
          <ParticleCard
            className={meta?.className}
            colSpan={meta?.colSpan}
            name={name}
          />
        </Suspense>
      ))}
    </div>
  );
}
