"use client";

import { LabelIcon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Index } from "@/registry/__index__";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxSeparator,
  ComboboxValue,
} from "@/registry/default/ui/combobox";
import { getCategorySortOrder } from "@/registry/registry-categories";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterItem = { label: string; value: string };

interface SearchFieldProps {
  selectedItems: FilterItem[];
  onItemsChange: (items: FilterItem[]) => void;
  items: FilterItem[];
}

interface RegistryItem {
  type?: string;
  categories?: string[];
}

type GroupType = "enabled" | "disabled";

interface ItemGroup {
  type: GroupType;
  items: FilterItem[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const REGISTRY_BLOCKS = Object.values(Index).filter(
  (item: RegistryItem) => item.type === "registry:block",
);

const GROUP_LABELS: Record<GroupType, string> = {
  enabled: "Filter particles",
  disabled: "No matches",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns true if adding `candidateValue` to `selectedValues`
 * would still match at least one registry block.
 */
function hasMatchingParticles(
  selectedValues: string[],
  candidateValue: string,
): boolean {
  const testValues = [...selectedValues, candidateValue];
  return REGISTRY_BLOCKS.some((block: RegistryItem) => {
    const categories = block.categories ?? [];
    return testValues.every((value) => categories.includes(value));
  });
}

function sortByCategory(a: FilterItem, b: FilterItem): number {
  return getCategorySortOrder(a.value) - getCategorySortOrder(b.value);
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useGroupedItems(
  items: FilterItem[],
  selectedItems: FilterItem[],
): ItemGroup[] {
  return useMemo(() => {
    const selectedValues = selectedItems.map((item) => item.value);

    const enabled: FilterItem[] = [];
    const disabled: FilterItem[] = [];

    for (const item of items) {
      const isSelected = selectedValues.includes(item.value);
      const wouldMatch =
        isSelected || hasMatchingParticles(selectedValues, item.value);

      if (wouldMatch) {
        enabled.push(item);
      } else {
        disabled.push(item);
      }
    }

    // Selected items first, then sort the rest by custom category order
    const sortedEnabled = [...enabled].sort((a, b) => {
      const aSelected = selectedValues.includes(a.value);
      const bSelected = selectedValues.includes(b.value);
      if (aSelected !== bSelected) return aSelected ? -1 : 1;
      return sortByCategory(a, b);
    });

    const sortedDisabled = [...disabled].sort(sortByCategory);

    const groups: ItemGroup[] = [];
    if (sortedEnabled.length > 0)
      groups.push({ type: "enabled", items: sortedEnabled });
    if (sortedDisabled.length > 0)
      groups.push({ type: "disabled", items: sortedDisabled });

    return groups;
  }, [items, selectedItems]);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LabeledItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <HugeiconsIcon className="opacity-80" icon={LabelIcon} strokeWidth={2} />
      <span>{label}</span>
    </div>
  );
}

function SelectedChip({ item }: { item: FilterItem }) {
  return (
    <ComboboxChip aria-label={item.label} key={item.value}>
      <div className="flex items-center gap-1.5">
        <HugeiconsIcon
          className="opacity-80"
          icon={LabelIcon}
          strokeWidth={2}
        />
        <span>{item.label}</span>
      </div>
    </ComboboxChip>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SearchField({
  selectedItems,
  onItemsChange,
  items,
}: SearchFieldProps) {
  const [open, setOpen] = useState(selectedItems.length === 0);
  const groupedItems = useGroupedItems(items, selectedItems);

  // Keep popup open when nothing is selected
  useEffect(() => {
    if (selectedItems.length === 0) setOpen(true);
  }, [selectedItems.length]);

  const handleValueChange = (newItems: FilterItem[]) => {
    onItemsChange(newItems);
    setOpen(false);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Combobox
        aria-label="Filter particles"
        autoHighlight
        items={groupedItems}
        multiple
        onOpenChange={setOpen}
        onValueChange={handleValueChange}
        open={open}
        value={selectedItems}
      >
        <ComboboxChips
          className="rounded-xl p-[calc(--spacing(2)-1px)] before:rounded-xl **:data-[slot=combobox-start-addon]:[&_svg]:-me-0.5"
          startAddon={
            <HugeiconsIcon
              className="size-5.5 sm:size-5"
              icon={Search01Icon}
              strokeWidth={2}
            />
          }
        >
          <ComboboxValue>
            {(value: FilterItem[]) => (
              <>
                {value?.map((item) => (
                  <SelectedChip key={item.value} item={item} />
                ))}
                <ComboboxChipsInput
                  aria-label="Search components"
                  autoFocus
                  size="lg"
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>

        <ComboboxPopup>
          <ComboboxEmpty>No filters found.</ComboboxEmpty>
          <ComboboxList>
            {(group: ItemGroup) => (
              <React.Fragment key={group.type}>
                {group.type === "disabled" && (
                  <ComboboxSeparator className="my-2" />
                )}
                <ComboboxGroup items={group.items}>
                  <ComboboxGroupLabel>
                    {GROUP_LABELS[group.type]}
                  </ComboboxGroupLabel>
                  <ComboboxCollection>
                    {(item: FilterItem) => (
                      <ComboboxItem
                        disabled={group.type === "disabled"}
                        key={item.value}
                        value={item}
                      >
                        <LabeledItem label={item.label} />
                      </ComboboxItem>
                    )}
                  </ComboboxCollection>
                </ComboboxGroup>
              </React.Fragment>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </div>
  );
}
