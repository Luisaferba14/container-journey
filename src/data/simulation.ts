export interface DecisionOption {
  id: string;
  label: string;
  actionSummary: string;
  isBestPractice: boolean;
  scoreDelta: number; // e.g. +20 or -15
  timeImpactHours: number; // e.g. +0, +12, +24, +48
  costImpactEuro: number; // e.g. 0, 350, 850
  containerStatusResult: string;
  consequenceTitle: string;
  consequenceDescription: string;
  regulatorySource: string;
  firstPersonReaction?: string;
  badgeUnlocked?: {
    id: string;
    title: string;
    icon: string;
    description: string;
  };
}

export interface OperationalDecision {
  id: string;
  stageId: string;
  stageNumber: number;
  stageTitle: string;
  location: string;
  decisionNumber: number; // 1 through 6
  scenarioTitle: string;
  dilemma: string;
  contextNote: string;
  learningObjectiveRef: string;
  options: DecisionOption[];
}

export interface LearningObjective {
  id: string;
  number: number;
  title: string;
  description: string;
  practicalSkill: string;
  realWorldRisk: string;
}

export interface QuizQuestion {
  id: number;
  objectiveRef: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  regulatorySource: string;
}


// 5 Stated Learning Objectives (Challenge 8 requirement)
export const LEARNING_OBJECTIVES: LearningObjective[] = [
  {
    id: 'lo-1',
    number: 1,
    title: 'Multimodal Freight Choreography',
    description: 'Map and execute the physical and documentary handoffs across road, inland barge, deep-sea liner, rail shuttle, and last-mile drayage.',
    practicalSkill: 'Synchronize equipment release, gate cut-offs, vessel stowage, and rail dispatch.',
    realWorldRisk: 'Missed feeder connection or terminal cut-off adding 7+ days and demurrage.'
  },
  {
    id: 'lo-2',
    number: 2,
    title: 'Incoterms 2020 & Responsibility Transfer',
    description: 'Accurately distinguish the division of transport costs, physical risks, and customs obligations under Incoterms 2020 DAP (Delivered at Place).',
    practicalSkill: 'Ensure shipper covers carriage to destination while consignee handles import duties and unloading.',
    realWorldRisk: 'Disputes over customs clearance liabilities leading to container abandonment at port.'
  },
  {
    id: 'lo-3',
    number: 3,
    title: 'SOLAS VGM & Safety Declarations',
    description: 'Enforce mandatory international maritime safety protocols, specifically SOLAS Chapter VI Verified Gross Mass (VGM) and EU ICS2 / ENS filings.',
    practicalSkill: 'Validate Method 1 vs Method 2 weighing and lodge advance electronic manifests.',
    realWorldRisk: 'No-VGM no-load port lockout, heavy fines, or ship stability compromise.'
  },
  {
    id: 'lo-4',
    number: 4,
    title: 'Demurrage, Detention & Cost Control',
    description: 'Calculate financial exposure to terminal storage (demurrage) and carrier container equipment detention, and execute proactive pre-clearance.',
    practicalSkill: 'Pre-lodge customs declarations (Delta-IE/AP+) to secure instant BAE release upon vessel discharge.',
    realWorldRisk: 'Unbudgeted demurrage of €115+/day accumulating during customs paperwork stalls.'
  },
  {
    id: 'lo-5',
    number: 5,
    title: 'Decarbonization & Operational Mitigation',
    description: 'Evaluate decarbonization trade-offs across modal options and balance schedule recovery against fuel consumption and weather risks.',
    practicalSkill: 'Leverage inland waterway barges and electrified rail shuttles to reduce logistics emissions by 60–80%.',
    realWorldRisk: 'Reckless speed recovery causing severe ship rolling, fuel waste, or cargo damage.'
  }
];

