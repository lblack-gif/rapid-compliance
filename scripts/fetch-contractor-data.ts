// Mock contractor data based on DCHA spreadsheet
export interface Contractor {
  id: string
  companyName: string
  contactPerson: string
  email: string
  phone: string
  address: string
  contractValue: number
  startDate: string
  endDate: string
  status: "active" | "pending" | "completed" | "cancelled"
  section3Commitment: number
  section3Actual: number
  workerCount: number
  certifications: string[]
  serviceType: "construction" | "non-construction"
  notes: string
}

// Generate comprehensive contractor data based on real DCHA contractors
export async function fetchContractorData(): Promise<Contractor[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const contractors: Contractor[] = [
    // Major Construction Contractors
    {
      id: "1",
      companyName: "Hamel Builders Inc.",
      contactPerson: "Michael Hamel",
      email: "mhamel@hamelbuilders.com",
      phone: "(202) 555-0101",
      address: "1234 Construction Ave, Washington, DC 20001",
      contractValue: 48900000,
      startDate: "2023-01-15",
      endDate: "2025-12-31",
      status: "active",
      section3Commitment: 30,
      section3Actual: 35,
      workerCount: 125,
      certifications: ["DBE", "MBE", "SBE"],
      serviceType: "construction",
      notes: "Primary general contractor for major housing development",
    },
    {
      id: "2",
      companyName: "Turner Construction Company",
      contactPerson: "Sarah Johnson",
      email: "sjohnson@turnerconstruction.com",
      phone: "(202) 555-0102",
      address: "5678 Builder Blvd, Washington, DC 20002",
      contractValue: 32500000,
      startDate: "2023-03-01",
      endDate: "2024-11-30",
      status: "active",
      section3Commitment: 25,
      section3Actual: 28,
      workerCount: 89,
      certifications: ["DBE", "LEED"],
      serviceType: "construction",
      notes: "Specializes in sustainable construction practices",
    },
    {
      id: "3",
      companyName: "Clark Construction Group",
      contactPerson: "David Clark",
      email: "dclark@clarkconstruction.com",
      phone: "(202) 555-0103",
      address: "9012 Development Dr, Washington, DC 20003",
      contractValue: 28750000,
      startDate: "2023-02-15",
      endDate: "2025-06-30",
      status: "active",
      section3Commitment: 30,
      section3Actual: 32,
      workerCount: 76,
      certifications: ["DBE", "MBE", "WBE"],
      serviceType: "construction",
      notes: "Multi-family housing specialist",
    },
    {
      id: "4",
      companyName: "Skanska USA Building Inc.",
      contactPerson: "Lisa Anderson",
      email: "landerson@skanska.com",
      phone: "(202) 555-0104",
      address: "3456 Infrastructure Way, Washington, DC 20004",
      contractValue: 25600000,
      startDate: "2023-04-01",
      endDate: "2024-12-15",
      status: "active",
      section3Commitment: 28,
      section3Actual: 31,
      workerCount: 68,
      certifications: ["DBE", "LEED", "OSHA"],
      serviceType: "construction",
      notes: "Focus on green building technologies",
    },
    {
      id: "5",
      companyName: "Gilbane Building Company",
      contactPerson: "Robert Martinez",
      email: "rmartinez@gilbaneco.com",
      phone: "(202) 555-0105",
      address: "7890 Commercial St, Washington, DC 20005",
      contractValue: 22300000,
      startDate: "2023-01-30",
      endDate: "2024-10-31",
      status: "active",
      section3Commitment: 25,
      section3Actual: 27,
      workerCount: 58,
      certifications: ["DBE", "SBE"],
      serviceType: "construction",
      notes: "Experienced in affordable housing projects",
    },

    // Professional Services Contractors
    {
      id: "6",
      companyName: "McKinsey & Company",
      contactPerson: "Jennifer Chen",
      email: "jennifer.chen@mckinsey.com",
      phone: "(202) 555-0106",
      address: "1111 Consulting Plaza, Washington, DC 20006",
      contractValue: 15800000,
      startDate: "2023-01-01",
      endDate: "2025-12-31",
      status: "active",
      section3Commitment: 20,
      section3Actual: 22,
      workerCount: 45,
      certifications: ["MBE", "WBE"],
      serviceType: "non-construction",
      notes: "Strategic consulting and program management",
    },
    {
      id: "7",
      companyName: "Deloitte Consulting LLP",
      contactPerson: "Mark Thompson",
      email: "mthompson@deloitte.com",
      phone: "(202) 555-0107",
      address: "2222 Advisory Ave, Washington, DC 20007",
      contractValue: 12400000,
      startDate: "2023-02-01",
      endDate: "2024-12-31",
      status: "active",
      section3Commitment: 18,
      section3Actual: 20,
      workerCount: 38,
      certifications: ["DBE", "SBE"],
      serviceType: "non-construction",
      notes: "Technology implementation and change management",
    },
    {
      id: "8",
      companyName: "KPMG LLP",
      contactPerson: "Amanda Rodriguez",
      email: "arodriguez@kpmg.com",
      phone: "(202) 555-0108",
      address: "3333 Audit Lane, Washington, DC 20008",
      contractValue: 9800000,
      startDate: "2023-03-15",
      endDate: "2024-11-30",
      status: "active",
      section3Commitment: 15,
      section3Actual: 18,
      workerCount: 32,
      certifications: ["MBE", "WBE"],
      serviceType: "non-construction",
      notes: "Financial auditing and compliance services",
    },

    // Technology Contractors
    {
      id: "9",
      companyName: "Yardi Systems Inc.",
      contactPerson: "Kevin Park",
      email: "kpark@yardi.com",
      phone: "(202) 555-0109",
      address: "4444 Software Blvd, Washington, DC 20009",
      contractValue: 8500000,
      startDate: "2023-01-15",
      endDate: "2025-01-15",
      status: "active",
      section3Commitment: 12,
      section3Actual: 15,
      workerCount: 28,
      certifications: ["SBE", "SDVOSB"],
      serviceType: "non-construction",
      notes: "Property management software implementation",
    },
    {
      id: "10",
      companyName: "Oracle Corporation",
      contactPerson: "Patricia Lee",
      email: "plee@oracle.com",
      phone: "(202) 555-0110",
      address: "5555 Database Dr, Washington, DC 20010",
      contractValue: 7200000,
      startDate: "2023-04-01",
      endDate: "2024-09-30",
      status: "active",
      section3Commitment: 10,
      section3Actual: 12,
      workerCount: 24,
      certifications: ["DBE", "SBE"],
      serviceType: "non-construction",
      notes: "Enterprise database and analytics platform",
    },

    // Additional contractors to reach 265 total
    ...generateAdditionalContractors(255),
  ]

  return contractors
}

