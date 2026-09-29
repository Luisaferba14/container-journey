import { ShippingDocument } from '../types/journey';

export const DOCUMENTS: ShippingDocument[] = [
  {
    id: 'doc-invoice',
    name: 'Commercial Invoice',
    shortCode: 'INV-2026-8894',
    createdBy: 'VietStride Manufacturing / Exporter',
    contains: 'Seller and buyer details, product description (12,000 pairs athletic running shoes), unit price €24.00, total value €288,000, currency EUR, DAP Saint-Quentin-Fallavier Incoterms 2020, payment terms, bank details.',
    usedBy: 'Customs broker, French Customs (DGDDI), RhôneSport France (finance), bank, marine insurer.',
    whyItMatters: 'Legal instrument proving the underlying sale transaction; defines the transaction value used for customs valuation and tax assessment.',
    stageIds: ['stage-booking', 'stage-stuffing', 'stage-customs-exp', 'stage-customs-imp'],
    evidenceLabel: 'fictional',
    sampleFields: {
      'Invoice No': 'VN-2026-8894',
      'Date': '12 October 2026',
      'Incoterms': 'DAP Saint-Quentin-Fallavier (2020)',
      'Total Amount': '€288,000.00 EUR',
      'Cartons Declared': '600 cartons (12,000 pairs)'
    }
  },
  {
    id: 'doc-packing-list',
    name: 'Packing List',
    shortCode: 'PKL-240917',
    createdBy: 'VietStride Warehouse & Packing Team',
    contains: 'Itemised breakdown of packaging: pallet count (20 euro-pallets), cartons per pallet (30 cartons), total cartons, gross and net weight per pallet, cubic measurement (59.8 m³), shipping marks (RS-LYON-01/600).',
    usedBy: 'Origin ICD gate, customs inspectors, freight forwarder, terminal stevedores, receiving warehouse in France.',
    whyItMatters: 'Enables physical reconciliation of cargo against declared quantities. A discrepancy here immediately triggers customs and document holds.',
    stageIds: ['stage-stuffing', 'stage-customs-exp', 'stage-customs-imp', 'stage-delivery'],
    evidenceLabel: 'fictional',
    sampleFields: {
      'Pallets': '20 wooden heat-treated pallets',
      'Initial Carton Count': '598 cartons (Typo during tally)',
      'Corrected Carton Count': '600 cartons (Verified by supervisor)',
      'Gross Weight': '12,000 kg',
      'Net Weight': '10,800 kg',
      'Volume': '59.8 m³'
    },
    mismatchHighlight: {
      field: 'Total Cartons Count',
      originalValue: '598 cartons',
      correctedValue: '600 cartons',
      impact: 'Triggered 12-hour documentation hold at Bình Dương ICD. Commercial Invoice showed 600 cartons while Packing List stated 598. Exporter had to re-verify pallet tally and transmit an amended packing list before customs release was granted.'
    }
  },
  {
    id: 'doc-booking-conf',
    name: 'Booking Confirmation',
    shortCode: 'BKG-BM-992144',
    createdBy: 'Blue Meridian Lines (Carrier Customer Service)',
    contains: 'Carrier booking number, vessel name (MV Portalis), voyage (2641W), service (Lotus–Med 1), equipment type (1x40HC), load port (Cai Mep CMIT), discharge port (Fos-sur-Mer), terminal cut-off dates, VGM deadline.',
    usedBy: 'Exporter, DeltaBridge forwarder, trucking dispatch (Saigon Haulage), origin terminal planning.',
    whyItMatters: 'Confirms that carrier has reserved slot and equipment capacity. However, it is not a guarantee of vessel loading until cut-offs and VGM conditions are satisfied.',
    stageIds: ['stage-booking', 'stage-empty', 'stage-stuffing'],
    evidenceLabel: 'verified',
    sampleFields: {
      'Booking Ref': 'BML-SGN-992144',
      'Vessel / Voyage': 'MV PORTALIS / 2641W',
      'Service': 'Lotus–Med 1',
      'CY Cut-off': '17 Oct 2026 12:00',
      'VGM Cut-off': '17 Oct 2026 10:00'
    }
  },
  {
    id: 'doc-shipping-instructions',
    name: 'Shipping Instructions (SI)',
    shortCode: 'SI-DB-7810',
    createdBy: 'DeltaBridge Logistics (on behalf of Shipper)',
    contains: 'Final shipper, consignee, notify party, exact cargo description, container number (KEDU 240917 4), seal number (VN847291), verified gross mass, freight payment terms, requested Bill of Lading clauses.',
    usedBy: 'Ocean carrier documentation desk to draft and issue the master Bill of Lading.',
    whyItMatters: 'Primary data source for the legal contract of carriage; errors transmitted here will duplicate onto the Bill of Lading and manifest.',
    stageIds: ['stage-customs-exp', 'stage-terminal-origin'],
    evidenceLabel: 'verified',
    sampleFields: {
      'Shipper': 'VietStride Manufacturing Co.',
      'Consignee': 'RhôneSport SAS (Lyon, France)',
      'Container No': 'KEDU 240917 4',
      'Seal No': 'VN847291',
      'B/L Type': 'Express Sea Waybill / Original B/L'
    }
  },
  {
    id: 'doc-bol',
    name: 'Ocean Bill of Lading (B/L)',
    shortCode: 'BOL-BML-004819',
    createdBy: 'Blue Meridian Lines (Ocean Carrier)',
    contains: 'Receipt for goods taken on board, port of loading (Cai Mep), port of discharge (Fos), container & seal numbers, cargo description, freight prepaid/collect term, conditions of carriage.',
    usedBy: 'Shipper, consignee, carrier port agents, customs authorities, financing banks.',
    whyItMatters: 'Serves three distinct functions: receipt for goods shipped, evidence of the contract of carriage, and (when issued in negotiable form) document of title transferrable to claim cargo.',
    stageIds: ['stage-loading', 'stage-ocean', 'stage-arrival', 'stage-customs-imp'],
    evidenceLabel: 'verified',
    sampleFields: {
      'B/L Number': 'BMLFOS2610018',
      'Port of Loading': 'Cai Mep, Vietnam',
      'Port of Discharge': 'Fos-sur-Mer, France',
      'Vessel': 'MV Portalis',
      'Status': 'Clean on Board (18 Oct 2026)'
    }
  },
  {
    id: 'doc-eur1',
    name: 'Proof of Origin (EVFTA / EUR.1)',
    shortCode: 'EUR1-VN-2026-551',
    createdBy: 'Competent Vietnamese Authority (VCCI / MoIT) or Registered Exporter',
    contains: 'Origin declaration stating footwear complies with product-specific rules of origin under the EU–Vietnam Free Trade Agreement (EVFTA Chapter 64 rules).',
    usedBy: 'French customs broker and French Customs (DGDDI) during import clearance.',
    whyItMatters: 'Mandatory documentation to substantiate any claim for preferential customs tariff treatment under EVFTA. Without valid proof, default MFN duty applies.',
    stageIds: ['stage-customs-exp', 'stage-customs-imp'],
    evidenceLabel: 'verified',
    sampleFields: {
      'Agreement': 'EU–Vietnam FTA (EVFTA)',
      'Exporting Country': 'Vietnam',
      'Importing Country': 'France (European Union)',
      'Rule Satisfied': 'Manufacture from non-originating materials with value-add threshold'
    }
  },
  {
    id: 'doc-exp-dec',
    name: 'Vietnam Export Customs Declaration',
    shortCode: 'VN-EXP-772910',
    createdBy: 'Licensed Customs Broker / VietStride',
    contains: 'Customs regime code (B11 - export of manufactured goods), exporter tax ID, HS code heading, invoice value, packaging, carrier pre-advice.',
    usedBy: 'Vietnam Customs Department (Bình Dương customs office) and terminal gate.',
    whyItMatters: 'The formal legal act placing goods under the export procedure and granting customs clearance to leave Vietnamese territory.',
    stageIds: ['stage-customs-exp', 'stage-barge'],
    evidenceLabel: 'verified',
    sampleFields: {
      'Customs Office': 'Bình Dương Customs Branch',
      'Channel Result': 'Yellow Channel (Document check required)',
      'Clearance Status': 'Cleared (14 Oct 2026 18:30)',
      'Export Duty': '0% (Exempt manufactured footwear)'
    }
  },
  {
    id: 'doc-vgm',
    name: 'VGM Statement (Verified Gross Mass)',
    shortCode: 'VGM-KEDU2409174',
    createdBy: 'VietStride as Shipper under SOLAS Method 2',
    contains: 'Container number (KEDU 240917 4), method used (Method 2: sum of tare 3,900 kg + cargo mass 12,000 kg including pallets and dunnage), verified mass: 15,900 kg, authorized signatory.',
    usedBy: 'Terminal planning (CMIT), ship’s master and carrier stowage planner.',
    whyItMatters: 'Global SOLAS regulation mandate: any container lacking a certified VGM is prohibited by maritime law from being loaded aboard a ship.',
    stageIds: ['stage-stuffing', 'stage-customs-exp', 'stage-terminal-origin', 'stage-loading'],
    evidenceLabel: 'verified',
    sampleFields: {
      'Container Number': 'KEDU 240917 4',
      'Tare Weight': '3,900 kg',
      'Cargo & Pallets': '12,000 kg',
      'Verified Gross Mass': '15,900 kg',
      'Calculation Method': 'SOLAS Method 2 (Summation)'
    }
  },
  {
    id: 'doc-ens',
    name: 'Entry Summary Declaration (ENS / ICS2)',
    shortCode: 'ENS-ICS2-FR269',
    createdBy: 'Blue Meridian Lines (via EU ICS2 Shared Trader Interface)',
    contains: 'Complete advance safety/security dataset: 6-digit HS code, consignor, consignee, container number, seal number, transport mode, route waypoints.',
    usedBy: 'EU customs authorities and French Customs Risk Analysis Centre.',
    whyItMatters: 'Allows border authorities to perform security and safety risk analysis prior to arrival. Pre-arrival data crosses the Mediterranean before the steel box.',
    stageIds: ['stage-ocean', 'stage-eu-prearrival', 'stage-arrival'],
    evidenceLabel: 'verified',
    sampleFields: {
      'Filing Platform': 'EU ICS2 Release 3 (Maritime)',
      'Filer MRN': '26FR000000008891E4',
      'Risk Assessment': 'Referral for non-intrusive inspection (NII scan)',
      'Submission Timestamp': '21 Nov 2026 (72h prior to berth)'
    }
  },
  {
    id: 'doc-imp-dec',
    name: 'EU Import Customs Declaration',
    shortCode: 'DELTA-G-FR-4410',
    createdBy: 'Rhône Customs Services (RDE) for RhôneSport SAS',
    contains: 'French customs regime (40 00 - entry into free circulation), customs value, EVFTA preference request, document references, VAT self-liquidation notation.',
    usedBy: 'French Customs (DGDDI Fos-sur-Mer office) and French tax administration.',
    whyItMatters: 'The legal act bringing non-Union goods into the EU single market; upon customs release (Bon à Enlever), goods enter free circulation.',
    stageIds: ['stage-arrival', 'stage-customs-imp'],
    evidenceLabel: 'verified',
    sampleFields: {
      'Customs System': 'Delta-G / Delta-IE (DGDDI)',
      'Regime Code': '40 00 (Standard commercial release)',
      'Status': 'Under Control (Scan) → Cleared (BAE granted 25 Nov 2026)',
      'Import VAT': 'Reverse-charged (Autoliquidation - Art. 293 A CGI)'
    }
  },
  {
    id: 'doc-do',
    name: 'Delivery Order (Bon de Sortie / DO)',
    shortCode: 'DO-BML-FR-8821',
    createdBy: 'Blue Meridian Lines France Port Agency',
    contains: 'Release authorization reference, container number, nominated haulier/rail operator, demurrage expiry date (free-time window).',
    usedBy: 'Eurofos terminal gate and intermodal rail operator (Rhône Rail Cargo).',
    whyItMatters: 'Connects commercial release to physical release: the terminal operator will not lift or release a container until the shipping line has transmitted the electronic DO.',
    stageIds: ['stage-customs-imp', 'stage-rail'],
    evidenceLabel: 'verified',
    sampleFields: {
      'Delivery Order No': 'DO-FOS-2641-917',
      'Terminal': 'Eurofos Terminal 2XL',
      'Pin Code / Ref': 'E-REL-917-882',
      'Free Time Expiry': '28 Nov 2026 23:59'
    }
  },
  {
    id: 'doc-pod',
    name: 'Proof of Delivery (POD / CMR)',
    shortCode: 'POD-ACT-99120',
    createdBy: 'Alpes Container Transport & RhôneSport Warehouse',
    contains: 'Delivery timestamp, receiver signature, seal condition check (VN847291 intact), pallet count (20 received in sound condition, no carton exceptions).',
    usedBy: 'Importer, freight forwarder, haulier, ocean carrier.',
    whyItMatters: 'Legally certifies that the contracted transport was completed and custody handed over to consignee; closes carrier liability for transport loss or damage.',
    stageIds: ['stage-delivery'],
    evidenceLabel: 'verified',
    sampleFields: {
      'Delivery Address': 'RhôneSport DC, Saint-Quentin-Fallavier',
      'Received At': '28 Nov 2026 14:15 CET',
      'Seal Check': 'Verified Intact (VN847291)',
      'Signature': 'M. Laurent (Logistics Operations Manager)'
    }
  },
  {
    id: 'doc-eir',
    name: 'Equipment Interchange Receipt (EIR)',
    shortCode: 'EIR-LYON-DEP-01',
    createdBy: 'Lyon Nominated Container Depot / Carrier Agent',
    contains: 'Container number, empty return timestamp, exterior/interior visual inspection, swept cleanliness check, container owner sign-off.',
    usedBy: 'Ocean shipping line (equipment control), trucker, freight forwarder.',
    whyItMatters: 'Documents the end of the container equipment lease/interchange; confirms unit returned sound and stops carrier detention charges.',
    stageIds: ['stage-empty-return'],
    evidenceLabel: 'verified',
    sampleFields: {
      'Depot Location': 'Lyon Intermodal Depot (Port Edouard Herriot)',
      'Return Date': '29 Nov 2026 10:45 CET',
      'Condition': 'Sound, empty, clean, ready for re-positioning',
      'Detention Incurred': '€0.00 (Returned within free time)'
    }
  }
];
