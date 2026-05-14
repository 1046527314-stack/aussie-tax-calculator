export default function sitemap() {
  const salaries = [
    50000,
    60000,
    70000,
    80000,
    90000,
    100000,
    110000,
    120000,
    130000,
    150000,
  ]

  const salaryPages = salaries.map((salary) => ({
    url: `https://aussietaxmate.com/${salary}-after-tax-australia`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: "https://aussietaxmate.com",
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },

    {
      url: "https://aussietaxmate.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },

    {
      url: "https://aussietaxmate.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },

    {
      url: "https://aussietaxmate.com/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },

    ...salaryPages,
  ]
}