// 6 Concrete In-Journey Operational Decision Points
export const OPERATIONAL_DECISIONS: OperationalDecision[] = [
  {
    id: 'dec-1',
    stageId: 'stage-customs-exp',
    stageNumber: 6,
    stageTitle: 'Export Clearance & Document Inspection',
    location: 'Bình Dương ICD, Vietnam',
    decisionNumber: 1,
    scenarioTitle: 'Packing List Discrepancy & VGM Certification',
    dilemma: 'Shipper VietStride provided a Packing List listing 598 cartons, but the Commercial Invoice states 600 cartons (12,000 pairs). Furthermore, the container has not yet been weighed for its SOLAS VGM certificate. The morning barge to Cai Mep departs in 3 hours.',
    contextNote: 'Under SOLAS Chapter VI Reg 2, a container without a certified VGM cannot be loaded onto a vessel. Under Vietnamese customs rules, quantity discrepancies trigger physical export audits.',
    learningObjectiveRef: 'LO3: SOLAS VGM & Safety Declarations',
    options: [
      {
        id: 'dec-1-opt-a',
        label: 'A. Rush Gate-Out: Submit estimated VGM to catch the morning barge',
        actionSummary: 'Accept the 598-carton estimate and generate an uncertified VGM so the driver can gate-out immediately.',
        isBestPractice: false,
        scoreDelta: -15,
        timeImpactHours: 24,
        costImpactEuro: 450,
        containerStatusResult: 'Held at CMIT Terminal Gate (No-VGM Lockout)',
        consequenceTitle: 'CRITICAL COMPLIANCE FAILURE: Container Blocked at Port Gate',
        consequenceDescription: 'CMIT terminal operating system rejects the container during OCR gate-in due to an unverified VGM document. The box is turned away to an overflow holding yard. VietStride is assessed a €450 gate re-handling and certified weighing penalty, missing the feeder barge entirely (+24h delay).',
        regulatorySource: 'IMO SOLAS Chapter VI Regulation 2 (Verified Gross Mass Requirement)',
        firstPersonReaction: 'I was hauled all the way to the CMIT port gate, only to be rejected by the OCR scanner! No certified VGM, no entry. I am now locked out in an overflow yard while my feeder barge sails away.'
      },
      {
        id: 'dec-1-opt-b',
        label: 'B. Best Practice: Hold gate-out, weigh via Method 1, and issue revised Packing List',
        actionSummary: 'Order certified weighbridge weighing at ICD scale and instruct VietStride to submit corrected 600-carton packing list matching the invoice.',
        isBestPractice: true,
        scoreDelta: 25,
        timeImpactHours: 12,
        costImpactEuro: 0,
        containerStatusResult: '100% Cleared for Waterway Barge (VGM: 15,900 kg)',
        consequenceTitle: 'COMPLIANT & SECURE: Clean Export Clearance Achieved',
        consequenceDescription: 'The weighbridge confirms total gross mass of 15,900 kg (12,000 kg cargo + 3,900 kg tare). The corrected packing list is uploaded to VNACCS customs portal. The container departs on the evening barge 12 hours later with zero fines, verified documentation, and clean terminal pre-advice.',
        regulatorySource: 'IMO SOLAS Guidelines MSC.1/Circ.1475 (Method 1 Weighing) & Vietnam Customs Decree 08/2015',
        firstPersonReaction: 'My weight is officially certified at 15,900 kg on the ICD scale, and the documents match my 600 cartons. I am cleared for the evening river barge without a single fine!',
        badgeUnlocked: {
          id: 'badge-vgm',
          title: 'SOLAS Guardian',
          icon: 'ShieldCheck',
          description: 'Enforced certified VGM weighing and zero document discrepancy at origin ICD.'
        }
      },
      {
        id: 'dec-1-opt-c',
        label: 'C. Modify Invoice: Lower invoice down to 598 cartons to match packing list',
        actionSummary: 'Alter the commercial invoice to state 598 cartons to force paperwork alignment.',
        isBestPractice: false,
        scoreDelta: -20,
        timeImpactHours: 48,
        costImpactEuro: 850,
        containerStatusResult: 'Commercial & Banking Hold (Letter of Credit Discrepancy)',
        consequenceTitle: 'FINANCIAL HOLD: Bank Rejects Letter of Credit',
        consequenceDescription: 'RhôneSport’s issuing bank in France rejects the documentation because the invoice amount no longer matches the agreed Letter of Credit and purchase order. Cargo clearance is frozen upon arrival pending financial amendment (+48h administrative delay, €850 in banking courier and delay fees).',
        regulatorySource: 'ICC Uniform Customs and Practice for Documentary Credits (UCP 600)',
        firstPersonReaction: 'You altered the invoice to 598 cartons, but the French bank caught the discrepancy immediately. My cargo is frozen under a Letter of Credit hold before I have even sailed.'
      }
    ]
  },
  {
    id: 'dec-2',
    stageId: 'stage-loading',
    stageNumber: 9,
    stageTitle: 'Quay Crane Loading & Stowage Execution',
    location: 'CMIT Terminal, Cai Mep, Vietnam',
    decisionNumber: 2,
    scenarioTitle: 'Vessel Stowage Slot Planning on MV Portalis',
    dilemma: 'The chief stowage coordinator on MV Portalis offers you three potential slot assignments for KEDU 240917 4. The container holds €288,000 worth of premium athletic shoes susceptible to moisture, and the ship will cross the Indian Ocean during the winter monsoon.',
    contextNote: 'Stowage planning balances vessel stability (GM), stack weight limits, hazardous segregation (IMDG Code), and environmental exposure.',
    learningObjectiveRef: 'LO1: Multimodal Freight Choreography',
    options: [
      {
        id: 'dec-2-opt-a',
        label: 'A. On-Deck Top Tier (Bay 34, Row 08, Tier 82): Quickest to reach at Fos',
        actionSummary: 'Place the container on the uppermost deck tier for immediate gantry access at destination.',
        isBestPractice: false,
        scoreDelta: -10,
        timeImpactHours: 0,
        costImpactEuro: 220,
        containerStatusResult: 'Stowed on Top Deck (Weather Exposure Warning)',
        consequenceTitle: 'WEATHER RISK: Moisture & Salt Spray Exposure',
        consequenceDescription: 'While easy to discharge, top-deck positions endure extreme windage, green sea spray, and acceleration forces up to 2.5G during heavy monsoon seas. Several carton corners suffer condensation dampening, triggering cargo surveyor inspection fees (€220).',
        regulatorySource: 'IMO Code of Safe Practice for Cargo Stowage and Securing (CSS Code)',
        firstPersonReaction: 'I am perched on the uppermost deck tier. The monsoon winds are howling at 40 knots and salt spray is soaking my roof welds. My shoe boxes inside are taking heavy dynamic acceleration!'
      },
      {
        id: 'dec-2-opt-b',
        label: 'B. Best Practice: Under-Deck Protected Cell (Bay 34, Row 04, Tier 06)',
        actionSummary: 'Request a below-deck cellular guide slot protected from sea spray and temperature fluctuations.',
        isBestPractice: true,
        scoreDelta: 25,
        timeImpactHours: 0,
        costImpactEuro: 0,
        containerStatusResult: 'Optimal Below-Deck Cellular Stowage (Dry & Secured)',
        consequenceTitle: 'OPTIMAL STOWAGE: Full Cargo & Structural Integrity',
        consequenceDescription: 'Under-deck stowage isolates the footwear from ocean spray, UV, and monsoon winds. The container sits low near the vessel’s vertical center of gravity, minimizing racking stress. MV Portalis sails on schedule with perfect stability calculations.',
        regulatorySource: 'BIMCO / WSC Guidelines for Safe Container Stowage',
        firstPersonReaction: 'I have been lowered into the cell guides deep in the ship’s belly. Dry, dark, and locked into position near the vessel’s center of gravity. Perfect for crossing the monsoon.',
        badgeUnlocked: {
          id: 'badge-stowage',
          title: 'Stowage Specialist',
          icon: 'Layers',
          description: 'Secured optimal cellular under-deck stowage protecting sensitive cargo.'
        }
      },
      {
        id: 'dec-2-opt-c',
        label: 'C. Deck Slot adjacent to Tank Container (Bay 32, Row 02, Tier 80)',
        actionSummary: 'Accept a slot next to an ISO tank without checking its hazardous placard.',
        isBestPractice: false,
        scoreDelta: -25,
        timeImpactHours: 18,
        costImpactEuro: 380,
        containerStatusResult: 'IMDG Segregation Violation (Crane Restow Ordered)',
        consequenceTitle: 'SAFETY VIOLATION: IMDG Code Segregation Breach',
        consequenceDescription: 'The adjacent tank contains Class 3 flammable liquids. IMDG segregation rules require at least one container space separation. The terminal safety officer halts loading; your box must be re-handled by the quay crane at night (€380 restow charge, +18h loading delay).',
        regulatorySource: 'IMO International Maritime Dangerous Goods (IMDG) Code Chapter 7.2',
        firstPersonReaction: 'Red alert! The crane operator set me right beside a flammable chemical tank without the required buffer zone. Port safety halted operations and ordered an emergency night restow.'
      }
    ]
  },
  {
    id: 'dec-3',
    stageId: 'stage-ocean',
    stageNumber: 10,
    stageTitle: 'Indian Ocean Deep-Sea Passage',
    location: 'North Indian Ocean (Monsoon Zone)',
    decisionNumber: 3,
    scenarioTitle: 'Force 8 Northeast Monsoon Routing & Speed Strategy',
    dilemma: 'MV Portalis encounters a severe Northeast monsoon storm. Forecast models show 5.2-meter significant wave heights directly on the planned rhumb-line track. Schedule pressure is high to meet the Suez convoy window.',
    contextNote: 'Parametric rolling and heavy wave slamming can break lashing rods, leading to container stack collapse, or cause severe engine overspeed.',
    learningObjectiveRef: 'LO5: Decarbonization & Operational Mitigation',
    options: [
      {
        id: 'dec-3-opt-a',
        label: 'A. Maintain Maximum Speed (19.5 knots) directly through the storm core',
        actionSummary: 'Insist on pushing full engine power along the shortest geographical route to preserve the 44-day schedule.',
        isBestPractice: false,
        scoreDelta: -15,
        timeImpactHours: 0,
        costImpactEuro: 650,
        containerStatusResult: 'High Hull Slamming / Fuel Surge (+1.8 tCO2e)',
        consequenceTitle: 'DANGEROUS NAVIGATION: Severe Fuel Inefficiency & Cargo Stress',
        consequenceDescription: 'MV Portalis suffers violent slamming into head seas. Fuel consumption doubles, generating an extra 1.8 tonnes of CO2e. Several lashing rods on deck suffer elongation strain. The ship reaches Suez on time, but pays an emergency engine inspection fee (€650).',
        regulatorySource: 'IMO Resolution A.749(18) Code on Intact Stability',
        firstPersonReaction: 'Violent shuddering! The ship is smashing directly into 5-meter head waves at full throttle. My lashings are groaning under 2G racking forces and fuel burn has spiked.'
      },
      {
        id: 'dec-3-opt-b',
        label: 'B. Best Practice: Divert 45 nm South & Reduce Engine Speed to 14.5 knots',
        actionSummary: 'Follow shore-based weather routing recommendations to ease vessel speed and alter course around the storm core.',
        isBestPractice: true,
        scoreDelta: 25,
        timeImpactHours: 18,
        costImpactEuro: 0,
        containerStatusResult: 'Safe Weather Diversion Completed (+18h, Zero Damage)',
        consequenceTitle: 'PRUDENT SEAMANSHIP: Vessel, Crew & Cargo Protected',
        consequenceDescription: 'By altering course slightly south and easing engine RPM, the ship avoids the resonant frequency that triggers parametric roll. Wave accelerations stay within 0.8G. While this adds 18 hours to the voyage (arriving on Day 27), the ship, cargo, and bunker reserves are completely protected.',
        regulatorySource: 'CMA CGM / Blue Meridian Ocean Routing & Bunker Optimization Protocols',
        firstPersonReaction: 'The captain altered our heading 45 nautical miles south and eased the throttle. The rolling softened immediately. We lost 18 hours, but every single shoe box inside me is safe.',
        badgeUnlocked: {
          id: 'badge-storm',
          title: 'Storm Navigator',
          icon: 'Compass',
          description: 'Navigated heavy monsoon seas safely with optimal weather routing.'
        }
      },
      {
        id: 'dec-3-opt-c',
        label: 'C. Emergency Reroute: Divert voyage around the Cape of Good Hope',
        actionSummary: 'Turn south around South Africa to bypass both the monsoon and the Red Sea entirely.',
        isBestPractice: false,
        scoreDelta: -20,
        timeImpactHours: 264, // +11 days
        costImpactEuro: 2400,
        containerStatusResult: 'Diverted via Cape of Good Hope (+11 Days, +€2,400)',
        consequenceTitle: 'MASSIVE DELAY & SURCHARGE: Schedule Disrupted',
        consequenceDescription: 'Rerouting around the Cape of Good Hope adds over 3,200 nautical miles and 11 full transit days. The carrier assesses an Emergency Bunker Surcharge of €2,400. RhôneSport misses their peak winter footwear promotional launch in France.',
        regulatorySource: 'BIMCO War Risk / Routing Clause (VOYWAR 2013)',
        firstPersonReaction: 'We turned completely away from Suez toward the southern tip of Africa! An extra 3,200 nautical miles and 11 days added to my journey. RhôneSport’s promotional launch is ruined.'
      }
    ]
  },
  {
    id: 'dec-4',
    stageId: 'stage-eu-prearrival',
    stageNumber: 11,
    stageTitle: 'Western Mediterranean Gateway Calls',
    location: 'Valencia & Barcelona Ports, Spain',
    decisionNumber: 4,
    scenarioTitle: 'Port Berth Congestion & Advance EU Customs Filing',
    dilemma: 'Berth congestion at Valencia adds a 6-hour delay to MV Portalis. The vessel will call Barcelona before arriving at Marseille-Fos. EU customs requires an Entry Summary Declaration (ENS) via the Import Control System 2 (ICS2) before vessel arrival.',
    contextNote: 'Failure to submit advance safety and security data within statutory deadlines results in a "Do Not Load" or severe port clearance holds at EU first port of entry.',
    learningObjectiveRef: 'LO3: SOLAS VGM & Safety Declarations',
    options: [
      {
        id: 'dec-4-opt-a',
        label: 'A. Roll Cargo: Discharge container at Valencia to wait for a regional feeder',
        actionSummary: 'Offload KEDU 240917 4 in Valencia to let MV Portalis make up lost schedule time.',
        isBestPractice: false,
        scoreDelta: -20,
        timeImpactHours: 144, // +6 days
        costImpactEuro: 680,
        containerStatusResult: 'Stranded at Valencia Transshipment Yard (+6 Days)',
        consequenceTitle: 'CARGO ROLLED: Transshipment Nightmare in Spain',
        consequenceDescription: 'KEDU 240917 4 sits on the quay in Valencia waiting 6 days for the next feeder vessel to Marseille-Fos. Feeder transshipment handling adds €680 in port fees and delays delivery to RhôneSport by almost a week.',
        regulatorySource: 'Carrier Bill of Lading Transshipment Terms & Conditions',
        firstPersonReaction: 'They offloaded me in Spain to save the mother vessel’s schedule! Now I am stranded on the Valencia terminal pavement waiting almost a week for a feeder boat.'
      },
      {
        id: 'dec-4-opt-b',
        label: 'B. Best Practice: Maintain direct sailing & pre-lodge ICS2 / ENS declaration',
        actionSummary: 'Keep container on board MV Portalis and transmit advance ENS safety filing with full HS code Chapter 64 and EORI numbers to French customs.',
        isBestPractice: true,
        scoreDelta: 25,
        timeImpactHours: 6,
        costImpactEuro: 0,
        containerStatusResult: 'ICS2 Risk Assessment Cleared · Fos Berth Secured',
        consequenceTitle: 'PROACTIVE CLEARANCE: Smooth French Arrival Prepared',
        consequenceDescription: 'French Customs risk management system validates the ENS declaration without queries. The 6-hour Valencia delay is absorbed into sea margin between Barcelona and Fos. MV Portalis berths at Eurofos on Day 42 ready for immediate discharge.',
        regulatorySource: 'EU Union Customs Code (UCC) Article 127 & ICS2 Release 2 Requirements',
        firstPersonReaction: 'My EU ICS2 safety filing was pre-cleared while we were still cruising past the Balearic Islands. The French port system already has my green light for discharge.',
        badgeUnlocked: {
          id: 'badge-ics2',
          title: 'ICS2 Expediter',
          icon: 'FileCheck',
          description: 'Pre-lodged EU advance safety data avoiding transshipment rolling.'
        }
      },
      {
        id: 'dec-4-opt-c',
        label: 'C. Defer ENS filing until the ship berths at Eurofos',
        actionSummary: 'Wait until the container is physically unloaded at Fos before lodging electronic safety data.',
        isBestPractice: false,
        scoreDelta: -15,
        timeImpactHours: 48,
        costImpactEuro: 500,
        containerStatusResult: 'Red Channel Administrative Hold (Late ENS Filing)',
        consequenceTitle: 'STATUTORY NON-COMPLIANCE: Late Filing Fine & Gate Lockout',
        consequenceDescription: 'EU customs regulations require ENS filing at least 24 hours prior to arrival. Filing post-berth triggers a mandatory security risk audit, a €500 administrative penalty from French customs, and a 48-hour gate-out freeze.',
        regulatorySource: 'French Customs Code (Code des Douanes) Article 411 & UCC Reg 952/2013',
        firstPersonReaction: 'We reached France, but my paperwork was filed late. French customs locked my electronic clearance for 48 hours and assessed DeltaBridge an administrative penalty.'
      }
    ]
  },
  {
    id: 'dec-5',
    stageId: 'stage-arrival-customs',
    stageNumber: 12,
    stageTitle: 'Destination Customs Clearance & Release',
    location: 'Eurofos Terminal, Port of Marseille-Fos, France',
    decisionNumber: 5,
    scenarioTitle: 'French Customs Release & Terminal Demurrage Defense',
    dilemma: 'The container is discharged onto Eurofos quay. Incoterm is DAP Saint-Quentin-Fallavier. Free time on the terminal is 3 calendar days, after which Eurofos bills €115 per day in quay demurrage. French Douane flags the box for non-intrusive mobile scanner control.',
    contextNote: 'Under DAP, the buyer (RhôneSport) is responsible for import customs clearance and duties, but the freight forwarder must coordinate release to avoid terminal demurrage.',
    learningObjectiveRef: 'LO2: Incoterms 2020 & LO4: Demurrage Control',
    options: [
      {
        id: 'dec-5-opt-a',
        label: 'A. Passive Handling: Wait for RhôneSport to send their customs broker to the port',
        actionSummary: 'Leave the container in the terminal stack until the consignee finishes processing import duties at their own pace.',
        isBestPractice: false,
        scoreDelta: -20,
        timeImpactHours: 72,
        costImpactEuro: 345,
        containerStatusResult: 'Terminal Demurrage Accrued (€345 for 3 Extra Days)',
        consequenceTitle: 'DEMURRAGE TRAP: €345 Unbudgeted Storage Penalties',
        consequenceDescription: 'RhôneSport’s administrative office delays filing for 3 days after free time expires. Eurofos terminal invoices €345 in quay storage demurrage (3 days × €115). The scheduled rail shuttle to Lyon is forfeited, requiring an emergency trucking rebooking.',
        regulatorySource: 'Port of Marseille Fos Terminal Tariff Schedule (Eurofos Storage Terms)',
        firstPersonReaction: 'Day 4, Day 5, Day 6... I am sitting on the Eurofos asphalt racking up €115 a day in demurrage because nobody filed my clearance in advance. My train is long gone.'
      },
      {
        id: 'dec-5-opt-b',
        label: 'B. Best Practice: Anticipated Delta-IE Declaration & Fast-Track X-Ray Scan',
        actionSummary: 'Co-ordinate with RhôneSport to file anticipatory Delta-IE declaration, escort container through the mobile scanner, and secure immediate BAE (Bon à Enlever).',
        isBestPractice: true,
        scoreDelta: 25,
        timeImpactHours: 12,
        costImpactEuro: 0,
        containerStatusResult: 'BAE Granted · Cleared Straight to Rail Intermodal Shuttle',
        consequenceTitle: 'FLAWLESS EXECUTION: Zero Demurrage & Clean Customs Release',
        consequenceDescription: 'The mobile scanner confirms high-density carton stacking matching the 12,000 pairs of footwear. The customs inspector issues electronic BAE release within 12 hours. KEDU 240917 4 avoids all demurrage and transfers smoothly to the on-dock rail siding.',
        regulatorySource: 'French Directorate General of Customs (DGDDI) Delta-IE Circular & Port of Marseille Fos PCS (AP+)',
        firstPersonReaction: 'The mobile x-ray scanner swept through me in minutes. The inspector issued the electronic BAE release within 12 hours, and a reach stacker is already transferring me to the on-dock train siding!',
        badgeUnlocked: {
          id: 'badge-customs',
          title: 'Customs Master',
          icon: 'CheckCheck',
          description: 'Achieved instant BAE customs clearance and zero terminal demurrage.'
        }
      },
      {
        id: 'dec-5-opt-c',
        label: 'C. Misclassify Footwear under incorrect lower-duty HS code (Chapter 65 Headgear)',
        actionSummary: 'Attempt to save RhôneSport import duty by submitting an erroneous tariff heading.',
        isBestPractice: false,
        scoreDelta: -30,
        timeImpactHours: 120,
        costImpactEuro: 1500,
        containerStatusResult: 'SEIZED FOR TARIFF FRAUD INVESTIGATION (5-Day Hold)',
        consequenceTitle: 'FRAUD ALERT: Seizure by French Customs (Douane)',
        consequenceDescription: 'Tariff classification algorithms flag the discrepancy immediately. French customs opens the container for physical unstuffing and verification. A formal procès-verbal is issued: €1,500 fine plus retroactive duties. Forwarder’s AEO accreditation is put on review.',
        regulatorySource: 'EU Combined Nomenclature (CN) Chapter 64 & French Customs Code Art. 414',
        firstPersonReaction: 'Customs fraud alert! The French Douane inspectors flagged our false tariff code, broke my seal, and ordered full physical unstuffing under investigation. Total disaster.'
      }
    ]
  },
  {
    id: 'dec-6',
    stageId: 'stage-delivery',
    stageNumber: 14,
    stageTitle: 'Final Drayage & Consignee Delivery',
    location: 'RhôneSport DC, Saint-Quentin-Fallavier, France',
    decisionNumber: 6,
    scenarioTitle: 'Final Leg Modal Shift: Direct Highway Truck vs Eco Rail-Road',
    dilemma: 'The container is at Lyon-Vénissieux rail terminal. RhôneSport’s warehouse requires delivery by 14:00. You must choose the final transport leg from Marseille-Fos to Saint-Quentin-Fallavier to balance cost, transit time, and RhôneSport’s corporate ESG carbon targets.',
    contextNote: 'Road transport emits ~80-140 g CO2/tkm, whereas electrified rail emits ~14-25 g CO2/tkm (EEA benchmarks).',
    learningObjectiveRef: 'LO5: Decarbonization & Operational Mitigation',
    options: [
      {
        id: 'dec-6-opt-a',
        label: 'A. Direct Long-Haul Truck (350 km A7 Highway corridor)',
        actionSummary: 'Bypass the rail terminal and hire a direct diesel articulated truck from Fos straight to Lyon.',
        isBestPractice: false,
        scoreDelta: 5,
        timeImpactHours: 0,
        costImpactEuro: 180,
        containerStatusResult: 'Delivered by Highway Truck (High Carbon: 480 kg CO2e)',
        consequenceTitle: 'FAST BUT DIRTY: High Tolls & Carbon Footprint',
        consequenceDescription: 'The truck arrives on time via the A7 motorway, but generates 480 kg CO2e and incurs €180 in French motorway tolls (ASF/APRR). RhôneSport’s sustainability manager notes that the shipment failed their modal shift charter.',
        regulatorySource: 'ADEME French Transport Carbon Database & ASF Toll Tariffs',
        firstPersonReaction: 'I roared up the A7 highway on an articulated diesel truck. Fast, but heavy on motorway tolls and pumping out 480 kg of CO2, failing RhôneSport’s sustainability target.'
      },
      {
        id: 'dec-6-opt-b',
        label: 'B. Best Practice: Electrified Rail Shuttle (Fos–Vénissieux) + Short-Haul Electric Drayage',
        actionSummary: 'Utilize the daily Naviland Cargo electrified rail shuttle from Fos to Lyon-Vénissieux, followed by a 25 km low-emission drayage truck.',
        isBestPractice: true,
        scoreDelta: 25,
        timeImpactHours: 4,
        costImpactEuro: 0,
        containerStatusResult: 'Delivered on Schedule · 78% Carbon Reduction (105 kg CO2e)',
        consequenceTitle: 'SUSTAINABLE LOGISTICS EXCELLENCE: 78% CO2 Reduction',
        consequenceDescription: 'The electric rail shuttle glides up the Rhône valley powered by low-carbon French grid electricity. Final delivery to Saint-Quentin-Fallavier is completed smoothly. Seal VN847291 is inspected and cut, and the electronic POD is signed with zero damage!',
        regulatorySource: 'European Environment Agency (EEA) Rail Freight Emission Factors & Port of Marseille Fos Modal Shift Programme',
        firstPersonReaction: 'I glided silently up the Rhône valley on an electrified intermodal shuttle powered by French low-carbon electricity. 78% less CO2! Arrived at Saint-Quentin-Fallavier right on time.',
        badgeUnlocked: {
          id: 'badge-eco',
          title: 'Green Logistician',
          icon: 'Leaf',
          description: 'Championed electrified intermodal rail delivering a 78% carbon reduction.'
        }
      },
      {
        id: 'dec-6-opt-c',
        label: 'C. Uncertified Local Courier with unlatched chassis',
        actionSummary: 'Hire an unvetted local discount haulier without twist-lock verification.',
        isBestPractice: false,
        scoreDelta: -25,
        timeImpactHours: 24,
        costImpactEuro: 750,
        containerStatusResult: 'Chassis Failure on Highway / Safety Incident',
        consequenceTitle: 'OPERATIONAL DISASTER: Road Safety Violation & Cargo Jolt',
        consequenceDescription: 'The budget haulier fails to engage the front twist-locks properly. The container shifts during heavy braking near Saint-Priest, requiring gendarmerie intervention and emergency heavy crane re-rigging (€750 emergency bill, +24h delay).',
        regulatorySource: 'European Standard EN 12195 (Load Securing on Road Vehicles)',
        firstPersonReaction: 'The budget trucker forgot to lock my front chassis twist-locks! During heavy braking near Lyon, my corner castings slipped and the highway police pulled us over. Emergency crane required.'
      }
    ]
  }
];

