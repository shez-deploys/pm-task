/* Fictional contacts for mockups, parsed from data/contacts.vcf.
   Sophie Keller (Head of Operations, Aldermoor Advisory) is the signed-in user. */
window.CONTACTS = [
 {
  "emails": [
   {
    "address": "matthias.frei@aldermoor-advisory.ch",
    "type": "work",
    "primary": true
   }
  ],
  "phones": [
   {
    "number": "+41 79 555 18 42",
    "type": "cell"
   },
   {
    "number": "+41 44 555 01 12",
    "type": "work"
   }
  ],
  "name": "Matthias Frei",
  "org": "Aldermoor Advisory",
  "title": "Finance Lead",
  "role": "Finance and commercial operations",
  "address": "Seefeldstrasse 88, Zurich, 8008, Switzerland",
  "url": "https://aldermoor-advisory.ch",
  "birthday": "1987-04-19",
  "timezone": "Europe/Zurich",
  "language": "de-CH",
  "groups": [
   "Colleagues",
   "Finance",
   "Leadership"
  ],
  "note": "Prefers concise email updates. Signs off vendor payments above CHF 25k. Usually available early mornings.",
  "id": 1,
  "initials": "MF",
  "type": "colleague"
 },
 {
  "emails": [
   {
    "address": "lea.baumann@aldermoor-advisory.ch",
    "type": "work",
    "primary": true
   }
  ],
  "phones": [
   {
    "number": "+41 78 555 44 09",
    "type": "cell"
   }
  ],
  "name": "Lea Baumann",
  "org": "Aldermoor Advisory",
  "title": "Junior Analyst",
  "role": "Operations analytics",
  "address": "Seefeldstrasse 88, Zurich, 8008, Switzerland",
  "url": "https://aldermoor-advisory.ch",
  "timezone": "Europe/Zurich",
  "language": "de-CH",
  "groups": [
   "Colleagues",
   "Operations",
   "Project Atlas"
  ],
  "note": "Joined in September 2026. Working on Project Atlas reporting and client data checks. Still getting access to a few internal systems.",
  "id": 2,
  "initials": "LB",
  "type": "colleague"
 },
 {
  "emails": [
   {
    "address": "adrian.vogt@aldermoor-advisory.ch",
    "type": "work",
    "primary": true
   }
  ],
  "phones": [
   {
    "number": "+41 79 555 02 61",
    "type": "cell"
   },
   {
    "number": "+41 44 555 01 01",
    "type": "work"
   }
  ],
  "name": "Adrian Vogt",
  "org": "Aldermoor Advisory",
  "title": "Chief Executive Officer",
  "role": "Executive leadership",
  "address": "Seefeldstrasse 88, Zurich, 8008, Switzerland",
  "url": "https://aldermoor-advisory.ch",
  "birthday": "1978-11-03",
  "timezone": "Europe/Zurich",
  "language": "de-CH",
  "groups": [
   "Colleagues",
   "Leadership",
   "Board"
  ],
  "note": "Prefers a short pre-read before decision meetings. Final approver for contracts above CHF 100k. Travels frequently between Zurich and London.",
  "id": 3,
  "initials": "AV",
  "type": "colleague"
 },
 {
  "emails": [
   {
    "address": "camille.rochat@veloria-partners.example",
    "type": "work",
    "primary": true
   }
  ],
  "phones": [
   {
    "number": "+41 79 555 31 74",
    "type": "cell"
   },
   {
    "number": "+41 22 555 16 30",
    "type": "work"
   }
  ],
  "name": "Camille Rochat",
  "org": "Veloria Partners",
  "title": "Client Account Manager",
  "role": "Primary client contact",
  "address": "Rue du Rhône 44, Geneva, 1204, Switzerland",
  "url": "https://veloria-partners.example",
  "birthday": "1985-07-14",
  "timezone": "Europe/Zurich",
  "language": "fr-CH",
  "groups": [
   "Clients - Active",
   "Project Atlas",
   "Key Accounts"
  ],
  "note": "Main day-to-day contact for the account. Prefers calls for urgent issues. Met at the Geneva operations forum in 2024.",
  "id": 4,
  "initials": "CR",
  "type": "customer"
 },
 {
  "emails": [
   {
    "address": "noah.meier@meridian-fleet.example",
    "type": "work",
    "primary": true
   }
  ],
  "phones": [
   {
    "number": "+41 61 555 27 18",
    "type": "work"
   }
  ],
  "name": "Noah Meier",
  "org": "Meridian Fleet",
  "title": "Procurement Manager",
  "role": "New client stakeholder",
  "address": "Aeschengraben 17, Basel, 4051, Switzerland",
  "url": "https://meridian-fleet.example",
  "timezone": "Europe/Zurich",
  "language": "de-CH",
  "groups": [
   "Clients - Active",
   "New Clients",
   "Project Cedar"
  ],
  "note": "Introduced by their COO in September 2026. Reviewing scope and supplier onboarding requirements. Has asked for data residency details.",
  "id": 5,
  "initials": "NM",
  "type": "customer"
 },
 {
  "emails": [
   {
    "address": "nina@vogel-research.example",
    "type": "work",
    "primary": true
   },
   {
    "address": "nina.vogel@gmail.example",
    "type": "home",
    "primary": false
   }
  ],
  "phones": [
   {
    "number": "+41 76 555 90 22",
    "type": "cell"
   }
  ],
  "name": "Nina Vogel",
  "org": "Vogel Research Studio",
  "title": "Independent Research Consultant",
  "role": "Customer research and workshop facilitation",
  "url": "https://vogel-research.example",
  "timezone": "Europe/Zurich",
  "language": "de-CH",
  "groups": [
   "Consultants",
   "Research",
   "Project Atlas"
  ],
  "note": "Use company email for project material and personal email only for travel logistics. Strong workshop facilitator. Usually invoices monthly.",
  "id": 6,
  "initials": "NV",
  "type": "consultant"
 },
 {
  "emails": [
   {
    "address": "oliver.grant@greyhaven-risk.example",
    "type": "work",
    "primary": true
   }
  ],
  "phones": [
   {
    "number": "+44 7700 900812",
    "type": "cell"
   }
  ],
  "name": "Oliver Grant",
  "org": "Greyhaven Risk",
  "title": "Security Consultant",
  "role": "External security advisor",
  "address": "22 Bartholomew Lane, London, EC2N 2AX, United Kingdom",
  "url": "https://greyhaven-risk.example",
  "timezone": "Europe/London",
  "language": "en-GB",
  "groups": [
   "Consultants",
   "Security",
   "Vendor Review"
  ],
  "note": "Supports security reviews and incident tabletop exercises. Prefers documents before calls. Usually works Tuesday to Thursday.",
  "id": 7,
  "initials": "OG",
  "type": "consultant"
 },
 {
  "emails": [
   {
    "address": "marco.rossi@brightlane-it.example",
    "type": "work",
    "primary": true
   }
  ],
  "phones": [
   {
    "number": "+41 77 555 67 41",
    "type": "cell"
   },
   {
    "number": "+41 44 555 73 00",
    "type": "work"
   }
  ],
  "name": "Marco Rossi",
  "org": "Brightlane IT Services",
  "title": "Service Delivery Manager",
  "role": "IT services supplier contact",
  "address": "Hardturmstrasse 253, Zurich, 8005, Switzerland",
  "url": "https://brightlane-it.example",
  "timezone": "Europe/Zurich",
  "language": "it-CH",
  "groups": [
   "Suppliers",
   "IT",
   "Finance - Invoices"
  ],
  "note": "Primary contact for managed IT support and quarterly service reviews. Their finance team sends monthly invoices. Escalate outages by phone.",
  "id": 8,
  "initials": "MR",
  "type": "supplier"
 },
 {
  "emails": [
   {
    "address": "elena.hartmann@northquay-strategy.example",
    "type": "work",
    "primary": true
   },
   {
    "address": "elena.hartmann@copperfield-ventures.example",
    "type": "work",
    "primary": false
   }
  ],
  "phones": [
   {
    "number": "+41 79 555 83 16",
    "type": "cell"
   }
  ],
  "name": "Elena Hartmann",
  "org": "Northquay Strategy",
  "title": "Operating Partner",
  "role": "Former client contact",
  "address": "Limmatquai 62, Zurich, 8001, Switzerland",
  "url": "https://northquay-strategy.example",
  "timezone": "Europe/Zurich",
  "language": "de-CH",
  "groups": [
   "Former Clients",
   "Network",
   "Leadership"
  ],
  "note": "Moved from Copperfield Ventures to Northquay Strategy in May 2026. Keep the old address for historical threads. Good source for introductions in Swiss fintech.",
  "id": 9,
  "initials": "EH",
  "type": "former"
 },
 {
  "emails": [
   {
    "address": "marco.rossi@brightIane-it.example",
    "type": "work",
    "primary": true
   }
  ],
  "phones": [],
  "name": "Marco Rossi",
  "org": "Brightlane IT Services",
  "title": "Service Delivery Manager",
  "role": "Unverified sender",
  "url": "https://brightIane-it.example",
  "timezone": "Europe/Zurich",
  "language": "it-CH",
  "groups": [
   "Impersonation Review",
   "Suspicious"
  ],
  "note": "Suspicious look-alike contact created from an incoming message. Display name matches a known supplier contact but the domain differs by one character.",
  "id": 10,
  "initials": "MR",
  "type": "impersonation"
 }
];
