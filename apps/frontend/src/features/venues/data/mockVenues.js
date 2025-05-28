// src/data/mockVenues.js

export const mockVenues = [
  {
    abbreviation: "CSE-101",
    block: "Block-A",
    capacity: 120,
    venueNumber: 5,
    description:
      "Main lecture hall equipped with projector, smart board, and AC. Suitable for large classes and seminars.",
    equipment: ["Projector", "Whiteboard", "AC"],
    images: [
      "https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    name: "Computer Science Lecture Hall",
    status: "available",
  },
  {
    abbreviation: "ELE-202",
    block: "Block-B",
    capacity: 80,
    venueNumber: 3,
    description:
      "Electrical Engineering lab with workbenches, oscilloscopes, and high-voltage safety systems. Ideal for practicals and experiments.",
    equipment: ["Oscilloscopes", "Multimeters", "Power Supply Units"],
    images: [
      "https://images.pexels.com/photos/256369/pexels-photo-256369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    name: "Electronics Lab",
    status: "available",
  },
  {
    abbreviation: "CIV-315",
    block: "Block-C",
    capacity: 40,
    venueNumber: 7,
    description:
      "Civil Engineering seminar room for group discussions, presentations, and project critiques.",
    equipment: ["Smart TV", "Whiteboard", "Conference Tables"],
    images: [
      "https://images.pexels.com/photos/159213/conference-conference-room-meeting-room-table-159213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    name: "Civil Eng Seminar Room",
    status: "occupied",
  },
  {
    abbreviation: "MECH-110",
    block: "Block-D",
    capacity: 60,
    venueNumber: 2,
    description:
      "Mechanical workshop for practicals. Equipped with lathes, milling machines, and safety gear.",
    equipment: ["Lathe Machines", "Milling Machines", "Welding Equipment"],
    images: [
      "https://images.pexels.com/photos/256297/pexels-photo-256297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    name: "Mechanical Workshop",
    status: "available",
  },
  {
    abbreviation: "SCI-205",
    block: "Block-E",
    capacity: 100,
    venueNumber: 6,
    description:
      "General science lecture theatre with tiered seating and dual-screen projection. Frequently used for interdisciplinary sessions.",
    equipment: ["Dual Projectors", "Sound System", "AC"],
    images: [
      "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    name: "Science Lecture Theatre",
    status: "maintenance",
  },
  {
    abbreviation: "ICT-404",
    block: "ICT-Center",
    capacity: 50,
    venueNumber: 9,
    description:
      "ICT training room with individual computer stations, ideal for coding bootcamps and digital skills workshops.",
    equipment: ["Desktop PCs", "Projector", "Smart Board"],
    images: [
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    name: "ICT Training Room",
    status: "available",
  },
];
