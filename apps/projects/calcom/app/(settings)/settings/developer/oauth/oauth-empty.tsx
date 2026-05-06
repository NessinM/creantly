"use client";

import { Button } from "@creantly/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@creantly/ui/components/empty";
import { KeyIcon, PlusIcon } from "lucide-react";

interface OAuthEmptyProps {
  onNewClick: () => void;
}

export function OAuthEmpty({ onNewClick }: OAuthEmptyProps) {
  return (
    <Empty className="rounded-xl border border-dashed py-8 md:py-12">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <KeyIcon />
        </EmptyMedia>
        <EmptyTitle>No OAuth Clients</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any OAuth clients yet. Create one to get
          started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={onNewClick}>
          <PlusIcon />
          New
        </Button>
      </EmptyContent>
    </Empty>
  );
}
