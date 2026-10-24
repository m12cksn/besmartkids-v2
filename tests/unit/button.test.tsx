import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders an accessible button and handles activation", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Mulai belajar</Button>);

    await user.click(screen.getByRole("button", { name: "Mulai belajar" }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("supports link composition", () => {
    render(<Button asChild><a href="#status">Lihat status</a></Button>);
    expect(screen.getByRole("link", { name: "Lihat status" })).toHaveAttribute("href", "#status");
  });
});
