import { CostItem, DelayCostFactor } from '../types/journey';

export const COST_ITEMS: CostItem[] = [
  {
    id: 'cost-origin-inland',
    category: 'Origin Road & Barge Transport',
    amount: 250,
    percentage: 3.6,
    description: 'Factory-to-ICD road haul (18 km, €110) plus Bình Dương-to-CMIT waterway barge transport (90 km, €140).',
    costBearer: 'DeltaBridge Logistics (under DAP contract)',
    evidenceLabel: 'calculation'
  },
  {
    id: 'cost-origin-terminal',
    category: 'Origin Terminal & Documentation',
    amount: 380,
    percentage: 5.5,
    description: 'ICD handling, CMIT terminal handling charge (THC origin), export customs brokerage, and VGM certification fee.',
    costBearer: 'VietStride / DeltaBridge Logistics',
    evidenceLabel: 'calculation'
  },
  {
    id: 'cost-ocean',
    category: 'Ocean Freight & Surcharges',
    amount: 4200,
    percentage: 61.3,
    description: '40HC liner freight Cai Mep to Fos on Lotus–Med 1 service, bunker adjustment factor (BAF), emissions surcharge, canal transit dues.',
    costBearer: 'DeltaBridge Logistics / Blue Meridian Lines',
    evidenceLabel: 'calculation'
  },
  {
    id: 'cost-insurance',
    category: 'Marine Cargo Insurance',
    amount: 190,
    percentage: 2.8,
    description: 'All-risks Institute Cargo Clauses (A) cover for €288,000 cargo valuation during sea and multimodal legs.',
    costBearer: 'RhôneSport France / VietStride agreement',
    evidenceLabel: 'calculation'
  },
  {
    id: 'cost-dest-terminal',
    category: 'Destination Port & Eurofos Terminal',
    amount: 650,
    percentage: 9.5,
    description: 'Vessel discharge, Eurofos terminal handling charge (THC destination), port security dues (ISPS), and scanner shuttle movement.',
    costBearer: 'DeltaBridge Logistics',
    evidenceLabel: 'calculation'
  },
  {
    id: 'cost-customs-rep',
    category: 'Customs Representation (Brokerage)',
    amount: 180,
    percentage: 2.6,
    description: 'Licensed customs representative fee for Delta-G declaration filing, EVFTA origin documentary verification, and scan attendance.',
    costBearer: 'RhôneSport France',
    evidenceLabel: 'calculation'
  },
  {
    id: 'cost-rail',
    category: 'Intermodal Rail (Fos–Vénissieux)',
    amount: 560,
    percentage: 8.2,
    description: '300 km electric freight train shuttle, wagon slot, port siding shunt, and Vénissieux intermodal gantry lift.',
    costBearer: 'DeltaBridge Logistics',
    evidenceLabel: 'calculation'
  },
  {
    id: 'cost-final-truck',
    category: 'Final Delivery Truck Haul',
    amount: 260,
    percentage: 3.8,
    description: 'Road container chassis haul from Vénissieux rail terminal to Saint-Quentin-Fallavier DC dock (approx 35 km).',
    costBearer: 'DeltaBridge Logistics',
    evidenceLabel: 'calculation'
  },
  {
    id: 'cost-unloading',
    category: 'Warehouse Dock Labour & Inbound Handling',
    amount: 180,
    percentage: 2.6,
    description: 'Forklift unloading of 20 pallets, carton verification tally, barcode receipt, and empty container sweeping.',
    costBearer: 'RhôneSport France DC',
    evidenceLabel: 'calculation'
  }
];

export const TOTAL_LOGISTICS_COST = 6850;

export const DELAY_COST_FACTORS: DelayCostFactor[] = [
  {
    title: 'Port Demurrage / Storage Exposure',
    rate: '€75 – €120 / day (after standard 5-7 days free time)',
    description: 'Charged by carrier and terminal for container resting on terminal ground beyond free time allowance. If customs hold had exceeded free time, daily demurrage would have applied.',
    triggerCondition: 'Terminal dwell > 7 calendar days'
  },
  {
    title: 'Missed Intermodal Rail Rebooking',
    rate: '€120 – €240 per rescheduled slot',
    description: 'Because the container was selected for non-intrusive scanning, it missed the Day 44 scheduled departure. Rebooking onto the next day slot incurred administrative and siding dwell fees.',
    triggerCondition: 'Gate cut-off missed by > 2 hours'
  },
  {
    title: 'Carrier Equipment Detention',
    rate: '€85 – €140 / day (after 7 days inland free time)',
    description: 'Assessed when empty container is not returned to the carrier nominated inland depot within the agreed timeframe. In this story, box was returned promptly on Day 48.',
    triggerCondition: 'Box kept past Day 50'
  },
  {
    title: 'Working Capital & Inventory Holding Cost',
    rate: 'Approx. €79 / day (€237 for 3-day disruption)',
    description: 'With cargo valued at €288,000 and an assumed 10% annual cost of capital, each day of delay ties up cash and delays store delivery, even if transport bills stay identical.',
    triggerCondition: 'Supply chain transit elongation'
  }
];
