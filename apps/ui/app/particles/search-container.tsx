"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import { Index } from "@/registry/__index__";
import { getCategorySortOrder } from "@/registry/registry-categories";
import SearchField from "./search-field";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterItem = { label: string; value: string };

// ─── Constants ────────────────────────────────────────────────────────────────

const REGISTRY_BLOCKS = Object.values(Index).filter(
  (item) => item.type === "registry:block",
);

const SEARCH_ITEMS: FilterItem[] = Array.from(
  new Set(REGISTRY_BLOCKS.flatMap((block) => block.categories ?? [])),
)
  .sort((a, b) => getCategorySortOrder(a) - getCategorySortOrder(b))
  .map((category) => ({
    label: category
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    value: category,
  }));

// ─── Helpers ──────────────────────────────────────────────────────────────────

function tagsToItems(tags: string[]): FilterItem[] {
  return tags
    .map((tag) => SEARCH_ITEMS.find((item) => item.value === tag))
    .filter((item): item is FilterItem => !!item);
}

function itemsToQueryString(items: FilterItem[]): string {
  return items.map((item) => item.value).join(",");
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SearchContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const selectedItems = useMemo(() => {
    const tags = searchParams?.get("tags")?.split(",").filter(Boolean) ?? [];
    return tagsToItems(tags);
  }, [searchParams]);

  const updateSelectedItems = useCallback(
    (items: FilterItem[]) => {
      startTransition(() => {
        const tags = itemsToQueryString(items);
        const newUrl = tags
          ? `${pathname}?tags=${encodeURIComponent(tags)}`
          : pathname;
        router.push(newUrl, { scroll: false });
      });
    },
    [router, pathname],
  );

  return (
    <div className="mb-8 md:mb-12 lg:mb-16">
      <SearchField
        items={SEARCH_ITEMS}
        onItemsChange={updateSelectedItems}
        selectedItems={selectedItems}
      />
    </div>
  );
}