function generateAdditionalContractors(count: number): Contractor[] {
  const contractors: Contractor[] = []
  const companyTypes = [
    "Construction",
    "Builders",
    "Development",
    "Services",
    "Solutions",
    "Group",
    "Associates",
    "Partners",
    "Consulting",
    "Technologies",
    "Systems",
    "Management",
    "Enterprises",
  ]
  const firstNames = [
    "John",
    "Jane",
    "Michael",
    "Sarah",
    "David",
    "Lisa",
    "Robert",
    "Jennifer",
    "Mark",
    "Amanda",
    "Kevin",
    "Patricia",
    "James",
    "Maria",
    "William",
    "Linda",
    "Richard",
    "Barbara",
    "Thomas",
    "Susan",
  ]
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
  ]
  const statuses: ("active" | "pending" | "completed" | "cancelled")[] = ["active", "pending", "completed", "cancelled"]
  const serviceTypes: ("construction" | "non-construction")[] = ["construction", "non-construction"]
  const certifications = ["DBE", "MBE", "WBE", "SBE", "SDVOSB", "HUBZone", "LEED", "OSHA"]

  for (let i = 0; i < count; i++) {
    const id = (i + 11).toString()
    const companyName = `${getRandomItem(firstNames)} ${getRandomItem(companyTypes)} ${getRandomItem(["Inc.", "LLC", "Corp.", "Co."])}`
    const firstName = getRandomItem(firstNames)
    const lastName = getRandomItem(lastNames)
    const serviceType = getRandomItem(serviceTypes)
    const status = getRandomItem(statuses)

    // Weight towards active status
    const finalStatus = Math.random() < 0.6 ? "active" : status

    contractors.push({
      id,
      companyName,
      contactPerson: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${companyName.toLowerCase().replace(/[^a-z]/g, "")}.com`,
      phone: `(202) 555-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
      address: `${Math.floor(Math.random() * 9999) + 1000} ${getRandomItem(["Main", "Oak", "Pine", "Elm", "Cedar", "Maple"])} ${getRandomItem(["St", "Ave", "Blvd", "Dr", "Way"])}, Washington, DC 200${String(Math.floor(Math.random() * 50) + 10).padStart(2, "0")}`,
      contractValue: Math.floor(Math.random() * 5000000) + 100000, // $100K to $5M
      startDate: `202${Math.floor(Math.random() * 2) + 3}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      endDate: `202${Math.floor(Math.random() * 2) + 4}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      status: finalStatus,
      section3Commitment: Math.floor(Math.random() * 25) + 10, // 10-35%
      section3Actual: Math.floor(Math.random() * 30) + 5, // 5-35%
      workerCount: Math.floor(Math.random() * 50) + 5, // 5-55 workers
      certifications: getRandomCertifications(certifications),
      serviceType,
      notes: getRandomNotes(serviceType),
    })
  }

  return contractors
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomCertifications(allCerts: string[]): string[] {
  const count = Math.floor(Math.random() * 3) + 1 // 1-3 certifications
  const shuffled = [...allCerts].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function getRandomNotes(serviceType: "construction" | "non-construction"): string {
  const constructionNotes = [
    "Specializes in residential construction",
    "Focus on commercial building projects",
    "Experienced in renovation and rehabilitation",
    "Green building and sustainability focus",
    "Multi-family housing specialist",
    "Infrastructure and site development",
  ]

  const nonConstructionNotes = [
    "Professional consulting services",
    "Technology implementation and support",
    "Property management services",
    "Financial and accounting services",
    "Legal and compliance consulting",
    "Training and workforce development",
  ]

  return serviceType === "construction" ? getRandomItem(constructionNotes) : getRandomItem(nonConstructionNotes)
}

export function exportContractorsToCSV(contractors: Contractor[]): string {
  const headers = [
    "Company Name",
    "Contact Person",
    "Email",
    "Phone",
    "Address",
    "Contract Value",
    "Start Date",
    "End Date",
    "Status",
    "Section 3 Commitment %",
    "Section 3 Actual %",
    "Worker Count",
    "Certifications",
    "Service Type",
    "Notes",
  ]

  const csvContent = [
    headers.join(","),
    ...contractors.map((contractor) =>
      [
        `"${contractor.companyName}"`,
        `"${contractor.contactPerson}"`,
        contractor.email,
        contractor.phone,
        `"${contractor.address}"`,
        contractor.contractValue,
        contractor.startDate,
        contractor.endDate,
        contractor.status,
        contractor.section3Commitment,
        contractor.section3Actual,
        contractor.workerCount,
        `"${contractor.certifications.join("; ")}"`,
        contractor.serviceType,
        `"${contractor.notes}"`,
      ].join(","),
    ),
  ].join("\n")

  return csvContent
}
