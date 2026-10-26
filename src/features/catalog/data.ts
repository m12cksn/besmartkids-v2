/** Sprint 1 preview data, not published lessons or a backend connection. */
export type GradePreview = {
  id: number;
  title: string;
  description: string;
  status: "upcoming" | "preview";
};
export const grades: readonly GradePreview[] = [
  {
    id: 1,
    title: "Langkah pertama",
    description: "Mengenal angka dan dunia di sekitar kita.",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Makin percaya diri",
    description: "Menjelajahi bilangan dan pola sederhana.",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Saatnya menemukan",
    description: "Membangun cara berpikir matematika.",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Hubungkan idenya",
    description: "Melihat hubungan antar konsep.",
    status: "upcoming",
  },
  {
    id: 5,
    title: "Satu konsep, banyak cara",
    description: "Kenali pecahan, desimal, dan persentase.",
    status: "preview",
  },
  {
    id: 6,
    title: "Siap melangkah jauh",
    description: "Menguatkan pemahaman untuk tahap berikutnya.",
    status: "upcoming",
  },
];
export function getGrade(segment: string) {
  return grades.find((g) => String(g.id) === segment);
}
export const pilotTopics = [
  {
    slug: "pecahan",
    title: "Pecahan",
    symbol: "¾",
    description: "Lihat bagian-bagian yang membentuk satu kesatuan.",
    example: "3 dari 4 bagian sama besar = ¾",
  },
  {
    slug: "desimal",
    title: "Desimal",
    symbol: "0,75",
    description: "Temukan arti angka di belakang koma.",
    example: "75 per seratus ditulis 0,75",
  },
  {
    slug: "persentase",
    title: "Persentase",
    symbol: "75%",
    description: "Pahami cara menyatakan bagian dari seratus.",
    example: "75 dari 100 bagian = 75%",
  },
] as const;
