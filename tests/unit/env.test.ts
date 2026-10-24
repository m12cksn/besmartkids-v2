import { afterEach, describe, expect, it } from "vitest";

import { getPublicEnv } from "@/lib/validation/env";

const originalEnv = process.env;

afterEach(() => {
  process.env = originalEnv;
});

describe("getPublicEnv", () => {
  it("accepts a valid public Supabase configuration", () => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "publishable-key",
    };
    expect(getPublicEnv().NEXT_PUBLIC_SUPABASE_URL).toBe("https://example.supabase.co");
  });

  it("fails with a safe message when configuration is absent", () => {
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    expect(() => getPublicEnv()).toThrow("Konfigurasi Supabase belum lengkap");
  });
});
