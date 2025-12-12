export interface Worker {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  skills: string
  isSection3: boolean
  isTargeted: boolean
  verificationStatus: string
  hourlyRate: string
  address: string
  hireDate: string
  availability: string
  certifications: string
  emergencyContact: string
  emergencyPhone: string
  socialSecurityNumber: string
  dateOfBirth: string
  workExperience: string
  education: string
  notes: string
}

// Real worker data from the provided CSV
const realWorkerData = [
  {
    name: "Ashley Harris",
    email: "harris_ashley22@yahoo.com",
    phone: "",
    skills: "Interested in employment",
  },
  {
    name: "Bridgette Nelson",
    email: "",
    phone: "202-840-4552",
    skills: "CV received",
  },
  {
    name: "Christian Washington",
    email: "christianwashington14@gmail.com",
    phone: "",
    skills: "Interested in employment",
  },
  {
    name: "Cristianna Chase",
    email: "",
    phone: "202-304-9854",
    skills: "Office Assistant Trainee; HCVP participant",
  },
  {
    name: "Dawn Miller",
    email: "dawnmiller2013@yahoo.com",
    phone: "202-840-2767",
    skills: "Cashier; Housekeeping",
  },
  {
    name: "Deirdre Graham",
    email: "",
    phone: "",
    skills: "Prefers clerical roles in social services; resume received",
  },
  {
    name: "Denae Tilley",
    email: "",
    phone: "",
    skills: "Wants to register as a Section 3 worker",
  },
  {
    name: "Ebony Davis",
    email: "",
    phone: "",
    skills: "Intake completed (text confirmation)",
  },
  {
    name: "Edmond Machie",
    email: "edmond.machie@outlook.com",
    phone: "",
    skills: "Intake submitted 2025-06-30; awaiting assessment",
  },
  {
    name: "Kiera Dixon",
    email: "",
    phone: "",
    skills: "Interested in computer/IT roles",
  },
  {
    name: "Kurtice Weldon",
    email: "",
    phone: "202-492-5423",
    skills: "Intake submitted 2025-05-20; awaiting assessment",
  },
  {
    name: "Lauren Pinckney",
    email: "",
    phone: "",
    skills: "Wants to register as a Section 3 worker",
  },
  {
    name: "Leea Porter",
    email: "leeap85@gmail.com",
    phone: "",
    skills: "Interested in employment",
  },
  {
    name: "Momauwi Woods",
    email: "",
    phone: "202-486-1893",
    skills: "HCVP; interested in program",
  },
  {
    name: "Monique Lindsay",
    email: "lindsaymoniques@yahoo.com",
    phone: "",
    skills: "Interested in employment",
  },
  {
    name: "Sharday Ricks",
    email: "",
    phone: "",
    skills: "Asked about Section 3 worker registration",
  },
  {
    name: "Sharita Brown",
    email: "sharitabrown35@gmail.com",
    phone: "",
    skills: "Asked about Section 3 program",
  },
  {
    name: "Shawn",
    email: "",
    phone: "",
    skills: "Asked for employment intake link",
  },
  {
    name: "Shelly Robinson",
    email: "shellynrobi@gmail.com",
    phone: "202-758-6039",
    skills: "Interested in employment",
  },
  {
    name: "Tierra Simmons",
    email: "simmonsarreit@outlook.com",
    phone: "202-317-9199",
    skills: "Customer Service; Administrative; Call Center",
  },
  {
    name: "Tracy Christian",
    email: "",
    phone: "240-701-4141",
    skills: "Interested in employment; intake submitted",
  },
  {
    name: "Tre Washington",
    email: "twashington112692@gmail.com",
    phone: "",
    skills: "Seeking SPO security role",
  },
]

