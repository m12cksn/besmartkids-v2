import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GradeGrid } from "@/features/catalog/grade-grid";
import { getGrade } from "@/features/catalog/data";

describe("grade availability", () => {
  it("shows six grades but links only the pilot preview", () => {
    render(<GradeGrid />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(6);
    expect(screen.getAllByText("Segera hadir")).toHaveLength(5);
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(
      screen.getByRole("link", { name: /Lihat pratinjau kelas 5/ }),
    ).toHaveAttribute("href", "/grades/5/topics");
  });
  it.each(["0", "7", "05", "abc", "1.5"])(
    "rejects invalid grade %s",
    (value) => {
      expect(getGrade(value)).toBeUndefined();
    },
  );
});
