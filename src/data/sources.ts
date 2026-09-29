import { EvidenceSource } from '../types/journey';

export const EVIDENCE_SOURCES: EvidenceSource[] = [
  {
    id: 'src-1',
    refIndex: 1,
    claim: 'CMIT connects to Bình Dương by barge network; transit time is roughly 6–8 hours from inland production areas.',
    label: 'verified',
    sourceTitle: 'Cai Mep International Terminal Hinterland & Barge Services',
    publisher: 'APM Terminals / CMIT Vietnam',
    url: 'https://cmit.com.vn',
    retrievedDate: 'September 2026',
    educationalNote: 'Authoritative terminal operational specification demonstrating river-sea intermodal feeder links.'
  },
  {
    id: 'src-2',
    refIndex: 2,
    claim: 'CMA CGM published an indicative 35-day Vung Tau–Fos transit on the MEX1 Mediterranean service.',
    label: 'verified',
    sourceTitle: 'MEX1 Asia–Mediterranean Service Route & Schedule Schedules Flyer',
    publisher: 'CMA CGM Group',
    url: 'https://www.cma-cgm.com',
    retrievedDate: 'September 2026',
    educationalNote: 'Carrier schedules are indicative and subject to commercial/operational rotation adjustments.'
  },
  {
    id: 'src-3',
    refIndex: 3,
    claim: 'Steel 40-foot High Cube containers offer approximately 76.4 m³ internal capacity.',
    label: 'verified',
    sourceTitle: 'Dry Cargo Container Specifications Guide (40ft High Cube)',
    publisher: 'Maersk Line Equipment Specification',
    url: 'https://www.maersk.com',
    retrievedDate: 'September 2026',
    educationalNote: 'Standard ISO 45G1 dimensions benchmark: external 12.19 x 2.44 x 2.90m, internal ~76m³.'
  },
  {
    id: 'src-4',
    refIndex: 4,
    claim: 'Tare mass for 40HC container assumed at 3,900 kg.',
    label: 'assumption',
    sourceTitle: 'Container Tare Range Standards',
    publisher: 'Carrier Equipment Engineering Norms',
    educationalNote: 'Real tare mass varies between 3,750 kg and 4,150 kg depending on manufacturer, floor and wall steel gauge.'
  },
  {
    id: 'src-5',
    refIndex: 5,
    claim: 'Container identification follows ISO 6346 (KED prefix, U freight category, 240917 serial, 4 check digit).',
    label: 'fictional',
    sourceTitle: 'ISO 6346 Container Identification Logic',
    publisher: 'Bureau International des Containers (BIC)',
    url: 'https://www.bic-code.org',
    retrievedDate: 'September 2026',
    educationalNote: 'Constructed for pedagogical demonstration. KED is not an active registered BIC operator code.'
  },
  {
    id: 'src-6',
    refIndex: 6,
    claim: 'Eurofos terminal at Port-Saint-Louis-du-Rhône handles containerised traffic with 1,600m quay and direct rail connections.',
    label: 'verified',
    sourceTitle: 'Terminal Presentation & Infrastructure',
    publisher: 'Eurofos / Port de Marseille Fos',
    url: 'https://www.eurofos.fr',
    retrievedDate: 'September 2026',
    educationalNote: 'Port publishes 15–16m draft, 8 gantry cranes, and about 15% modal share for inland rail.'
  },
  {
    id: 'src-7',
    refIndex: 7,
    claim: 'SOLAS requirement for Verified Gross Mass (VGM): no container may be loaded on a vessel without a certified VGM.',
    label: 'verified',
    sourceTitle: 'International Convention for the Safety of Life at Sea (SOLAS) Chapter VI, Regulation 2',
    publisher: 'International Maritime Organization (IMO)',
    url: 'https://www.imo.org',
    retrievedDate: 'September 2026',
    educationalNote: 'Enacted globally since July 2016 to prevent maritime casualties caused by overweight or misdeclared containers.'
  },
  {
    id: 'src-8',
    refIndex: 8,
    claim: 'EU ICS2 requires advance Entry Summary Declaration (ENS) prior to vessel loading or maritime arrival.',
    label: 'verified',
    sourceTitle: 'Import Control System 2 (ICS2) Release 3 Maritime Requirements',
    publisher: 'European Commission Directorate-General for Taxation and Customs Union (DG TAXUD)',
    url: 'https://taxation-customs.ec.europa.eu',
    retrievedDate: 'September 2026',
    educationalNote: 'Ensures safety, security and advance electronic risk analysis before goods cross EU external borders.'
  },
  {
    id: 'src-9',
    refIndex: 9,
    claim: 'EU Customs import declaration placed electronically; import VAT self-assessed on monthly French VAT returns.',
    label: 'verified',
    sourceTitle: 'Autoliquidation de la TVA à l’importation (Article 293 A du CGI)',
    publisher: 'Direction Générale des Douanes et Droits Indirects (DGDDI) France',
    url: 'https://www.douane.gouv.fr',
    retrievedDate: 'September 2026',
    educationalNote: 'Import VAT is accounted for on regular VAT returns for French-registered firms rather than paid at port clearance.'
  },
  {
    id: 'src-10',
    refIndex: 10,
    claim: 'EU–Vietnam Free Trade Agreement (EVFTA) preferential origin proofs include EUR.1 or origin declarations.',
    label: 'verified',
    sourceTitle: 'Access2Markets Trade Agreement & Rules of Origin for Vietnam',
    publisher: 'European Commission Access2Markets',
    url: 'https://trade.ec.europa.eu/access-to-markets',
    retrievedDate: 'September 2026',
    educationalNote: 'Requires validated origin criteria and documentation. Tariff rates cannot be assumed without product lab specification.'
  },
  {
    id: 'src-11',
    refIndex: 11,
    claim: 'Indicative freight modes CO2 intensity: Sea 2–7 g/tkm, Rail 18–35 g/tkm, Waterway 30–49 g/tkm, Road 62–110 g/tkm, Air 665+ g/tkm.',
    label: 'verified',
    sourceTitle: 'Transport and Environment Reporting Mechanism (TERM) Freight Emissions Benchmarks',
    publisher: 'European Environment Agency (EEA)',
    url: 'https://www.eea.europa.eu',
    retrievedDate: 'September 2026',
    educationalNote: 'Indicative operational carbon intensity ranges; not directly interchangeable with an audited corporate GHG protocol.'
  },
  {
    id: 'src-12',
    refIndex: 12,
    claim: 'Illustrative door-to-door logistics cost calculated at €6,850 for the 40HC Asia–Europe corridor.',
    label: 'calculation',
    sourceTitle: 'Corridor Cost Estimation Model',
    publisher: 'Educational Courseware Logistics Model',
    retrievedDate: 'September 2026',
    educationalNote: 'Benchmark includes ocean freight (€4,200), terminals (€1,030 total), inland rail (€560), origin/last-mile haul (€510), docs/insurance.'
  },
  {
    id: 'src-13',
    refIndex: 13,
    claim: 'Illustrative total transport emissions calculated at 0.47 to 1.42 tCO2e for 12,000 kg cargo over 15,870 km multimodal route.',
    label: 'calculation',
    sourceTitle: 'Mode Emissions Distance Model',
    publisher: 'Logistics Decarbonisation Sensitivity Model',
    retrievedDate: 'September 2026',
    educationalNote: 'Sensitivity range based on EEA modal coefficients multiplied by 12 tonnes cargo over 15,450km sea + 420km inland legs.'
  },
  {
    id: 'src-14',
    refIndex: 14,
    claim: 'IMO Greenhouse Gas Strategy aims for 40% carbon intensity reduction by 2030 and net-zero GHG emissions by or around 2050.',
    label: 'verified',
    sourceTitle: '2023 IMO Strategy on Reduction of GHG Emissions from Ships',
    publisher: 'International Maritime Organization (IMO)',
    url: 'https://www.imo.org',
    retrievedDate: 'September 2026',
    educationalNote: 'Global maritime decarbonisation milestone adopted by Marine Environment Protection Committee (MEPC 80).'
  },
  {
    id: 'src-15',
    refIndex: 15,
    claim: 'Cargo specification: 12,000 pairs of running shoes across 20 pallets, 600 cartons, cargo value €288,000.',
    label: 'assumption',
    sourceTitle: 'Commercial Footwear Scenario',
    publisher: 'Project Case Definition',
    educationalNote: 'Typical container utilization for high-volume consumer goods: ~60 m³ effective cube, ~12 tonnes payload.'
  }
];