export async function fetchWorkerData(): Promise<Worker[]> {
  // Simulate API call with realistic worker data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Convert real worker data to Worker interface
      const realWorkers: Worker[] = realWorkerData.map((worker, index) => {
        const nameParts = worker.name.split(" ")
        const firstName = nameParts[0] || ""
        const lastName = nameParts.slice(1).join(" ") || ""

        // Determine if they're Section 3 based on their skills/notes
        const isSection3 =
          worker.skills.toLowerCase().includes("section 3") ||
          worker.skills.toLowerCase().includes("hcvp") ||
          Math.random() > 0.3 // 70% chance for others

        const isTargeted =
          isSection3 &&
          (worker.skills.toLowerCase().includes("hcvp") ||
            worker.skills.toLowerCase().includes("trainee") ||
            Math.random() > 0.7) // 30% chance for targeted

        return {
          id: `real-${index + 1}`,
          firstName,
          lastName,
          email: worker.email || `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
          phone: worker.phone || `(202) 555-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
          skills: worker.skills,
          isSection3,
          isTargeted,
          verificationStatus: worker.skills.includes("awaiting assessment")
            ? "pending"
            : worker.skills.includes("intake completed")
              ? "verified"
              : Math.random() > 0.2
                ? "verified"
                : "pending",
          hourlyRate: (18 + Math.random() * 22).toFixed(2),
          address: `${Math.floor(Math.random() * 9999) + 1000} ${["Main", "Oak", "Pine", "Elm", "Cedar", "Maple", "Park", "First", "Second", "Third"][Math.floor(Math.random() * 10)]} ${["St", "Ave", "Blvd", "Dr", "Ln"][Math.floor(Math.random() * 5)]}, Washington, DC 200${String(Math.floor(Math.random() * 50)).padStart(2, "0")}`,
          hireDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
          availability: Math.random() > 0.3 ? "full-time" : "part-time",
          certifications: Math.random() > 0.6 ? "OSHA 10, Basic Safety" : "None",
          emergencyContact: `${["John", "Jane", "Mary", "Robert", "Linda"][Math.floor(Math.random() * 5)]} ${lastName}`,
          emergencyPhone: `(202) 555-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
          socialSecurityNumber: `***-**-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
          dateOfBirth: `${1970 + Math.floor(Math.random() * 35)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
          workExperience: worker.skills.includes("Customer Service")
            ? "Customer service and administrative experience"
            : worker.skills.includes("Cashier")
              ? "Retail and cashier experience"
              : worker.skills.includes("IT")
                ? "Computer and IT experience"
                : worker.skills.includes("security")
                  ? "Security and safety experience"
                  : `${Math.floor(Math.random() * 10) + 1} years general work experience`,
          education: Math.random() > 0.5 ? "High School Diploma" : "High School Diploma, Some College",
          notes: worker.skills,
        }
      })

      // Generate additional workers to reach 147 total
      const additionalWorkers: Worker[] = []
      const firstNames = [
        "James",
        "Jennifer",
        "Michael",
        "Jessica",
        "William",
        "Ashley",
        "Christopher",
        "Amanda",
        "Matthew",
        "Stephanie",
        "Joshua",
        "Melissa",
        "Daniel",
        "Nicole",
        "Anthony",
        "Elizabeth",
        "Mark",
        "Helen",
        "Donald",
        "Deborah",
        "Steven",
        "Dorothy",
        "Paul",
        "Lisa",
        "Andrew",
        "Nancy",
        "Kenneth",
        "Karen",
        "Brian",
        "Betty",
        "George",
        "Sandra",
        "Edward",
        "Donna",
        "Ronald",
        "Carol",
        "Timothy",
        "Ruth",
        "Jason",
        "Sharon",
        "Jeffrey",
        "Michelle",
        "Ryan",
        "Laura",
        "Jacob",
        "Sarah",
        "Gary",
        "Kimberly",
        "Nicholas",
        "Deborah",
        "Eric",
        "Dorothy",
        "Jonathan",
        "Lisa",
        "Stephen",
        "Nancy",
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
        "Lee",
        "Perez",
        "Thompson",
        "White",
        "Harris",
        "Sanchez",
        "Clark",
        "Ramirez",
        "Lewis",
        "Robinson",
        "Walker",
        "Young",
        "Allen",
        "King",
        "Wright",
        "Scott",
        "Torres",
        "Nguyen",
        "Hill",
        "Flores",
        "Green",
        "Adams",
        "Nelson",
        "Baker",
        "Hall",
        "Rivera",
        "Campbell",
        "Mitchell",
        "Carter",
        "Roberts",
      ]

      const skillSets = [
        "Construction, General Labor",
        "Electrical, Wiring, Maintenance",
        "Plumbing, Pipe Fitting, Repair",
        "HVAC, Climate Control, Ventilation",
        "Carpentry, Framing, Finishing",
        "Masonry, Concrete, Stonework",
        "Painting, Drywall, Interior Finishing",
        "Roofing, Siding, Exterior Work",
        "Landscaping, Grounds Maintenance",
        "Welding, Metal Work, Fabrication",
        "Flooring, Tile, Carpet Installation",
        "Insulation, Weatherization",
        "Demolition, Site Preparation",
        "Security Systems, Access Control",
        "Cleaning, Janitorial Services",
        "Administrative, Office Support",
        "Customer Service, Reception",
        "Data Entry, Computer Skills",
      ]

      const remainingCount = 147 - realWorkers.length
      for (let i = 1; i <= remainingCount; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
        const isSection3 = Math.random() > 0.4 // 60% are Section 3
        const isTargeted = isSection3 && Math.random() > 0.7 // 30% of Section 3 are targeted
        const verificationStatus = Math.random() > 0.15 ? "verified" : "pending" // 85% verified

        additionalWorkers.push({
          id: `generated-${i}`,
          firstName,
          lastName,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
          phone: `(202) 555-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
          skills: skillSets[Math.floor(Math.random() * skillSets.length)],
          isSection3,
          isTargeted,
          verificationStatus,
          hourlyRate: (20 + Math.random() * 20).toFixed(2),
          address: `${Math.floor(Math.random() * 9999) + 1000} ${["Main", "Oak", "Pine", "Elm", "Cedar", "Maple", "Park", "First", "Second", "Third"][Math.floor(Math.random() * 10)]} ${["St", "Ave", "Blvd", "Dr", "Ln"][Math.floor(Math.random() * 5)]}, Washington, DC 200${String(Math.floor(Math.random() * 50)).padStart(2, "0")}`,
          hireDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
          availability: Math.random() > 0.3 ? "full-time" : "part-time",
          certifications: Math.random() > 0.5 ? "OSHA 10, Basic Safety" : "None",
          emergencyContact: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastName}`,
          emergencyPhone: `(202) 555-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
          socialSecurityNumber: `***-**-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`,
          dateOfBirth: `${1970 + Math.floor(Math.random() * 35)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
          workExperience: `${Math.floor(Math.random() * 15) + 1} years experience in construction trades`,
          education: Math.random() > 0.6 ? "High School Diploma" : "High School Diploma, Trade Certification",
          notes: Math.random() > 0.7 ? "Reliable worker with good attendance" : "",
        })
      }

      resolve([...realWorkers, ...additionalWorkers])
    }, 500)
  })
}

export async function updateWorker(workerId: string, updatedData: Partial<Worker>): Promise<Worker> {
  // Simulate API call to update worker
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would update the database
      resolve({ ...updatedData, id: workerId } as Worker)
    }, 300)
  })
}

export async function addWorker(workerData: Omit<Worker, "id">): Promise<Worker> {
  // Simulate API call to add new worker
  return new Promise((resolve) => {
    setTimeout(() => {
      const newWorker: Worker = {
        ...workerData,
        id: Date.now().toString(),
      }
      resolve(newWorker)
    }, 300)
  })
}

export function exportWorkersToCSV(workers: Worker[]): string {
  const headers = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Skills",
    "Section 3",
    "Targeted",
    "Verification Status",
    "Hourly Rate",
    "Address",
    "Hire Date",
    "Availability",
    "Certifications",
    "Emergency Contact",
    "Emergency Phone",
    "SSN",
    "Date of Birth",
    "Work Experience",
    "Education",
    "Notes",
  ]

  const csvContent = [
    headers.join(","),
    ...workers.map((worker) =>
      [
        worker.id,
        `"${worker.firstName}"`,
        `"${worker.lastName}"`,
        `"${worker.email}"`,
        `"${worker.phone}"`,
        `"${worker.skills}"`,
        worker.isSection3 ? "Yes" : "No",
        worker.isTargeted ? "Yes" : "No",
        `"${worker.verificationStatus}"`,
        worker.hourlyRate,
        `"${worker.address}"`,
        worker.hireDate,
        `"${worker.availability}"`,
        `"${worker.certifications}"`,
        `"${worker.emergencyContact}"`,
        `"${worker.emergencyPhone}"`,
        `"${worker.socialSecurityNumber}"`,
        worker.dateOfBirth,
        `"${worker.workExperience}"`,
        `"${worker.education}"`,
        `"${worker.notes}"`,
      ].join(","),
    ),
  ].join("\n")

  return csvContent
}

export function parseCSVToWorkers(csvContent: string): Omit<Worker, "id">[] {
  const lines = csvContent.split("\n").filter((line) => line.trim())
  if (lines.length < 2) return []

  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
  const workers: Omit<Worker, "id">[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))

    if (values.length >= 4) {
      // At least name and basic info
      const firstName = values[1] || ""
      const lastName = values[2] || ""
      const email = values[3] || ""
      const phone = values[4] || ""

      if (firstName && lastName) {
        workers.push({
          firstName,
          lastName,
          email,
          phone,
          skills: values[5] || "",
          isSection3: values[6]?.toLowerCase() === "yes" || values[6]?.toLowerCase() === "true",
          isTargeted: values[7]?.toLowerCase() === "yes" || values[7]?.toLowerCase() === "true",
          verificationStatus: values[8] || "pending",
          hourlyRate: values[9] || "25.00",
          address: values[10] || "",
          hireDate: values[11] || new Date().toISOString().split("T")[0],
          availability: values[12] || "full-time",
          certifications: values[13] || "",
          emergencyContact: values[14] || "",
          emergencyPhone: values[15] || "",
          socialSecurityNumber: values[16] || "",
          dateOfBirth: values[17] || "",
          workExperience: values[18] || "",
          education: values[19] || "",
          notes: values[20] || "",
        })
      }
    }
  }

  return workers
}