// 10-Question Knowledge Assessment Measuring the 5 Learning Objectives
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    objectiveRef: 'LO2: Incoterms 2020',
    question: 'Under Incoterms 2020 DAP (Delivered at Place) RhôneSport DC Saint-Quentin-Fallavier, who is legally responsible for paying French import customs duties and VAT?',
    options: [
      'The seller / exporter (VietStride Manufacturing)',
      'The freight forwarder (DeltaBridge Logistics)',
      'The buyer / importer (RhôneSport France)',
      'The ocean carrier (Blue Meridian Lines)'
    ],
    correctIndex: 2,
    explanation: 'Under DAP (Delivered at Place), the seller is responsible for carriage to the named destination, but the buyer/importer is strictly responsible for import customs clearance, duties, and taxes (unlike DDP where seller pays duties).',
    regulatorySource: 'ICC Incoterms 2020 Rules (DAP Rule Specification)'
  },
  {
    id: 2,
    objectiveRef: 'LO3: SOLAS VGM',
    question: 'According to IMO SOLAS Chapter VI Regulation 2, who bears ultimate legal responsibility for verifying and signing the container’s Verified Gross Mass (VGM)?',
    options: [
      'The port terminal operator weighing the truck at the gate',
      'The shipper named on the Ocean Bill of Lading',
      'The captain of the container vessel',
      'The truck driver performing pre-carriage'
    ],
    correctIndex: 1,
    explanation: 'SOLAS places the statutory obligation squarely on the shipper named on the maritime Bill of Lading (or their authorized representative) to obtain and communicate the VGM prior to vessel loading.',
    regulatorySource: 'IMO Maritime Safety Committee Circular MSC.1/Circ.1475'
  },
  {
    id: 3,
    objectiveRef: 'LO1: Multimodal Choreography',
    question: 'Why did shipment KEDU 240917 4 utilize an inland waterway barge between Bình Dương ICD and CMIT Cai Mep rather than direct road trucking?',
    options: [
      'Barges are faster than trucks in Vietnam',
      'Trucks are legally prohibited in southern Vietnam',
      'Barges carry hundreds of TEUs, avoiding heavy highway congestion and cutting emissions by over 60%',
      'Cai Mep port does not have a road access gate'
    ],
    correctIndex: 2,
    explanation: 'Inland container barges bypass the notoriously congested National Highway 51 around Ho Chi Minh City, offering high-volume consolidation (100–300 TEU per barge) and significant CO2 savings.',
    regulatorySource: 'CMIT Cai Mep Hinterland Connectivity & Barge Operations Bulletin'
  },
  {
    id: 4,
    objectiveRef: 'LO1: Stowage Architecture',
    question: 'In maritime container stowage coordinate notation "Bay 34, Row 08, Tier 82", what does the number "82" indicate?',
    options: [
      'The container is stowed on deck, second tier above the hatch cover',
      'The container is in the bottom of the ship’s cargo hold',
      'The container weighs 82 tonnes',
      'The container contains Class 8 hazardous corrosive cargo'
    ],
    correctIndex: 0,
    explanation: 'In the ISO bay-row-tier coordinate system, tiers below deck are numbered with even numbers starting from 02 (02, 04, 06...), while tiers on deck are numbered starting with 82 (82, 84, 86...). Tier 82 means the first or second layer directly on top of the deck hatch cover.',
    regulatorySource: 'ISO 9711 & Container Ship Stowage Planning Standards'
  },
  {
    id: 5,
    objectiveRef: 'LO4: Demurrage & Cost Control',
    question: 'What is the operational difference between Terminal Demurrage and Container Equipment Detention?',
    options: [
      'Demurrage applies to airfreight; detention applies to ocean freight',
      'Demurrage is charged for keeping the loaded container inside the port terminal beyond free time; detention is charged for keeping the carrier’s container equipment outside the port beyond free time',
      'Demurrage is paid to customs; detention is paid to the truck driver',
      'They are identical terms with no legal distinction'
    ],
    correctIndex: 1,
    explanation: 'Demurrage compensates terminal/carrier space utilization inside port boundaries beyond agreed free time. Detention compensates the carrier for the loss of use of their container equipment while held at the customer’s warehouse or drayage yard beyond the allowed return period.',
    regulatorySource: 'FIATA Best Practice Guide on Demurrage & Detention'
  },
  {
    id: 6,
    objectiveRef: 'LO3: EU Customs Compliance',
    question: 'What is the mandatory statutory purpose of the EU Entry Summary Declaration (ENS / ICS2)?',
    options: [
      'To calculate the exact retail sales tax for the French government',
      'To verify the footwear brand’s trademark licensing rights',
      'To perform advance electronic safety and security risk analysis prior to cargo arrival into EU customs territory',
      'To insure the cargo against maritime piracy'
    ],
    correctIndex: 2,
    explanation: 'The ENS (lodged through the EU Import Control System 2 - ICS2) enables customs authorities to conduct security and safety risk assessments on all goods entering the EU customs union prior to physical arrival.',
    regulatorySource: 'European Union Customs Code (UCC) Regulation (EU) No 952/2013 Art. 127'
  },
  {
    id: 7,
    objectiveRef: 'LO4: Financial Exposure',
    question: 'If a 40-foot container sits on Eurofos quay for 5 calendar days following vessel discharge, with an agreed terminal free time of 3 days and an applicable demurrage tariff of €115 per day, what is the incurred demurrage cost?',
    options: [
      '€575 (5 days × €115)',
      '€230 (2 chargeable days × €115)',
      '€0 (first 7 days are always free in France)',
      '€345 (3 days × €115)'
    ],
    correctIndex: 1,
    explanation: '5 days on quay minus 3 free days leaves 2 chargeable days: 2 × €115 = €230.',
    regulatorySource: 'Port of Marseille Fos Terminal Operator Tariff & Conditions'
  },
  {
    id: 8,
    objectiveRef: 'LO2: Documentary Trade',
    question: 'Why is an original Negotiable Ocean Bill of Lading (B/L) required to be endorsed and surrendered to the carrier before cargo release, unlike a non-negotiable Sea Waybill?',
    options: [
      'It is not required; any photocopy works in modern shipping',
      'A Negotiable Bill of Lading is a document of title representing legal ownership of the goods; the carrier cannot release cargo without its physical or electronic surrender',
      'The Bill of Lading serves only as a receipt and has no ownership value',
      'French customs requires the original paper for tax stamp affixation'
    ],
    correctIndex: 1,
    explanation: 'The classic negotiable Bill of Lading is a document of title. Possession of the endorsed original represents constructive possession of the cargo, protecting the seller and banks under documentary letters of credit.',
    regulatorySource: 'Hague-Visby Rules & ICC Uniform Customs for Documentary Credits'
  },
  {
    id: 9,
    objectiveRef: 'LO5: Operational Decarbonization',
    question: 'According to European Environment Agency (EEA) benchmarks, how do the average greenhouse gas emissions of diesel road trucking compare to electrified freight rail?',
    options: [
      'Diesel trucks emit about 50% less CO2 than rail',
      'They have identical carbon intensities per tonne-kilometre',
      'Diesel trucking emits roughly 4 to 6 times more CO2 per tonne-km than electrified rail',
      'Electric rail is dirtier because power plants use heavy oil'
    ],
    correctIndex: 2,
    explanation: 'The EEA estimates road freight at roughly 80–140 g CO2/tonne-km compared to 15–28 g CO2/tonne-km for electrified freight rail, making rail 4 to 6 times lower in carbon intensity on average (and up to 8x lower on the French low-carbon nuclear/hydro grid).',
    regulatorySource: 'European Environment Agency (EEA) Transport & Environment Reporting Mechanism'
  },
  {
    id: 10,
    objectiveRef: 'LO5: Heavy Weather Mitigation',
    question: 'When encountering Force 8 heavy weather in the North Indian Ocean, why did the master of MV Portalis ease speed to 14.5 knots instead of maintaining full 19-knot engine RPM?',
    options: [
      'The ship ran out of fuel completely',
      'To prevent parametric rolling, hull slamming, extreme lashing stress, and container stack loss',
      'The captain wanted to fish during the passage',
      'Suez canal authorities ordered all ships to stop'
    ],
    correctIndex: 1,
    explanation: 'Heavy head and bow-quartering seas can induce parametric rolling—a violent resonance where roll angles rapidly exceed 30 degrees, snapping lashing twist-locks and sending container stacks into the sea. Reducing speed alters the encounter period and relieves dynamic stresses.',
    regulatorySource: 'IMO Guidelines for the Prevention of Parametric Rolling'
  }
];

